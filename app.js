
if(process.env.NODE_ENV  !="production"){
   require("dotenv").config();
};

console.log(process.env.SECRET);

const express= require("express");
const app=express();
const mongoose= require("mongoose");
const Listing=require('./models/listing.js');
// const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";
const path=require("path");
const methodOverride =require("method-override");//middleware
const ejsMate=require("ejs-mate");
const ExpressErorr=require("./utils/ExpressErorr.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter =require("./routes/review.js");
const  userRouter =require("./routes/user.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash= require("connect-flash");
const passport = require("passport");
const LocalStrategy= require("passport-local");
const User=require("./models/user.js");
const dbUrl=process.env.ATLASDB_URL;

//Now recap your problem,please
//hello,Are you there?
//yess


 main()
.then(()=>{
   console.log("connected to db");
  })
 .catch((err)=>{
     console.log(err);
  });
  async function main(){
   await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24 *3600,
});

const sessionOptions={ 
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized:true,
    cookie: {
        expires: Date.now()+ 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 *1000,
        httpOnly:true,
    },

};

store.on("error",()=>{
    console.log("Error in MongoDB Session store",err);
});



// app.get ("/",(req,res)=>{
//     res.send("Hii,I am root");
//    });



//    const validateListing=(req,res,next)=>{
//     let{error}=listingSchema.validate(req.body);
//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",");
//         throw new ExpressErorr(400,errMsg);
//     }else{
//         next();
//     }
    
// };

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"Shrutika@gmail.com",
//         username:"shrutika",
//     });

//     let registeredUser= await  User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


app.all("*",(req,res,next)=>{
    next(new ExpressErorr(404, "Page Not Found !!!"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="SOmething went worng"}=err;
    // res.status(statusCode).send(message); 
    res.status(statusCode).render("error.ejs",{message});
});


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

