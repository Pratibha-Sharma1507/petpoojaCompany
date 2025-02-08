import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { employeeValidationSchema } from "../Validation/EmployeeValidation";  // ✅ Import validation

function AddEmployee({ show, handleClose, refreshData }) {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get("http://localhost:8000/viewnamedepartment");
            setDepartments(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append("id", values.id);
        formData.append("name", values.name);
        formData.append("dob", values.dob);
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        formData.append("salary", values.salary);
        formData.append("department_id", values.department_id);
        formData.append("status", values.status);

        if (values.photo) {
            formData.append("photo", values.photo);
        }

        try {
            await axios.post("http://localhost:8000/addemployee", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            refreshData();
            handleClose();
            resetForm();
        } catch (error) {
            console.error("Error adding employee:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <Formik
                    initialValues={{
                        id: "",
                        name: "",
                        dob: "",
                        phone: "",
                        photo: null,
                        email: "",
                        salary: "",
                        department_id: "",
                        status: "Active",
                    }}
                    validationSchema={employeeValidationSchema}  
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, isSubmitting }) => (
                        <FormikForm>
                            <Form.Group className="mb-3">
                                <Form.Label>Employee ID</Form.Label>
                                <Field type="text" name="id" className="form-control" />
                                <ErrorMessage name="id" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Field type="text" name="name" className="form-control" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>DOB</Form.Label>
                                <Field type="date" name="dob" className="form-control" />
                                <ErrorMessage name="dob" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Field type="tel" name="phone" className="form-control" />
                                <ErrorMessage name="phone" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Photo</Form.Label>
                                <input
                                    type="file"
                                    name="photo"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(event) => setFieldValue("photo", event.currentTarget.files[0])}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Field type="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Salary</Form.Label>
                                <Field type="number" name="salary" className="form-control" />
                                <ErrorMessage name="salary" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Field as="select" name="department_id" className="form-control">
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="department_id" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Field as="select" name="status" className="form-control">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="text-danger" />
                            </Form.Group>

                            <div className="d-flex justify-content-end">
                                <Button variant="secondary" onClick={handleClose} className="me-2">
                                    Close
                                </Button>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? "Saving..." : "Save"}
                                </Button>
                            </div>
                        </FormikForm>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default AddEmployee;
