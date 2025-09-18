
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PostView from "./Pages/PostView";
import NewPost from "./Pages/NewPost";
import EditPost from "./Pages/EditPost";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">My Blog</h1>
      <div className="space-x-4">
        <a href="/" className="hover:underline">Home</a>
        <a href="/create" className="hover:underline">New Post</a>
        <a href="/login" className="hover:underline">Login</a>
        <a href="/signup" className="hover:underline">Signup</a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-6">
      <p>© {new Date().getFullYear()} Blogging Platform</p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/create" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
