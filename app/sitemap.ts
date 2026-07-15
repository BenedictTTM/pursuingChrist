import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.pursuingchrist.space'

  // Fetch dynamic blog posts
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { id: true, updatedAt: true },
  })

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/#about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/#contact`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
  ]

  return [...staticUrls, ...blogUrls]
}
