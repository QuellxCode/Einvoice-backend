const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const user = require("./routes/users");
const tender = require("./routes/tender");
const itb = require("./routes/itb");
const notification = require("./routes/notification");
const pec = require("./routes/pec");
const workdone = require("./routes/workdone");
const workorder = require("./routes/workorder");
const quotation = require("./routes/quotation");
const quotationLog = require("./routes/quotationLog");
const comparison = require("./routes/comparison");
const pst_invoice = require("./routes/pst_invoice");
const fst_invoice = require("./routes/fst_invoice");

const cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

// app.use(function(req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "localhost:4200");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader("Access-Control-Allow-Headers", "content-type");

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

//Passport Config

require("./config/passport")(passport);
let db;
//DB config
// const environment = require("./config/keys").ENVIRONMENT;
// if (environment == "live")
//db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@eplaza-vpoui.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`;
// } else {
db = require("./config/keys").MongoUri;
// }
console.log(db);
//Connect to Mongo
MONGODB_URI = mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

//Body Parser

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", user);
app.use("/api/tenders", tender);
app.use("/api/itb", itb);
app.use("/api/pec", pec);
app.use("/api/workdone", workdone);
app.use("/api/notification", notification);
app.use("/api/workorder", workorder);
app.use("/api/quotation", quotation);
app.use("/api/quotation-log", quotationLog);
app.use("/api/comparison", comparison);
app.use("/api/pst_invoice", pst_invoice);
app.use("/api/fst_invoice", fst_invoice);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on ${PORT}`));