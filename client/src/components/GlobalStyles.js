import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --font-body: 'inter', sans-serif;
    --padding-page: 34px;
    --background-color: white;
    --border-color: #F6F7FB;
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
      font-family: 'Inter', sans-serif;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 2;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

h1 {
  font-size: 36px;
  font-weight: 700;
  font-family: 'inter', sans-serif;
    color: #1A202C;
}

h2 {
  font-family: 'inter', sans-serif;
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #1A202C;
}

h3 {
  font-family: 'inter', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #1A202C;
}

h4 {
  font-family: 'inter', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #1A202C;
}

h5 {
  font-family: 'inter', sans-serif;
  font-size: 16px;
  color: #1A202C;
}

button {
  padding-left: 16px;
  padding-right: 16px;
  height: 40px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  background-color:  #00CC96;
  font-family: 'Inter', sans-serif;
  text-align: center;
  border-radius: 32px;
}
button:hover {
  transition: 0.25s;
  background-color: #1EB68D;
}
p,
a {
  text-decoration: none;
}
input {
  font-family: 'inter', sans-serif;
  font-size: 14px;
  border: 0.5px;
  border-radius: 2px solid #EEEFF4;
}
input:focus {
  outline: none;
}
textarea {
  font-family: 'inter', sans-serif;
  font-size: 14px;
}
`;
