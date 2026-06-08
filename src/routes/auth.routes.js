const express= require('express')

const authRouter=express.Router()
/**
 * @route POST /api/auth/register
 * @description Register User
 * @access public
 */
authRouter.post("/register",async(req,res)=>{
    
})

module.exports=authRouter