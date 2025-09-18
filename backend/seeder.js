import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import user from "./data/users.js";
import User from "./model/userModel.js";
import products from "./data/product.js";
import Product from "./model/productModel.js";
import Order from "./model/orderModel.js";
import connectDb from "./config/db.js";

dotenv.config();
connectDb();


 const importData = async () =>
 {
     try {
          await Order.deleteMany();
          await User.deleteMany();
          await Product.deleteMany();

           const createdUser = await User.insertMany(user);
           const adminUser = createdUser[0]._id;
        
            const samplepProduct = products.map((product) => 
        {
             return { ...product , user : adminUser}
        })
        await Product.insertMany(samplepProduct);
  console.log("data imported " .green.inverse);
       process.exit();
     } catch (error) {
          console.log(`${error}`, red.inverse);
          process.exit(1)
          
        
     }
 }

 const destroyData =  async () =>
 {
    try {
          await Order.deleteMany();
          await User.deleteMany();
          await Product.deleteMany();

        
  console.log("data destroyed " .red.inverse);
       process.exit();
     } catch (error) {
          console.log(`${error}`, red.inverse);
          process.exit(1);

 }
 }


if(process.argv[2] === '-d'){
    destroyData();
} else {
    importData();
}
