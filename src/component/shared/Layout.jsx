import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'


 
function Layout(props) {
  return (
    <div>
        <Navbar expand="lg" variant="dark" bg="danger">
          <Container>
            <Navbar.Brand ><b>LIBRARY MANAGEMENT SYSTEM</b></Navbar.Brand>
            {/* <Image src="public/img/library.jpg" fluid /> */}

          </Container>
        </Navbar>
      <Container>{props.children}</Container>
    </div>
  );
}
export default Layout;