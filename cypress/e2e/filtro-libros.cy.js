describe('Filtro de libros', () => {
  it('permite al usuario iniciar sesión, filtrar libros y ver el resultado', () => {

    cy.visit('http://localhost:8080')

    // Iniciar sesión
    cy.get('#usuario').type('admin')
    cy.get('#password').type('123456')
    cy.contains('button', 'Entrar al sistema').click()
    // Acessar a lista de livros
cy.contains('a', 'Libros').click()

// Filtrar pelo autor
cy.get('input[placeholder="Buscar por autor..."]').type('Asimov')

// Verificar o resultado
cy.contains('Fundación').should('be.visible')
cy.contains('Isaac Asimov').should('be.visible')

// Verificar que outro livro não aparece no resultado
cy.contains('Cien años de soledad').should('not.exist')

  })
})