import PageHeading from "../components/PageHeading";
import { BlogIndexPanel, TerminalBlock, PostRow, PostRowPlaceholder, PostList } from "../components/sections/Blog";
import { articleDate, articles, pages } from "../site-model";

export default function Blog() {
  const published = articles.filter((article) => article.status === "published");
  return (
    <>
      <PageHeading page="Blog" />
      <BlogIndexPanel>
        <div className="badge">{published.length} published</div>
        <h2>Writeups and notes from the bench</h2>
        <TerminalBlock>
          <span className="line"><span className="prompt">$</span> ls posts/</span>
          {published.map((article) => (
            <span key={article.id} className="line">{pages[article.page].path.split("/").pop()}</span>
          ))}
        </TerminalBlock>
      </BlogIndexPanel>
      <PostList>
        {articles.map((article, i) => {
          const index = String(i + 1).padStart(2, "0");
          if (article.status === "published") {
            const page = pages[article.page];
            return (
              <PostRow key={article.id} to={page.path}>
                <div className="left"><span className="number">{index}</span><span className="title">{page.heading}</span></div>
                <time className="meta" dateTime={article.date}>{articleDate(article.date)}</time>
              </PostRow>
            );
          }
          return (
            <PostRowPlaceholder key={article.id}>
              <div className="left"><span className="number">{index}</span><span className="title">{article.title}</span></div>
              <span className="meta"><span className="status">drafting</span></span>
            </PostRowPlaceholder>
          );
        })}
      </PostList>
    </>
  );
}
