let mongo = require("mongodb")
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://atish_raj:L9T9JGPuCGtrweK5@cluster0.wtwtizn.mongodb.net";

const client = new MongoClient(uri);

async function dbConnect(){
    await client.connect()
}

const db = client.db('test');

async function getData(colName, query){
    let output = []
    try{
        const corsor = db.collection(colName).find(query)
        for await(const data of corsor){
            output.push(data)
        }
        corsor.close()
    }catch(err){
        output.push({"Error":"Error in get Data"})
    }
    return output
}

module.exports = {
    dbConnect,
    getData
}