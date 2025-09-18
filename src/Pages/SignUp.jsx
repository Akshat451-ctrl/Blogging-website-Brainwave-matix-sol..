export default function Signup() {
  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button className="w-full bg-green-600 text-white p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}
