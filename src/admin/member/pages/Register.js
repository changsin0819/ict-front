import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
    const [member, setMember] = useState({
    m_id: "",
    m_pw: "",
    m_name: "",
    m_age: "",
  });

  const handleChanges = (e) => {
    const { id, value } = e.target;
    setMember((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignup = async () => {
    const response = await register(member);
    try {
      if (response.data.success) {
        navigate("/")
      }else{
        setError("회원가입실패")
      }
    } catch (error) {
      alert("회원가입중 오류발생");
    }
  };

  return (
    <div>
        <div>
          <label htmlFor="m_id">아이디: </label>
          <input
            type="text"
            id="m_id"
            placeholder="아이디를 입력해주세요."
            value={member.m_id}
            onChange={handleChanges}
          />
        </div>
        <div>
          <label htmlFor="m_pw">비밀번호: </label>
          <input
            type="password"
            id="m_pw"
            placeholder="비밀번호를 입력해주세요."
            value={member.m_pw}
            onChange={handleChanges}
          />
        </div>
        <div>
          <label htmlFor="m_name">이름: </label>
          <input
            type="text"
            id="m_name"
            placeholder="이름을 입력해주세요"
            value={member.m_name}
            onChange={handleChanges}
          />
        </div>
        <div>
          <label htmlFor="m_age">나이: </label>
          <input
            type="number"
            id="m_age"
            placeholder="나이를 입력해주세요"
            value={member.m_age}
            onChange={handleChanges}
          />
          {error && <p style={{ color: "red" }}>{error}</p>} 
        </div>
        <div>
          <Button text="회원가입" onClick={()=>{
            handleSignup()
          }}/>
          <Button
          text="취소"
          onClick={() => {
            navigate("/");
          }}
        />
        </div>
    </div>
  );
};

export default Register;
