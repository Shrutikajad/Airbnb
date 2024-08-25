//MVC FRAMEWORK

const Listing=require('../models/listing.js');

module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
};

module.exports.show=async(req,res)=>{
    let{id}= req.params;
    const listing= await Listing.findById(id)
    .populate({
        path:"reviews",
    populate:{
        path:"author",
    },
    })
    .populate("owner");
    if(!listing){
        req.flash("error"," Listing Deleted");
       res.redirect("/listings");
    }
    return res.render("./listings/show.ejs",{listing});
};

module.exports.create=async(req,res)=>{
    let url=req.file.path;
    let filename= req.file.filename;
    const newListing = new Listing(req.body.listing);
    // console.log(req.user);
    newListing.image={url,filename};
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
};

module.exports.edit=async(req,res)=>{
    let{id}= req.params;
    const listing= await Listing.findById(id);
    if(!listing){
        req.flash("error"," Listing Does not exits");
        res.redirect("/listings");
    }
    let originalImageUrl= listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.update=async(req,res)=>{
    let{id}= req.params;
    let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
 
   if (typeof req.file !== "undefined"){
   let url=req.file.path;
   let filename= req.file.filename;
   listing.image={url,filename};
   await listing.save();
   }
    req.flash("success"," listing Updated");
    return res.redirect(`/listings/${id}`);
};

module.exports.delete=async(req,res)=>{
    let{id}= req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," listing Deleted");
    res.redirect("/listings");
};