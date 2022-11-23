describe('Upload', function () {
    const getImage = (id: number) => {
        return `cypress/fixtures/image-${id}.jpg`
    }

    const getVideo = (id: number) => {
        return `cypress/fixtures/video-${id}.mp4`
    }

    beforeEach(function () {
        cy.intercept('/graphql', (req) => {
            req.alias = req.body.operationName
        })

        cy.exec('node ./scripts/truncate-db.js').then(function () {
            cy.visit('/')
        })
    })

    it('uploads one file per drag and drop', function () {
        cy.get('[data-cy="uploader"]').selectFile(getImage(0), {
            action: 'drag-drop',
            force: true
        })

        cy.wait('@MediaQuery')

        cy.get('[data-cy="teaser"]').should('have.length', 1)
    })

    it('uploads one file by button', function () {
        cy.get('[data-cy="upload-action"]').selectFile(getImage(0), {
            force: true
        })

        cy.wait('@MediaQuery')

        cy.get('[data-cy="teaser"]').should('have.length', 1)
    })

    it('avoids duplicates', function () {
        cy.get('[data-cy="upload-action"]').selectFile(getImage(0), {
            force: true
        })

        cy.wait('@MediaQuery')

        cy.get('[data-cy="upload-action"]').selectFile(getImage(0), {
            force: true
        })

        cy.wait('@MediaQuery')

        cy.get('[data-cy="teaser"]').should('have.length', 1)
    })

    it('uploads multiple files per button', function () {
        cy.get('[data-cy="upload-action"]').selectFile([getImage(0), getImage(1), getImage(2)], {
            force: true
        })

        cy.wait('@MediaQuery')

        cy.get('[data-cy="teaser"]').should('have.length', 3)
    })

    it('uploads a video', function () {
        cy.get('[data-cy="upload-action"]').selectFile([getVideo(0)], {
            force: true
        })

        cy.wait('@MediaQuery')

        cy.get('[data-cy="teaser"]').should('have.length', 1)
    })
})
