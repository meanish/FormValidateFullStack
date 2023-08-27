import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Home/Login";
import Register from "./pages/Home/Register";
import Blog from "./pages/Home/Blog";
import MyBlog from "./pages/Home/MyBlog";
import Update from "./pages/Home/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/*" element={<BlogRoutes />} />
          {/* //put other blog inside// */}
          <Route path="/myblog" element={<MyBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function BlogRoutes() {
  return (
    <Routes>
      {/* This is the  route for  creating newblog */}
      <Route path="/create" element={<Update />} />

      {/* This route handles /blog/update/:id */}
      <Route path="/update/:id" element={<Update />} />

      {/* This route handles /blog/:id */}
      <Route path="/:id" element={<Blog />} />
    </Routes>
  );
}
export default App;
