const express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const morgan = require('morgan')

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function connectDb(){
    try {
        await client.connect()

        await client.db("rtt-54").command({ping:1})
        console.log('DB connection successful');
        
    } catch (error) {
        
    }
}

connectDb().catch(console.dir);


const PORT = 4000 || process.env.PORT;


const app = express();

//middleware
app.use(morgan('dev'));


//route
app.get('/', async (req, res) =>{
    try {
        const cursor = await client.db("digital-bookshelf").collection('books').find({});
        const result = await cursor.toArray();
        res.json({ message: "Successfully connected to the database!"});
    } catch (error) {
        res.status(500).json({ message: "Failed to connect to the database."})
    }
})



app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`);
    
})