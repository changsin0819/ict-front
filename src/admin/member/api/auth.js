/****************************************
* api/auth.js
*****************************************/
import {api} from "./http.js";

export const login = (m_id, m_pw) => 
    api.post("/members/login", {m_id, m_pw});

// export const memberlist = () => 
//     api.get("/memberlist");
export const register = (member) => 
    api.post("/members/register",member)

export const memberlist = async () =>{
    try {
        const response = await api.get("/members/memberlist");
        return response; 
    } catch (error) {
        throw error;
    }
   // api.get("/memberlist");
}
    
//컨트롤러에 정한 것들과 맞춤 
// export const memberDetail = (id) => 
//     api.get("/memberDetail",{params: {id}});

export const memberDetail = async (id) => {
    try {
        const response = await api.get("/members/memberDetail",{params: {id}});
        return response; 
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await api.get("members/logout");
        return response; 
    } catch (error) {
        throw error;
    }
}
