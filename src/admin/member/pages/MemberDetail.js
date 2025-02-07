/****************************************
* pages/MemberDetail.js
*****************************************/
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { memberDetail } from "../api/auth";

const MemberDetail = () => {
  //memberList에서 넘어오는 파라미터 받기 
  const { id } = useParams(); // URL에서 ID를 받아옵니다.
  const [member,setMember] = useState("");
  const[loading, setLoading] = useState("");
  const navigate = useNavigate();

  
// ***************************************
useEffect(()=>{
  const fetchMemberDetail = async () =>{
    try {
      const response = await memberDetail(id);
      if(response.data.success){
          setMember(response.data.data);
      }else{
        alert(response.data.message);
        navigate("/members");
      }
    } catch (error) {
      alert("권한없음1");
      navigate("/members");
    } finally {
      setLoading(false);
    }
  };
  fetchMemberDetail();
},[id,navigate]);

if(loading){
  return <div>권한이 없어서 보이지 않습니다.</div>
}

// 데이터가 없는경우 아무것도 렌더링 하지 말자
if(!member){
  return null;
}


  return (
    <div>
      <Header />
      {
        <div>
          <h1>{member.m_name}님의 정보</h1>
          <p>ID: {member.m_id}</p>
          <button onClick={()=> navigate('/members')}>목록으로 돌아가기</button>
        </div>
    }
      <Footer />
    </div>
  );
};

export default MemberDetail;