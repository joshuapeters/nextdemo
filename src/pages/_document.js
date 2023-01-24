import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class ExampleDocument extends Document {
  static async getInitialProps(ctx) {
    const { renderPage } = ctx;
    const wistia = {};

    ctx.renderPage = ctx.renderPage.bind(ctx, {
      enhanceApp: (App) => (props) => <App {...props} wistia={wistia} />,
    });

    const props = await super.getInitialProps(ctx);

    try {
      const wistiaResult = await wistia.finalize();
      return { ...props, wistiaResult };
    } catch (err) {
      // If getInitialProps rejects, Next.js swallows the error(!) and proceeds
      // to render(). Since wistia SSR failing shouldn’t block rendering the
      // page, we’ll just return the original props and account for the
      // possibility of wistiaResult being undefined in render, but we also want
      // to log the error because it’s invisible otherwise.

      console.log(err);

      return props;
    }
  }

  render() {
    const { wistiaResult = {} } = this.props;

    if (wistiaResult.updateNextJsTitle) {
      wistiaResult.updateNextJsTitle(this.props.head);
    }

    return (
      <Html>
        <Head>{wistiaResult.head}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}