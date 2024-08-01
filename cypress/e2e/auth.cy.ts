describe('Test Authentication', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Check if logged in and can see full name of user on Account page', () => {
    cy.visit('http://localhost:3000/account')
    cy.get('.c-kgWQHs').should('include.text', 'Mike Wright')
  })
})
