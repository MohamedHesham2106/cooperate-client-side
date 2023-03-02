import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head></Head>
      <body>
        <div id='overlay'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
