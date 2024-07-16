describe('Test Authentication', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Adds document to test_hello_world collection of Firestore', () => {
    cy.visit('http://localhost:3000/account')
  })
})
