import styled from "styled-components";

const HeroRoot = styled.header<{ $inline?: boolean }>`
  display: ${(p) => (p.$inline ? "block" : "flex")};
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-bottom: ${(p) => (p.$inline ? "64px" : "96px")};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
    margin-bottom: 54px;
  }
`;

export const HeroTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(36px, 7vw, 76px);
  margin-bottom: 14px;

  &:hover img {
    filter: drop-shadow(0 12px 28px rgba(158, 206, 106, 0.12));
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    justify-content: space-between;
    gap: 14px;
    margin-bottom: 0;
  }
`;

export const HeroContent = styled.div` flex: 1; min-width: 220px; `;

export const HeroH1 = styled.h1`
  font: 700 48px/1.1 'Inter', sans-serif;
  letter-spacing: -0.02em;
  margin: 0;
  white-space: nowrap;

  @media (max-width: 640px) { font-size: clamp(29px, 8vw, 35px); }
`;

export const LeafPrefix = styled.span` color: var(--leaf); `;

export const BlinkingCursor = styled.span`
  display: inline-block;
  width: 3px; height: 36px;
  background: var(--leaf);
  margin-left: 6px;
  vertical-align: middle;
  animation: blink 1s step-end infinite;
  @keyframes blink { 50% { opacity: 0; } }
`;

export const Tagline = styled.p`
  font: 400 15px/1.55 'Inter', sans-serif;
  color: var(--label);
  max-width: 520px;
  margin-bottom: 16px;
`;

export const MetaLine = styled.div`
  display: flex; gap: 20px;
  font: 500 12px/1 'JetBrains Mono', ui-monospace, monospace;
  color: var(--muted);
  flex-wrap: wrap;
  .marker { color: var(--leaf); margin-right: 5px; }
`;

export const Mascot = styled.img`
  width: 280px; height: 280px;
  object-fit: contain;
  flex-shrink: 0;
  transition: filter 0.18s ease, transform 0.18s ease;
  @media (max-width: 640px) {
    width: clamp(72px, 20vw, 92px); height: clamp(72px, 20vw, 92px);
  }
`;

export default HeroRoot;
