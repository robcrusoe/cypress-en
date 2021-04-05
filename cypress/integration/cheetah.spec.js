describe("Text box with max characters and selecting elements with the recommended way", () => {
  it("displays the appropriate remaining characters count", () => {
    cy.visit("http://localhost:3000/example-3");

    /* Checks the initial state ... */
    cy.get('[data-cy="last-name-chars-left-count"]').invoke("text").should("equal", "15");

    /* Type in a small word ... */
    cy.get('[data-cy="input-last-name"]').type("hello");

    cy.get('[data-cy="last-name-chars-left-count"]').invoke("text").should("equal", "10");

    /* Type in to the maximum limit ... */
    cy.get('[data-cy="input-last-name"]').type(" my friend");

    cy.get('[data-cy="last-name-chars-left-count"]').invoke("text").should("equal", "0");
  });

  it("prevents the user from typing more characters once max limit is reached", () => {
    cy.visit("http://localhost:3000/example-3");

    cy.get('[data-cy="input-last-name"]').type("abcdefghijklmnopqrstuvwxyz");

    /* Checking the input element too ... */
    cy.get('[data-cy="input-last-name"]').should("have.attr", "value", "abcdefghijklmno");

    /* Checking the remaining characters ... */
    cy.get('[data-cy="last-name-chars-left-count"]').invoke("text").should("equal", "0");
  });
});
