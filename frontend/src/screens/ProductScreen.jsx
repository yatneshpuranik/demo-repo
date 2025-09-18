import { useState , useEffect } from "react";
import { useParams , Link } from "react-router-dom";
import { Row , Col , Image , ListGroup , Card , Button } from "react-bootstrap";
import Rating from "../component/Rating";
import axios from "axios";

const ProductScreen = () => {
     const [ product , setProduct ] = useState([]);
       const { id : productId } = useParams();

   useEffect( ()=>
  {
    const fetchProduct =  async () =>
    {
      const {data} = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();

  } , [productId]) ;
  return (
    <div>
       <Link className="btn btn-light my-3" to = '/' >  Go Back </Link>
       <Row>
        <Col md={5}>
          <Image  src = {product.image} alt={product.name} fluid />
          <p as= "h1">{product.description};</p>
        </Col>
         <Col md={4}>
          <ListGroup varient =" flush ">
            <ListGroup.Item>
                  <h3> {product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item variant="flush" > <Rating value={ product.ratings } text={`${ product.numReviews }reviews `}/> </ListGroup.Item>
            <ListGroup.Item>
              Price:${product.price}
            </ListGroup.Item>
          </ListGroup>
        </Col>
            
         <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                   Price:
                  </Col>
                  <Col>
                  <strong>
                    ${product.price}
                  </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                   Status
                  </Col>
                  <Col>
                  <strong>
                    ${product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block"
                type="button"
                disabled={product.countInStock === 0}
                   >
                  Add To Cart 
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
       </Row>
    </div>
  )
}

export default ProductScreen  
