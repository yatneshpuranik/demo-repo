import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../model/orderModel.js';



// @desc Create new order
// @route POST / api / order 
// @access private 

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, shippingPrice, taxPrice, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // ✅ Calculate itemPrice on backend to avoid 0
  const itemPrice = Number(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 2).toFixed(2)
  );

  const order = new Order({
    orderItems: orderItems.map((x) => ({
      name: x.name,
      qty: x.qty,
      image: x.image,
      price: x.price,
      product: x._id, // or x.product if frontend already has product id
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemPrice,      // ✅ use backend-calculated value
    shippingPrice: Number(shippingPrice),
    taxPrice: Number(taxPrice),
    totalPrice: Number(totalPrice),
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc logged in user orders 
// @route GET / api / order /myorders
// @access private 

const getMyOrders =  asyncHandler( async ( req , res ) =>
{
    const orders =  await Order.find({ user : req.user._id});
    res.status(201).json(orders);
})

// @desc Get order by id  
// @route GET / api / order /:id
// @access private 

const getOrderByID = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error fetching order:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});


// @desc update order to paid 
// @route PUT / api / order /:id /pay
// @access private / admin

const updateOrderToPaid =  asyncHandler( async ( req , res ) =>
{
    const order = await Order.findById(req.params.id);

    if (order)
    {
      order.isPaid = true ;
      order.paidAt = Date.now();
      order.paymentResult ={
        id : req.body.id,
        status : req.body.status,
        update_time:req.body.update_time,
        email_address : req.body.payer.email_address
      }
      
      const updateOrder =  await order.save () ;
      res.status(200).json(updateOrder);
    }
    else 
    {
      res.status(400);
      throw new Error (' Order not found ') 
    }
})

// @desc Update order to delivered
// @route PUT / api / order /:id / deliver 
// @access private / admin 

const updateOrderToDeliver =  asyncHandler( async ( req , res ) =>
{
    res.send('order delivered ');
})
// @desc Get all order 
// @route GET / api / order
// @access private / admin  

const getAllOrder =  asyncHandler( async ( req , res ) =>
{
    res.send('getting all order ');
})

export {
    addOrderItems,
    getMyOrders,
    getOrderByID,
    updateOrderToDeliver,
    updateOrderToPaid,
    getAllOrder
};