const { it } = require("mocha");


Cypress.on('uncaught:exception', (err, runnable) => {

  return false;
});


describe('Acesso ao sistema de teste', () => {
  beforeEach(() => {
    cy.visit('https://hotelariaienh.000webhostapp.com/index.php');
    
  });

  it('Validar a tela de login', () => { 
    cy.visit('https://hotelariaienh.000webhostapp.com/login.php');
    cy.title().should('eq', 'Login');
  });  

  it('Preencher o formulário de login', () => {
    cy.visit('https://hotelariaienh.000webhostapp.com/login.php');
    cy.wait(2000);
    cy.get('[name="usuario"]').type('admin');
    cy.get('[name="senha"]').type('senha'); 
    cy.get('[type="submit"]').click();
  });

  it('Reservar quarto casal Deluxe', () => {
    cy.visit('https://hotelariaienh.000webhostapp.com');
    cy.wait(2000);
    cy.PaginaReservaQuarto('Quarto Casal Deluxe');
    cy.wait(2000);
    cy.get('[name="nome"]').type('Teste');
    cy.get('[name="email"]').type('teste@gmail.com');
    cy.get('#checkin').type('2021-06-01');
    cy.get('#checkout').type('2021-06-30');
    cy.get('#num_hospedes').type('2');
    cy.get('[type="submit"]').click();
      cy.contains('Quarto adicionado com sucesso!').should('exist').then(SuccessElement => {
      cy.log('Mensagem de sucesso: ' + SuccessElement.text());
     });
  });

  it('Reservar quarto família Superior', () => {
    cy.visit('https://hotelariaienh.000webhostapp.com');
    cy.wait(2000);
    cy.PaginaReservaQuarto('Quarto Família Superior');
    cy.wait(2000);
    cy.get('#nome').type('Teste');
    cy.get('#email').type('teste@gmail.com');
    cy.get('#checkin').type('2021-06-01');
    cy.get('#checkout').type('2021-06-30');
    cy.get('#num_hospedes').type('2');
    cy.get('[type="submit"]').click();
      cy.contains('Quarto adicionado com sucesso!').should('exist').then(SuccessElement => {
      cy.log('Mensagem de sucesso: ' + SuccessElement.text());
     }); 
  });

  it('Reservar quarto standard', () => {
    cy.visit('https://hotelariaienh.000webhostapp.com');
    cy.wait(2000);
    cy.PaginaReservaQuarto('Quarto Standard');
    cy.wait(2000);
    cy.get('#nome').type('Teste');
    cy.get('#email').type('teste@gmail.com');
    cy.get('#checkin').type('2021-06-01');
    cy.get('#checkout').type('2021-06-30');
    cy.get('#num_hospedes').type('2');
    cy.get('[type="submit"]').click();
        cy.contains('Quarto adicionado com sucesso!').should('exist').then(SuccessElement => {
      cy.log('Mensagem de sucesso: ' + SuccessElement.text());
     });
   
  });

  it('Adicionar quarto no painel de administração', () => {
    cy.visit('https://hotelariaienh.000webhostapp.com/login.php');
    cy.wait(2000);
    cy.get('[name="usuario"]').type('admin');
    cy.get('[name="senha"]').type('senha'); 
    cy.get('[type="submit"]').click();
    cy.title().should('eq', 'Painel de Administração');
    cy.get('[href="adicionar_quarto.php"]').click();
    //validar mensagem de quarto adicionado com sucesso
    cy.contains('Quarto adicionado com sucesso!').should('exist').then(SuccessElement => {
      cy.log('Mensagem de sucesso: ' + SuccessElement.text());
     });
  });

  it('Realizar logout do painel de administração', () => {
    cy.visit('https://hotelariaienh.000webhostapp.com/login.php');
    cy.wait(2000);
    cy.get('[name="usuario"]').type('admin');
    cy.get('[name="senha"]').type('senha'); 
    cy.get('[type="submit"]').click();
    cy.title().should('eq', 'Painel de Administração');
    cy.get('[href="logout_admin.php"]').click();
    //validar se voltei para a tela de login
    cy.title().should('eq', 'Login');
  });


  //reutilizar o código para clicar no quarto
  Cypress.Commands.add('PaginaReservaQuarto', (quarto) => {
    cy.contains(quarto)
      .parents('.card-body')
      .find('.btn.btn-primary')  // Observe que aqui corrigimos a classe do botão
      .click();
  });
  

});