import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { employeeValidationSchema } from "../Validation/EmployeeValidation";
import { FaEdit } from "react-icons/fa";

function UpdateEmployee({ employeeData, refreshData }) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
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

    const handleSubmit = async (values, { setSubmitting }) => {
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
            await axios.put(`http://localhost:8000/editemployee/${values.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setShowUpdateModal(false);
            refreshData();
        } catch (error) {
            console.error("Error updating employee:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/*  Edit Button */}
            <button className="btn btn-primary" onClick={() => setShowUpdateModal(true)}>
                <FaEdit style={{ color: "white" }} />
            </button>

            {/* Update Employee Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            id: employeeData?.id || "",
                            name: employeeData?.name || "",
                            dob: employeeData?.dob ? employeeData.dob.split("T")[0] : "",
                            phone: employeeData?.phone || "",
                            email: employeeData?.email || "",
                            salary: employeeData?.salary || "",
                            department_id: employeeData?.department_id || "",
                            status: employeeData?.status || "Active",
                            photo: null,
                        }}
                        validationSchema={employeeValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, isSubmitting }) => (
                            <FormikForm>
                                <Form.Group className="mb-3">
                                    <Form.Label>Employee Name</Form.Label>
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
                                            <option key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="department_id" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
    <Form.Label>Status</Form.Label>
    <Field as="select" name="status" className="form-control">
        <option value="">Select Status</option>  
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
    </Field>
    <ErrorMessage name="status" component="div" className="text-danger" />
</Form.Group>

                                <div className="d-flex justify-content-end">
                                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)} className="me-2">
                                        Close
                                    </Button>
                                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                                        {isSubmitting ? "Updating..." : "Update"}
                                    </Button>
                                </div>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UpdateEmployee;
