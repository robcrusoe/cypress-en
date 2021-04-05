describe("Text box with max characters and selecting elements properly", () => {
  it("displays the appropriate remaining characters count", () => {
    cy.visit("http://localhost:3000/example-3");

    /* Checks the initial state ... */
    cy.get("span").eq(0).invoke("text").should("equal", "15");

    /* Type in a small word ... */
    cy.get("input").eq(0).type("hello");

    cy.get("span").eq(0).invoke("text").should("equal", "10");

    /* Type in to the maximum limit ... */
    cy.get("input").eq(0).type(" my friend");

    cy.get("span").eq(0).invoke("text").should("equal", "0");
  });

  it("prevents the user from typing more characters once max limit is reached", () => {
    cy.visit("http://localhost:3000/example-3");

    cy.get("input").eq(0).type("abcdefghijklmnopqrstuvwxyz");

    /* Checking the input element too ... */
    cy.get("input").eq(0).should("have.attr", "value", "abcdefghijklmno");

    /* Checking the remaining characters ... */
    cy.get("span").eq(0).invoke("text").should("equal", "0");
  });
});
