import express from 'express';
const router = express.Router();
// import product from '../data/product.js';
// import asyncHandler from '../middleware/asyncHandler.js';
// import Product from '../model/productModel.js';
import { getProducts , getProductById} from '../controller/productController.js'




// router.get( '/' , asyncHandler( async(req , res ) =>
// {   
//     const products = await Product.find({});
//     res.json(products);
// }));

// router.get( '/:id' , asyncHandler( async (req , res ) =>
// {
//     const product =  await Product.findById(req.params.id);

//     if (product)
//     {
//        return res.json(product);
//     }
//     else {
//         res.status(400);
//         throw new Error('Resource not found ')
//     }
//     // res.status(404).json({message : 'Page not found'})

// }));


router.route('/').get(getProducts);
router.route('/:id').get(getProductById);


export default router;