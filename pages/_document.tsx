import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='We offer high-quality services in web development, design, and digital marketing. Contact us to get started on your next project.'
        />
        <meta
          name='keywords'
          content='freelancing, web development, design, digital marketing, services'
        />
      </Head>
      <body>
        <div id='overlay'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
