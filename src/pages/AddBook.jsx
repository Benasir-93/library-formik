
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddBook() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      ISBN: '',
      publicationDate:'',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('title is required'),
      author: Yup.string().required('author is required'),
      ISBN: Yup.number().required('ISBN number is required'),
      publicationDate:Yup.date().required('publicationDate is required')
    }),
    onSubmit: (values) => {
      const payload = {
        title: values.title,
        author: values.author,
        ISBN: values.ISBN,
        publicationDate:values.publicationDate,
      };
      axios.post('http://localhost:4000/books', payload).then(() => {
        navigate('/');
      });
    },
  });

  return (
    <>
      <legend>Create</legend>
      <br />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formtitle">
          <Form.Label>Book name</Form.Label>
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
          <Form.Label>Author Name</Form.Label>
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
          <Form.Label>ISBN Number</Form.Label>
          <Form.Control
            type="number"
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
          <Form.Label>Publication Date</Form.Label>
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
          Add Book
        </Button>
      </Form>
    </>
  );
}

export default AddBook;
