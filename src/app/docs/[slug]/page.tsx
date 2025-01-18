import { Markdown, PageHeader } from '@/components'
import { extractMdxData } from '@/helpers'

interface DocsPageProps {
  params: { slug: string }
}

interface DocsMdxData {
  title: string
  updatedAt: string
  content: string
}

export async function generateMetadata({ params }: Readonly<DocsPageProps>) {
  const { metadata } = await extractMdxData<DocsMdxData>(params.slug)
  return { title: metadata.title }
}

export default async function DocsPage({ params }: Readonly<DocsPageProps>) {
  const { content, metadata } = await extractMdxData<DocsMdxData>(params.slug)

  return (
    <main>
      <PageHeader.Root className='pb-6'>
        <PageHeader.Title>{metadata.title}</PageHeader.Title>
        <PageHeader.Description>Última atualização: {metadata.updatedAt}</PageHeader.Description>
      </PageHeader.Root>

      <Markdown>{content}</Markdown>
    </main>
  )
}
