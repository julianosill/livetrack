'use server'

import { promises } from 'node:fs'
import path from 'node:path'

import { compileMDX } from 'next-mdx-remote/rsc'

import { PATHS } from '@/constants'

export async function extractMdxData<T>(slug: string) {
  const filePath = path.join(process.cwd(), PATHS.docMdxFiles, `${slug}.mdx`)
  const source = await promises.readFile(filePath, 'utf-8')
  const { frontmatter, content } = await compileMDX<T>({ source, options: { parseFrontmatter: true } })

  return { source, metadata: frontmatter, content }
}
