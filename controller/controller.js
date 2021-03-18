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
                res.send("all good");
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        form({Date: unix});
    
  
    
})

const datum = (req,res)=>{
    let normalDate = (req.params.Datum);
    let DateEntered = new Date(normalDate).getTime()/1000;
    console.log("DateEntered",DateEntered);
    abc.people.find({},(err,data)=>{
        let UnixTimeStamp = data[data.length-1].Date;
        console.log("current Unix", UnixTimeStamp);
        if(((UnixTimeStamp-DateEntered))>1000000){
            res.send(`Das eingegebene Datum liegt ${Math.floor(((UnixTimeStamp-DateEntered)/86400))} Tage in der Vergangenheit`);
        }
        
        else{
            if(UnixTimeStamp-DateEntered<0){
                let status = Math.floor(((UnixTimeStamp-DateEntered)/86400)*-1);
                         
                res.send(`Das eingegebene Datum liegt ${status} Tage in der Zukunft`);

            }
            else{
                res.send("Das eingegebene Datum is heute")
            }
                       
        }

      
       
    });

}

const Zahl = (req,res,next)=>{
        let numberOfDays = +req.params.Zahl;
        console.log(numberOfDays);
        let Unix = Math.round(new Date().getTime()/1000);
        console.log("the unix time", Unix);
        let numberUnix = 86400*numberOfDays; // from input
        let future = (numberUnix+Unix);
        console.log("thats the future value", future);
        let futureDate = new Date(future * 1000);
        console.log("future date", futureDate); // upper limit of date
        let upperLimit = futureDate


        let lowerLimit = (Unix-numberUnix);
        let pastDate = new Date(lowerLimit*1000);
        console.log("past date", pastDate); // past limit
        
        
        req.pastDate = lowerLimit;
        req.futureDate = futureDate; 
        
        console.log("hi", req.pastDate);
        next(); 
        res.render("range", {upperLimit:futureDate, lowerLimit:pastDate, days:numberOfDays} )
    }
    
    const submit = (req,res)=>{
        
        let a = req.pastDate;
        let b = req.futureDate;
        let Time = new Date(a*1000); 
        console.log("this is time", Time);  
        const form = (body)=>{
            console.log("this is req.body", req.body);
            let c = moment(req.body.Date).format();
            let d = (new Date(c).getTime()*1000)/1000; 
            if(req.body){
                async function doWork(){
                let UnixStart = new Date(a).getTime()*1000;
                let UnixEnd = (new Date(b).getTime()*1000)/1000;
                let EnteredValue = new Date(req.body.Date).getTime()*1000;
                console.log("This is Entered value",d);
                console.log("Unix Start", UnixStart);
                console.log("Unix End", UnixEnd);
                console.log(d<=UnixEnd);
                console.log(d>=UnixStart && d<=UnixEnd);
               
                if(d>=UnixStart && d<=UnixEnd){
                    
                    let bla = await abc.people(body).save();
                    console.log(bla);
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


module.exports = {homepage,register,datum,Zahl,submit}