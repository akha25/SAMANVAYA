"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, Award, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const MOCK_POSTS = [
  { id: 1, user: "Alex M.", avatar: "A", content: "Just hit a new PR on deadlifts! 120kg feeling good! 💪🔥", likes: 24, comments: 5, time: "2 hours ago" },
  { id: 2, user: "Sarah J.", avatar: "S", content: "Made a high-protein vegan lentil bowl today. Hit my macros perfectly! 🥗", likes: 45, comments: 12, time: "5 hours ago" },
];

const MOCK_BLOGS = [
  { slug: "5-tips-for-better-sleep", title: "5 Tips for Better Sleep & Recovery", category: "Wellness", readTime: 4, cover: "🌙" },
  { slug: "high-protein-breakfast-ideas", title: "High Protein Breakfast Ideas", category: "Recipes", readTime: 3, cover: "🍳" },
  { slug: "understanding-hypertrophy", title: "Understanding Muscle Hypertrophy", category: "Workout", readTime: 7, cover: "🏋️‍♂️" },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed");
  const [newPost, setNewPost] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const handlePost = () => {
    if (!newPost) return;
    alert("Post created!");
    setNewPost("");
  };

  const handleCreateBlog = () => {
    if (!blogTitle || !blogContent) return;
    alert("Blog published!");
    setBlogTitle("");
    setBlogContent("");
    setActiveTab("blog");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Community Hub</h1>
        <div className="space-x-2">
          <Button variant={activeTab === "feed" ? "default" : "outline"} onClick={() => setActiveTab("feed")} className={activeTab === "feed" ? "bg-blue-600 text-slate-800" : "border-slate-200 text-slate-600"}>Feed</Button>
          <Button variant={activeTab === "blog" ? "default" : "outline"} onClick={() => setActiveTab("blog")} className={activeTab === "blog" ? "bg-blue-600 text-slate-800" : "border-slate-200 text-slate-600"}>Blog</Button>
          <Button variant={activeTab === "create-blog" ? "default" : "outline"} onClick={() => setActiveTab("create-blog")} className={activeTab === "create-blog" ? "bg-blue-600 text-slate-800" : "border-slate-200 text-slate-600"}>Write Article</Button>
          <Button variant={activeTab === "success" ? "default" : "outline"} onClick={() => setActiveTab("success")} className={activeTab === "success" ? "bg-blue-600 text-slate-800" : "border-slate-200 text-slate-600"}>Success Stories</Button>
        </div>
      </div>

      {activeTab === "feed" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="bg-white border-slate-100 text-slate-800">
              <CardContent className="pt-6">
                <textarea 
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your progress, a meal, or a workout update..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                />
                <div className="flex justify-between items-center mt-3">
                  <Button variant="outline" size="sm" className="border-slate-200 text-slate-600">📷 Add Photo</Button>
                  <Button onClick={handlePost} className="bg-blue-600 hover:bg-blue-700">Post Update</Button>
                </div>
              </CardContent>
            </Card>

            {/* Feed Posts */}
            <div className="space-y-4">
              {MOCK_POSTS.map(post => (
                <Card key={post.id} className="bg-white border-slate-100 text-slate-800">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-slate-800">
                      {post.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-md">{post.user}</CardTitle>
                      <CardDescription className="text-xs text-slate-400">{post.time}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{post.content}</p>
                  </CardContent>
                  <CardFooter className="border-t border-slate-100 pt-3 flex gap-6 text-slate-500">
                    <button className="flex items-center gap-1 text-sm hover:text-blue-500 transition-colors"><Heart size={16}/> {post.likes}</button>
                    <button className="flex items-center gap-1 text-sm hover:text-blue-500 transition-colors"><MessageCircle size={16}/> {post.comments}</button>
                    <button className="flex items-center gap-1 text-sm hover:text-blue-500 transition-colors"><Share2 size={16}/> Share</button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-slate-100 text-slate-800 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Award className="text-yellow-500"/> Weekly Leaderboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">1. Sarah J.</span>
                  <span className="text-sm text-slate-500">5 Workouts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">2. Mike R.</span>
                  <span className="text-sm text-slate-500">4 Workouts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-500">3. You</span>
                  <span className="text-sm text-blue-500">3 Workouts</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "blog" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BLOGS.map(blog => (
            <Card key={blog.slug} className="bg-white border-slate-100 text-slate-800 flex flex-col">
              <div className="h-32 bg-slate-50 flex items-center justify-center text-4xl rounded-t-xl">
                {blog.cover}
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs px-2 py-1 bg-slate-50 text-slate-600 rounded-full">{blog.category}</span>
                  <span className="text-xs text-slate-400">{blog.readTime} min read</span>
                </div>
                <CardTitle className="text-lg line-clamp-2 leading-tight">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-slate-500 line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/community/blog/${blog.slug}`} className="w-full">
                  <Button variant="outline" className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                    Read Article <ArrowUpRight size={16}/>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "create-blog" && (
        <Card className="bg-white border-slate-100 text-slate-800">
          <CardHeader>
            <CardTitle>Write a Blog Post</CardTitle>
            <CardDescription className="text-slate-500">Share your knowledge with the Samanvaya community.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Article Title" 
              value={blogTitle} 
              onChange={(e) => setBlogTitle(e.target.value)}
              className="bg-slate-50 border-slate-200 font-bold text-lg"
            />
            <div className="bg-white text-black rounded-md overflow-hidden">
              <ReactQuill 
                theme="snow" 
                value={blogContent} 
                onChange={setBlogContent} 
                className="h-64"
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image'],
                    ['clean']
                  ],
                }}
              />
            </div>
            {/* Extra space because ReactQuill is 64h */}
            <div className="h-12"></div>
            <Button onClick={handleCreateBlog} className="w-full bg-blue-600 hover:bg-blue-700">Publish Article</Button>
          </CardContent>
        </Card>
      )}

      {activeTab === "success" && (
        <Card className="bg-white border-slate-100 text-slate-800">
          <CardHeader>
            <CardTitle>Success Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex gap-4 mb-4">
                  <div className="w-1/2 h-40 bg-slate-100 rounded-md flex items-center justify-center text-slate-400">Before</div>
                  <div className="w-1/2 h-40 bg-slate-100 rounded-md flex items-center justify-center text-slate-400">After</div>
                </div>
                <h3 className="font-bold text-lg">Mark lost 15kg in 6 months!</h3>
                <p className="text-sm text-slate-500 mt-2">"Using the calorie tracker and standard home workouts changed my life..."</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
