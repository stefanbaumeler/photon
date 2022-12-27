describe('Details', function () {
    before(function () {
        cy.exec('yarn db:seed')
        cy.visit('/')
    })

    beforeEach( function () {
        cy.visit('/')

        cy.intercept('/graphql', (req) => {
            req.alias = req.body.operationName
        })
    })

    it('selects and unselects', function () {
        cy.get('[data-cy="teaser-check"]').first().click()
        cy.get('[data-cy="teaser"]').first().should('have.class', 'teaser--selected')
        cy.get('[data-cy="select-count"]').should('contain', '1 ')

        cy.get('[data-cy="teaser"]').last().click()
        cy.get('[data-cy="teaser"]').last().should('have.class', 'teaser--selected')
        cy.get('[data-cy="select-count"]').should('contain', '2 ')

        cy.get('[data-cy="teaser"]').last().click()
        cy.get('[data-cy="teaser"]').last().should('not.have.class', 'teaser--selected')
        cy.get('[data-cy="select-count"]').should('contain', '1 ')

        cy.get('body').type('{esc}')
        cy.get('[data-cy="teaser"]').first().should('not.have.class', 'teaser--selected')
    })

    it('selects with shift', function () {
        cy.get('[data-cy="teaser-check"]').first().click()
        cy.get('body').type('{shift}', {
            release: false
        })
        cy.get('[data-cy="teaser"]').eq(2).trigger('mouseover').click()
        cy.get('body').type('{shift}')
        cy.get('[data-cy="teaser"]').eq(1).should('have.class', 'teaser--selected')

        cy.get('body').type('{shift}', {
            release: false
        })
        cy.get('[data-cy="teaser"]').eq(4).trigger('mouseover').click()
        cy.get('body').type('{shift}')
        cy.get('[data-cy="teaser"]').eq(3).should('have.class', 'teaser--selected')

        cy.get('body').type('{esc}')
    })

    it('selects by section', function () {
        cy.get('[data-cy="gallery-section-check"]').first().click({
            force: true
        })
        cy.get('[data-cy="gallery-section"]').first().find('[data-cy="teaser"]').each((el) => {
            cy.wrap(el).should('have.class', 'teaser--selected')
        })

        cy.get('[data-cy="gallery-section"]').last().find('[data-cy="teaser"]').each((el) => {
            cy.wrap(el).should('not.have.class', 'teaser--selected')
        })

        cy.get('body').type('{esc}')
    })

    it('selects on detail page', function () {
        cy.get('[data-cy="teaser-check"]').first().click()
        cy.get('[data-cy="teaser"]').eq(1).find('[data-cy="teaser-details-fallback"]').click({
            force: true
        })
        cy.get('[data-cy="details"]').should('be.visible')
        cy.url().should('contain', '/media/')

        cy.get('[data-cy="details-select"]').click({
            force: true
        })
        cy.get('body').type('{esc}')
        cy.get('[data-cy="details"]').should('not.exist')
        cy.get('[data-cy="select-count"]').should('contain', '2 ')
        cy.get('body').type('{esc}')
    })
})
