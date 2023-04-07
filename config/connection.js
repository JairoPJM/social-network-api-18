const mongoose = require("mongoose");

// Node will look for this environment variable and use it if it exists; otherwise, it will use a local database
const dbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialmediaDB";

// Connect to the database using the provided URI
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Store the connection in a variable
const dbConnection = mongoose.connection;

// Export the connection
module.exports = dbConnection;
