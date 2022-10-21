describe('Upload', () => {
    let mediumCount = 0

    const getImage = (offset = 1) => {
        mediumCount += offset

        return `cypress/fixtures/image-${mediumCount}.jpg`
    }

    beforeEach(() => {
        cy.intercept('/graphql', (req) => {
            console.log(req.body.operationName)
            req.alias = req.body.operationName
        })

        cy.exec('node ./scripts/truncate-db.js').then(() => {
            cy.visit('/')
            cy.wait('@MediaQuery')
        })
    })

    after(() => {
        cy.exec('node ./scripts/truncate-db.js')
    })

    it('uploads one file per drag and drop', () => {
        cy.get('[data-cy="uploader"]').selectFile(getImage(), {
            action: 'drag-drop',
            force: true
        })
        cy.wait('@MediaQuery')

        cy.get('[data-cy="medium"]').should('have.length', 1)
    })

    it('avoids duplicates', () => {
        cy.get('[data-cy="upload-action"]').selectFile(getImage(), {
            force: true
        })

        cy.wait('@MediaQuery')

        cy.get('[data-cy="upload-action"]').selectFile(getImage(0), {
            force: true
        })

        cy.wait('@MediaQuery')

        cy.get('[data-cy="medium"]').should('have.length', 1)
    })

    it('uploads one file by button', () => {
        cy.get('[data-cy="upload-action"]').selectFile(getImage(), {
            force: true
        })

        cy.wait('@MediaQuery')

        cy.get('[data-cy="medium"]').should('have.length', 1)
    })

    it('uploads multiple files per drag and drop', () => {
        cy.get('[data-cy="upload-action"]').selectFile([getImage(), getImage(), getImage()], {
            force: true
        })

        cy.wait('@MediaQuery')

        cy.get('[data-cy="medium"]').should('have.length', 3)
    })
})
