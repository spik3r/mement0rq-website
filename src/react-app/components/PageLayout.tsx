import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";

const PageRoot = styled.main`
  max-width: 1060px;
  margin: 0 auto;
  padding: 28px 32px 60px;
  width: 100%;
  flex: 1;
`;

const Topbar = styled.div`
  position: sticky;
  top: 16px;
  z-index: 10;
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 52px;
  padding: 12px 14px;
  background: color-mix(in srgb, var(--panel) 58%, transparent);
  backdrop-filter: blur(14px);
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  font: 500 15px/1 'JetBrains Mono', ui-monospace, monospace;
  color: var(--muted);

  @media (max-width: 640px) {
    position: static;
    gap: 8px;
    margin-bottom: 42px;
    padding: 10px 12px;
    font-size: 13px;
  }
`;

const StatusDot = styled.span`
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--leaf);
  box-shadow: 0 0 6px var(--leaf);
  flex-shrink: 0;
`;

const Breadcrumb = styled.span` color: var(--muted); `;
const FlexSpacer = styled.span` flex: 1; `;

const Nav = styled.nav`
  display: flex; gap: 18px;
  a { color: var(--label); text-decoration: none; transition: color 0.15s ease; }
  a:hover, a.active { color: var(--leaf); }

  @media (max-width: 640px) { gap: 12px; }
`;

const Footer = styled.footer`
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 0 0;
  border-top: 1px solid var(--border);
  font: 400 12px/1 'JetBrains Mono', ui-monospace, monospace;
  color: var(--muted);
  flex-wrap: wrap; gap: 12px;
  .prompt { color: var(--leaf); }
  a { color: var(--accent); text-decoration: none; &:hover { color: var(--leaf); } }
`;

export default function PageLayout() {
  return (
    <PageRoot>
      <Topbar>
        <StatusDot />
        <span><Breadcrumb>~/</Breadcrumb>mement0rq</span>
        <FlexSpacer />
        <Nav>
          <NavLink to="/" end>home</NavLink>
          <NavLink to="/resources">resources</NavLink>
          <NavLink to="/blog">blog</NavLink>
        </Nav>
      </Topbar>
      <Outlet />
      <Footer>
        <span><span className="prompt">$</span> cat ~/readme.md</span>
        <span><a href="/">back home</a></span>
      </Footer>
    </PageRoot>
  );
}
