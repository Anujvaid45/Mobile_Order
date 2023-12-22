const express = require('express')
const router = express.Router()
const {requireSignIn,isAdmin} = require('../middlewares/authMiddleware.js')
//controller functions
const {registerController,loginController, updateProfileController,orderStatusController,getOrdersController,getAllOrdersController} = require('../controllers/authController')


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

//all orders of user
router.get('/orders',requireSignIn,getOrdersController)

//all orders data for admin
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

//order status
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)

module.exports = router

