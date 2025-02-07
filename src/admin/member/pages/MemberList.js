/****************************************
* pages/MemberList.js
*****************************************/
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { memberlist } from "../api/auth";
import { Link } from "react-router-dom";

const MemberList = () => {
  //서버 갔다가 온 정보 저장하기
  const [members, setMembers] = useState([]); // 상태 변수
  const[error, setError] = useState("");


  // const getMembers = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/api/memberlist"); // API 호출
  //     setMembers(response.data.data);
  //     //console.log("API Response:", response); // 응답 데이터 확인

  //   } catch (err) {
  //     console.error("서버와 통신 중 문제가 발생했습니다.", err);
  //   }
  // };
  // useEffect(() => {
  //   getMembers(); 
  // }, []); //[] = 맨 처음만 랜더링한다. 

//다음과 같은 틀로 선생님이 사용. 
//   try {
//     useEffect(()=>{
//       const fetchMembers = async()=>{
//         const response = await memberlist(); //auth에 있는 놈 호출
//         setMembers(response.data.data)
//       }



//       fetchMembers();
//     },[]);
//   } catch (error) {
//     setError("서버와 통신 중 문제가 발생", error)
//   }

// 2차 수정
  
      useEffect(()=>{
        const fetchMembers = async() => {
          try {
            const tokens = localStorage.getItem("tokens");
            if(!tokens){
              setError("로그인이 필요합니다."); // 토큰이 없으면 에러 설정
              return ;
            }
            const {accessToken} = JSON.parse(tokens);
            if(!accessToken){
              setError("AccessToken이 없네요, 다시 로그인 해주세요");
              return ; 
            }
            // auth.js 에서 확인하자 서버에 토큰을 가지고 가는지
            const response = await memberlist();
            setMembers(response.data.data);
          }catch(error){
            if(error.response){
              if(error.response.status === 401){
                 setError("권한 없음. 다시 로그인");
              }else{
                 setError("서버에서 오류 발생")
              }
            }else{
               setError("네트워크 오류 발생")
            }
          }
        }
        fetchMembers();
      },[]);
  


  return (
    <div>
      <Header />
      <h1>회원목록</h1>
      <ul>
        {members.map((member) => (
          <li key={member.m_id}>
           <Link to={`/members/${member.m_id}`}> {member.m_name} </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default MemberList;
