//MSSQL DB CONFIGURATION

//Config object for database
import sql from 'mssql';

const Config ={
    sqlConfig:{
        port:1433,
        user:"sa",
        password:'Kim@39063533#',
        server:'KIMANI-TECH',
        database:'BookDB',
        connectionTimeout:15000,
        pool:{
          max:10,
          min:0,
          idleTimeoutMillis:30000  
        },
        options:{
            encryp: false,
            trustServerCertificate: true,
            enableArithAbort: true
        }


    }
}
//Create a connection pool

let globalPool:sql.ConnectionPool | null = null;

//init Database Connection

export const initDatabaseConnection = async()=>{
    if(globalPool && globalPool.connected){
        console.log("Using database Connection")
        return(globalPool)
        
    }
    try{
       globalPool = await sql.connect(Config.sqlConfig)
       console.log("Connected to MSSQL DB")//establishing a new connection pool
       return globalPool
    }catch(error){
        console.group("BD connection failed: ", error)
        throw error;
    }
}

export const getDbPool = ():sql.ConnectionPool=>{
    if(!globalPool || !globalPool.connected){
        throw new Error('Database not connected. Call initDatabaseConnection() first.')
    }
    return globalPool;
}
export default initDatabaseConnection;