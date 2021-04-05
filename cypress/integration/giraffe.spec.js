describe('Basic Page Interactions', () => {
    beforeEach(() => {
        cy.visit('/example-4');
    });

    /* Working with double-click */
    it('sets the header text to the item\'s name when double-clicked', () => {
        cy.get('[data-cy="box-1-items-list"] > :nth-child(2)')
            .dblclick();

        cy.get('[data-cy="box-1-selected-name"]')
            .invoke('text')
            .should('equal', 'Option Two');
    });

    /* Working with check-boxes */
    it('displays the correct count for the number of selected checkboxes', () => {
        cy.get('[data-cy="box-2-checkboxes"] > :nth-child(1) input')
            .check();

        cy.get('[data-cy="box-2-selected-count"]')
            .invoke('text')
            .should('equal', '1');
    });

    /* Working with select-element */
    it('displays the correct name for the currently selected item', () => {
        cy.get('[data-cy="box-3-dropdown"]').select('Option Three');

        cy.get('[data-cy="box-3-selected-name"]')
            .invoke('text')
            .should('equal', 'Option Three');
    });

    /* working with trigger-commands */
    it('works with the different trigger commands provided by cypress', () => {
        cy.get('[data-cy="box-4-items-list"] > :nth-child(2)').trigger('mouseover', 10, 20);

        cy.get('[data-cy="box-4-selected-name"]')
            .invoke('text')
            .should('equal', 'Option Two')
    });
});