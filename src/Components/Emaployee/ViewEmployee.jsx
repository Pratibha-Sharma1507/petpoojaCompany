import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import moment from "moment";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import DeleteEmployee from "./DeleteEmployee";

function Employee() {
    const [employee, setEmployee] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);

    // Fetch Employees
    const fetchEmployee = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8000/viewemployee?page=${page}`);
            if (response.data && response.data.employees) {
                setEmployee(response.data.employees || []);
                setTotalPages(response.data.totalPages || 1);
            } else {
                setEmployee([]);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
            setEmployee([]);
        }
    };

    //  Fetch Data on Component Mount & Page Change
    useEffect(() => {
        fetchEmployee(currentPage);
    }, [currentPage]);

    return (
        <div className="container mt-4" style={{ marginTop: "200px" }}>
            <h2 className="text-center mb-4">Employee List</h2>

            <div className="d-flex justify-content-center" style={{ marginLeft: "150px" }}>
                <div className="card shadow-sm p-3 w-100">
                <Table responsive striped bordered hover className="text-center table-sm">
    <thead className="bg-primary text-white">
        <tr>
            <th className="text-start py-1 px-2" style={{ minWidth: "50px" }}>ID</th>
            <th className="text-start py-1 px-2" style={{ minWidth: "80px" }}>Dept</th>
            <th className="text-start py-1 px-2" style={{ minWidth: "140px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Name</th>
            <th className="text-start py-1 px-2" style={{ minWidth: "100px" }}>DOB</th>
            <th className="text-start py-1 px-2" style={{ minWidth: "100px" }}>Phone</th>
            <th className="text-center py-1 px-2" style={{ minWidth: "60px" }}>Photo</th>
            <th className="text-start py-1 px-2" style={{ minWidth: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Email</th>
            <th className="text-start py-1 px-2" style={{ minWidth: "90px" }}>Salary</th>
            <th className="text-start py-1 px-2" style={{ minWidth: "100px" }}>Dept</th>
            <th className="text-start py-1 px-2" style={{ minWidth: "90px" }}>Status</th>
            <th className="text-start py-1 px-2" style={{ minWidth: "120px" }}>Action</th>
        </tr>
    </thead>
    <tbody>
        {employee.length > 0 ? (
            employee.map((emp, index) => (
                <tr key={emp.id || index}>
                    <td className="text-start py-1 px-2">{emp.id}</td>
                    <td className="text-start py-1 px-2">{emp.department_id}</td>
                    <td className="text-start py-1 px-2" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.name}</td>
                    <td className="text-start py-1 px-2">{moment(emp.dob).format("DD-MM-YYYY")}</td>
                    <td className="text-start py-1 px-2">{emp.phone}</td>
                    <td className="text-center py-1 px-2">
                        {emp.photo ? (
                            <img
                                src={`http://localhost:8000/images/${emp.photo}`}
                                alt="Employee"
                                width="40"
                                height="40"
                                style={{ borderRadius: "50%", objectFit: "cover" }}
                            />
                        ) : (
                            "No Image"
                        )}
                    </td>
                    <td className="text-start py-1 px-2" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.email}</td>
                    <td className="text-start py-1 px-2">{emp.salary}</td>
                    <td className="text-start py-1 px-2">{emp.department_name || "N/A"}</td>
                    <td className="text-start py-1 px-2">  {emp.status}
        
                    </td>
                    <td className="d-flex align-items-center py-1 px-2" style={{ gap: "5px" }}>
                        <UpdateEmployee employeeData={emp} refreshData={() => fetchEmployee(currentPage)} />
                        <DeleteEmployee employeeId={emp.id} refreshData={() => fetchEmployee(currentPage)} />
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="11" className="text-center py-1 px-2">No data available</td>
            </tr>
        )}
    </tbody>
</Table>


                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-between align-items-center p-3">
                        <Button
                            variant="secondary"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>

                        <span>Page {currentPage} of {totalPages}</span>

                        <Button
                            variant="secondary"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>

                    {/* Add Employee Button */}
                    <div className="text-center p-2">
                        <Button variant="success" onClick={() => setShowAddModal(true)}>Add New</Button>
                    </div>

                    {/*  Add Employee Modal */}
                    <AddEmployee show={showAddModal} handleClose={() => setShowAddModal(false)} refreshData={fetchEmployee} />
                </div>
            </div>
        </div>
    );
}

export default Employee;
