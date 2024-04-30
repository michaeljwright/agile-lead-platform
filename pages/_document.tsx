import
Document,
{
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'
import { getCssText } from 'stitches.config'
import { Theme } from '@radix-ui/themes'

class MyDocument extends Document {
  static async getInitialProps (
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render () {
    return (
      <Html lang="en">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </Head>
        <body>
          <Theme>
            <Main />
            <NextScript />
          </Theme>
        </body>
      </Html>
    )
  }
}

export default MyDocument
