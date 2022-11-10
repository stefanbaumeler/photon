describe('Albums', function () {
    const albumTitle = '___T'

    before(function () {
        cy.exec('yarn db:seed')
    })

    beforeEach(function () {
        cy.intercept('/graphql', (req) => {
            console.log(req.body.operationName)
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
        cy.get('[data-cy="album-title"]').type(albumTitle, {
            force: true
        })
        cy.get('[data-cy="album-title"]').should('have.value', albumTitle)

        // Remove one
        cy.get('[data-cy="teaser"]').first().click()
        cy.get('[data-cy="media-section"]').should('have.length', 1)
    }

    it('creates an album from media selection', function () {
        select()

        cy.get('[data-cy="thumbnail-new"]').click()

        // has redirected
        cy.url().should('contain', '/albums/' )
        cy.get('[data-cy="teaser"]').should('have.length', 2)
    })

    it('restores edit changes', function () {
        makeEdits()

        // Restore on discard
        cy.get('[data-cy="discard-changes"]').click()
        cy.get('[data-cy="album-title"]').should('not.have.value')
        cy.get('[data-cy="media-section"]').should('have.length', 2)
    })

    it('saves edit changes', function () {
        makeEdits()

        // Save
        cy.get('[data-cy="save-changes"]').click()
        cy.get('[data-cy="album-title"]').should('have.value', albumTitle)
        cy.get('[data-cy="media-section"]').should('have.length', 1)
    })

    it('updates album count on overview page', function () {
        cy.get('[data-cy="album-back"]').click({
            force: true
        })

        cy.url().should('match', /.*\/albums$/)

        cy.get('[data-cy="album-teaser-title"]').contains(albumTitle)
            .parents('[data-cy="album-teaser"]')
            .get('[data-cy="album-teaser-count"]')
            .should('contain', '1 ')

        cy.get('[data-cy="album-teaser-title"]').contains(albumTitle).click()
    })

    it('persists changes on refresh', function () {
        cy.reload()
        cy.get('[data-cy="album-title"]').should('have.value', albumTitle)
        cy.get('[data-cy="media-section"]').should('have.length', 1)
    })

    it('adds another medium to the album and avoids duplicates', function () {
        select()

        cy.get('[data-cy="thumbnail"]').contains(albumTitle).click({
            force: true
        })

        // has redirected
        cy.url().should('contain', '/albums/' )
        cy.get('[data-cy="teaser"]').should('have.length', 2)
    })

    after(function () {
        // cy.exec('node ./scripts/truncate-db.js')
    })
})
