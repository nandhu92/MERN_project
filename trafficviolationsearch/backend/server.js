const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const fs = require('fs');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const url = "mongodb+srv://nandhu16192:nandhini@cluster0.tmonq.mongodb.net/";
mongoClient.connect(url, function(err, client) {
    let db = client.db('montgomerycountiesdb')
     const bucket = new mongodb.GridFSBucket(db, {
         chunkSizeBytes: 1024,
         bucketName: 'fs'})

         bucket.openDownloadStreamByName("virginia.png").pipe(
            fs.createWriteStream('../src/images/virginia.png'))
        bucket.openDownloadStreamByName("pennsylvania.png").pipe(
            fs.createWriteStream('../src/images/pennsylvania.png'))
        bucket.openDownloadStreamByName("maryland.png").pipe(
            fs.createWriteStream('../src/images/maryland.png'))
        bucket.openDownloadStreamByName("DC.png").pipe(
            fs.createWriteStream('../src/images/DC.png'))
    })


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true})


const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
})

const funcRouter = require('./routes/functions');

app.use('/functions', funcRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});