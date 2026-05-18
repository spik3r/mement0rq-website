import mascotUrl from "../assets/mement0rqMascot.webp";
import tuiMockUrl from "../assets/monstera-tui-mock.png";
import HeroRoot, { HeroTopRow, HeroH1, LeafPrefix, BlinkingCursor, Mascot } from "../components/sections/Hero";
import SectionRoot, { SectionHeading, BodyText, MutedText, TextPanel } from "../components/sections/Section";
import { FocusGrid, FocusCard } from "../components/blocks/Focus";
import { ProjectCard, ProjectCardHeader, ProjectCardTitle, ProjectScreenshot, PillGroup } from "../components/blocks/Project";
import { ExternalLinks } from "../components/blocks/ExternalLink";

export default function Home() {
  return (
    <>
      <HeroRoot>
        <HeroTopRow>
          <HeroH1><LeafPrefix>@</LeafPrefix>mement0rq<BlinkingCursor /></HeroH1>
          <Mascot src={mascotUrl} alt="mement0rq mascot" />
        </HeroTopRow>
      </HeroRoot>

      <SectionRoot>
        <SectionHeading>about</SectionHeading>
        <TextPanel>
          <BodyText>Bug bounty hunter and security researcher. I spend most of my time on recon, pre-auth web bugs, and building small tools for the work I keep doing by hand.</BodyText>
          <BodyText>I'm a few months into bug bounty on HackerOne and Bugcrowd. My background is software engineering, but I moved into offensive security after one too many vulnerable APIs landed on my doorstep at work.</BodyText>
          <MutedText>Right now I'm focused on attack-surface discovery and web bugs. I write up what I learn as I go, and the <a className="inline" href="/blog">blog</a> is slowly getting there.</MutedText>
        </TextPanel>
      </SectionRoot>

      <SectionRoot>
        <SectionHeading>currently building</SectionHeading>
        <ProjectCard>
          <ProjectCardHeader>
            <span className="stage">private alpha</span>
            <span className="status">not yet public</span>
          </ProjectCardHeader>
          <ProjectCardTitle>Monstera <span className="version">v0.1.0-alpha</span></ProjectCardTitle>
          <BodyText style={{ maxWidth: "none" }}>A terminal UI for chaining recon and vulnerability tools. Profiles, plugin orchestration, and a launcher built for muscle memory, so I can spend time reading findings instead of wiring shell pipes. Still polishing it before I open-source it.</BodyText>
          <ProjectScreenshot src={tuiMockUrl} alt="Monstera TUI screenshot" />
          <PillGroup>
            <span>subfinder</span><span>dnsx</span><span>httpx</span><span>nuclei</span>
            <span>gowitness</span><span>subzy</span><span>+ 16 more</span>
          </PillGroup>
        </ProjectCard>
      </SectionRoot>

      <SectionRoot>
        <SectionHeading>focus</SectionHeading>
        <FocusGrid>
          <FocusCard><div className="label">01 · recon</div><h4>Attack-surface discovery</h4><p>Subdomain enum, asset correlation, TLS and cert pivots, S3/GCP bucket hunting.</p></FocusCard>
          <FocusCard><div className="label">02 · web</div><h4>Pre-auth web bugs</h4><p>Access control, IDOR, SSRF, broken auth, header confusion, and takeover bugs.</p></FocusCard>
          <FocusCard><div className="label">03 · tools</div><h4>Recon tooling</h4><p>Turning repeatable recon steps into workflows I can run without thinking about them.</p></FocusCard>
        </FocusGrid>
      </SectionRoot>

      <SectionRoot>
        <SectionHeading>elsewhere</SectionHeading>
        <ExternalLinks>
          <a href="https://hackerone.com/mement0rq" target="_blank" rel="noopener"><span className="name"><code>h1</code> HackerOne</span><span className="handle">@mement0rq ↗</span></a>
          <a href="https://bugcrowd.com/mement0rq" target="_blank" rel="noopener"><span className="name"><code>bc</code> Bugcrowd</span><span className="handle">@mement0rq ↗</span></a>
          <a href="https://github.com/mement0rq" target="_blank" rel="noopener"><span className="name"><code>gh</code> GitHub</span><span className="handle">@mement0rq ↗</span></a>
        </ExternalLinks>
      </SectionRoot>
    </>
  );
}
