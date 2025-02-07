
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./admin/member/pages/Login";
import MemberList from "./admin/member/pages/MemberList" // MemberList 페이지 import
import MemberDetail from "./admin/member/pages/MemberDetail" // MemberDetail 페이지 import
import Register from './admin/member/pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Navigate to="/login" />}></Route> */}
        <Route path='/' element={<Login />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/members" element={<MemberList />}/>
        <Route path="/members/:id" element={<MemberDetail />}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;