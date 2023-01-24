

import Head from 'next/head';
import App from 'next/app';
import { WistiaProvider } from '@wistia/react-embeds';

export default class ExampleApp extends App {
  static getInitialProps(opts) {
    const {
      ctx: { req },
      router,
    } = opts;
    let href;

    if (opts.ctx.req) {
      ({ href } = new URL(`http://${req.headers.host}${router.asPath}`));
    } else {
      href = location.href;
    }

    return { ...super.getInitialProps(opts), href };
  }

  render() {
    const { Component, href, pageProps, wistia = {} } = this.props;

    return (
      <WistiaProvider context={wistia} href={href}>
        <Component {...pageProps} />
      </WistiaProvider>
    );
  }
}