const mongodb = require("mongodb");
const mongoose = require("mongoose");
async function getDatabase() {
  mongoose
    .connect(
      "mongodb+srv://nandha020999:Nandha123@cluster0.kjwu8fw.mongodb.net/NextJstest?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("db not connected", error));
}
export default getDatabase;
