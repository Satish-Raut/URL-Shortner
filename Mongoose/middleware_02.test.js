import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mongoose-database");
    mongoose.set("debug", true);

    const userSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, required: true, min: 5 }
      },
      { timestamps: true }
    );

    const User = mongoose.model("User", userSchema);

    await User.updateOne(
      { email: "alok@gmail.com" },
      { $set: { age: 30 } }
    );

  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

main();