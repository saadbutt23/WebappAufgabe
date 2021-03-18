const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
    Date : {
        type:Number,
        required : true
    }
}, {collection:"task"});

const people = mongoose.model("task", peopleSchema); 

module.exports = {people}; 
