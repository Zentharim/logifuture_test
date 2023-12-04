// More than one of these functions can be defined and called accordingly in order to test the behaviour 
//on different mobile, by changing viewport

const helpersMobile = {

    mobileLayout(url){
      cy.viewport('iphone-xr')
        cy.visit(url, {
            headers: { 
              'user-agent': 'Mozilla/5.0 (Linux; Android 10; SM-N960F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.70 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/373.0.0.31.112;]'
                },
          })
    }
}
export default {...helpersMobile}