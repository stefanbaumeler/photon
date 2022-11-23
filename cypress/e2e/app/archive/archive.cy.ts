describe('Archive', function () {
    before(function () {
        cy.exec('yarn db:seed')
        cy.visit('/')
    })

    beforeEach( function () {
        cy.intercept('/graphql', (req) => {
            req.alias = req.body.operationName
        })
    })

    it('moves item to archive and restores it', function () {
        cy.visit('/')
        cy.get('[data-cy="teaser-check"]').first().click()
        cy.get('[data-cy="bulk-more"]').click()
        cy.get('[data-cy="move-to-archive"]').click()
        cy.url().should('contain', '/archive')
        cy.get('[data-cy="teaser"]').should('have.length', 1)

        cy.get('[data-cy="teaser-check"]').first().click()
        cy.get('[data-cy="bulk-more"]').click()
        cy.get('[data-cy="move-to-archive"]').click()

        cy.visit('/')
        cy.get('[data-cy="teaser"]').should('have.length', 7)
    })
})
