module.exports = {
    dev:{
        Serve:{
            PORT: process.env.PORT || 3000
        },
        Database:{
            CONECTION :process.env.DB_CONECTION_STRING  || 'cadena de conexion a mongodb local'
        },
        SECRET_TOKEN: "SECRETKEYACCESSTOKEN"
    },
    production:{
        Serve:{
            PORT: process.env.PORT || 3000
        },
        
        Database:{
            CONECTION : process.env.DB_CONECTION_STRING || `cadena de conexion a mongodb de produccion`
        },
        SECRET_TOKEN: "SECRETKEYACCESSTOKEN"

    }
}