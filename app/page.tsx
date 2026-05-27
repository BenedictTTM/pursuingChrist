import SplitHero from "@/components/SplitHero";
import BioExcerpt from "@/components/BioExcerpt";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import WhoAmI from "@/components/WhoAmI";
import Contact from "@/components/Contact";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      date: 'desc',
    },
    take: 6,
  });

  
  const blogPosts = posts.map((post) => ({
    ...post,
    category: post.category || "Uncategorized",
    date: post.date.toISOString(),
    image: post.image || "/dry.png", // Fallback image
    excerpt: post.excerpt || "",
    content: post.content || "",
  }));

  return (
    <>
      <main className="flex min-h-screen flex-col">
        <SplitHero />
        <section id="about">
          <WhoAmI />
        </section>
        <Blog posts={blogPosts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
