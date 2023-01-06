import { predefinedAlbumUUIDs } from 'src/api/src/database/helpers/ids'

describe('Albums', function () {
    const albumTitle = '___T'

    before(function () {
        cy.exec('yarn db:seed')
    })

    beforeEach(function () {
        cy.intercept('/graphql', async (req) => {
            req.alias = req.body.operationName
        })
    })

    const select = function () {
        cy.visit('/')

        // Add items
        cy.get('[data-testid="teaser-check"]').first().click()
        cy.get('[data-testid="teaser-check"]').last().click()

        // Add to Album dialog
        cy.get('[data-testid="add-to"]').click()
        cy.get('[data-testid="add-to-album"]').should('be.visible')
        cy.wait('@QAlbums').then((res) => {
            cy.log(JSON.stringify(res.response.body))
        })
    }

    const makeEdits = function () {
        // Enter edit mode
        cy.get('[data-testid="album-title"]').should('be.visible')
        cy.get('[data-testid="album-title"]').click()

        // Can enter title

        cy.get('[data-testid="album-title"]').clear()

        cy.get('[data-testid="album-title"]').type(albumTitle, {
            force: true
        })
        cy.get('[data-testid="album-title"]').should('have.value', albumTitle)

        // Remove one
        cy.get('[data-testid="teaser"]').first().click()
        cy.get('[data-testid="teaser"]').should('have.length', 2)
    }

    it('deletes the album', function () {
        cy.visit('/albums')
        cy.get('[data-testid="album-teaser"]').should('have.length', 5)

        cy.get('[data-testid="album-teaser-title"]').contains('Test Album 0')
            .parents('[data-testid="album-teaser"]')
            .find('[data-testid="album-controls"]')
            .click({
                force: true
            })

        cy.get('[data-testid="album-delete"]').first()
            .click({
                force: true
            })

        cy.get('[data-testid="album-confirm-delete"]').click({
            force: true
        })

        cy.wait('@MDeleteAlbum').then(() => {
            cy.wait('@QAlbums').then(() => {
                cy.get('[data-testid="album-teaser"]').should('have.length', 4)
            })
        })

        cy.get('[data-testid="album-teaser-title"]').contains(albumTitle).should('not.exist')
    })

    it('creates an album from media selection', function () {
        select()

        cy.get('[data-testid="thumbnail-new"]').click({
            force: true
        })

        // has redirected
        cy.wait('@QAlbum')
        cy.get('[data-testid="teaser"]').should('have.length', 2)
    })

    it('restores edit changes', function () {
        cy.visit(`/albums/${predefinedAlbumUUIDs[1]}`)
        cy.wait('@QAlbum')

        makeEdits()

        // Restore on discard
        cy.get('[data-testid="discard-changes"]').click()
        cy.get('[data-testid="album-title"]').should('have.value', 'Test Album 1')
        cy.get('[data-testid="teaser"]').should('have.length', 3)
    })

    it('saves edit changes', function () {
        cy.visit(`/albums/${predefinedAlbumUUIDs[1]}`)
        cy.wait('@QAlbum')

        makeEdits()

        // Save
        cy.get('[data-testid="save-changes"]').click({
            force: true
        })
        cy.wait('@MUpdateAlbumTitle')
        cy.get('[data-testid="album-title"]').should('have.value', albumTitle)
        cy.get('[data-testid="teaser"]').should('have.length', 2)

        cy.get('[data-testid="album-back"]').click({
            force: true
        })

        cy.wait('@QAlbums')

        cy.get('[data-testid="album-teaser"]').should('have.length', 5)

        cy.get('[data-testid="album-teaser-title"]').contains(albumTitle)
            .parents('[data-testid="album-teaser"]')
            .find('[data-testid="album-teaser-count"]')
            .should('contain', '2 ')

        cy.get('[data-testid="album-teaser-title"]').contains(albumTitle).click()

        cy.get('[data-testid="album-title"]').should('have.value', albumTitle)
        cy.get('[data-testid="teaser"]').should('have.length', 2)
    })

    it('adds another medium to the album and avoids duplicates', function () {
        select()

        cy.get('[data-testid="thumbnail"]').contains('Test Single').click({
            force: true
        })

        cy.url().should('contain', '/albums/' )

        select()

        cy.get('[data-testid="thumbnail"]').contains('Test Single').click({
            force: true
        })

        // has redirected
        cy.url().should('contain', '/albums/' )
        cy.get('[data-testid="teaser"]').should('have.length', 2)
    })

    it('changes the album cover', function () {
        cy.visit(`/albums/${predefinedAlbumUUIDs[2]}`)

        cy.wait('@QAlbum')

        cy.get('[data-testid="album-more"]').click({
            force: true
        })
        cy.get('[data-testid="album-set-cover"]').click()
        cy.get('[data-testid="teaser-check"]').last().click()
        cy.get('[data-testid="save-changes"]').click()
        cy.wait('@QAlbum')
        cy.visit('/albums')
        cy.wait('@QAlbums')
        cy.get('[data-testid="album-teaser-title"]').should('have.length', 5)
        cy.get('[data-testid="album-teaser-title"]').contains('Test Album 2')
            .parents('[data-testid="album-teaser"]')
            .find('[data-testid="album-image"]')
            .should('have.attr', 'src')
            .and('include', '114d5e91-b89e-4a31-9305-d3753bf64f2c')
    })
})
