const express=require("express");
const router= express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressErorr=require("../utils/ExpressErorr.js");
// const {reviewSchema} = require("../schema.js");
const Review =require("../models/review.js");
const Listing=require('../models/listing.js');
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/review.js");


//review
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));
 
 module.exports = router;