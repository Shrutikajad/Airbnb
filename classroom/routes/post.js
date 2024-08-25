
const express=require("express");
const router= express.Router();

//index 
router.get("/",(req,res)=>{
    res.send("GET for post");
});

//Show 
router.get("/:id",(req,res)=>{
    res.send("GET for  posts id");
});

//POSt 
router.post("/",(req,res)=>{
    res.send("POST for   posts");
});

// Delete 
router.delete("/:id",(req,res)=>{
    res.send("Delete for  posts id ");
});

module.exports = router;