import {   Badge , Navbar , Nav , Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart , FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap' ;
import { useSelector  , useDispatch} from 'react-redux';
// import pir8 from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {

  const {  cartItems } = useSelector(
    (state) => state.cart
  ); 
  const {  userInfo  } = useSelector(
    (state) => state.auth
  ); 
   const dispatch =  useDispatch();
   const navigate = useNavigate();

  const [LogoutApiCall] = useLogoutMutation();


  const LogoutHandler =  async()  => 
    {  
 try {
  await LogoutApiCall().unwrap();
  dispatch(logout());
  navigate('/login');

 } catch (err) {
  console.log(err);
  
 }

  };

  console.log(cartItems);
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand = 'md' collapseOnSelect>
            <Container>
               <LinkContainer to="/">
                <Navbar.Brand >
                   <b className='label-logo '>ᴘɪʀ8ꜰɪᴛ</b>

                   </Navbar.Brand>
                   </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                      <LinkContainer to= '/cart'> 
                       <Nav.Link> 
                         <FaShoppingCart/>
                         {
                          cartItems.length > 0 && (
                            <Badge pill bg = 'success' style = {{ marginLeft : '4px' , fontSize : '10px'}} > 
                                 {cartItems.reduce((a,c) => a + c.qty , 0 )}
                            </Badge>

                          )

                         }
                         </Nav.Link> 
                         </LinkContainer>
                         { userInfo ? (
                          <NavDropdown  title = { userInfo.name} id = 'username'>
                          <LinkContainer to ='/profile'>
                                <NavDropdown.Item> Profile</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item onClick={LogoutHandler}>Logout</NavDropdown.Item>
                          </NavDropdown>) : 
                          ( <LinkContainer to="/login">
                              <Nav.Link>
                               <FaUser/>
                              </Nav.Link>
                            </LinkContainer>) }
                      
                    </Nav>
                    </Navbar.Collapse>
            </Container>

        </Navbar>
    </header>
  )
}

export default Header ;
