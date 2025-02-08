import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

function Department() {
  const [departments, setDepartments] = useState([]);
  const [show, setShow] = useState(false); 

  // Fetch departments from API
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/viewdepartment");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // **Formik Validation Schema**
  const validationSchema = Yup.object({
    id: Yup.string().required("Department ID is required"),
    name: Yup.string().min(2, "Department Name must be at least 2 characters").max(50, "Department Name can't exceed 50 characters").required("Department Name is required"),
    status: Yup.string().oneOf(["Active", "Inactive"], "Invalid Status").required("Status is required"),
  });

  // **Submit Handler**
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("http://localhost:8000/adddepartment", values);
      setShow(false); 
      fetchDepartments(); 
      resetForm(); 
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Department List</h2>

      <div className="d-flex justify-content-center">
        <div className="card shadow-sm p-2" style={{ width: "60%", maxWidth: "600px" }}>
          <div className="table-responsive">
            <Table striped bordered hover size="sm" className="text-center">
              <thead className="bg-primary text-white small">
                <tr>
                  <th className="text-start">Department ID</th>
                  <th className="text-start">Department Name</th>
                  <th className="text-start">Status</th>
                </tr>
              </thead>
              <tbody>
                {departments.length > 0 ? (
                  departments.map((dept, index) => (
                    <tr key={index} className="small">
                      <td className="text-start">{dept.id}</td>
                      <td className="text-start">{dept.name}</td>
                      <td className="text-start">{dept.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center small">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="text-center p-2">
            <Button variant="success" onClick={() => setShow(true)}>
              Add New
            </Button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ id: "", name: "", status: "Active" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <FormikForm onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Dept ID</Form.Label>
                  <Field type="text" name="id" className="form-control" />
                  <ErrorMessage name="id" component="div" className="text-danger small" />
                </Form.Group>

               
                <Form.Group className="mb-3">
                  <Form.Label>Department Name</Form.Label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage name="name" component="div" className="text-danger small" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Field as="select" name="status" className="form-control">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-danger small" />
                </Form.Group>

               
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" onClick={() => setShow(false)} className="me-2">
                    Close
                  </Button>
                  <Button type="submit" variant="primary">
                    Save
                  </Button>
                </div>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Department;
