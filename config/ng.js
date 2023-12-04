const { defineConfig } = require('cypress');
const path = require("path");
const utils = require("../website/utils/utils")

let  timeElapsed = Date.now();
let today = new Date(timeElapsed);
let day = today.toLocaleDateString(('ko-KR')).replaceAll('. ','_').replace('.','');
let timenow = today.toLocaleTimeString().replaceAll(':','_');


module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "./cypress/reports/NG_"+day,
    reportFilename: "report_[status]_"+timenow,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  env: {
    "grepFilterSpecs": true
  },
  e2e: {
    supportFile: "support/e2e.js",
    chromeWebSecurity: false,
    video: false,
    specPattern: "website/specs",
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 20000,
    retries: 3,
    
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/grep/src/plugin')(config);
      const tenant = config.env.target_tenant
      const environment = config.env.target_env
      config.env.urls = utils[tenant][environment]["urls"]
      config.env.users = utils[tenant][environment]["users"]

      let ids
      on('task', {
        saveIds(idsPar) {
          return (ids = idsPar)
        },
        getIds() {
          return ids
        }
      })
      
      const fs = require('fs')
      on('after:screenshot', (details) => {
        // IMPORTANT: below use / for execution on linux/server, \\ for execution on windows 
        var lastIndex = details.path.lastIndexOf("\\");
        var filePath = details.path.substring(0, lastIndex);
        const newPath = path.resolve(filePath, details.takenAt.replace(/:/g,".")+'.png')
        
        return new Promise((resolve, reject) => {
          // fs.rename moves the file to the existing directory 'new/path/to'
          // and renames the image to 'screenshot.png'
          fs.rename(details.path, newPath, (err) => {
            if (err) return reject(err)

            // because we renamed and moved the image, resolve with the new path
            // so it is accurate in the test results
            resolve({ path: newPath })
          })
        })
      })
      return config
    },
  },
});
