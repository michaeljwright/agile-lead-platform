describe('Test Homepage', () => {
  it('Can I access the homepage and its elements', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.c-PJLV-jroWjL-alignItems-center > .c-fdnpOH > .c-kgWQHs').click()
    cy.get('.c-jcxtHY > .c-fdnpOH').click()
    cy.get('.c-dgnNTJ').click()
  })
})
