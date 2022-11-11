describe('Details', function () {
    const isFirstImage = (shouldBeFirst = true) => {
        cy.get('[data-cy="teaser-image"]').first().invoke('attr', 'src').then((src1) => {
            cy.get('[data-cy="details-image"]').invoke('attr', 'src').then((src2) => {
                const split1 = new URL(src1, window.location.origin).search.split(/[?&=]/g)
                const split2 = new URL(src2, window.location.origin).search.split(/[?&=]/g)
                const url1 = decodeURIComponent(split1[split1.indexOf('url') + 1]).split('?')[0]
                const url2 = decodeURIComponent(split2[split2.indexOf('url') + 1]).split('?')[0]

                if (shouldBeFirst) {
                    expect(url1).to.eq(url2)
                }
                else {
                    expect(url1).to.not.eq(url2)
                }
            })
        })
    }

    before(function () {
        cy.exec('yarn db:seed')
        cy.visit('/')
    })

    beforeEach( function () {
        cy.intercept('/graphql', (req) => {
            req.alias = req.body.operationName
        })
    })

    it('opens details', function () {
        cy.get('[data-cy="teaser"]').first().click()
        cy.get('[data-cy="details"]').should('be.visible')
    })

    it('closes details', function () {
        cy.get('[data-cy="close-details"]').click({
            force: true
        })
        cy.get('[data-cy="details"]').should('not.exist')
        cy.url().should('not.contain', '/media/')
    })

    it('closes with esc', function () {
        cy.get('[data-cy="teaser"]').first().click()
        cy.url().should('contain', '/media/')
        cy.get('[data-cy="details"]').should('be.visible')
        cy.get('body').type('{esc}')
        cy.get('[data-cy="details"]').should('not.exist')
        cy.url().should('not.contain', '/media/')
    })

    it('hides infos', function () {
        cy.get('[data-cy="teaser"]').first().click()
        cy.get('[data-cy="details"]').should('be.visible')
        cy.url().should('contain', '/media/')
        cy.get('[data-cy="hide-infos"]').click({
            force: true
        })
        cy.get('[data-cy="details-sidebar"]').should('not.be.visible')

        cy.get('[data-cy="show-infos"]').click({
            force: true
        })
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
