/**
 * @author Matteo Settembrini <m.settembrini@logispin.com>
*/

import headerElements from '../pages/header';
import bonusModalElements from '../pages/bonus_modal';
import loginPageElements from '../pages/login_page';
import helpersMobile from '../../support/helpersMobile';
// import "cypress-real-events/support";

beforeEach(() => {helpersMobile.mobileLayout(Cypress.env('urls')['sports_mobile_URL'])}) 
describe('Header mobile login functionality', 
    { tags: ["bet9ja", "login", "prod", "stg"] },
    () => {

    it("Render page", function(){
        cy.get(headerElements.loginBtn).should('be.visible').contains("Login").click()
        cy.get(loginPageElements.loginPageUsername).should('be.visible')
        cy.get(loginPageElements.loginPagePassword).should('be.visible')
        cy.get(loginPageElements.loginPageLoginBtn).should('be.visible').contains(loginPageElements.loginBtnMessage)
        cy.get(loginPageElements.forgottenPassword).should('be.visible').contains(loginPageElements.forgottenPasswordMessage)
    })
        
    it("Invalid login", function(){
        // Invalid usernamme and password
        cy.get(headerElements.loginBtn).should('be.visible').contains("Login").click()
        cy.url().should('be.equal', Cypress.env('urls')['login_page_mobile_URL'])
        cy.get(loginPageElements.loginPageUsername).should('be.visible').type('invalidUsername')
        cy.get(loginPageElements.loginPagePassword).should('be.visible').type('invalidPassword')
        cy.get(loginPageElements.loginPageLoginBtn).click()


        cy.get(loginPageElements.loginPageInfo).contains(loginPageElements.loginPageInfo_DetailsNotRecognized).should('be.visible')
        cy.get(loginPageElements.loginPageUsername).should('be.visible').clear().type(Cypress.env('users')['username1'])
        cy.get(loginPageElements.loginPagePassword).should('be.visible').clear().type('invalidPassword')
        cy.get(loginPageElements.loginPageLoginBtn).click()
        
        cy.get(loginPageElements.loginPageInfo).contains(loginPageElements.loginPageInfo_FourAttempts).should('be.visible')
        cy.get(loginPageElements.loginPageUsername).should('be.visible').clear().type(Cypress.env('users')['username1'])
        cy.get(loginPageElements.loginPagePassword).should('be.visible').clear().type('invalidPassword')  
        cy.get(loginPageElements.loginPageLoginBtn).click()
        
        cy.get(loginPageElements.loginPageInfo).contains(loginPageElements.loginPageInfo_ThreeAttempts).should('be.visible')
        // This correct login is to bring back the situation to a "clean" one
        cy.get(loginPageElements.loginPageUsername).should('be.visible').clear().type(Cypress.env('users')['username1'])
        cy.get(loginPageElements.loginPagePassword).should('be.visible').clear().type(Cypress.env('users')['password1'])  
        cy.get(loginPageElements.loginPageLoginBtn).click()     
    })     

    it("Valid login", function () {
        cy.get(headerElements.loginBtn).should('be.visible').contains(headerElements.loginBtnMessage).click()
        cy.url().should('be.equal', Cypress.env('urls')['login_page_mobile_URL'])
        cy.get(loginPageElements.loginPageUsername).should('be.visible').clear().type(Cypress.env('users')['username1'])
        cy.get(loginPageElements.loginPagePassword).should('be.visible').clear().type(Cypress.env('users')['password1'])  
        cy.get(loginPageElements.loginPageLoginBtn).click()     
        cy.wait(3000)
        cy.get('body').then(($ele) => {
            if ($ele.find(bonusModalElements.bonusModal).length > 0) {
                cy.get(bonusModalElements.bonusModalCloseBtn).click()
            }
        })
        cy.url().should('be.equal', Cypress.env('urls')['sports_mobile_URL'])
        cy.get(headerElements.userInfoBalanceText).should('be.visible') 
    })

    it("Logout", function () {
        headerElements.loginMobile(Cypress.env('users')['username1'], Cypress.env('users')['password1'])
        cy.get(headerElements.accountMenuButton).click()      
        cy.get(headerElements.logoutBtn).contains(headerElements.logoutBtnMessage).click()
        cy.get(headerElements.loginBtn).contains(headerElements.loginBtnMessage).should('be.visible')
    })
})