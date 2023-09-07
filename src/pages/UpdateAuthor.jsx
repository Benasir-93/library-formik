import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UpdateAuthor() {
  const { id } = useParams();
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

      axios.put(`http://localhost:4000/author/${id}`, payload).then(() => {
        navigate('/');
      });
    },
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/author/${id}`).then((response) => {
      formik.setValues({
        authorname: response.data.authorname,
        birthdate: response.data.birthdate,
        shortbiography: response.data.shortbiography,
      });
    });
  }, [id]);

  return (
    <>
      <legend>Update</legend>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formAuthorname">
          <Form.Label>Author Name</Form.Label>
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
        <Form.Group className="mb-3" controlId="formBirthdate">
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
        <Form.Group className="mb-3" controlId="formShortbiography">
          <Form.Label>Short Biography</Form.Label>
          <Form.Control
            type="text"
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
          Update
        </Button>
      </Form>
    </>
  );
}

export default UpdateAuthor;
