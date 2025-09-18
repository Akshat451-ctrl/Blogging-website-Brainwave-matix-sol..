import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { ScaleLoader } from 'react-spinners';

export default function Home({ token }) {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:5000/api/posts?page=${page}&limit=6`)
      .then(res => {
        setPosts(prev => page === 1 ? res.data : [...prev, ...res.data]);
        if (page === 1 && res.data.length > 0) {
          setFeaturedPost(res.data[0]);
        }
        setHasMore(res.data.length === 6); // Assume limit=6; adjust based on backend
      })
      .catch(err => setError('Failed to fetch posts. Please try again.'))
      .finally(() => setIsLoading(false));
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in"
            aria-label="Welcome to BlogSphere"
          >
            Welcome to BlogSphere
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 opacity-90 animate-fade-in-delay">
            Unleash your creativity, share your stories, and connect with a global community of writers and readers.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {token ? (
              <Link
                to="/create"
                className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-100 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label="Write a new post"
              >
                Write a Post
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-100 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="Join BlogSphere"
                >
                  Join Now
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-indigo-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="Sign in to BlogSphere"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && !posts.length && (
        <div className="container mx-auto py-12 text-center">
          <ScaleLoader color="#4f46e5" height={50} />
          <p className="text-gray-600 mt-4">Loading posts...</p>
        </div>
      )}

      {/* Featured Post Section */}
      {featuredPost && !isLoading && (
        <section className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center animate-fade-in">
            Featured Story
          </h2>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto transform hover:scale-[1.02] transition duration-300">
            <div className="md:flex">
              <div className="p-8 md:p-10 md:w-2/3">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                  <Link
                    to={`/post/${featuredPost.id}`}
                    className="hover:text-indigo-600 transition"
                    aria-label={`Read ${featuredPost.title}`}
                  >
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-4 text-lg">
                  {featuredPost.content}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  By {featuredPost.author}
                </p>
                <Link
                  to={`/post/${featuredPost.id}`}
                  className="text-indigo-600 hover:underline font-medium"
                  aria-label={`Read more about ${featuredPost.title}`}
                >
                  Read More →
                </Link>
              </div>
              <div className="md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-lg italic">
                  [Image Placeholder]
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center animate-fade-in">
          Latest Posts
        </h1>
        {posts.length === 0 && !isLoading ? (
          <p className="text-gray-500 text-center text-lg italic">
            No posts yet. Be the first to share your story!
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
        {hasMore && !isLoading && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Load more posts"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
}