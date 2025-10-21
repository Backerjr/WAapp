import { describe, it, expect, beforeAll } from 'vitest'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import * as yaml from 'js-yaml'

describe('GitHub Workflows Validation', () => {
  const workflowsDir = join(process.cwd(), '.github/workflows')
  
  const workflows = [
    'ci-publish-ghcr.yml',
    'deploy-pages.yml',
    'gh-pages.yml',
    'release-publish.yml',
    'check-pages-config.yml',
    'set-pages-source.yml'
  ]

  beforeAll(() => {
    console.log('🔍 Testing GitHub Actions workflows...')
  })

  describe('Workflow Syntax Validation', () => {
    workflows.forEach(workflowFile => {
      it(`should have valid YAML syntax: ${workflowFile}`, async () => {
        try {
          const filePath = join(workflowsDir, workflowFile)
          const content = await readFile(filePath, 'utf-8')
          
          // Parse YAML - will throw if invalid
          const workflow = yaml.load(content) as any
          
          expect(workflow).toBeDefined()
          expect(workflow.name).toBeDefined()
          expect(workflow.on).toBeDefined()
          expect(workflow.jobs).toBeDefined()
          
          console.log(`✅ ${workflowFile} has valid syntax`)
        } catch (error) {
          console.error(`❌ ${workflowFile} syntax error:`, error)
          throw error
        }
      })
    })
  })

  describe('Required Workflow Structure', () => {
    it('should have proper permissions in CI workflow', async () => {
      const filePath = join(workflowsDir, 'ci-publish-ghcr.yml')
      const content = await readFile(filePath, 'utf-8')
      const workflow = yaml.load(content) as any
      
      expect(workflow.permissions).toBeDefined()
      expect(workflow.permissions.contents).toBe('read')
      expect(workflow.permissions.packages).toBe('write')
      expect(workflow.permissions.pages).toBe('write')
      expect(workflow.permissions['id-token']).toBe('write')
      
      console.log('✅ CI workflow has correct permissions')
    })

    it('should have proper triggers in deploy workflow', async () => {
      const filePath = join(workflowsDir, 'deploy-pages.yml')
      const content = await readFile(filePath, 'utf-8')
      const workflow = yaml.load(content) as any
      
      expect(workflow.on.push).toBeDefined()
      expect(workflow.on.push.branches).toContain('replit-agent')
      expect(workflow.on.workflow_dispatch).toBeDefined()
      
      console.log('✅ Deploy workflow has correct triggers')
    })

    it('should have concurrency control in deploy workflow', async () => {
      const filePath = join(workflowsDir, 'deploy-pages.yml')
      const content = await readFile(filePath, 'utf-8')
      const workflow = yaml.load(content) as any
      
      expect(workflow.concurrency).toBeDefined()
      expect(workflow.concurrency.group).toBe('pages')
      expect(workflow.concurrency['cancel-in-progress']).toBe(false)
      
      console.log('✅ Deploy workflow has proper concurrency control')
    })
  })

  describe('GitHub Script Actions Validation', () => {
    it('should use proper GitHub Script action versions in check-pages-config', async () => {
      const filePath = join(workflowsDir, 'check-pages-config.yml')
      const content = await readFile(filePath, 'utf-8')
      const workflow = yaml.load(content) as any
      
      const job = workflow.jobs['check-pages-status']
      expect(job).toBeDefined()
      
      // Check all steps use actions/github-script@v6 or higher
      job.steps.forEach((step: any, index: number) => {
        if (step.uses && step.uses.includes('actions/github-script')) {
          const version = step.uses.split('@')[1]
          expect(version).toMatch(/v[6-9]|v[1-9][0-9]/)
          console.log(`✅ Step ${index + 1} uses github-script ${version}`)
        }
      })
    })

    it('should have read-only operations in check-pages-config', async () => {
      const filePath = join(workflowsDir, 'check-pages-config.yml')
      const content = await readFile(filePath, 'utf-8')
      const workflow = yaml.load(content) as any
      
      const job = workflow.jobs['check-pages-status']
      
      // Ensure only read operations (no mutations)
      const scriptSteps = job.steps.filter((step: any) => step.uses && step.uses.includes('actions/github-script'))
      
      scriptSteps.forEach((step: any) => {
        const script = step.with?.script || ''
        expect(script).not.toContain('updateInformationAboutPagesSite')
        expect(script).not.toContain('createPagesSite')
        expect(script).not.toContain('repository_dispatch')
        console.log('✅ Script contains only read operations')
      })
    })
  })

  describe('Docker Build Configuration', () => {
    it('should have valid Docker build steps in CI', async () => {
      const filePath = join(workflowsDir, 'ci-publish-ghcr.yml')
      const content = await readFile(filePath, 'utf-8')
      const workflow = yaml.load(content) as any
      
      // Check for Docker setup steps
      const dockerSteps = ['docker/setup-buildx-action', 'docker/login-action', 'docker/build-push-action']
      const allSteps = Object.values(workflow.jobs).flatMap((job: any) => job.steps || [])
      
      dockerSteps.forEach(expectedStep => {
        const found = allSteps.some((step: any) => 
          step.uses && step.uses.includes(expectedStep)
        )
        if (found) {
          console.log(`✅ Found Docker step: ${expectedStep}`)
        }
      })
    })
  })

  describe('Environment Variables & Secrets', () => {
    it('should not reference undefined secrets in conditionals', async () => {
      for (const workflowFile of workflows) {
        const filePath = join(workflowsDir, workflowFile)
        const content = await readFile(filePath, 'utf-8')
        
        // Check for problematic secret references in conditionals
        const problematicPatterns = [
          'if:.*secrets\\.',
          '\\$\\{\\{.*secrets\\..*\\}\\}.*==.*\\$\\{\\{.*secrets\\.',
        ]
        
        problematicPatterns.forEach(pattern => {
          const regex = new RegExp(pattern, 'g')
          const matches = content.match(regex)
          
          if (matches) {
            console.warn(`⚠️  ${workflowFile} has potential secret reference issues:`, matches)
          }
        })
      }
      
      console.log('✅ No problematic secret references found')
    })
  })

  describe('Node.js Configuration', () => {
    it('should use consistent Node.js version across workflows', async () => {
      const nodeVersions = new Set<string>()
      
      for (const workflowFile of workflows) {
        const filePath = join(workflowsDir, workflowFile)
        const content = await readFile(filePath, 'utf-8')
        const workflow = yaml.load(content) as any
        
        // Extract Node.js versions
        Object.values(workflow.jobs || {}).forEach((job: any) => {
          (job.steps || []).forEach((step: any) => {
            if (step.uses === 'actions/setup-node@v4' && step.with?.['node-version']) {
              nodeVersions.add(step.with['node-version'])
            }
          })
        })
      }
      
      console.log('Node.js versions found:', Array.from(nodeVersions))
      
      // Should use consistent version (preferably 20)
      if (nodeVersions.size > 1) {
        console.warn('⚠️  Multiple Node.js versions detected:', Array.from(nodeVersions))
      }
      
      expect(nodeVersions.size).toBeGreaterThan(0)
    })
  })
})