describe('Details', function () {
    const isFirstImage = (shouldBeFirst = true) => {
        cy.get('[data-cy="medium-image"]').first().invoke('attr', 'src').then((src1) => {
            cy.get('[data-cy="details-image"]').invoke('attr', 'src').then((src2) => {
                if (shouldBeFirst) {
                    expect(src1.split('?')[0]).to.eq(src2)
                }
                else {
                    expect(src1.split('?')[0]).to.not.eq(src2)
                }
            })
        })
    }
    before(function () {
        cy.exec('yarn db:seed').then((res) => {
            console.log(res)
            cy.task('log', res)
        })
        cy.visit('/')
    })

    beforeEach( function () {
        cy.intercept('/graphql', (req) => {
            req.alias = req.body.operationName
        })
    })

    it('selects one item by checkbox', function () {
        cy.get('[data-cy="medium-check"]').first().click()
        cy.get('[data-cy="medium"]').first().should('have.class', 'medium--selected')
        cy.get('[data-cy="select-count"]').should('contain', '1 ')
    })

    it('selects another item by clicking anywhere', function () {
        cy.get('[data-cy="medium"]').last().click()
        cy.get('[data-cy="medium"]').last().should('have.class', 'medium--selected')
        cy.get('[data-cy="select-count"]').should('contain', '2 ')
    })

    it('unselects item by clicking', function () {
        cy.get('[data-cy="medium"]').last().click()
        cy.get('[data-cy="medium"]').last().should('not.have.class', 'medium--selected')
        cy.get('[data-cy="select-count"]').should('contain', '1 ')
    })

    it('clears by clicking esc', function () {
        cy.get('body').type('{esc}')
        cy.get('[data-cy="medium"]').first().should('not.have.class', 'medium--selected')
    })

    it('selects with shift', function () {
        cy.get('[data-cy="medium-check"]').first().click()
        cy.get('body').type('{shift}', {
            release: false
        })
        cy.get('[data-cy="medium"]').eq(2).trigger('mouseover').click()
        cy.get('body').type('{shift}')
        cy.get('[data-cy="medium"]').eq(1).should('have.class', 'medium--selected')

        cy.get('body').type('{shift}', {
            release: false
        })
        cy.get('[data-cy="medium"]').eq(4).trigger('mouseover').click()
        cy.get('body').type('{shift}')
        cy.get('[data-cy="medium"]').eq(3).should('have.class', 'medium--selected')

        cy.get('body').type('{esc}')
    })

    it('selects by section', function () {
        cy.get('[data-cy="media-section-check"]').first().click({
            force: true
        })
        cy.get('[data-cy="media-section"]').first().find('[data-cy="medium"]').each((el) => {
            cy.wrap(el).should('have.class', 'medium--selected')
        })

        cy.get('[data-cy="media-section"]').last().find('[data-cy="medium"]').each((el) => {
            cy.wrap(el).should('not.have.class', 'medium--selected')
        })

        cy.get('body').type('{esc}')
    })

    it('selects on detail page', function () {
        cy.get('[data-cy="medium-check"]').first().click()
        cy.get('[data-cy="medium"]').eq(1).find('[data-cy="medium-details-fallback"]').click({
            force: true
        })
        cy.get('[data-cy="details"]').should('be.visible')

        cy.get('[data-cy="details-select"]').click({
            force: true
        })
        cy.get('body').type('{esc}')
        cy.get('[data-cy="details"]').should('not.be.visible')
        cy.get('[data-cy="select-count"]').should('contain', '2 ')
        cy.get('body').type('{esc}')
    })
})
