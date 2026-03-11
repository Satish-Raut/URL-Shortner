
import mongoose from "mongoose"

// STEP-01 : Connection create with the database
try {
    await mongoose.connect("mongodb://localhost:27017/mongoose-database")
    mongoose.set("debug", true)
} catch (error) {
    console.log(error)
}

// STEP-02 : Create Schema
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true, min: 5},
    createdAt: {type: Date, default: Date.now()}
})

// STEP-03: Creating a model {Model is a Class created from schema that allows us to perform CRUD operations on that collection.}
const Student = mongoose.model("student", userSchema);

// Perform the CRUD operation
await Student.create({name: "Satish", age: 21, email: "satish@gmail.com"})

// STEP-04: Close the connection
await mongoose.connection.close();