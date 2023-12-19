const express = require('express')
const {isAdmin,requireSignIn} = require('../middlewares/authMiddleware.js')
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, searchProductController, relatedProductController, productCountController, productListController, braintreeTokenController, braintreePaymentController } = require('../controllers/productController.js')
const router = express.Router()
const formidable = require('express-formidable')

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

router.patch('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//get products
router.get('/get-product',getProductController)

//get single product
router.get('/get-product/:slug',getSingleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//delete product
router.delete('/product-delete/:pid',deleteProductController)

//filter product
router.post("/product-filters", productFiltersController);

//search product
router.get("/search/:keyword", searchProductController)

//similar product
router.get("/related-product/:pid/:cid",relatedProductController)

//product count
router.get('/product-count',productCountController)

//product per page
router.get('/product-list/:page',productListController)

//payment routes
//obtain token
router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController)


module.exports = router