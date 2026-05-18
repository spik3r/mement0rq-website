import { Link } from "react-router-dom";
import HeroRoot, { HeroH1, LeafPrefix, Tagline } from "../components/sections/Hero";
import { BlogPostBlock, BlogPostDate, BlogPostTitle, BlogPostBody } from "../components/blocks/BlogPost";

export default function BlogPost() {
  return (
    <>
      <HeroRoot $inline>
        <HeroH1 style={{ fontSize: 32, lineHeight: 1.3 }}><LeafPrefix>/</LeafPrefix>Getting started with bug bounty</HeroH1>
        <Tagline style={{ marginBottom: 4 }}>From bash scripts to building Monstera: the messy, frustrating, addictive path into offensive security.</Tagline>
      </HeroRoot>

      <BlogPostBlock>
        <BlogPostDate>May 2026 · ~5 min read</BlogPostDate>
        <BlogPostTitle>Getting started with bug bounty: from bash scripts to building Monstera</BlogPostTitle>
        <BlogPostBody>
          <p>I knew better than to just spin up Zap in attack mode. A few years ago at work, some external security training had mentioned it, along with a warning that automated scanners generate noise and burn through rate limits fast. The training also covered Nuclei for template-based scanning, and I'd ended up using Subfinder and a few other ProjectDiscovery tools from a defensive perspective, checking our own attack surface before someone else did. So when I decided to try bug bounty, I at least knew the names of the tools. What I didn't know was how to chain them together into something that actually found bugs.</p>

          <h4>Installing everything that looked useful</h4>
          <p>Like everyone else, I started by installing every recon tool that looked useful. <code>subfinder</code>, <code>httpx</code>, <code>nuclei</code>, <code>ffuf</code>, <code>katana</code>. My terminal looked like a hacker movie. I'd pick a target, run subfinder, pipe the results through httpx, dump them into nuclei, and stare at the output wondering what half of it meant.</p>

          <h4>Scripting the boring parts</h4>
          <p>The real frustration was the repetitive typing. Every target meant running the same five commands in the same order, copying file paths between them. So I wrote a bash script that grew to 200 lines of hardcoded tool paths, fragile temp files, and zero error handling. When httpx failed silently, everything downstream got garbage input.</p>

          <pre>{`<span class="c1">#!/bin/bash</span>
<span class="c1"># seed.sh -- 200 lines of fragile glory</span>

<span class="kw">TARGET</span>="$1"
<span class="kw">OUTDIR</span>=~/bounty/"$TARGET"

mkdir -p "$OUTDIR"

<span class="c1"># Step 1: find subdomains</span>
subfinder -d "$TARGET" -o "$OUTDIR/subs.txt"

<span class="c1"># Step 2: check which ones are alive</span>
cat "$OUTDIR/subs.txt" \\
  | httpx -sc -title -tech-detect \\
  | tee "$OUTDIR/live.txt"

<span class="c1"># Step 3: scan for known vulns</span>
nuclei -l "$OUTDIR/live.txt" -o "$OUTDIR/nuclei.txt"

<span class="c1"># ... then someone mentioned Monstera</span>`}</pre>

          <h4>The duplicate gauntlet</h4>
          <p>My first three reports were duplicates. Not great, but I expected some of that. Then my fourth was also a duplicate, but the program thanked me and gave me +2 reputation. That felt like progress. Someone was actually reading my work.</p>
          <p>Report five was a duplicate. Report six was a duplicate too, and this time it came with <strong>minus five reputation</strong>. I got a reputation penalty on HackerOne for submitting a duplicate even though the original report wasn't public yet, so there was no way I could've known it existed. The system isn't perfect, and sometimes it punishes you for bad luck.</p>
          <p>What followed was three more duplicates that mercifully didn't cost me any rep, then a message saying my signal was too low and I needed to wait before submitting more reports. They really don't make it easy for newcomers. And I thought StackOverflow was bad.</p>

          <h4>Building Monstera</h4>
          <p>After one too many rounds of duct-taping bash scripts, I realised I needed something better: a terminal UI for chaining recon tools with profiles, dependencies between steps, and a dashboard. That's how Monstera started. It's still in alpha, but it's already saved me hours of repetitive terminal commands.</p>

          <h4>You need to love the game</h4>
          <p>Bug bounty is hard. You'll write solid reports that get marked as duplicates. You'll question whether the time investment makes sense. The difference between people who stick with it and people who don't isn't skill. It's whether you enjoy the hunt itself. I'm still early in this journey, but breaking into something you're not supposed to access, even just a dev environment with an .env file exposed, gives you a dopamine hit that's hard to replicate.</p>
          <p>You need to love the game, because the game does not love you back. It takes time, it takes effort, and it absolutely does not care that you used to be a senior engineer somewhere. But if you show up consistently, the skill compounds. And eventually, the bounties do too.</p>

          <p style={{ marginTop: 32, fontSize: 13, color: "var(--muted)" }}>
            <Link to="/blog" className="inline">back to blog</Link>
          </p>
        </BlogPostBody>
      </BlogPostBlock>
    </>
  );
}
