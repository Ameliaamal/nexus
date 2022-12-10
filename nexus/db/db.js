const mongoose = require('mongoose'); 
let connection = undefined; 
let connection2 = undefined;

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

const getConnection2 = async () => {
    if(connection2) {
        console.log('returning existing connection')
        return connection2
    } else {
        console.log('creating new connection')
        connection2 = await mongoose.connect('mongodb+srv://amal:v6qMN8fGtYH4lUlZ@cluster0.9f6mqjx.mongodb.net/<job>?retryWrites=true&w=majority')
        return connection2;
    }
}

module.exports = {
    getConnection,
    mongoose, 
    Schema: mongoose.Schema
};