const mongoose = require('mongoose'); 
let connection = undefined; 


const getConnection = async () => {
    if(connection) {
        console.log('returning existing connection')
        return connection
    } else {
        console.log('creating new connection')
        connection = await mongoose.connect('mongodb+srv://amal:v6qMN8fGtYH4lUlZ@cluster0.9f6mqjx.mongodb.net/?retryWrites=true&w=majority')
        return connection;
    }
}



module.exports = {
    getConnection,
    mongoose, 
    Schema: mongoose.Schema
};