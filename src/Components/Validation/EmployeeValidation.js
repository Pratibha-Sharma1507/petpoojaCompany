import * as Yup from "yup";

export const employeeValidationSchema = Yup.object().shape({
    id: Yup.string().required("Employee ID is required"),
    name: Yup.string().required("Name is required"),
    dob: Yup.date().required("Date of Birth is required"),
    phone: Yup.string().matches(/^\d{10}$/, "Phone must be 10 digits").required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    salary: Yup.number().positive("Salary must be a positive number").required("Salary is required"),
    department_id: Yup.string().required("Please select a department"),
    status: Yup.string().oneOf(["Active", "Inactive"]).required("Status is required"),
});
