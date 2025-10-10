import express from 'express';
const router = express.Router();
import { 
     authUser,
    regUser,
    logoutUser,
    getUserByID,
    getUserProfile,
    updateUserProfile,
    updateUser,
    deleteUser,
    getUsers 
} from '../controller/userController.js';
import { admin , protect } from '../middleware/authMiddleware.js';
router.route('/').post(regUser).get( protect , admin , getUsers);
router.post('/logout' , logoutUser);
router.post('/auth' , authUser);
router.route('/profile').get(protect , getUserProfile).put(protect , updateUserProfile);
router.route('/:id').delete(protect   , admin , deleteUser).get( protect , admin , getUserByID).put( protect , admin , updateUser)


export default router;