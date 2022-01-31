describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays a list of 30 trending repos', () => {
    cy.get('.item').should('have.length', 30)
  })

  it('can save repo items', () => {
    const repo = cy.get('.item').first()
    const saveButton = repo.find('button')

    saveButton.should('have.text', 'Save')
    saveButton.click()
    saveButton.should('have.text', 'Unsave')

    // click favourite button
    cy.get('button').contains('Favourites').click()
    cy.get('.item').should('have.length', 1)

    // unsave item
    repo.find('button').click()
    cy.get('.App').contains('You have not saved any repos yet')
  })
})
