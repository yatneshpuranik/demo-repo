import express from 'express';
const router = express.Router();
import { 
  addOrderItems,
    getMyOrders,
    getOrderByID,
    updateOrderToDeliver,
    updateOrderToPaid,
    getAllOrder
} from '../controller/orderController.js';
import { admin , protect } from '../middleware/authMiddleware.js';


router.route('/').post(protect , addOrderItems).get( protect , admin , getAllOrder);

router.route('/mine').get(protect,getMyOrders);

router.route('/:id').get( protect  , getOrderByID);
router.route('/:id/pay').put( protect  , updateOrderToPaid);
router.route('/:id/deliver').put( protect , admin  , updateOrderToDeliver);




export default router;