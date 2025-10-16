import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../model/orderModel.js';



// @desc Create new order
// @route POST / api / order 
// @access private 

const addOrderItems =  asyncHandler( async ( req , res ) =>
{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice


    } = req.body;

    if ( orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error ('No order items ')
        
    } else {
        const order = new Order 
        ({
            orderItems : orderItems.map((x) => ({
                ...x ,
                product : x._id,
                _id : undefined
            })),
            user : req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
})

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

const getOrderByID =  asyncHandler( async ( req , res ) =>
{
    const order =  await Order.find(req.params.id).populate('user' , 'name email');

    if (order) {
        res.status(201).json(order);
    } else {
        res.status(400);
        throw new Error ('Order not found');
    }

})

// @desc update order to paid 
// @route PUT / api / order /:id /pay
// @access private / admin

const updateOrderToPaid =  asyncHandler( async ( req , res ) =>
{
    res.send('Order Paid ');

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