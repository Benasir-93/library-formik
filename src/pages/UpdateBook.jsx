import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      ISBN: '',
      publicationDate:'',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('title name is required'),
      author: Yup.string().required('author is required'),
      ISBN: Yup.number().required('ISBN is required'),
      publicationDate:Yup.date().required(' publication date is required')
    }),
    onSubmit: (values) => {
      const payload = {
        title: values.title,
        author: values.author,
        ISBN: values.ISBN,
        publicationDate:values.publicationDate,
      };

      axios.put(`http://localhost:4000/books/${id}`, payload).then(() => {
        navigate('/');
      });
    },
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/books/${id}`).then((response) => {
      formik.setValues({
        title: response.data.title,
        author: response.data.author,
        ISBN: response.data.ISBN,
        publicationDate:response.data.publicationDate,
      });
    });
  }, [id]);

  return (
    <>
      <legend>Update</legend>
      <br />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formtitle">
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div>{formik.errors.title}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formauthor">
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.author}
          />
          {formik.touched.author && formik.errors.author ? (
            <div>{formik.errors.author}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formISBN">
          <Form.Label>ISBN number</Form.Label>
          <Form.Control
            type="text"
            name="ISBN"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ISBN}
          />
          {formik.touched.ISBN && formik.errors.ISBN ? (
            <div>{formik.errors.ISBN}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formpublicationDate">
          <Form.Label>publication Date</Form.Label>
          <Form.Control
            type="date"
            name="publicationDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.publicationDate}
          />
          {formik.touched.publicationDate && formik.errors.publicationDate ? (
            <div>{formik.errors.publicationDate}</div>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </>
  );
}

export default UpdateBook;
