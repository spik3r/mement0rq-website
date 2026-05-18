import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import PageLayout from "./components/PageLayout";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="resources" element={<Resources />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/getting-started" element={<BlogPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
