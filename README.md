# Logifuture Skill Test
## Introduction
This repo contains my solution for the two challenges presented. They are both presented into the same test, since the second is basically solved with a different configuration.

This test repo is built in Cypress on Windows, so in order to run the tests you need to have NodeJS installed. After having installed it you need to open a terminal, bring yourself to the root of the repo, and run

    npm i

At this point you can run the tests either on STG or PRD environment with the two following commands:

    npm run cy:nigeria_prod_run
    npm run cy:nigeria_stg_run

This two commands hides environment variables both for the environment and the product

    target_env=PRD,target_tenant=NG
When run through the given commands, the test will run on an headless browser (Electron), but you can also run them onto Chrome, Edge or Firefox, through the following commands:

    npm run cy:nigeria_prod
    npm run cy:nigeria_stg

## Limitations and future improvements
Currently the test runs only with a single viewport, but changing/adding other functions with different viewports in 

    ./support/helpersMobile
can lead to support different viewports.
 
## Test Plan
This is a brief test plan for the login functionality of Bet9ja mobile.
### Form Rendering
This ensure that the login page is rendered as expected, with the proper input fields.

### Invalid Login
This ensures that, when incorrect credentials are provided, the correct answers are given.

- Incorrect username and password leads to failure to login.
- Existing username and invalid password will lead to an error message showing the number of remaining attempts before account locking.
- A repeated attempt to log in with an incorrect password will show diminishing attempts.
- After five attempts the account should be locked. This might be an interesting addition later on.

### Valid Login
- When correct username and password are used, the user should be logged in and redirected to the home page.

### Security Checks
- Not implemented, but basic checks against SQL Injection could be added 