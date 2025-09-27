// import { useEffect , useState } from "react";
import { Row , Col } from "react-bootstrap";
import Product from "../component/Product";
// import axios from 'axios';
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../component/Loader";
import Message from "../component/Message";

const HomeScreen = () => {


  const { data : products , isLoading , error } = useGetProductsQuery ();


//  const [ products , setProducts ] = useState([]);
//    useEffect( ()=>
//   {
//     const fetchProducts =  async () =>
//     {
//       const {data} = await axios.get('/api/products');
//       setProducts(data);
//     };
//     fetchProducts();

//   } , []) ;





   
  return (
    <>

    { isLoading ? ( < Loader />) : error ? ( <div> <Message varient='danger' > { error?.data?.message ||error.error }  </Message> </div> ) : ( <> <h1> latest products</h1>
    <Row>
        { products.map( (product) => 
        
        (<Col  key= { product._id || product.id } sm ={12} lg={4} md = {6} xl ={3}>
           
           <Product product ={product}/>
        </Col>)) }
    </Row></>) }
    
    </>
  )
}

export default HomeScreen
