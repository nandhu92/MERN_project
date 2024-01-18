const {MongoClient} = require('mongodb');

async function main(){
    const uri = "mongodb+srv://kk6915:RGWxxTHWmb7vAUgh@cluster0.azxgd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to Database");
        await listDatabases(client);
    } catch(e){
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};