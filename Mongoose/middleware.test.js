import mongoose from "mongoose";

// Step-01: Create the connection
try {
  await mongoose.connect("mongodb://localhost:27017/mongoose-database");
  mongoose.set("debug", true);
} catch (error) {
  console.log(error);
}

// STEP-02 : Create Schema
// IDEA: {timestamps: true} by adding this property we do not need to use the `Middlewares` to track the times
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 5 },
    //   createdAt: { type: Date, default: Date.now },
    //   updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

// IDEA: {Middleware always used before model.}
// I will use The `middleware` to set the correct update time

// userSchema.pre(["updateOne", "findOneAndUpdate"], function () {
//   this.set({ updatedAt: Date.now() });
// });

// Step-03: Creating a model
const Middleware = mongoose.model("middleware", userSchema);

// 'Insert the data to the middleware Collection'
// await Middleware.create({name: "Alok Pradhan", age: 23, email: "alok@gmail.com"})
await Middleware.create({name: "Deepka Guda", age: 19, email: "deepak@gmail.com"})

// 'Update the data from middleware Collection'
// await Middleware.updateOne({ email: "alok@gmail.com" }, { $set: { age: 19 } });

await mongoose.connection.close();
