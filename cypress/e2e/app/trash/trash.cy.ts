const moveItemToTrash = () => {
    cy.visit('/')
    cy.get('[data-cy="teaser-check"]').first().click()
    cy.get('[data-cy="move-to-trash"]').click()
    cy.get('[data-cy="confirm-move-to-trash"]').click()

    cy.visit('/trash')

    cy.get('[data-cy="teaser"]').should('exist')
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
        cy.get('[data-cy="teaser-check"]').first().click()
        cy.get('[data-cy="trash-restore"]').click()
        cy.get('[data-cy="trash-restore-confirm"]').click()
        cy.get('[data-cy="teaser"]').should('not.exist')
        cy.visit('/')
        cy.get('[data-cy="teaser"]').should('have.length', 7)
    })

    it('deletes item', function () {
        moveItemToTrash()
        cy.get('[data-cy="teaser-check"]').first().click()
        cy.get('[data-cy="trash-delete"]').click()
        cy.get('[data-cy="trash-delete-confirm"]').click()
        cy.get('[data-cy="teaser"]').should('not.exist')
    })

    it('empties trash', function () {
        moveItemToTrash()
        cy.get('[data-cy="trash-empty"]').click()
        cy.get('[data-cy="trash-empty-confirm"]').click()
        cy.get('[data-cy="teaser"]').should('not.exist')
    })
})
