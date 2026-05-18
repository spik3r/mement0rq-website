import HeroRoot, { HeroH1, LeafPrefix, Tagline } from "../components/sections/Hero";
import { BlogComingSoon, TerminalBlock, PostRow, PostRowPlaceholder, PostList } from "../components/sections/Blog";

export default function Blog() {
  return (
    <>
      <HeroRoot $inline>
        <HeroH1 style={{ fontSize: 40 }}><LeafPrefix>/</LeafPrefix>blog</HeroH1>
        <Tagline style={{ marginBottom: 8 }}>Writeups, build notes, and lessons from the bench.</Tagline>
      </HeroRoot>

      <BlogComingSoon>
        <div className="badge">coming soon</div>
        <h3>Writeups and notes from the bench</h3>
        <p>Once I've got a handful of disclosed reports, I'll start writing them up here, plus build notes from Monstera.</p>
        <TerminalBlock>
          <span className="line"><span className="prompt">$</span> ls posts/</span>
          <span className="line" style={{ opacity: 0.5 }}>drwxr-xr-x  0 may  18  ./</span>
          <span className="line" style={{ opacity: 0.5 }}>drwxr-xr-x  0 may  18  ../</span>
          <span className="line"><span className="prompt">$</span> _</span>
        </TerminalBlock>
      </BlogComingSoon>

      <PostList>
        <PostRow href="/blog/getting-started">
          <div className="left"><span className="number">01</span><span className="title">Getting started with bug bounty: from bash scripts to building Monstera</span></div>
          <span className="meta">May 2026</span>
        </PostRow>
        <PostRowPlaceholder>
          <div className="left"><span className="number">02</span><span className="title">My first bounty: coming soon</span></div>
          <span className="meta"><span className="status">drafting</span></span>
        </PostRowPlaceholder>
      </PostList>
    </>
  );
}
