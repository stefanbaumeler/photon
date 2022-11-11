describe('Upload', function () {
    const getVideo = (id: number) => {
        return `cypress/fixtures/video-${id}.mp4`
    }

    before(function () {
        cy.exec('node ./scripts/truncate-db.js').then(function () {
            cy.visit('/')
        })
    })

    beforeEach(function () {
        cy.intercept('/graphql', (req) => {
            req.alias = req.body.operationName
        })
    })

    it('uploads a video', function () {
        cy.get('[data-cy="upload-action"]').selectFile([getVideo(0)], {
            force: true
        })

        cy.wait('@MediaQuery')

        cy.get('[data-cy="teaser"]').should('have.length', 1)
    })
})
