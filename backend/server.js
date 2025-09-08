import express from "express";
// import dotenv from 'dotenv';
// dotenv.config();
import dotenv from 'dotenv';
dotenv.config();
import connectDb from "./config/db.js";
import products from "./data/product.js";
 connectDb();
  const port =  process.env.PORT || 5000 ;

  const app = express();


app.get( '/' , ( req , res ) =>{
res.send("API is runnig");
});

app.get('/api/products' , ( req , res ) =>
{
    res.json(products);
})
app.get('/api/products/:id' , ( req , res ) =>
{
    const product = products.find((p) => p._id === req.params.id );
    res.json(product);
})

app.listen( port , () =>
{
 console.log(`Server is running on ${port}`);
 
})