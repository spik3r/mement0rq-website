import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #1A1B26;
    --panel: #1f2133;
    --border: #2f3347;
    --ink: #C0CAF5;
    --label: #A9B4DF;
    --muted: #737CAB;
    --leaf: #9ECE6A;
    --leaf-line: #9ECE6A33;
    --accent: #7AA2F7;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background:
      radial-gradient(circle at 0% 18%, rgba(158, 206, 106, 0.07), transparent 28%),
      radial-gradient(circle at 100% 8%, rgba(122, 162, 247, 0.06), transparent 30%),
      var(--bg);
    color: var(--ink);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  #root { min-height: 100vh; display: flex; flex-direction: column; }

  a.inline {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid var(--accent);
    &:hover { color: var(--leaf); border-color: var(--leaf); }
  }
`;

export default GlobalStyles;
