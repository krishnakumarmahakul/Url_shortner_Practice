const User=require("../models/user");
const {getUser}=require("../services/auth")

exports.ensureAuth=async (req,res,next)=>{

    const uid=req.cookies?.uid;

    if (!uid) {
       return res.status(400).redirect("/login");

        
    }

    const user=getUser(uid);

    if (!user) {

        return res.status(400).redirect("/login");
        
    }
    req.user = user;
    next()


}