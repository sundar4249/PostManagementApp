// import './App.css';

import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom'
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route path="/mypost" /> */}
      </Routes>
    </>
  );
}

export default App;
