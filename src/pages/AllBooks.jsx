import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "../component/shared/DeleteConfirmation"; 
function AllBooks() {
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();
 
  const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(0);
 
  useEffect(() => {
    axios.get("http://localhost:4000/books").then((response) => {
      setAllBooks(response.data);
    });
  }, []);
 
  const openConfirmDeleteModalHandler = (id) => {
    setShowModal(true);
    setItemToDeleteId(id);
  };
 
  const hideDeleteModalHandler = () => {
    setShowModal(false);
    setItemToDeleteId(0);
  };
 
  const confirmDeleteHandler = () => {
    axios
      .delete(`http://localhost:4000/books/${itemToDeleteId}`)
      .then((response) => {
        setAllBooks((previousState) => {
          return previousState.filter((_) => _.id !== itemToDeleteId);
        });
        setItemToDeleteId(0);
        setShowModal(false);
      });
  };
 
  return (
    <>
      <DeleteConfirmation
        showModal={showModal}
        hideDeleteModalHandler={hideDeleteModalHandler}
        title="Delete Confirmation"
        body="Are you want delete this itme?"
        confirmDeleteHandler={confirmDeleteHandler}
      ></DeleteConfirmation>
      <Row className="mt-2 mb-3">
        <Col md={{ span: 4, offset: 4 }}>
          <Button variant="primary" onClick={() => navigate("/add-book")}>
            Add Book
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-2">
        {allBooks.map((item) => (
          <Col key={item.id}>
            <Card>
                <Card.Body>
                <Card.Title>{item.title}</Card.Title><hr/>
                <Card.Text>Author Name {item.author}</Card.Text>
                <Card.Text>ISBN Number: - {item.ISBN}</Card.Text>
                <Card.Text>Publication Date: - {item.publicationDate}</Card.Text>

                <Button className="me-3"
                  variant="primary"
                  onClick={() => navigate(`/update-books/${item.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>{openConfirmDeleteModalHandler(item.id)}}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default AllBooks;
//npm run json-server
