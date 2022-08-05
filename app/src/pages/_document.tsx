import Document, { Html, Main, NextScript, Head as TheHead } from 'next/document'

class Doc extends Document {
    render () {
        return (
            <Html>
                <TheHead>
                </TheHead>
                <body className="bg-gray-100 box-border h-screen">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Doc
