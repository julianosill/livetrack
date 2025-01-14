import { promises } from 'node:fs'
import path from 'node:path'

import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc'

async function getMdxContent<T>(slug: string) {
  const filePath = path.join(process.cwd(), 'src/mdx/docs', `${slug}.mdx`)
  const source = await promises.readFile(filePath, 'utf-8')
  const { frontmatter, content } = await compileMDX<T>({ source, options: { parseFrontmatter: true } })
  return { source, frontmatter, content }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { frontmatter } = await getMdxContent<{ title: string }>(params.slug)
  return { title: frontmatter.title }
}

export default async function TermsPage({ params }: { params: { slug: string } }) {
  const { source } = await getMdxContent<{ title: string }>(params.slug)
  const split = source.split('---')

  return (
    <main className='prose dark:prose-invert'>
      <MDXRemote source={split[2]} />
    </main>
  )
}
