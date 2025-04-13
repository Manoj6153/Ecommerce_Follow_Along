const rolemiddleware=(role)=>async (req,res,next)=>{
    if(role.includes(req.user.role)){
      next()
    }
    else{
      res.status(400).json({message:"access deniued"})
    }
  }
  
module.exports=rolemiddleware