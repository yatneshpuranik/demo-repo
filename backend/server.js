import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();
import connectDb from "./config/db.js";
import  { notFound , errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js';
 connectDb();
  const port =  process.env.PORT || 5000 ;

  const app = express();

  // body parser middleware for parsing data and printing it on console 
app.use(express.json());
app.use(express.urlencoded( { extended : true }));
app.use(cookieParser());
// this two line allow us to print data on console 
app.get( '/' , ( req , res ) =>{
res.send("API is runnig");
});

app.use('/api/products' , productRoutes );
app.use('/api/users' , userRoutes );


app.use (notFound);
app.use(errorHandler);

app.listen( port , () =>
{
 console.log(`Server is running on ${port}`);
})