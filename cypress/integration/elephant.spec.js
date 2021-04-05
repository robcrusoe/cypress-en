describe("Aliasing using Cypress - Extended", () => {
  it("displays the appropriate remaining characters count", () => {
    cy.visit("http://localhost:3000/example-3");

    cy.get('[data-cy="last-name-chars-left-count"]').as("charsLeftSpan");
    cy.get('[data-cy="input-last-name"]').as("charsLeftInput");


    /* Another way to work with Aliasing ... */
    cy.get('@charsLeftSpan').then(($charsLeftSpan) => {
        /* `$charsLeftSpan` -> Denotes the DOM Element that Cypress returns to us ... */
        expect($charsLeftSpan.text()).to.equal('15');
    });


    /* Checks the initial state ... */
    cy.get("@charsLeftSpan").invoke("text").should("equal", "15");

    /* Type in a small word ... */
    cy.get("@charsLeftInput").type("hello");

    cy.get("@charsLeftSpan").invoke("text").should("equal", "10");

    /* Type in to the maximum limit ... */
    cy.get("@charsLeftInput").type(" my friend");

    cy.get("@charsLeftSpan").invoke("text").should("equal", "0");
  });

  it("prevents the user from typing more characters once max limit is reached", () => {
    cy.visit("http://localhost:3000/example-3");

    cy.get('[data-cy="last-name-chars-left-count"]').as("charsLeftSpan");
    cy.get('[data-cy="input-last-name"]').as("charsLeftInput");

    cy.get("@charsLeftInput").type("abcdefghijklmnopqrstuvwxyz");

    /* Checking the input element too ... */
    cy.get("@charsLeftInput").should("have.attr", "value", "abcdefghijklmno");

    /* Checking the remaining characters ... */
    cy.get("@charsLeftSpan").invoke("text").should("equal", "0");
  });
});
