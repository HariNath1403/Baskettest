const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

mongoose
  .connect(
    "mongodb+srv://harivinnathan:MImZ6e0g7PUFgOEa@baskets.eui4k.mongodb.net/Baskets",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error: ", err));

const basketSchema = {
  date: {
    type: Date,
    default: Date.now(),
  },
  username: String,
  serialNumber: String,
  from: String,
  to: String,
};

const Basket = mongoose.model("Basket", basketSchema);

app.get("/", (req, res) => {
  // res.send("Express is working");
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  let newBasket = new Basket({
    username: req.body.username,
    serialNumber: req.body.sn,
    from: req.body.from,
    to: req.body.to,
  });
  newBasket.save();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
