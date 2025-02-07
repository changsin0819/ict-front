/****************************************
* pages/Login.js
*****************************************/
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { login } from "../api/auth";

const Login = () => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    // const searchParams = new URLSearchParams(window.location.search);
    // const token = searchParams.get("token");
    // const id = searchParams.get("id");
    // const email = searchParams.get("email");
    // const name = searchParams.get("name");
    
    // if(token && id && email && name){
    //   alert("로그인 성공")
    //   console.log(token+","+id+","+email+","+name)
    // }

    // 쿠키에서 토큰 읽기
    const token = document.cookie.split("= ").find(row => row.startsWith("authToken="))?.split("=")[1];

    if(token){
      // 로컬 스토리지에 토큰 넣기
      // localStorage.setItem("tokens",'{"accessToken":'+'"'+token+'"'+"}");
      localStorage.setItem("tokens", JSON.stringify({"accessToken":token}));
      // 쿠키 삭제
      // [1]
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      navigate("/members");
    }
  },[])
  const handleLogin = async () => {
    try {
      const response = await login(id,pass);

      // 서버 응답 처리
      if (response.data.success ) {
        // 로그인 성공: 사용자 정보 로컬 스토리지 저장
        localStorage.setItem("tokens", JSON.stringify(response.data.data));
        //더 추가 가능 
        //localStorage.setItem("token", JSON.stringify(response.data.));

        navigate("/members"); // 회원 목록 페이지로 이동
      } else {
        // 로그인 실패
        setError("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (err) {
      // 서버 연결 오류
      setError("서버와 통신 중 문제가 발생했습니다.");
    }
  };

  // 카카오 로그인 페이지로 리다이렉트
  const handleKakaoLogin = () => {
    window.location.href = "http://35.216.18.100:8080/oauth2/authorization/kakao"
  }

  // 네이버 로그인 페이지로 리다이렉트
  const handleNaverLogin = () => {
    window.location.href = "http://35.216.18.100:8080/oauth2/authorization/naver"
  }

  return (
    <div>
      <Header />
      <h1>로그인</h1>
      <div style={{ margin: "20px" }}>
        <label>아이디: </label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)} //바꿀때마다 target.value= 입력창에 입력된 값이 i에 들어감.
          style={{ margin: "10px" }}
        />
        <br />
        <label>비밀번호: </label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ margin: "10px" }}
        />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>} 
        <Button text="로그인" onClick={handleLogin} />
        <Button text="회원가입" onClick={() => { navigate("/register"); }}/>
        <Button text="카카오" onClick={handleKakaoLogin} style={{backgroundColor:"#FFEB3B"}}/>
        <Button text="네이버" onClick={handleNaverLogin} style={{backgroundColor:"#03C75A"}}/>
        
      </div>
      <Footer />
    </div>
  );
};

export default Login;