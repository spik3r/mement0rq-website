import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import { articleDate, articles, pages, type PageId } from "../site-model";
import { BlogPostBlock, BlogPostDate, BlogPostBody } from "../components/blocks/BlogPost";

export default function AiReconPost() {
  const article = articles.find((entry) => entry.status === "published" && entry.page === "AiRecon");
  if (article?.status !== "published") throw new Error("AiRecon must have published metadata");
  return (
    <>
      <PageHeading page="AiRecon" article />

      <BlogPostBlock>
        <BlogPostDate><time dateTime={article.date}>{articleDate(article.date)}</time> · ~{article.readMinutes} min read</BlogPostDate>
        <BlogPostBody>
          <p>{"Early on, using AI for recon involved far too much of this:"}</p>

          <p>{"“Hang on. That looks interesting.”"}</p>

          <p>{"Followed very quickly by the general mood of: “OMG. WE FOUND SOMETHING.”"}</p>

          <p>{"We hadn’t. Or we’d found something, but it wasn’t the thing the model had decided it was. Still, off we went down another rabbit hole."}</p>

          <p>{"I say “we” because I was there too, happily believing the exciting version. I wanted to find a bug. The model sounded sure. That was a poor combination."}</p>

          <h4>{"One guess became the basis for the next"}</h4>

          <p>{"The frustrating part wasn’t always a made-up endpoint or some obvious nonsense. Often there was a real observation at the start. A strange response. A bit of configuration. Something that deserved a closer look."}</p>

          <p>{"Then came an explanation that sounded plausible. The next suggestion assumed that explanation was right. A few steps later, we were discussing the impact of a vulnerability we still hadn’t shown existed."}</p>

          <p>{"I’d stop and work backwards. What had the response actually told us? Which bits had we tested? Where had “might” quietly become “does”?"}</p>

          <p>{"Sometimes there was almost nothing left once I took the guesses out. Just a fairly ordinary response and a lot of time spent being excited about it."}</p>

          <p>{"That happened way too often at the start."}</p>

          <h4>{"I was helping it get carried away"}</h4>

          <p>{"When I’m interested in a lead, I want to keep pulling at it. Having an assistant ready with another explanation and another avenue to explore makes that very easy."}</p>

          <p>{"There’s always one more possibility. Maybe the error means something else. Maybe this other component is involved. Maybe we’re nearly there."}</p>

          <p>{"At some point, I need a reason to keep going beyond the fact that we’ve already spent ages on it. AI can keep producing suggestions long after I should have stopped for dinner."}</p>

          <p>{"And if I ask a question that already assumes there’s a bug, I shouldn’t be surprised when the answer starts from the same assumption."}</p>

          <h4>{"The newer models have calmed down"}</h4>

          <p>{"To be fair, this has got much better in my recent use. The newer models feel less eager to announce a finding and more willing to leave something uncertain. The whole conversation is calmer."}</p>

          <p>{"That’s my experience, rather than a benchmark of every model. But it’s a noticeable change from those early sessions where I felt like I had to keep asking whether we’d actually proved anything."}</p>

          <p>{"I still check. A calm answer can be wrong too. It’s just much easier to work through a lead when the assistant isn’t adding to my own urge to believe it."}</p>

          <h4>{"What I want from it now"}</h4>

          <p>{"I want help reading unfamiliar code, sorting through notes and spotting gaps in my reasoning. When something looks promising, I want a clear account of what we know and what we’re guessing."}</p>

          <p>{"“Nothing here so far” is a useful answer. So is “that behaviour looks intentional”. Both can save me an evening."}</p>

          <p>{"I still enjoy using AI for this work. I’m just less interested in how excited it sounds, and much more interested in whether the next step has a good reason behind it."}</p>

          <p>{"If we do find something, there’ll be plenty of time to get excited afterwards."}</p>
          <p style={{ marginTop: 32, fontSize: 13, color: "var(--muted)" }}>
            <Link to={pages[pages.AiRecon.parent as PageId].path} className="inline">back to blog</Link>
          </p>
        </BlogPostBody>
      </BlogPostBlock>
    </>
  );
}
