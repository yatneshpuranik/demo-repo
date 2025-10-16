import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { Form , Button , Col} from 'react-bootstrap';
import CheckoutSteps from '../component/CheckoutSteps';
import FormContainer from '../component/FormContainer';
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingAddress }= useSelector(state => state.cart)

    useEffect(() => {
      if(!shippingAddress)
      {
        navigate('/shipping');
    }}, [shippingAddress , navigate]);
  
    const submitHandler = (e) =>  {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('placeorder');
      }
  return (
    <div>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h2>
            Payment Method
        </h2>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method 
                    <Col>
                    <Form.Check 
                    type = 'radio'
                    className="my-2"
                    label='PayPal Or CreditCard'
                    id="PayPal"
                    name='paymentMethod'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}>

                    </Form.Check>
                    </Col>
                </Form.Label>
            </Form.Group>
            <Button type="submit" variant="primary">Continue</Button>
        </Form>
      </FormContainer>

    </div>
  )
}

export default PaymentScreen
