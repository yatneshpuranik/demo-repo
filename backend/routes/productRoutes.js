import express from 'express';
const router = express.Router();
// import product from '../data/product.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../model/productModel.js';




router.get( '/' , asyncHandler( async(req , res ) =>
{   
    const products = await Product.find({});
    res.json(products);
}));

router.get( '/:id' , asyncHandler( async (req , res ) =>
{
    const product =  await Product.findById(req.params.id);

    if (product)
    {
       return res.json(product);
    }
    res.status(404).json({message : 'Page not found'})

}));

export default router;