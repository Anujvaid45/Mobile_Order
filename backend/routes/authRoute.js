const express = require('express')
const router = express.Router()
const {requireSignIn,isAdmin} = require('../middlewares/authMiddleware.js')
//controller functions
const {registerController,loginController, updateProfileController} = require('../controllers/authController')


//register
router.post('/register',registerController)

//login
router.post('/login',loginController)

//protected user route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

//protected admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});

//update the user profile
router.put('/profile',requireSignIn,updateProfileController)

module.exports = router

