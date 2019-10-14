/// <reference types="cypress" />
function login(){
    cy.visit('https://slerp-composer-staging.herokuapp.com/auth/identity')
    cy.get('[name="email"]').type('admin@berp.com')
    cy.get('[name="password"]').type('password')
    cy.get('.pure-button-primary').click()
}

function logout(){
        cy.get('.actions').first()
        .trigger('mouseover').then($el=>{
        cy.wrap($el).invoke('show')
        cy.wrap($el).contains('Sign out').click({force: true})
    })
}

var i=0;
for (i = 0; i < 2; i++) {  
describe('Berp Ordering', function(){
    beforeEach(login)
    afterEach(logout)
    it('should create new order', function(){
        cy.get('.btn-blue').eq(2).should('contain', 'New Order').click()        
        cy.get('div.Select-control input').first().type('Joh Tester_O', { force: true })
        cy.get('.Select-menu').contains('Joh Tester_O - Online', {timeout: 5000}).click()
        cy.get('.product-table', {timeout: 5000}).should('be.visible')

        cy.get('.product-table > tbody > .product-row > .cart-controls > .quantity > input').eq(1).type('6')
        cy.get('.product-table > tbody > .product-row > .cart-controls > .quantity > input').eq(5).type('20')
        cy.get('.product-table > tbody > .product-row > .cart-controls > .quantity > input').eq(8).type('48')
        
        cy.get('[name="details[recipient]"]').type('John Doe')
        
        cy.get('div.Select-control input').eq(1).type('O', { force: true })
        //options: Shop / Online / Custom / Wholesale / Slerp / Mail Out 
        cy.get('.Select-menu').contains('Online').click()
        //options: Warehouse / Store / Pick Up
        cy.get('select').first().select('Pick Up')

        //options: 000_BROWN_LARGE / 020_BROWN_SMALL / 040_BLACK_LARGE / 060_BLACK_SMALL / 080_BLACK_SINGLE
        cy.get('.pure-u-1-2 > .form-group').eq(13).find('[value="000_BROWN_LARGE"]').click()
        cy.get('.pure-u-1-2 > .form-group').eq(13).find('[value="020_BROWN_SMALL"]').click()
        
        cy.get('.pure-u-1-2 > .form-group').eq(11).find('[name="details[box_divider]"]').eq(1).click()
        cy.get('.pure-u-1-2 > .form-group').eq(12).find('[name="details[ribbon]"]').eq(1).click()

        cy.get('.pure-u-1-2 > .form-group > [name="details[fulfillmentNote]"]').type('test fulfillment note')
        cy.get('.pure-u-1-2 > .form-group > [name="details[customerNote]"]').type('test customer note')
        cy.get('.pure-u-1-2 > .form-group > [name="details[giftNote]"]').type('test gift note')
        cy.get('.pure-u-1-2 > .form-group > [name="details[packingNote]"]').type('test packing note')
        //cy.screenshot('/order/order')
        cy.get('.btn-green').contains('Create Order').click()
        
        cy.contains('.-active > .link', 'Overview')

        

    })
})
}