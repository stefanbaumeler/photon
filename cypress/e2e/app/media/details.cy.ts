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
        cy.exec('yarn db:seed')
        cy.visit('/')
    })

    it('opens details', function () {
        cy.get('[data-cy="medium"]').first().click()
        cy.get('[data-cy="details"]').should('be.visible')
    })

    it('closes details', function () {
        cy.get('[data-cy="close-details"]').click({
            force: true
        })
        cy.get('[data-cy="details"]').should('not.be.visible')
    })

    it('closes with esc', function () {
        cy.get('[data-cy="medium"]').first().click()
        cy.get('[data-cy="details"]').should('be.visible')
        cy.url().should('contain', '/media/')
        cy.get('body').type('{esc}')
        cy.get('[data-cy="details"]').should('not.be.visible')
        cy.url().should('not.contain', '/media/')
    })

    it('hides infos', function () {
        cy.get('[data-cy="medium"]').first().click()
        cy.get('[data-cy="details"]').should('be.visible')
        cy.url().should('contain', '/media/')
        cy.get('[data-cy="hide-infos"]').click()
        cy.get('[data-cy="details-sidebar"]').should('not.be.visible')
    })

    it('shows infos', function () {
        cy.get('[data-cy="show-infos"]').click()
        cy.get('[data-cy="details-sidebar"]').should('be.visible')
    })

    it('navigates with keyboard arrows', function () {
        cy.get('body').type('{rightArrow}')
        isFirstImage(false)
        cy.get('body').type('{leftArrow}')
        isFirstImage()
    })

    it('navigates with on screen arrows', function () {
        cy.get('[data-cy="next-medium"]').click()
        isFirstImage(false)
        cy.get('[data-cy="prev-medium"]').click()
        isFirstImage()
    })
})
