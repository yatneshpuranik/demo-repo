import { Link , useParams } from 'react-router-dom';
import { Row , Col , ListGroup , Image , Form , Button , Card }  from 'react-bootstrap';
import Message from '../component/Message';
import Loader from '../component/Loader';
import { useGetOrderDetailsQuery  , usePayOrderMutation  , useGetPaypalClientIdQuery } from '../slices/orderApiSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PayPalButtons , usePayPalScriptReducer } from '@paypal/react-paypal-js';
 

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();

  // Load PayPal SDK
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, errorPayPal, loadingPayPal]);

  // Test Button for manual payment
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Payment Success');
  }

  // Real PayPal onApprove
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment Success');
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    });
  }

  // PayPal onError
  function onError(err) {
    toast.error(err.message);
  }

  // PayPal createOrder
  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice.toFixed(2), // ✅ must be string with 2 decimals
          },
        },
      ],
    }).then((orderId) => orderId);
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order: {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            {/* Shipping Info */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.pincode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message varient="success">Delivered: {order.deliveredAt}</Message>
              ) : (
                <Message varient="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            {/* Payment Info */}
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message varient="success">Paid: {order.paidAt}</Message>
              ) : (
                <Message varient="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item variant="flush" key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
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
                  <Col>${order.itemPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* PayPal Section */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button onClick={onApproveTest} style={{ marginBottom: '10px' }}>
                        Test Payment
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
