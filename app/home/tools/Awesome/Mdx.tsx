import { lazy, Suspense } from 'react'

const Mdx = ({ cat }: { cat: string }) => {
  return <Suspense fallback="loading..." />
}

export default Mdx
