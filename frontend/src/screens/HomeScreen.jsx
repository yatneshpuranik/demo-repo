import { useEffect , useState } from "react";
import { Row , Col } from "react-bootstrap";
import Product from "../component/Product";
import axios from 'axios';



const HomeScreen = () => {
 const [ products , setProducts ] = useState([]);
   useEffect( ()=>
  {
    const fetchProducts =  async () =>
    {
      const {data} = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();

  } , []) ;

   
  return (
    <>
    <h1> latest products</h1>
    <Row>
        { products.map( (product) => 
        
        (<Col sm ={12} lg={4} md = {6} xl ={3}>
           
           <Product product ={product}/>
        </Col>)) }
    </Row>
    </>
  )
}

export default HomeScreen
