import { useState, useEffect, useCallback, useMemo } from "react";
import { blogCategories } from "../types";
import { useQuery } from "../hooks/useQuery";
import { getBlogPosts } from "../services/api";

/* ─── Icon Helpers ─── */
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const CalendarIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
);
const UserIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const ClockIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const EyeIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
);
const HeartIcon = ({ filled = false, size = 20 }: { filled?: boolean; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const ShareIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
);
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);
const TagIcon = ({ size = 14 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
);
const TrendingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const BookmarkIcon = ({ filled = false, size = 20 }: { filled?: boolean; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
);
const ArrowRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

/* ─── Blog Listing View ─── */
function BlogListing({ onSelectPost }: { onSelectPost: (slug: string) => void }) {
  const { data: blogPosts } = useQuery(getBlogPosts);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const allPosts = blogPosts ?? [];
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, allPosts]);

  const featuredPost = useMemo(() => allPosts.find((p) => p.trending), [allPosts]);

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-[hsl(var(--primary))]">
        {/* dot pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0px)", backgroundSize: "40px 40px" }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[hsl(var(--accent))] font-medium text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--accent))] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--accent))]" />
            </span>
            Eye Care Insights
          </span>
          <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto">
            Our Blog &amp; <span className="text-[hsl(var(--accent))]">Eye Health</span> Resources
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Expert articles, tips, and the latest in ophthalmology — helping you make informed decisions about your vision.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto pt-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon /></div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-0 bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[hsl(var(--accent))] outline-none shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute -bottom-px left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-15">
            <path d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 L1200,120 L0,120 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Category Filters ── */}
      <section className="bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[hsl(var(--primary))] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Post ── */}
      {selectedCategory === "All" && searchQuery === "" && featuredPost && (
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gray-50"
              onClick={() => onSelectPost(featuredPost.slug)}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--accent))] text-white text-xs font-semibold">
                    <TrendingIcon /> Trending
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center space-y-4">
                  <span className="text-[hsl(var(--accent))] font-semibold text-sm uppercase tracking-wider">{featuredPost.category}</span>
                  <h2 className="font-[Outfit] text-2xl md:text-3xl font-bold text-[hsl(var(--primary))] leading-tight group-hover:text-[hsl(var(--accent))] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-5 text-sm text-gray-500 pt-2">
                    <span className="flex items-center gap-1.5"><UserIcon /> {featuredPost.author}</span>
                    <span className="flex items-center gap-1.5"><CalendarIcon /> {featuredPost.date}</span>
                    <span className="flex items-center gap-1.5"><ClockIcon /> {featuredPost.readTime}</span>
                  </div>
                  <div className="pt-4">
                    <span className="inline-flex items-center gap-2 text-[hsl(var(--primary))] font-semibold group-hover:text-[hsl(var(--accent))] transition-colors text-sm">
                      Read Article <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Blog Grid ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          {selectedCategory === "All" && searchQuery === "" && (
            <div className="mb-10">
              <h2 className="font-[Outfit] text-2xl font-bold text-[hsl(var(--primary))]">All Articles</h2>
              <p className="text-gray-500 mt-1">Browse our latest eye care insights</p>
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                <SearchIcon />
              </div>
              <h3 className="font-[Outfit] text-xl font-bold text-gray-700 mb-2">No articles found</h3>
              <p className="text-gray-500">Try a different search term or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer relative"
                  onClick={() => onSelectPost(post.slug)}
                >
                  {/* Accent bar on hover */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[hsl(var(--accent))] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[hsl(var(--primary))] text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                    {post.trending && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-[hsl(var(--accent))] text-white text-xs font-semibold">
                        <TrendingIcon /> Trending
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-[Outfit] text-lg font-bold text-gray-900 group-hover:text-[hsl(var(--primary))] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><CalendarIcon size={12} /> {post.date.split(",")[0]}</span>
                        <span className="flex items-center gap-1"><ClockIcon size={12} /> {post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><EyeIcon size={12} /> {post.views.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><HeartIcon size={12} /> {post.likes}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ─── Blog Detail View ─── */
function BlogDetail({ slug, onBack }: { slug: string; onBack: () => void }) {
  const { data: blogPosts } = useQuery(getBlogPosts);

  const allPosts = blogPosts ?? [];
  const blog = useMemo(() => allPosts.find((b) => b.slug === slug), [slug, allPosts]);
  const relatedPosts = useMemo(
    () => (blog ? allPosts.filter((p) => p.id !== blog.id && p.category === blog.category).slice(0, 3) : []),
    [blog, allPosts]
  );

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(blog?.likes ?? 0);
  const [views] = useState(() => (blog ? blog.views + 1 : 0));
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareToast, setShareToast] = useState("");

  const estimatedReadingTime = useMemo(() => {
    if (!blog) return 0;
    return Math.ceil(blog.content.split(" ").length / 200);
  }, [blog]);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when detail opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const handleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  }, [isLiked]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: blog?.title, text: blog?.excerpt, url: window.location.href });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShareToast("Link copied!");
      setTimeout(() => setShareToast(""), 2500);
    }
  }, [blog]);

  const renderContent = useCallback(() => {
    if (!blog) return null;
    return blog.content.split("\n\n").map((section, i) => {
      if (section.startsWith("## ")) {
        return (
          <h2 key={i} className="font-[Outfit] text-2xl md:text-3xl font-bold text-[hsl(var(--primary))] mt-12 mb-4 leading-tight">
            {section.replace("## ", "")}
          </h2>
        );
      }
      return (
        <p key={i} className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
          {section}
        </p>
      );
    });
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center space-y-4">
          <h1 className="font-[Outfit] text-2xl font-bold text-gray-900">Article not found</h1>
          <button onClick={onBack} className="px-6 py-2 bg-[hsl(var(--primary))] text-white rounded-md font-medium">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Reading Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-60">
        <div
          className="h-full bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back Bar */}
      <div className="pt-24 pb-4 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-[hsl(var(--primary))] transition-colors font-medium text-sm">
            <ArrowLeftIcon /> Back to Blog
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-full transition-all ${isBookmarked ? "bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              title="Bookmark"
            >
              <BookmarkIcon filled={isBookmarked} size={18} />
            </button>
            <div className="relative">
              <button onClick={handleShare} className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all" title="Share">
                <ShareIcon size={18} />
              </button>
              {shareToast && (
                <div className="absolute top-full right-0 mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap shadow-lg">
                  {shareToast}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white pb-12">
        <div className="container mx-auto px-4 md:px-6 pt-8 max-w-5xl">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[hsl(var(--primary))] text-white">
              <TagIcon /> {blog.category}
            </span>
          </div>

          <h1 className="font-[Outfit] text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--primary))] leading-tight mb-8">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-gray-500 text-sm mb-10">
            <span className="flex items-center gap-1.5"><UserIcon size={18} /> <span className="font-medium text-gray-700">{blog.author}</span></span>
            <span className="flex items-center gap-1.5"><CalendarIcon size={16} /> {blog.date}</span>
            <span className="flex items-center gap-1.5"><ClockIcon size={16} /> {estimatedReadingTime} min read</span>
            <span className="flex items-center gap-1.5"><EyeIcon size={16} /> {views.toLocaleString()} views</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img src={blog.image} alt={blog.title} className="w-full h-64 md:h-112.5 object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Article */}
            <article className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-10 shadow-md">
              {renderContent()}

              {/* Tags */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <h3 className="font-[Outfit] text-lg font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium hover:bg-[hsl(var(--primary))] hover:text-white transition-all cursor-default"
                    >
                      #{tag.toLowerCase().replace(/\s/g, "")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engagement */}
              <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                    isLiked
                      ? "bg-[hsl(var(--accent))] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-[hsl(var(--accent))] hover:text-white"
                  }`}
                >
                  <HeartIcon filled={isLiked} size={18} />
                  <span>{likes.toLocaleString()}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[hsl(var(--primary))] text-white font-medium hover:opacity-90 transition-all shadow-md"
                >
                  <ShareIcon size={18} />
                  Share
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Reading Progress */}
              <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
                <h3 className="font-[Outfit] font-bold text-gray-900 mb-4">Reading Progress</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${scrollProgress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-500">{Math.round(scrollProgress)}%</span>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-[Outfit] font-bold text-gray-900 mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((post) => (
                        <button
                          key={post.id}
                          onClick={() => {
                            onBack();
                            // Small delay to let listing mount, then open detail
                            setTimeout(() => {
                              const event = new CustomEvent("openBlogPost", { detail: post.slug });
                              window.dispatchEvent(event);
                            }, 50);
                          }}
                          className="group flex gap-3 w-full text-left"
                        >
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-14 h-14 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">{post.readTime}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Main BlogPage Component ─── */
export default function BlogPage() {
  const { data: blogPosts } = useQuery(getBlogPosts);

  const [view, setView] = useState<"listing" | "detail">("listing");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const openPost = useCallback((slug: string) => {
    setSelectedSlug(slug);
    setView("detail");
  }, []);

  const goBack = useCallback(() => {
    setView("listing");
    setSelectedSlug(null);
  }, []);

  // Listen for related-post navigation events
  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent).detail;
      if (slug) openPost(slug);
    };
    window.addEventListener("openBlogPost", handler);
    return () => window.removeEventListener("openBlogPost", handler);
  }, [openPost]);

  return (
    <>
      {view === "detail" && selectedSlug ? (
        <BlogDetail slug={selectedSlug} onBack={goBack} />
      ) : (
        <BlogListing onSelectPost={openPost} />
      )}

      {/* Utility CSS */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </>
  );
}
