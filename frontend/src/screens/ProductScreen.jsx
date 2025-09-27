import { useState } from "react";
import { useParams, Link   , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button , Form } from "react-bootstrap";
import {useGetProductDetailsQuery } from '../slices/productApiSlice';
import Rating from "../component/Rating";
import Loader from "../component/Loader";
import Message from "../component/Message";
import { addToCart } from "../slices/cartSlice";



const ProductScreen = () => {

  const { id: productId } = useParams();

   const [ qty , setQty ] = useState(1);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () =>
  { 
    dispatch(addToCart({ ...product , qty }));
    navigate('/cart');

  }
  // console.log( product ? [...Array(product.countInStock).keys()] : [] );
  return (
    <>
    
       <Link className="btn btn-light my-3" to="/">
       Go Back
       </Link>

       { isLoading ? ( <Loader/>) : error ? ( <Message varient='danger' > { error?.data?.message ||error.error }  </Message>) : ( 
        <Row>
        <Col md={5}>
           <Image src={product.image} alt={product.name} fluid />
           <p>{product.description}</p>
         </Col>

         <Col md={4}>
           <ListGroup variant="flush">
             <ListGroup.Item>
               <h3>{product.name}</h3>
             </ListGroup.Item>
             <ListGroup.Item>
               <Rating
                 value={product.ratings} 
                 text={`${product.numReviews} reviews`}
               />
             </ListGroup.Item>
             <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
           </ListGroup>
         </Col>

         <Col md={3}>
           <Card>
             <ListGroup variant="flush">
                 <ListGroup.Item>
             <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {
                product.countInStock > 0 &&
                (
                    <ListGroup.Item>
                      <Row>
                        <Col>
                        Qty :
                        </Col>
                        <Col>
                        <Form.Control
                        as = 'select'
                        value = {qty}
                        onChange ={ (e) => setQty(Number(e.target.value)) }
                       >
                          {[...Array(product.countInStock).keys()].map((x) => (
                         <option key={x + 1} value={x + 1}>
                         {x + 1}
                           </option>
                          ))}

                      </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                )
              }

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={ addToCartHandler }
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
       ) }
    

    </>
  ) }


//   if (isLoading) {
//     return <h2>Loading...</h2>;
//   }

//   if (error) {
//     return <div>{error?.data?.message || error.error}</div>;
//   }

  
//   if (!product) { 
//     return <h2>Product Not Found</h2>;
//   }

//   return (
//     <>
//       <Link className="btn btn-light my-3" to="/">
//         Go Back
//       </Link>

//       <Row>
//         <Col md={5}>
//           <Image src={product.image} alt={product.name} fluid />
//           <p>{product.description}</p>
//         </Col>

//         <Col md={4}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h3>{product.name}</h3>
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <Rating
//                 value={product.rating} 
//                 text={`${product.numReviews} reviews`}
//               />
//             </ListGroup.Item>
//             <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
//           </ListGroup>
//         </Col>

//         <Col md={3}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Price:</Col>
//                   <Col>
//                     <strong>${product.price}</strong>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Status:</Col>
//                   <Col>
//                     <strong>
//                       {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
//                     </strong>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Button
//                   className="btn-block"
//                   type="button"
//                   disabled={product.countInStock === 0}
//                 >
//                   Add To Cart
//                 </Button>
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
  

//  ) };


//{ error?.data?.message ||error.error } 
export default ProductScreen;
