import styled from "styled-components";

export const ProjectCard = styled.div`
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
`;

export const ProjectCardHeader = styled.div`
  display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
  .stage { font: 600 10px/1 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0.15em; text-transform: uppercase; color: var(--leaf); }
  .status { font: 400 11px/1 'JetBrains Mono', ui-monospace, monospace; color: var(--muted); }
`;

export const ProjectCardTitle = styled.h3`
  font: 700 22px/1.2 'Inter', sans-serif;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
  .version { font: 400 14px/1 'JetBrains Mono', ui-monospace, monospace; color: var(--muted); margin-left: 8px; }
`;

export const ProjectScreenshot = styled.img`
  width: 100%;
  border-radius: 6px;
  border: 1px solid var(--border);
  margin-bottom: 18px;
  display: block;
`;

export const PillGroup = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
  span { font: 400 12px/1 'JetBrains Mono', ui-monospace, monospace; color: var(--label); background: var(--bg); border: 1px solid var(--border); border-radius: 4px; padding: 5px 10px; }
`;
