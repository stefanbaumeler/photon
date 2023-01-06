describe('Details', function () {
    const isFirstImage = (shouldBeFirst = true) => {
        cy.get('[data-testid="teaser-image"]').first().invoke('attr', 'src').then((src1) => {
            cy.get('[data-testid="details-image"]').invoke('attr', 'src').then((src2) => {
                const path1 = new URL(src1, window.location.origin).pathname
                const path2 = new URL(src2, window.location.origin).pathname

                if (shouldBeFirst) {
                    expect(path1).to.eq(path2)
                }
                else {
                    expect(path1).to.not.eq(path2)
                }
            })
        })
    }

    const open = () => {
        cy.get('[data-testid="teaser"]').first().click()
        cy.get('[data-testid="details"]').should('be.visible')
    }

    before(function () {
        cy.exec('yarn db:seed')
    })

    beforeEach( function () {
        cy.visit('/')
        open()

        cy.intercept('/graphql', (req) => {
            req.alias = req.body.operationName
        })
    })

    it('opens and closes details', function () {
        cy.get('[data-testid="close-details"]').click({
            force: true
        })
        cy.get('[data-testid="details"]').should('not.exist')
        cy.url().should('not.contain', '/media/')

        cy.get('[data-testid="teaser"]').first().click()
        cy.url().should('contain', '/media/')
        cy.get('[data-testid="details"]').should('be.visible')
        cy.get('body').type('{esc}')
        cy.get('[data-testid="details"]').should('not.exist')
        cy.url().should('not.contain', '/media/')
    })

    it('hides infos', function () {
        cy.url().should('contain', '/media/')
        cy.get('[data-testid="hide-infos"]').click({
            force: true
        })
        cy.get('[data-testid="details-sidebar"]').should('not.be.visible')

        cy.get('[data-testid="show-infos"]').click({
            force: true
        })
        cy.get('[data-testid="details-sidebar"]').should('be.visible')
    })

    it('navigates with keyboard arrows', function () {
        cy.get('body').type('{rightArrow}')
        isFirstImage(false)
        cy.get('body').type('{leftArrow}')
        isFirstImage()
    })

    it('navigates with on screen arrows', function () {
        cy.get('[data-testid="next-medium"]').click()
        isFirstImage(false)
        cy.get('[data-testid="prev-medium"]').click()
        isFirstImage()
    })
})
