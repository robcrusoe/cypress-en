describe('Text box with max characters', () => {
    it('displays the appropriate remaining characters count', () => {
        cy.visit('http://localhost:3000/example-2');

        /* Checks the initial state ... */
        cy.get('span')
            .invoke('text')
            .should('equal', '15');


        /* Type in a small word ... */
        cy.get('input')
            .type('hello');
        
        cy.get('span')
            .invoke('text')
            .should('equal', '10');


        /* Type in to the maximum limit ... */
        cy.get('input')
            .type(' my friend');

        cy.get('span')
            .invoke('text')
            .should('equal', '0');
    });

    it('prevents the user from typing more characters once max limit is reached', () => {
        cy.visit('http://localhost:3000/example-2');

        cy.get('input')
            .type('abcdefghijklmnopqrstuvwxyz');

        /* Checking the input element too ... */
        cy.get('input')
            .should('have.attr', 'value', 'abcdefghijklmno');

        /* Checking the remaining characters ... */
        cy.get('span')
            .invoke('text')
            .should('equal', '0');
    });
});