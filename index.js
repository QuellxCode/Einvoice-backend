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
const nb = require("./routes/measurebook.js");
const comparison = require("./routes/comparison");
const pst_invoice = require("./routes/pst_invoice");
const fst_invoice = require("./routes/fst_invoice");

const cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

//Passport Config

require("./config/passport")(passport);
let db;
 db ='mongodb+srv://eplaza:C9cVzVUfFdI9yvOk@eplaza-vpoui.mongodb.net/eInvoice'

//DB config
// const environment = require("./config/keys").ENVIRONMENT;
// if (environment == "live")
//db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@eplaza-vpoui.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`;
// } else {
//db = require("./config/keys").MongoUri;
// }
console.log(db);
//Connect to Mongo
MONGODB_URI = mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

//Body Parser

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", user);
app.use("/api/tenders", tender);
app.use("/api/itb", itb);
app.use("/api/pec", pec);
app.use("/api/mb", nb);
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
