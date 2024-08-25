const express =require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/post.js");
const cookieParser=require("cookie-parser");
const session= require("express-session");
const flash =require("connect-flash");
const path = require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//SESSION
 const sessionOptions={secret:"mysupersecretstring",
 resave:false,saveUninitialized:true };

 app.use(session(sessionOptions));
 app.use(flash());

 app.get("/register",(req,res)=>{
    let{name="anonymous"}=req.query;
    req.session.name= name;
    if(name==="anonymous"){
      req.flash("error","user not registered ");
    }else{
      req.flash("success","user registered successfully!");
    }
   
    res.redirect("/hello");
 });

 app.get("/hello",(req,res)=>{
   res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.render("page.ejs",{name:req.session.name});
 });
 
//  app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//     req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
//  });

//  app.get("/test",(req,res)=>{
//     res.send("test successful!");
//  });

 app.listen(3000,()=>{
    console.log("server is listening to 3000");
});     

//COOKIES
// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookies sent");
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.cookie("greet1","namaste");
//     res.cookie("greet2","RamRam");
//     res.cookie("name","Shrutika");
//     res.send("sent you some cookies");
// });

// app.get("/greet",(req,res)=>{
//     let{name ="anonymous"}=req.cookies;
//     res.send(`Hi,${name}`);
// });

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi, I am root");
// });

// app.use("/users",users);
// app.use("/posts",posts);


// app.get("/",(req,res)=>{
//     res.send("hii ,I am root !!");
// });



