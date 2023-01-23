import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 html, body, div, span, applet, object, iframe,
 h1, h2, h3, h4, h5, h6, p, blockquote, pre,
 a, abbr, acronym, address, big, cite, code,
 del, dfn, em, img, ins, kbd, q, s, samp,
 small, strike, strong, sub, sup, tt, var,
 b, u, i, center,
 dl, dt, dd, ol, ul, li,
 fieldset, form, label, legend,
 table, caption, tbody, tfoot, thead, tr, th, td,
 article, aside, canvas, details, embed, 
 figure, figcaption, footer, header, hgroup, 
 menu, nav, output, ruby, section, summary,
 time, mark, audio, video {
     margin: 0;
     padding: 0;
     border: 0;
     font-size: 100%;
     font: inherit;
     vertical-align: baseline;
     font-family: "Raleway";
     font-style: normal;
 }
 
 article, aside, details, figcaption, figure, 
 footer, header, hgroup, menu, nav, section {
     display: block;
 }
 body {
     line-height: 1;
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
 table {
     border-collapse: collapse;
     border-spacing: 0;
 }
 *{
    overflow-x: hidden;
    font-family: "Raleway";
    font-style: normal;
    overflow-y: hidden;
 }
 input{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    box-sizing: border-box;
    padding:2%;
    :disabled{
        background-color: #f2f2f2;
      }
    ::placeholder {
        font-family: 'Raleway';
        color: #000000;
      }
 }

 input:focus, textarea:focus, select:focus {
    outline-offset: 0px !important;
    outline: none !important;
    }

 button{
    font-family: 'Raleway';
    font-weight: 700;
    :disabled{
        filter: opacity(70%);
      }
 }
 ::-webkit-scrollbar {
    display: none;
}
}
`;
export default GlobalStyle;
