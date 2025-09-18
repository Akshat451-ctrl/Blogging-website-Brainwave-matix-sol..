import { useParams, Link } from "react-router-dom";

export default function PostView() {
  const { id } = useParams();

  // Dummy post data
  const post = { id, title: "Sample Blog Post", content: "This is the full content of the blog post." };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.content}</p>

      <div className="flex justify-between">
        <Link to={`/edit/${post.id}`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Edit Post
        </Link>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Delete Post
        </button>
      </div>
    </div>
  );
}
