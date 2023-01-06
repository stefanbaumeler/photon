const moveItemToTrash = () => {
    cy.visit('/')
    cy.get('[data-testid="teaser-check"]').first().click()
    cy.get('[data-testid="move-to-trash"]').click()
    cy.get('[data-testid="confirm-move-to-trash"]').click()

    cy.visit('/trash')

    cy.get('[data-testid="teaser"]').should('exist')
}
describe('Trash', function () {
    before(function () {
        cy.exec('yarn db:seed')
    })

    beforeEach( function () {
        cy.intercept('/graphql', (req) => {
            req.alias = req.body.operationName
        })
    })

    it('restores item', function () {
        moveItemToTrash()
        cy.get('[data-testid="teaser-check"]').first().click()
        cy.get('[data-testid="trash-restore"]').click()
        cy.get('[data-testid="trash-restore-confirm"]').click()
        cy.get('[data-testid="teaser"]').should('not.exist')
        cy.visit('/')
        cy.get('[data-testid="teaser"]').should('have.length', 7)
    })

    it('deletes item', function () {
        moveItemToTrash()
        cy.get('[data-testid="teaser-check"]').first().click()
        cy.get('[data-testid="trash-delete"]').click()
        cy.get('[data-testid="trash-delete-confirm"]').click()
        cy.get('[data-testid="teaser"]').should('not.exist')
    })

    it('empties trash', function () {
        moveItemToTrash()
        cy.get('[data-testid="trash-empty"]').click()
        cy.get('[data-testid="trash-empty-confirm"]').click()
        cy.get('[data-testid="teaser"]').should('not.exist')
    })
})
