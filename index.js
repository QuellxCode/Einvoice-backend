const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const jwt = require("jsonwebtoken");
const config = require("config");
const http = require("http");
//Modals import
const { User } = require("./models/User");
const moment = require("moment");
const fileUpload = require('express-fileupload');
const path = require('path');
const user = require("./routes/users");
const multer = require('multer');

const news = require("./routes/News");
const compaign = require("./routes/compaign");
const donationProduct = require("./routes/donationProduct");
const product = require("./routes/product");
const donationRequest = require("./routes/donationRequest");
const donation = require("./routes/donation");
const volunteer = require("./routes/volunteer");

// const donation = require("./routes/donation");

const cors = require("cors");
app.use(cors());
app.options("*", cors());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static("public"));
// app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json({ extended: false }));



// const cors = require('cors');


// const app = express();

app.use(express.static('public'))

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage })

// app.use(cors());



app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file)
    res.json({
      imageUrl: `images/uploads/${req.file.filename}`
    });
  else 
    res.status("409").json("No Files to Upload.")
});


// // app.use(express.static('public'));
// app.use(fileUpload());

// app.post('/upload', (req, res) => {

//     if (!req.files) {
//         return res.status(500).send({ msg: "file is not found" })
//     }

//     const myFile = req.files.file;
//     const imagePath = path.join(__dirname, '/public/uploads');
//     // Use the mv() method to place the file somewhere on your server
//     myFile.mv(`/public/uploads/${myFile.name}`, function (err) {
//         if (err) {
//             console.log(err)
//             return res.status(500).send({ msg: "fuck eroor" });
//         }
//         return res.send({ file: myFile.name, path: `/${myFile.name}`, ty: myFile.type });
//     });
// })


// app.use(fileUpload());


// // Upload Endpoint
// app.post('/upload',async (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }

//   const file = req.files.file;

//   console.log('file', file)

//   file.mv('./public/uploads/'+ file.name, err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });

 
// });


// for load image

// app.use('/public', express.static('public'));

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
 db = 'mongodb+srv://rehmanali:reh@123@softdix-jbnfd.mongodb.net/hfa?retryWrites=true&w=majority'
//  db ='mongodb+srv://eplaza:C9cVzVUfFdI9yvOk@eplaza-vpoui.mongodb.net/efund'

//DB config
// const environment = require("./config/keys").ENVIRONMENT;
// if (environment == "live")
// db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@eplaza-vpoui.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`;
// } else {
//db = require("./config/keys").MongoUri;
// }
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
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./routes/index"));

app.use("/api/user", user);

app.use("/api/news", news);
app.use("/api/compaign", compaign);
app.use("/api/donationProduct", donationProduct);
app.use("/api/product", product);
app.use("/api/donationRequest", donationRequest);

// app.use("/api/project", project);
app.use("/api/donation", donation);
app.use("/api/volunteer", volunteer);








const PORT = process.env.PORT || 3000;

var server = http.createServer(app);

server.listen(PORT, console.log(`Server started on ${PORT}`));
