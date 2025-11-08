import { describe, it, expect, beforeAll } from 'vitest'
import { readFile } from 'node:fs/promises'
import * as yaml from 'js-yaml'
import { join } from 'path';

// Define types for workflow files
interface WorkflowStep {
  uses?: string;
  with?: { [key: string]: unknown };
  run?: string;
}

interface WorkflowJob {
  steps: WorkflowStep[];
}

interface Workflow {
  name: string;
  on: Record<string, unknown> | string | string[];
  jobs: { [key: string]: WorkflowJob };
  permissions?: Record<string, string>;
  concurrency?: { group: string; 'cancel-in-progress': boolean };
}

describe('GitHub Workflows Validation', () => {
  const workflowsDir = join(__dirname, '.');
  
  const workflows = [
    'release.yml',
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
          const workflow = yaml.load(content) as Workflow
          
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
    it('should have proper permissions in the release workflow', async () => {
      const filePath = join(workflowsDir, 'release.yml')
      const content = await readFile(filePath, 'utf-8')
      const workflow = yaml.load(content) as Workflow
      
      expect(workflow.permissions).toBeDefined()
      expect(workflow.permissions?.contents).toBe('read')
      expect(workflow.permissions?.packages).toBe('write')
      
      console.log('✅ Release workflow has correct permissions')
    })

    it('should have proper triggers in the release workflow', async () => {
      const filePath = join(workflowsDir, 'release.yml')
      const content = await readFile(filePath, 'utf-8')
      const workflow = yaml.load(content) as Workflow
      
      const onTrigger = workflow.on as { release: { types: string[] }; workflow_dispatch: unknown }

      expect(onTrigger.release).toBeDefined()
      expect(onTrigger.release.types).toContain('published')
      expect(onTrigger.workflow_dispatch).toBeDefined()
      
      console.log('✅ Release workflow has correct triggers')
    })
  })

  describe('Docker Build Configuration', () => {
    it('should have valid Docker build steps in the release workflow', async () => {
      const filePath = join(workflowsDir, 'release.yml')
      const content = await readFile(filePath, 'utf-8')
      const workflow = yaml.load(content) as Workflow
      
      const dockerSteps = ['docker/setup-qemu-action', 'docker/setup-buildx-action', 'docker/login-action', 'docker/metadata-action', 'docker/build-push-action']
      const allSteps = Object.values(workflow.jobs).flatMap(job => job.steps || [])
      
      dockerSteps.forEach(expectedStep => {
        const found = allSteps.some(step => 
          step.uses && step.uses.includes(expectedStep)
        )
        if (found) {
          console.log(`✅ Found Docker step: ${expectedStep}`)
        }
        expect(found).toBe(true)
      })
    })
  })

  describe('Node.js Configuration', () => {
    it('should use a consistent Node.js version in the release workflow', async () => {
      const filePath = join(workflowsDir, 'release.yml')
      const content = await readFile(filePath, 'utf-8')
      const workflow = yaml.load(content) as Workflow
      
      const job = workflow.jobs['release-build']
      const setupNodeStep = job.steps.find(step => step.uses && step.uses.includes('setup-node'))

      expect(setupNodeStep).toBeDefined()
      expect(setupNodeStep?.with?.['node-version']).toBe('${{ env.NODE_VERSION }}')

      console.log('✅ Consistent Node.js version used')
    })
  })
})
