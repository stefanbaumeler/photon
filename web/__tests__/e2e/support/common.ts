import { test } from '@playwright/test'
import { seed } from '../../../../api/seed/seed'
// import { useTestQuery } from '../../../../api/__tests__/utility'

export const globalBeforeEach = () => {
    test.beforeEach(async ({ page }) => {
        page.on('console', (message) => {
            if (message.type() === 'error') {
                console.log(process.env.NODE_ENV, message.text(), message.type(), message.location())
            }
        })

        await seed('test')

        // await page.route('**/graphql', async (route, request) => {
        //     const graphqlRequest = request.postDataJSON()
        //
        //     if (graphqlRequest) {
        //         const albumsQuery = await useTestQuery(graphqlRequest.query, graphqlRequest.variables)
        //
        //         await route.fulfill({
        //             json: albumsQuery.body.singleResult
        //         })
        //     }
        // })
    })

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            // Get a unique place for the screenshot.
            const screenshotPath = testInfo.outputPath('failure.png')
            // Add it to the report.
            testInfo.attachments.push({
                name: 'screenshot',
                path: screenshotPath,
                contentType: 'image/png'
            })
            // Take the screenshot itself.
            await page.screenshot({
                path: screenshotPath,
                timeout: 5000
            })
        }
    })
}
