const router = require("../routes/myRoutes");
const abc = require("../model/template");
const moment = require("moment"); 

const homepage = (req,res)=>{
    res.render("index")
}

const register = ((req,res)=>{
    var unix=Math.floor(Date.now()/1000);
    const form = (body)=>{
    abc.people(body).save()
            .then(()=>{
                res.send("Unix Time has been submitted to MongoDB");
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        form({Date: unix});
    
  
    
})

const Zahl = (req,res,next)=>{
        let numberOfDays = +req.params.Zahl;
        let Unix = Math.round(new Date().getTime()/1000);
        let numberUnix = 86400*numberOfDays; // from input
        let future = (numberUnix+Unix);
        let futureDate = new Date(future * 1000);
        let upperLimit = futureDate
        let lowerLimit = (Unix-numberUnix);
        let pastDate = new Date(lowerLimit*1000); 
        req.pastDate = lowerLimit;
        req.futureDate = futureDate; 
              
        next(); 
        res.render("range", {upperLimit:futureDate, lowerLimit:pastDate, days:numberOfDays} )
    }
    
    const submit = (req,res)=>{
        
        let a = req.pastDate;
        let b = req.futureDate;
        let Time = new Date(a*1000); 
        const form = (body)=>{
            
            let c = moment(req.body.Date).format();
            let d = (new Date(c).getTime()*1000)/1000; 
            if(req.body){
                async function doWork(){
                let UnixStart = new Date(a).getTime()*1000;
                let UnixEnd = (new Date(b).getTime()*1000)/1000;
                let EnteredValue = new Date(req.body.Date).getTime()*1000;
                              
                if(d>=UnixStart && d<=UnixEnd){
                    
                    let dataEntry = await abc.people(body).save();
                    return res.status(200);                                             
                                                   
                }
            
                else{
                    
                 res.render("status", {lowerLimit:Time, upperLimit:b});
                   
                 
                }
            }
                    doWork(); // call the function here      
         
        }
            else{
                throw ("err");
            }
            
        }
    
        form(req.body);
         
      
}


module.exports = {homepage,register,Zahl,submit}