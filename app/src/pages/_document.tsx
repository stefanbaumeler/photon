import Document, { Html, Main, NextScript, Head as TheHead } from 'next/document'

class Doc extends Document {
    render () {
        return (
            <Html>
                <TheHead>
                </TheHead>
                <body className="body">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Doc
