const mongoose = require("mongoose");

//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection
const ListSchema = new mongoose.Schema({
    title: {type: String, required:true, unique: true},
    type: {type: String},
    genre: {type: String},
    content: {type: Array}
    },
    {timestamps: true}    
);

module.exports = mongoose.model("List", ListSchema);