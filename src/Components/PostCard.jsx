import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800">
        <Link to={`/post/${post.id}`} className="hover:text-blue-600 transition">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 mt-2 line-clamp-3">
        {post.content}
      </p>
      <p className="text-sm text-gray-500 mt-3">By {post.author?.username ||"unknown"}</p>
    </div>
  );
};

export default PostCard;