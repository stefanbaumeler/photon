import { predefinedAlbumUUIDs } from '@photon/api/src/database/helpers/ids'

describe('Albums', function () {
    const albumTitle = '___T'

    before(function () {
        cy.exec('yarn db:seed')
    })

    beforeEach(function () {
        cy.intercept('/graphql', (req) => {
            req.alias = req.body.operationName
        })
    })

    const select = function () {
        cy.visit('/')

        // Add items
        cy.get('[data-cy="teaser-check"]').first().click()
        cy.get('[data-cy="teaser-check"]').last().click()

        // Add to Album dialog
        cy.get('[data-cy="add-to"]').click()
        cy.get('[data-cy="add-to-album"]').should('be.visible')
        cy.wait('@AlbumsQuery')
    }

    const makeEdits = function () {
        // Enter edit mode
        cy.get('[data-cy="album-title"]').click()

        // Can enter title

        cy.get('[data-cy="album-title"]').clear()

        cy.get('[data-cy="album-title"]').type(albumTitle, {
            force: true
        })
        cy.get('[data-cy="album-title"]').should('have.value', albumTitle)

        // Remove one
        cy.get('[data-cy="teaser"]').first().click()
        cy.get('[data-cy="teaser"]').should('have.length', 6)
    }

    it('deletes the album', function () {
        cy.visit('/albums/')
        cy.get('[data-cy="album-teaser"]').should('have.length', 5)

        cy.get('[data-cy="album-teaser-title"]').contains('Test Album 0')
            .parents('[data-cy="album-teaser"]')
            .find('[data-cy="album-controls"]')
            .click({
                force: true
            })

        cy.get('[data-cy="album-delete"]').first()
            .click({
                force: true
            })

        cy.get('[data-cy="album-confirm-delete"]').click({
            force: true
        })

        cy.get('[data-cy="album-teaser"]').should('have.length', 4)

        cy.wait('@deleteAlbum')

        cy.get('[data-cy="album-teaser-title"]').contains(albumTitle).should('not.exist')
    })

    it('creates an album from media selection', function () {
        select()

        cy.get('[data-cy="thumbnail-new"]').click({
            force: true
        })

        // has redirected
        cy.url().should('contain', '/albums/' )
        cy.get('[data-cy="teaser"]').should('have.length', 2)
    })

    it('restores edit changes', function () {
        cy.visit(`/albums/${predefinedAlbumUUIDs[1]}`)

        makeEdits()

        // Restore on discard
        cy.get('[data-cy="discard-changes"]').click()
        cy.get('[data-cy="album-title"]').should('have.value', 'Test Album 1')
        cy.get('[data-cy="teaser"]').should('have.length', 7)
    })

    it('saves edit changes', function () {
        cy.visit(`/albums/${predefinedAlbumUUIDs[1]}`)

        makeEdits()

        // Save
        cy.get('[data-cy="save-changes"]').click({
            force: true
        })
        cy.wait('@updateAlbumTitle')
        cy.get('[data-cy="album-title"]').should('have.value', albumTitle)
        cy.get('[data-cy="teaser"]').should('have.length', 6)

        cy.get('[data-cy="album-back"]').click({
            force: true
        })

        cy.url().should('match', /.*\/albums$/)

        cy.get('[data-cy="album-teaser"]').should('have.length', 5)

        cy.get('[data-cy="album-teaser-title"]').contains(albumTitle)
            .parents('[data-cy="album-teaser"]')
            .find('[data-cy="album-teaser-count"]')
            .should('contain', '6 ')

        cy.get('[data-cy="album-teaser-title"]').contains(albumTitle).click()

        cy.get('[data-cy="album-title"]').should('have.value', albumTitle)
        cy.get('[data-cy="teaser"]').should('have.length', 6)
    })

    it('adds another medium to the album and avoids duplicates', function () {
        select()

        cy.get('[data-cy="thumbnail"]').contains('Test Single').click({
            force: true
        })

        // has redirected
        cy.url().should('contain', '/albums/' )
        cy.get('[data-cy="teaser"]').should('have.length', 2)
    })

    it('changes the album cover', function () {
        cy.visit('/albums/fd8a10df-5db5-44ad-b131-019c274a1096')
        cy.get('[data-cy="album-more"]').click({
            force: true
        })
        cy.get('[data-cy="album-set-cover"]').click()
        cy.get('[data-cy="teaser-check"]').last().click()
        cy.get('[data-cy="save-changes"]').click()
        cy.visit('/albums')
        cy.url().should('contain', '/albums' )
        cy.get('[data-cy="album-teaser-title"]').should('have.length', 5)
        cy.get('[data-cy="album-teaser-title"]').contains('Test Album 2')
            .parents('[data-cy="album-teaser"]')
            .find('[data-cy="album-image"]')
            .should('have.attr', 'src')
            .and('include', '114d5e91-b89e-4a31-9305-d3753bf64f2c')
    })
})
