import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const appSourceRoots = ['apps/erp/src', 'apps/crm/src', 'apps/pdv/src']
const allowedBoundaryFiles = new Set([
  'apps/erp/src/lib/api.ts',
  'apps/crm/src/lib/api.ts',
  'apps/pdv/src/lib/api.ts',
])

const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx'])
const violations = []

function hasSourceExtension(path) {
  return [...sourceExtensions].some((extension) => path.endsWith(extension))
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(path)))
      continue
    }

    if (entry.isFile() && hasSourceExtension(path)) {
      files.push(path)
    }
  }

  return files
}

function report(path, message) {
  violations.push(`${path}: ${message}`)
}

for (const root of appSourceRoots) {
  const files = await collectFiles(root)

  for (const file of files) {
    const normalizedPath = relative(process.cwd(), file)
    const source = stripComments(await readFile(file, 'utf8'))
    const isAllowedBoundary = allowedBoundaryFiles.has(normalizedPath)

    if (/\bfetch\s*\(/.test(source)) {
      report(normalizedPath, 'direct fetch usage is not allowed; use @supexon/tuyau')
    }

    if (/from\s+['"]@tuyau\/core/.test(source)) {
      report(normalizedPath, 'frontend apps must import @supexon/tuyau, not @tuyau/core')
    }

    if (!isAllowedBoundary && /\bcreate(?:Api|HTTP|Http)Client\b/.test(source)) {
      report(normalizedPath, 'standalone API client factories are not allowed')
    }
  }
}

if (violations.length > 0) {
  console.error('API boundary violations found:')
  for (const violation of violations) {
    console.error(`- ${violation}`)
  }
  process.exit(1)
}

console.log('API boundary check passed.')
