import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ Please login first!");
        return;
      }

      const res = await axios.post(
  "http://localhost:5000/api/posts",
 { title, body }, // authorId backend se req.user.id se lega
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ token attach
    },
  }
);


      if (res.status === 201) {
        alert("✅ Post published successfully!");
        navigate("/"); // redirect to Home
      }
    } catch (error) {
      console.error("Error publishing post:", error);
      alert(error.response?.data?.error || "❌ Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow mt-20">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Post Content"
          rows="6"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
