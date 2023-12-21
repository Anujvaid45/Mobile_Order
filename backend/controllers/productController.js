const slugify  = require('slugify')
const productModel = require('../models/productModel.js')
require('dotenv').config()
const fs = require('fs')
var braintree = require("braintree");
const orderModel = require('../models/orderModel.js')

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });

const createProductController = async(req,res)=>{
    try {
        const {name,slug,description,price,quantity,processor,memory} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})
            case !price:
                return res.status(500).send({error:'Price is required'})    
            case !quantity:
                return res.status(500).send({error:'Quantity is required'})
            case photo && photo.size>1000000:
                return res.status(500).send({error:'photo is required and should be less than 1mb'})    
            case !processor:
                return res.status(500).send({error:'Processor is required'})  
            case !memory:
                return res.status(500).send({error:'Memory is required'})         
        }
        
        const products = new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product created successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success:false,
            error,
            message:"Error in creating product"
        })
    }

}

//update product
const updateProductController = async(req,res)=>{
    try {
        const {name,slug,description,price,quantity,processor,memory} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})
            case !price:
                return res.status(500).send({error:'Price is required'}) 
            case !quantity:
                return res.status(500).send({error:'Quantity is required'})
            case photo && photo.size>1000000:
                return res.status(500).send({error:'photo is required and should be less than 1mb'})    
            case !processor:
                return res.status(500).send({error:'Processor is required'})  
            case !memory:
                return res.status(500).send({error:'Memory is required'})            
        }
        
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields ,slug:slugify(name)},{new:true}
            )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product updated successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in updating product"
        })
    }

}

//get all products
const getProductController = async(req,res)=>{
    try {
        
        const products = await productModel.find({}).select('-photo').limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            countTotal:products.length,
            message:'All products',
            products
        })
   
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in showing products"
        })
    }
}

//get single product
const getSingleProductController = async(req,res)=>{
    try {
        const product  = await productModel.findOne({slug:req.params.slug}).select('-photo')
        res.status(200).send({
            success:true,
            message:'Fetched Single Product',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in showing product"
        })
    }
}

//get photo
const productPhotoController = async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if(product.photo.data)
        {
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in showing photo"
        })
    }

}

//delete product
const deleteProductController = async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success:true,
            message:'Product deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in deleting product"
        })
    }

}

// filters
 const productFiltersController = async (req, res) => {
    try {
      const {  radio ,memory} = req.body;
      let args = {};
    //   if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      if(memory) args.memory = memory;
      const products = await productModel.find(args);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error While Filtering Products",
        error,
      });
    }
  };

  const searchProductController = async(req,res)=>{
    try {
        const {keyword} = req.params
        const result = await productModel.find({
            $or:[
                {name:{$regex :keyword,$options: "i"}},
                {description:{$regex :keyword,$options: "i"}}
            ],
        })
        .select("-photo");
        res.json(result);    
    } catch (error) {
        console.log(error);
      res.status(400).send({
        success: false,
        message: "Error While Searching Products",
        error,
      });
    }

  }

  //similar products
  const relatedProductController = async(req,res) =>{
    try {
        const {pid,cid} =  req.params
        const products =  await productModel.find({
            processor:cid,
            _id:{$ne:pid} //ne means not include and we are not including that product which is currently being displayed
        }).select("-photo").limit(4)
        res.status(200).send({
            success:true,
            products, 
        })
        
    } catch (error) {
        console.log(error);
      res.status(400).send({
        success: false,
        message: "Error While Showing related Products",
        error,
      });
    }
  }

  //count product
  const productCountController = async(req,res)=>{
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total,
        })
    } catch (error) {
        console.log(error);
      res.status(400).send({
        success: false,
        message: "Error While Counting Products",
        error,
      });
    }
  }

  //product list per page
  const productListController = async(req,res)=>{
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page: 1 
        const products = await productModel.find({}).select("-photo").skip((page-1) *perPage).limit(perPage).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error While Displaying Products per page ",
          error,
        });
    }
  }

  const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const braintreePaymentController = async(req,res)=>{
    try {
        const {cart,nonce} = req.body
        let total = 0
        cart.map((i) => {
         total += i.price
        });

        let newTransaction = gateway.transaction.sale({
            amount:total,
            paymentMethodNonce: nonce,
            options:{
                submitForSettlement:true
            }
        },
        function(error,result){
            if(result){
                const order = new orderModel({
                    products:cart,
                    payment:result,
                    buyer:req.user._id,
                }).save()
                res.json({ok:true})
            }else{
                res.status(500).send(error)
            }
        }
        )

        
    } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error While Processing Payments",
          error,
        });
    }

  }
module.exports = {createProductController,getProductController,getSingleProductController,productPhotoController,deleteProductController,updateProductController,productFiltersController,searchProductController,relatedProductController,productCountController,productListController,braintreeTokenController,braintreePaymentController}