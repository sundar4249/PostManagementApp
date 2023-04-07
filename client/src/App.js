// import './App.css';

import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/posts" element={<Blogs />} />
        <Route path="/my-posts" element={<UserBlogs />} />
        <Route path="/bolg-details/:id" element={<BlogDetails />} />
        <Route path="/create-posts" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route path="/mypost" /> */}
      </Routes>
    </>
  );
}

export default App;
