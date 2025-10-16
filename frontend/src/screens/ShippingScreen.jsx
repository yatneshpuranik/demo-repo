import { useState } from "react";
import { Form , Button } from 'react-bootstrap';
import {  useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import FormContainer from "../component/FormContainer";
import CheckoutSteps from "../component/CheckoutSteps";

const ShippingScreen = () => {
    

    const cart = useSelector( state => state.cart);
    const { ShippingAddress } = cart ;

    const [address, setAddress] = useState(ShippingAddress?.address || '' );
    const [city, setCity] = useState(ShippingAddress?.city || '' );
    const [pincode, setPincode] = useState(ShippingAddress?.pincode || '' );
    const [country, setCountry] = useState(ShippingAddress?.country || '' );

    const dispatch =useDispatch();
    const navigate  = useNavigate();

    const submitHandler =  (e) =>  {
        e.preventDefault();
        dispatch(saveShippingAddress({address , city , pincode , country}));
        navigate('/payment')                 
    }

  return (

    <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
            <Form.Label>
             Address
            </Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) =>  setAddress(e.target.value)}
            >
            </Form.Control>
        </Form.Group>
         <Form.Group controlId="city" className="my-2">
            <Form.Label>
             City
            </Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) =>  setCity(e.target.value)}
            >
            </Form.Control>
        </Form.Group> <Form.Group controlId="pincode" className="my-2">
            <Form.Label>
             Pincode
            </Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) =>  setPincode(e.target.value)}
            >
            </Form.Control>
        </Form.Group> <Form.Group controlId="country" className="my-2">
            <Form.Label>
             Country
            </Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) =>  setCountry(e.target.value)}
            >
            </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
