const nigeria_prod_urls = require("./nigeria/prod/urls")
const nigeria_prod_users = require("./nigeria/prod/users")

const nigeria_stg_urls = require("./nigeria/stg/urls")
const nigeria_stg_users = require("./nigeria/stg/users")

const utils = {
    NG: {
        PRD: {
            urls: nigeria_prod_urls,
            users: nigeria_prod_users
        },
        STG: {
            urls: nigeria_stg_urls,
            users: nigeria_stg_users
        }
    }
}
module.exports = utils