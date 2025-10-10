import asyncHandler from '../middleware/asyncHandler.js';
import User from '../model/userModel.js';
// import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';



// @desc Auth and get usr token 
// @route POST/api/users/login
// @access public 
const authUser = asyncHandler( async( req , res ) =>
{

    const { email  , password }  = req.body;

    const user = await User.findOne( { email });
    if (user && (await user.matchPassword(password)) ) {
        generateToken(res , user._id);

        // const token = jwt.sign({ userId : user._id }  , process.env.JWT_SECRET , { 
        //     expiresIn : '30d'
        // })

        // res.cookie('jwt' , token , {
        //     httpOnly : true ,
        //     secure : process.env.NODE_ENV !== 'development',
        //     sameSite : 'strict',
        //     maxAge : 30 * 24 * 60 * 60 * 1000 , // 30 days 
        // })
         res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin

         })
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
    // console.log(req.bo dy);
    // res.send('Auth user ')
});

// @desc Register user  
// @route POST/api/users
// @access public 


const regUser = asyncHandler( async( req , res ) =>
{

    console.log(req.body);
    

    const { name,  email , password } = req.body;

    const userExist = await User.findOne({email});

    if (userExist)
    {
        res.status(400);
        throw new Error('User Already Exist ');

    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user)
    {
      generateToken(res , user._id);

        res.status(201).json(
            {
                _id : user._id,
                name : user.name,
                email : user.email,
                password : user.password
            }
        )
    }
    else 
    {
        res.status(400);
        throw new Error ('invalid user data ')
    }
    // res.send(' Reg  user ')

});

// @desc Logout user / clear cookies  
// @route POST/api/users/logout
// @access private
const logoutUser = asyncHandler( async( req , res ) =>
{
    res.cookie('jwt' , '' ,  { 
        httpOnly : true ,
        expires : new Date(0)
    });

    res.status(200).json({ message : 'Logged Out Succesfully '});
    // res.send('Logout user ')
});
// @desc Get user profile  
// @route GET/api/users/profile
// @access Private
const getUserProfile = asyncHandler( async( req , res ) =>
{

    const user = await User.findById(req.user._id);

    if (user) {
              res.status(201).json(
            {
                _id : user._id,
                name : user.name,
                email : user.email,
                password : user.password
            }
        )
    }
    else 
    {
        res.status(400);
        throw new Error ('User Not Found');
    }
    // res.send('Get user Profile')
});

// @desc Update user profile  
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler( async( req , res ) =>
{

    const user =  await User.findById(req.user._id);

    if (user)
    {
        user.name =  req.body.name || user.name;
        user.email = req.body.email || user.email ;

        if (req.body.password)
        {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json(
            {
               _id : updatedUser._id,
                name : updatedUser.name,
                email : updatedUser.email,
                isAdmin : updatedUser.isAdmin   
            }
        )
    }
    else 
    {
        res.status(400);
        throw new Error('User Not Found ');
    }
    // res.send('Update user Profile')
});


// @desc get users   
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler( async( req , res ) =>
{
    res.send('get  users')
});


// @desc get user by id    
// @route GET /api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler( async( req , res ) =>
{
    res.send('get  user  by id ')
});

 
// @desc delete users   
// @route DELETE /api/users
// @access Private/Admin
const deleteUser = asyncHandler( async( req , res ) =>
{
    res.send('delete users')
});

// @desc update users by admin side    
// @route PUT /api/users
// @access Private/Admin
const updateUser = asyncHandler( async( req , res ) =>
{
    res.send('updatd  users  by admin side ')
});




export {
    authUser,
    regUser,
    logoutUser,
    getUserByID,
    getUserProfile,
    updateUserProfile,
    updateUser,
    deleteUser,
    getUsers
} ;
