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
        cy.get('[data-testid="teaser-check"]').first().click()
        cy.get('[data-testid="bulk-more"]').click()
        cy.get('[data-testid="move-to-archive"]').click()
        cy.url().should('contain', '/archive')
        cy.get('[data-testid="teaser"]').should('have.length', 1)

        cy.get('[data-testid="teaser-check"]').first().click()
        cy.get('[data-testid="bulk-more"]').click()
        cy.get('[data-testid="move-to-archive"]').click()

        cy.visit('/')
        cy.get('[data-testid="teaser"]').should('have.length', 7)
    })
})
