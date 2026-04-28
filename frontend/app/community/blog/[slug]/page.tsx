import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  params: { slug: string }
};

// Next.js dynamic metadata generation for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  // In a real app, fetch the blog title/description from the backend using the slug
  return {
    title: `${slug.replace(/-/g, ' ').toUpperCase()} | Samanvaya Blog`,
    description: `Read the latest insights on ${slug.replace(/-/g, ' ')} on Samanvaya.`,
  };
}

export default function BlogPostPage({ params }: Props) {
  // Mock blog data
  const blog = {
    title: params.slug.replace(/-/g, ' ').toUpperCase(),
    content: `
      <h2>The Importance of Recovery</h2>
      <p>When you exercise, you are actually creating micro-tears in your muscle fibers. It is during periods of rest and recovery that your body repairs these tears, making the muscles stronger and larger than before.</p>
      <br/>
      <h2>Nutrition Matters</h2>
      <p>Protein is the building block of muscle. Ensure you are getting enough protein in your diet to support your recovery. Carbohydrates are also important as they replenish your glycogen stores.</p>
      <br/>
      <blockquote>"Rest is not a waste of time, it's an investment in your performance."</blockquote>
    `,
    category: "Wellness",
    readTime: 5,
    author: "Samanvaya Team",
    publishedAt: "Oct 24, 2026"
  };

  const shareUrl = `https://samanvaya.com/community/blog/${params.slug}`;
  const shareText = `Check out this article: ${blog.title}`;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <Link href="/community" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft size={16} /> Back to Community
      </Link>

      <div className="space-y-4 border-b border-slate-100 pb-8">
        <div className="flex gap-2 text-sm text-slate-500">
          <span className="text-blue-500 font-medium">{blog.category}</span>
          <span>•</span>
          <span>{blog.readTime} min read</span>
          <span>•</span>
          <span>{blog.publishedAt}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-800">{blog.title}</h1>
        <p className="text-slate-500">Written by <span className="text-slate-800 font-medium">{blog.author}</span></p>
      </div>

      {/* Rich Text Rendering */}
      <div 
        className="prose prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-500"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="border-t border-slate-100 pt-8 mt-12 flex items-center justify-between">
        <div className="font-bold text-lg">Share this article</div>
        <div className="flex gap-2">
          {/* WhatsApp Share */}
          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`} target="_blank" rel="noreferrer">
            <Button variant="outline" size="icon" className="border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#25D366]">
              <MessageCircle size={18} />
            </Button>
          </a>
          {/* Twitter Share */}
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">
            <Button variant="outline" size="icon" className="border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#1DA1F2]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </Button>
          </a>
          {/* LinkedIn Share */}
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">
            <Button variant="outline" size="icon" className="border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#0A66C2]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
