describe('Test Homepage', () => {
  beforeEach(() => {
    cy.logout()
  })

  it('Can I access the homepage and its elements but not other pages', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.c-PJLV-jroWjL-alignItems-center > .c-fdnpOH > .c-kgWQHs').click()
    cy.get('.c-jcxtHY > .c-fdnpOH').click()
    cy.get('.c-dgnNTJ').contains('Oops! Please Sign In')
  })
})
