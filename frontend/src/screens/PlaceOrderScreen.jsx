import { useEffect  } from "react";
import { Link , useNavigate } from "react-router-dom";
import { useSelector  , useDispatch } from "react-redux";
import { Button , Row , Col , Card , ListGroup , Image } from "react-bootstrap";
import CheckoutSteps from "../component/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";


const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const [ createOrder , { isLoading , error } ]= useCreateOrderMutation();

  useEffect(()=>{
   if (!cart.shippingAddress.address)
   {
    navigate('/shipping');
   }
   else if (!cart.paymentMethod)
   {
    navigate('/payment');
   }

  } , [ cart.shippingAddress.address , cart.paymentMethod , navigate ]);

   const placeOrderHandler = async () => {
  try {
    const res = await createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemPrice: cart.itemPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }).unwrap(); // ✅ unwrap gives you the actual response data

    dispatch(clearCartItems());
    navigate(`/order/${res._id}`); // ✅ res now contains the real data
  } catch (err) {
    toast.error(err?.data?.message || err.error || "Something went wrong");
  }
};

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h1> Shipping </h1>
            <p>
              <strong> Address : </strong>  {cart.shippingAddress.address} , { cart.shippingAddress.city},{cart.shippingAddress.pincode},{ ' ' },{cart.shippingAddress.country}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h1> Payment Method  </h1>
            <p>
              <strong> Method :</strong> {cart.paymentMethod}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h1> Order Items </h1>
            { cart.cartItems.length === 0 ? (
              <Message> Your Cart Is Empty {
                <Link to ='/'>Add Items </Link>
              }</Message>
            ) : ( 
              
                    <ListGroup variant="flush">
                    {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                    <Row>
                    <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded  />
                    </Col>
                    <Col>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                    </Col>
                    </Row>
                    </ListGroup.Item>
                    ))}
                    </ListGroup>
            ) }
          </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={4}>
        <Card>
  <ListGroup variant="flush">
    <ListGroup.Item>
      <h1>Order Summary</h1>
    </ListGroup.Item>

    <ListGroup.Item>
      <Row>
        <Col>Items:</Col>
        <Col>${cart.itemPrice}</Col>
      </Row>
    </ListGroup.Item>

    <ListGroup.Item>
      <Row>
        <Col>Tax:</Col>
        <Col>${cart.taxPrice}</Col>
      </Row>
    </ListGroup.Item>

    <ListGroup.Item>
      <Row>
        <Col>Shipping:</Col>
        <Col>${cart.shippingPrice}</Col>
      </Row>
    </ListGroup.Item>

    <ListGroup.Item>
      <Row>
        <Col>Total:</Col>
        <Col>${cart.totalPrice}</Col>
      </Row>
    </ListGroup.Item>

    { error && (
      <ListGroup.Item>
        <Message varient="danger">
          {error?.data?.message || error?.error || "Something went wrong"}
        </Message>
      </ListGroup.Item>
    )}

    <ListGroup.Item>
      <Button
        type="submit"
        className="btn-block"
        disabled={cart.cartItems.length === 0}
        onClick={placeOrderHandler}
      >
        Place Order
      </Button>
      {isLoading && <Loader />}
    </ListGroup.Item>
  </ListGroup>
</Card>

        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
