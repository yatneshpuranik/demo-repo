import { Container } from "react-bootstrap";
import Header from "./component/Header" ;
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./component/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
    <Header/>
    <main className="py-3">
      <Container>
        <Outlet/>
      </Container>
    </main>
    <Footer/>
    <ToastContainer/>
    </>
  )
}

export default App
