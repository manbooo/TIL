describe('App E2E', () => {
    it('should assert that true is equal to true', () => {
        expect(true).to.equal(true);
    });

    it('헤더가 있어야 한다', () => {
        cy.visit('/')

        cy.get('h1')
            .should('have.text', 'My Counter')
    })

    it('카운터를 늘리거나 줄일 수 있어야 한다', () => {
        cy.visit('/')

        cy.get('p')
            .should('have.text', '0')

        cy.contains('Increment').click()
        cy.get('p')
            .should('have.text', '1')

        cy.contains('Increment').click()
        cy.get('p')
            .should('have.text', '2')

        cy.contains('Decrement').click()
        cy.get('p')
            .should('have.text', '1')
    })
});
