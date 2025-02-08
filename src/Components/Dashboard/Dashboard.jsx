import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function Dashboard() {
  const [highestSalaryData, setHighestSalaryData] = useState([]);
  const [salaryRangeData, setSalaryRangeData] = useState([]);
  const [youngestEmployeeData, setYoungestEmployeeData] = useState([]);

  useEffect(() => {
    const fetchHighestSalaryData = async () => {
      const result = await axios.get('http://localhost:8000/highestsalary');
      setHighestSalaryData(result.data);
    };
    fetchHighestSalaryData();

    const fetchSalaryRangeData = async () => {
      const result = await axios.get('http://localhost:8000/salaryrangewise');
      setSalaryRangeData(result.data);
    };
    fetchSalaryRangeData();

    const fetchYoungestEmployeeData = async () => {
      const result = await axios.get('http://localhost:8000/yougestemployee');
      setYoungestEmployeeData(result.data);
    };
    fetchYoungestEmployeeData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-10 p-3">
          <h2 className="text-center my-4">Dashboard</h2>

          <div className="row">
            {/* Table 1: Department-wise highest salary */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header text-center">Department-wise Highest Salary</div>
                <div className="card-body p-2 overflow-auto">
                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Department</th>
                          <th>Highest Salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        {highestSalaryData.map((item, index) => (
                          <tr key={index}>
                            <td>{item.department_name}</td>
                            <td>{item.Highest_Salary}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>

            {/* Table 2: Salary range-wise employee count */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header text-center">Salary Range-wise Employee Count</div>
                <div className="card-body p-2 overflow-auto">
                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Salary Range</th>
                          <th>Employee Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salaryRangeData.map((item, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td>0 - 50,000</td>
                              <td>{item['0-50000']}</td>
                            </tr>
                            <tr>
                              <td>50,001 - 100,000</td>
                              <td>{item['50001-100000']}</td>
                            </tr>
                            <tr>
                              <td>100,000+</td>
                              <td>{item['100000+']}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>

            {/* Table 3: Youngest employee in each department */}
            <div className="col-lg-4 col-md-12 mb-4">
              <div className="card h-100">
                <div className="card-header text-center">Youngest Employee in Each Department</div>
                <div className="card-body p-2 overflow-auto">
                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Department</th>
                          <th>Youngest Employee</th>
                          <th>Age</th>
                        </tr>
                      </thead>
                      <tbody>
                        {youngestEmployeeData.length > 0 ? (
                          youngestEmployeeData.map((item, index) => (
                            <tr key={index}>
                              <td>{item.department_name}</td>
                              <td>{item.employee_name}</td>
                              <td>{item.age}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center">No data available</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
