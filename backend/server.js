import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
 connectDb();
  const port =  process.env.PORT || 5000 ;

  const app = express();


app.get( '/' , ( req , res ) =>{
res.send("API is runnig");
});

app.use('/api/products' , productRoutes );

app.listen( port , () =>
{
 console.log(`Server is running on ${port}`);
})