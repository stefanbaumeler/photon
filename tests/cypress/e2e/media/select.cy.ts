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
        cy.get('[data-testid="teaser-check"]').first().click()
        cy.get('[data-testid="teaser"]').first().should('have.class', 'teaser--selected')
        cy.get('[data-testid="select-count"]').should('contain', '1 ')

        cy.get('[data-testid="teaser"]').last().click()
        cy.get('[data-testid="teaser"]').last().should('have.class', 'teaser--selected')
        cy.get('[data-testid="select-count"]').should('contain', '2 ')

        cy.get('[data-testid="teaser"]').last().click()
        cy.get('[data-testid="teaser"]').last().should('not.have.class', 'teaser--selected')
        cy.get('[data-testid="select-count"]').should('contain', '1 ')

        cy.get('body').type('{esc}')
        cy.get('[data-testid="teaser"]').first().should('not.have.class', 'teaser--selected')
    })

    it('selects with shift', function () {
        cy.get('[data-testid="teaser-check"]').first().click()
        cy.get('body').type('{shift}', {
            release: false
        })
        cy.get('[data-testid="teaser"]').eq(2).trigger('mouseover').click()
        cy.get('body').type('{shift}')
        cy.get('[data-testid="teaser"]').eq(1).should('have.class', 'teaser--selected')

        cy.get('body').type('{shift}', {
            release: false
        })
        cy.get('[data-testid="teaser"]').eq(4).trigger('mouseover').click()
        cy.get('body').type('{shift}')
        cy.get('[data-testid="teaser"]').eq(3).should('have.class', 'teaser--selected')

        cy.get('body').type('{esc}')
    })

    it('selects by section', function () {
        cy.get('[data-testid="gallery-section-check"]').first().click({
            force: true
        })
        cy.get('[data-testid="gallery-section"]').first().find('[data-testid="teaser"]').each((el) => {
            cy.wrap(el).should('have.class', 'teaser--selected')
        })

        cy.get('[data-testid="gallery-section"]').last().find('[data-testid="teaser"]').each((el) => {
            cy.wrap(el).should('not.have.class', 'teaser--selected')
        })

        cy.get('body').type('{esc}')
    })

    it('selects on detail page', function () {
        cy.get('[data-testid="teaser-check"]').first().click()
        cy.get('[data-testid="teaser"]').eq(1).find('[data-testid="teaser-details-fallback"]').click({
            force: true
        })
        cy.get('[data-testid="details"]').should('be.visible')
        cy.url().should('contain', '/media/')

        cy.get('[data-testid="details-select"]').click({
            force: true
        })
        cy.get('body').type('{esc}')
        cy.get('[data-testid="details"]').should('not.exist')
        cy.get('[data-testid="select-count"]').should('contain', '2 ')
        cy.get('body').type('{esc}')
    })
})
