import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../model/userModel.js';

// protect routes 
const protect =  asyncHandler ( async (req , res , next ) =>{
  // read jwt from token  
    let token;

    token= req.cookies.jwt;
    
    if (token)
    {
        
        try {
                const decode =  jwt.verify(token , process.env.JWT_SECRET);
                req.user =  await User.findById(decode.userID).select('-password');
                next();
        }
        catch (error)
        {
            console.log(error);
            res.status(401);
            throw new Error (' Not Authorized , Token Failed')
        }
    }
    else 
    {
        res.status(401);
        throw new Error (' Not Authorized  , No token ')
    }


});

// Admin Middleware 

const admin = ( req , res , next ) =>
{
    if ( req.user && req.user.isAdmin)
    {
       next();
    }
    else 
    {
       res.status(401);
       throw new Error('Not authorized as Admin');
    }
};

export { protect ,  admin } ;