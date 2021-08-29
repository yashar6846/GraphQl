const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();
mongoose.connect(
  "mongodb+srv://gezaljan:gezal1234@cluster0.gguaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("MongoDB connevted");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("server connected!");
});
