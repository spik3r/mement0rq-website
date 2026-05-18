import HeroRoot, { HeroH1, LeafPrefix, Tagline } from "../components/sections/Hero";
import SectionRoot, { SectionHeading, MutedText } from "../components/sections/Section";
import { ResourceGrid, ResourceCard, ResourceBody, ResourceTitle, ResourceDescription, OutboundArrow } from "../components/blocks/Resource";
import { Badge } from "../components/blocks/Badge";

const learning = [
  { title: "PortSwigger Web Security Academy", tag: "academy", desc: "Free, structured, hands-on. The single best entry point to web vulns. Do the labs.", url: "https://portswigger.net/web-security" },
  { title: "OWASP WSTG", tag: "spec", desc: "The vendor-neutral checklist of how to test a web app. Reference-grade.", url: "https://owasp.org/www-project-web-security-testing-guide/" },
  { title: "HackTricks", tag: "wiki", desc: "The 'how do I exploit X?' reference. Searchable, opinionated, updated often.", url: "https://book.hacktricks.wiki/" },
  { title: "PayloadsAllTheThings", tag: "repo", desc: "Payload and bypass cookbook. Cite it once and you'll have it bookmarked forever.", url: "https://github.com/swisskyrepo/PayloadsAllTheThings" },
];

const writeups = [
  { title: "HackerOne Hacktivity", tag: "feed", desc: "Filter by program or severity to find disclosed reports worth dissecting.", url: "https://hackerone.com/hacktivity" },
  { title: "Pentester Land list", tag: "index", desc: "Massive aggregator of public writeups, indexed by vuln class.", url: "https://pentester.land/list-of-bug-bounty-writeups.html" },
  { title: "Infosec Writeups", tag: "blog", desc: "Newer hunters publish here often. Quality varies; the gems are worth it.", url: "https://infosecwriteups.com/" },
  { title: "PortSwigger Research", tag: "research", desc: "Where new web attack classes get born. Read the originals.", url: "https://portswigger.net/research" },
];

const tools = [
  { title: "Caido", tag: "proxy", desc: "Modern web security proxy. Snappier than the alternatives, great workflow features, and actively developed. Start here.", url: "https://caido.io/" },
  { title: "subfinder", tag: "recon", desc: "Passive subdomain enumeration. The first tool I run, every time.", url: "https://github.com/projectdiscovery/subfinder" },
  { title: "httpx", tag: "probe", desc: "Fast HTTP probing. Status, title, tech, redirects, screenshots in one pass.", url: "https://github.com/projectdiscovery/httpx" },
  { title: "Monstera", tag: "orchestra", desc: "Terminal UI for chaining recon tools into pipelines. Built because I got tired of copy-pasting file paths between bash scripts.", url: "https://github.com/mement0rq/monstera" },
];

const community = [
  { title: "HackerOne · programmes", tag: "platform", desc: "Where most public programmes live. Sort by bounty, filter by scope.", url: "https://hackerone.com/opportunities/all" },
  { title: "Bugcrowd · engagements", tag: "platform", desc: "Worth running side-by-side with H1. Different programmes, different scope.", url: "https://bugcrowd.com/engagements" },
  { title: "LiveOverflow", tag: "youtube", desc: "Deep, calm, technical. Great for building intuition over time.", url: "https://www.youtube.com/@LiveOverflow" },
  { title: "NahamSec", tag: "youtube", desc: "Bug bounty workflow and interviews with top hunters. Practical.", url: "https://www.youtube.com/@NahamSec" },
];

function ResourceList({ items }: { items: typeof learning }) {
  return (
    <ResourceGrid>
      {items.map((r) => (
        <ResourceCard key={r.title} href={r.url} target="_blank" rel="noopener">
          <ResourceBody>
            <ResourceTitle>{r.title} <Badge>{r.tag}</Badge></ResourceTitle>
            <ResourceDescription>{r.desc}</ResourceDescription>
          </ResourceBody>
          <OutboundArrow>↗</OutboundArrow>
        </ResourceCard>
      ))}
    </ResourceGrid>
  );
}

export default function Resources() {
  return (
    <>
      <HeroRoot $inline>
        <HeroH1 style={{ fontSize: 40 }}><LeafPrefix>/</LeafPrefix>resources</HeroH1>
        <Tagline style={{ marginBottom: 8 }}>A bookmark dump for fellow new hunters. These are the things that taught me the most. Curated, not exhaustive.</Tagline>
      </HeroRoot>

      <SectionRoot>
        <SectionHeading>tools · what I actually run</SectionHeading>
        <MutedText>
          If you're new, just install Caido and learn to use it well. Don't go overboard
          with plugins or toolchains. A proxy and a browser is all you need to find your
          first bug. Add tools when they solve a specific problem, not because a blog post
          told you to.
        </MutedText>
        <ResourceList items={tools} />
      </SectionRoot>

      <SectionRoot>
        <SectionHeading>learning · the foundation</SectionHeading>
        <MutedText>If I were starting over, I'd go through these in order before submitting a single report.</MutedText>
        <ResourceList items={learning} />
      </SectionRoot>

      <SectionRoot>
        <SectionHeading>writeups · how good hunters think</SectionHeading>
        <MutedText>Reading writeups taught me more than any course. Steal patterns, then make them yours.</MutedText>
        <ResourceList items={writeups} />
      </SectionRoot>

      <SectionRoot>
        <SectionHeading>community · where the good takes are</SectionHeading>
        <ResourceList items={community} />
      </SectionRoot>
    </>
  );
}
