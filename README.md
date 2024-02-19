# veterinariaWeb
This project space is for Apps 5A

Hey dude...

Follow the next steps:

Onece the repository is cloned, you need install Express in the repository.
The next step is to create 'config.js' and fill it the following info:
--------------------------------------
module.exports = {
    dev:{
        Serve:{
            PORT: process.env.PORT || 3000
        },
        Database:{
            CONECTION :process.env.DB_CONECTION_STRING  || <here write your key>
        },
        SECRET_TOKEN: "SECRETKEYACCESSTOKEN"
    },
    production:{
        Serve:{
            PORT: process.env.PORT || 3000
        },
        
        Database:{
            CONECTION : process.env.DB_CONECTION_STRING || <here write your key>
        },
        SECRET_TOKEN: "SECRETKEYACCESSTOKEN"

    }
}
-----------------------------------------------
