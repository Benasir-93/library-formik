import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddAuthor() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      authorname: '',
      birthdate: '',
      shortbiography: '',
    },
    validationSchema: Yup.object({
      authorname: Yup.string().required('Author name is required'),
      birthdate: Yup.date().required('Birthdate is required'),
      shortbiography: Yup.string().required('Short biography is required'),
    }),
    onSubmit: (values) => {
      const payload = {
        authorname: values.authorname,
        birthdate: values.birthdate,
        shortbiography: values.shortbiography,
      };
      axios.post('http://localhost:4000/author', payload).then(() => {
        navigate('/');
      });
    },
  });

  return (
    <>
      <legend>Create</legend>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formauthorname">
          <Form.Label>Author's name</Form.Label>
          <Form.Control
            type="text"
            name="authorname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.authorname}
          />
          {formik.touched.authorname && formik.errors.authorname ? (
            <div>{formik.errors.authorname}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formbirthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type="date"
            name="birthdate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthdate}
          />
          {formik.touched.birthdate && formik.errors.birthdate ? (
            <div>{formik.errors.birthdate}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formshortbiography">
          <Form.Label>Short biography</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            name="shortbiography"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shortbiography}
          />
          {formik.touched.shortbiography && formik.errors.shortbiography ? (
            <div>{formik.errors.shortbiography}</div>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Author
        </Button>
      </Form>
    </>
  );
}

export default AddAuthor;
