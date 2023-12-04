import bonusModalElements from './bonus_modal'
import loginPageElements from './login_page'

const headerMobile = {

    // Account menu elements
    accountMenuButton: '.icon-account',
    accountMenuCloseButton: '.icon-close',
    logoutBtn: '#myaccountmenu_logout',

    // Header elements
    logo: '#header_link_home_logo',
    loginBtn: '#header_link_login',
    registerLnk: '#header_link_register',
    search: '.quick-search',
    backButton: '.txt-l > .h-s__wrap-trigger',
    myAccountLabel: '.txt-secondary',
    userInfoBalanceText: 'div.account__info-item',
    // Quick Links
    quickLinksElements: '.q-links__item',
    // Banners
    bannersContainer: '.carousel__items',

    // Labels And Messages
    loginBtnMessage: 'Login',
    logoutBtnMessage: 'Logout',
    
    loginMobile(username, password){
        cy.get(this.loginBtn).should('be.visible').contains("Login").click()
        cy.url().should('be.equal', Cypress.env('urls')['login_page_mobile_URL'])
        cy.get(loginPageElements.loginPageUsername).should('be.visible').clear().type(username)
        cy.get(loginPageElements.loginPagePassword).should('be.visible').clear().type(password)  
        cy.get(loginPageElements.loginPageLoginBtn).click()     
        cy.wait(3000)
        cy.get('body').then(($ele) => {
            if ($ele.find(bonusModalElements.bonusModal).length > 0) {
                cy.get(bonusModalElements.bonusModalCloseBtn).click()
            }
        })
        cy.get(this.userInfoBalanceText).should('be.visible') 
    },

    }
    export default {...headerMobile}