const userModel=require("../models/user.model")
const bcrypt= require("bcryptjs")
const jwt= require("jsonwebtoken")
const tokenBlacklistModel=require("../models/blacklist.model")
/**
 * @name registerUserController
 * @description Register new User, expects username, emaila and password in  request.
 * @access public
 * @returns 
 */
async function registerUserController(req, res){
    const { username, email, password}=req.body

    if(!username || !email || !password)
    {
        return res.status(400).json({
            message: "Please provide username , email and password"
        })
    }
    const isUserAlreadyExists=await userModel.findOne({
        $or:[{username}, {email}]
    })

    if(isUserAlreadyExists)
    {
        return res.status(400).json({
            message:"Account already exists with this email address"
        })
    }
    const hash= await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        password:hash
    })
    const  token=jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token", token)

return res.status(201).json({
    message: "User registered successfully",
    user: {
        id: user._id,
        username: user.username,
        email: user.email
    }
})
}
/**
 * @name loginUserController
 * @description Login User, expects username and password in  request.
 * @access public
 * @returns 
 */
async function loginUserController(req, res){
    const { email, password}=req.body
    const user= await userModel.findOne({email})

    if(!user)
    {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid=  await bcrypt.compare(password,user.password)

    if(!isPasswordValid)
    {
        return res.status(400).json({
            message:"Invalid email or Password"
        })
    }
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token)
    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name logoutUserController
 * @description Logout user by clearing the token from cookie and adding it to blacklist
 * @access public
 */
async function logoutUserController(req, res){
    const token=req.cookies.token
    if(token){
        await tokenBlacklistModel.create({token})
    }
    res.clearCookie("token")

    res.status(200).json({
        message:"User logged out sucessfully"
    })
}


/**
 * @name getMeController
 * @description Get current logged in user
 * @access private
 */
async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            user
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        })
    }
}

module.exports={
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
