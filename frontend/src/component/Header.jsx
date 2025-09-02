import { Navbar , Nav , Container } from 'react-bootstrap';
import { FaShoppingCart , FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand = 'md' collapseOnSelect>
            <Container>
                <Navbar.Brand href="/"> proshop </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                       <Nav.Link href="/cart"> <FaShoppingCart/></Nav.Link>
                       <Nav.Link href="/login"><FaUser/></Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>

        </Navbar>
    </header>
  )
}

export default Header
