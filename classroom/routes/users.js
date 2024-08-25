const express=require("express");
const router= express.Router();

//index -user
router.get("/",(req,res)=>{
    res.send("GET for show users");
});

//Show user
router.get("/:id",(req,res)=>{
    res.send("GET for show users id ");
});

//POSt user
router.post("/",(req,res)=>{
    res.send("POST for show users");
});

// Delete user
router.delete("/:id",(req,res)=>{
    res.send("Delete for show users id");
});

module.exports = router;