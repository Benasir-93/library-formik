import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "../component/shared/DeleteConfirmation"; 

function AllAuthors() {
  const [allAuthors, setAllAuthors] = useState([]);
  const navigate = useNavigate();
 
  const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(0);
 
  useEffect(() => {
    axios.get("http://localhost:4000/author").then((response) => {
      setAllAuthors(response.data);
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
      .delete(`http://localhost:4000/author/${itemToDeleteId}`)
      .then((response) => {
        setAllAuthors((previousState) => {
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
          <Button variant="primary" onClick={() => navigate("/add-author")}>
            Add Author
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-2">
        {allAuthors.map((item) => (
          <Col key={item.id}>
            <Card>
                <Card.Body>
                <Card.Title>{item.authorname}</Card.Title><hr></hr>
                <Card.Text>Author DOB {item.birthdate}</Card.Text>
                <Card.Text>Short biography: - {item.shortbiography}</Card.Text>

                <Button className="me-3"
                  variant="primary"
                  onClick={() => navigate(`/update-author/${item.id}`)}
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
export default AllAuthors;
//npm run json-server
