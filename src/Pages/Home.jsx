import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";
import { Skeleton } from "../components/ui/Skeleton";


export default function Home({ token }) {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const observer = useRef();

  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts?page=${page}&limit=6&search=${search}`
        );
        setPosts((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
        if (page === 1 && res.data.length > 0) {
          setFeaturedPost(res.data[0]);
        }
        setHasMore(res.data.length === 6);
      } catch (err) {
        setError("⚠️ Failed to fetch posts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [page, search, location]);

  // Infinite Scroll
  const lastPostRef = useRef();
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (lastPostRef.current) observer.current.observe(lastPostRef.current);
  }, [isLoading, hasMore]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Welcome to BlogSphere 🚀
          </motion.h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Share your ideas, discover stories, and connect with thinkers worldwide.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {token ? (
              <Link className="btn-primary" to="/create">
                ✍️ Write a Post
              </Link>
            ) : (
              <>
                <Link className="btn-primary" to="/register">
                  Join Now
                </Link>
                <Link className="btn-outline" to="/login">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Search */}
          <div className="mt-10 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="🔍 Search posts..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-xl shadow focus:ring-2 focus:ring-indigo-400 text-gray-800"
            />
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="container mx-auto py-4">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        </div>
      )}

      {/* Featured Post */}
      {featuredPost && !isLoading && (
        <section className="container mx-auto py-16 px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
            🌟 Featured Story
          </h2>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <div className="md:flex">
              <div className="p-8 md:w-2/3">
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                  <Link to={`/post/${featuredPost.id}`}>
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-4 text-lg">
                  {featuredPost.content}
                </p>
                <p className="text-sm text-gray-500">
                  ✍️ {featuredPost.author?.username || "Unknown"}
                </p>
              </div>
              <div className="md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                <img
                  src={`https://picsum.photos/400?random=${featuredPost.id}`}
                  alt="Featured"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Posts */}
      <section className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          📝 Latest Posts
        </h1>

        {isLoading && posts.length === 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-lg italic text-gray-500">
            No posts yet. Be the first one 🚀
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post, i) => {
              if (posts.length === i + 1) {
                return (
                  <div ref={lastPostRef} key={post.id}>
                    <PostCard post={post} />
                  </div>
                );
              } else {
                return <PostCard key={post.id} post={post} />;
              }
            })}
          </div>
        )}
      </section>
    </div>
  );
}
