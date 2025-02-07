/****************************************
* component/Header.js
*****************************************/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';

const Header = () => {
    const navigator = useNavigate();
    const tokens = localStorage.getItem("tokens")
    // 클라이언트의 로그아웃 처리
    const handleLogout = async() => {
        const response = await logout();
        if(response.data.success){
            localStorage.removeItem("tokens");   // 토큰 삭제
            navigator("/login");
        }else{
            alert("로그아웃 실패")
            navigator("/login");
        }
        
    }

    return (
        <header style={{backgroundColor: '#f4f4f4', padding: '10px', textAlign: 'center'}}>
        <h1>React Application</h1>
        {tokens && <button onClick={handleLogout} >로그아웃</button>}
        </header>
    )
}

export default Header;
