import { expect, Page, test } from '@playwright/test'
import { seed } from '../../../../api/prisma/seed'
import { useTestQuery } from '../../../../api/__tests__/utility'

export const globalBeforeEach = () => {
    test.beforeEach(async ({ page }) => {
        page.on('console', (message) => {
            if (message.type() === 'error') {
                console.log(process.env.NODE_ENV, message.text(), message.type(), message.location())
            }
        })

        await seed('test')

        await page.route('**/graphql', async (route, request) => {
            const graphqlRequest = request.postDataJSON()

            if (graphqlRequest) {
                const albumsQuery = await useTestQuery(graphqlRequest.query, graphqlRequest.variables)

                await route.fulfill({
                    json: albumsQuery.body.singleResult
                })
            }
        })
    })
}

export const openDetails = async (page: Page, provideIds = false) => {
    const ids = []

    if (provideIds) {
        await expect.poll(async () => await page.getByTestId('teaser-image').count()).toBeGreaterThan(0)

        const images = await page.getByTestId('teaser-image').elementHandles()

        for (const el of images) {
            const src = await el.getAttribute('src')
            const split = src.split(/[/?]/g)
            const id = split[split.length - 2]
            ids.push(id)
        }
    }

    await page.getByTestId('teaser').first().click()

    await expect(await page.getByTestId('details')).toBeVisible()

    return ids
}
