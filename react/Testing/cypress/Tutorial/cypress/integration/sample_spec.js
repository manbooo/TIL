describe('My first Test', () => {
    it('Does not do much', () => {
        expect(true).to.equal(true)

        // Arrange = setup initail app state
        // - visit a wev pagd
        // - query for an element
        // Act - take an action
        // - interaction with that element
        // Assert - make an assertion
        // - make an assertion about page content
    })

    // it('Visits the Kitchen Sink', () => {
    //     cy.visit('https://example.cypress.io')
    // })
    //
    // it('Fine an element', () => {
    //     cy.contains('type')
    // })
    //
    // it('Clicks interaction with that element', () => {
    //     cy.contains('type').click()
    // })
    //
    // it('Makes an assertion', () => {
    //     cy.url()
    //         .should('include', '/commands/actions')
    // })
    //
    // it('Gets, types and asserts', () => {
    //     cy.get('.action-email')
    //         .type('fake@email.com')
    //         .should('have.value', 'fake@email.com')
    // })

    it('Gets, types and asserts', () => {
        cy.visit('https://example.cypress.io')

        cy.pause()

        cy.contains('type').click()

        cy.url()
            .should('include', '/commands/actions')

        cy.get('.action-email')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')
    })


})
