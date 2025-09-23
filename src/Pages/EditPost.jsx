import { useParams,Link } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Post {id}</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Updated Title"
          defaultValue="Sample Blog Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Updated Content"
          rows="6"
          defaultValue="This is the updated content of the blog post."
          className="w-full p-2 border rounded"
        ></textarea>
        <button className="w-full bg-green-600 text-white p-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  );
}
