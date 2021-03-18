const express = require("express");
const controller = require("../controller/controller");
const router = express.Router(); 
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended:false});

router.get("/homepage",controller.homepage); 
router.get("/homepage/:Datum",controller.datum);
router.post("/UnixTime", urlencodedParser,controller.register)
router.get("/page/:Zahl", controller.Zahl)
router.post("/dateSubmission/:Zahl", urlencodedParser, controller.Zahl, controller.submit)



module.exports = router; 