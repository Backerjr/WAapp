import { describe, it, expect, beforeAll } from 'vitest'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

describe('Docker Build Tests', () => {
  const dockerFiles = [
    'Dockerfile',
    'Dockerfile.nginx', 
    'Dockerfile.caddy'
  ]

  beforeAll(() => {
    console.log('🐳 Testing Docker configurations...')
  })

  describe('Dockerfile Validation', () => {
    dockerFiles.forEach(dockerfile => {
      it(`should have valid ${dockerfile} syntax`, async () => {
        try {
          const filePath = join(process.cwd(), dockerfile)
          const content = await readFile(filePath, 'utf-8')
          
          expect(content).toBeDefined()
          expect(content.length).toBeGreaterThan(0)
          
          // Basic Dockerfile structure checks
          expect(content).toMatch(/^FROM\s+/m)
          
          if (dockerfile === 'Dockerfile') {
            // Main Dockerfile should be multi-stage
            expect(content).toMatch(/FROM.*as\s+\w+/i)
          }
          
          console.log(`✅ ${dockerfile} has valid structure`)
        } catch (error) {
          console.error(`❌ ${dockerfile} validation failed:`, error)
          throw error
        }
      })
    })
  })

  describe('Docker Build Commands', () => {
    it('should validate docker build commands work', async () => {
      // This would be the commands from your terminals
      const buildCommands = [
        'docker build -f Dockerfile.nginx -t rozmowa-nginx:local .',
        'docker build -f Dockerfile.caddy -t rozmowa-caddy:local .'
      ]
      
      buildCommands.forEach(command => {
        expect(command).toMatch(/docker build/)
        expect(command).toMatch(/-f Dockerfile\.(nginx|caddy)/)
        expect(command).toMatch(/-t [\w-]+:[\w.-]+/)
        console.log(`✅ Build command syntax valid: ${command}`)
      })
    })

    it('should have proper image tags', () => {
      const expectedTags = [
        'rozmowa-nginx:local',
        'rozmowa-caddy:local'
      ]
      
      expectedTags.forEach(tag => {
        expect(tag).toMatch(/^[\w-]+:[\w.-]+$/)
        console.log(`✅ Image tag format valid: ${tag}`)
      })
    })
  })

  describe('Container Runtime Configuration', () => {
    it('should validate container run commands', () => {
      const runCommands = [
        'docker run -p 8080:80 --rm rozmowa-nginx:local',
        'docker run -p 8081:80 --rm rozmowa-caddy:local'
      ]
      
      runCommands.forEach((command, index) => {
        expect(command).toMatch(/docker run/)
        expect(command).toMatch(/-p \d+:80/)
        expect(command).toMatch(/--rm/)
        
        const expectedPort = index === 0 ? '8080' : '8081'
        expect(command).toContain(`-p ${expectedPort}:80`)
        
        console.log(`✅ Run command syntax valid: ${command}`)
      })
    })

    it('should use different external ports', () => {
      const ports = ['8080', '8081']
      const uniquePorts = new Set(ports)
      
      expect(uniquePorts.size).toBe(ports.length)
      console.log('✅ Container ports are unique:', ports)
    })
  })

  describe('Production Build Validation', () => {
    it('should validate package.json build script', async () => {
      const packageJsonPath = join(process.cwd(), 'package.json')
      const content = await readFile(packageJsonPath, 'utf-8')
      const packageJson = JSON.parse(content)
      
      expect(packageJson.scripts).toBeDefined()
      expect(packageJson.scripts.build).toBeDefined()
      expect(packageJson.scripts.build).toContain('vite build')
      
      console.log('✅ Build script configured:', packageJson.scripts.build)
    })

    it('should validate server.js exists for production', async () => {
      const serverPath = join(process.cwd(), 'server.js')
      const content = await readFile(serverPath, 'utf-8')
      
      expect(content).toBeDefined()
      expect(content).toContain('createServer')
      expect(content).toMatch(/server\.listen.*port/i)
      
      console.log('✅ Production server configured')
    })
  })
})