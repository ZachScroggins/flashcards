describe('The App', () => {
  it('renders the home page', () => {
    cy.visit('/');

    cy.get('main');
    cy.get('h1');
    cy.get('footer');
  });
});

export {};
