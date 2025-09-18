export default function NewPost() {
  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Post Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Post Content"
          rows="6"
          className="w-full p-2 border rounded"
        ></textarea>
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Publish
        </button>
      </form>
    </div>
  );
}
