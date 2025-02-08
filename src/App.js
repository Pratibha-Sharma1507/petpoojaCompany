import logo from './logo.svg';
import './App.css';
 import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
 import Employee from './Components/Emaployee/ViewEmployee.jsx'
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Department from './Components/Department/Department.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';

function App() {
  return (
    <div className="App">
  <Router>
       <div style={{display:'flex'}}>
        <Sidebar /> 
       <div style={{marginLeft: '20px', width: "100%"}}>
      <Routes>
           <Route path = '/' Component={Dashboard}></Route>
           <Route path = '/department' Component={Department}></Route>
           <Route path = '/employee' Component={Employee}></Route>
         </Routes>
         </div>
         </div> 
       </Router> 
          </div>
  );
}

export default App;
