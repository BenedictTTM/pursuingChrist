import SplitHero from "@/components/SplitHero";
import AnimatedBlob from "@/components/Animatedblob";
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
      <main className="flex min-h-screen flex-col relative">
        <SplitHero />
        <Blog posts={blogPosts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
