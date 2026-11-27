import { useEffect, type ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import PageLayout from "./components/PageLayout";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AiReconPost from "./pages/AiReconPost";
import { pages, type PageId } from "./site-model";

const views = {
  Home: <Home />,
  Resources: <Resources />,
  Blog: <Blog />,
  AiRecon: <AiReconPost />,
  GettingStarted: <BlogPost />,
} satisfies Record<PageId, ReactElement>;

function Page({ id }: { id: PageId }) {
  const { title, description } = pages[id];
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
  return views[id];
}

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            {(Object.keys(views) as PageId[]).map((id) => (
              <Route key={id} path={pages[id].path} element={<Page id={id} />} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
