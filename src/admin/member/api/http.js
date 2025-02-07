/****************************************
* api/http.js
*****************************************/
import axios from "axios";
export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, //.env파일에서 읽어옴
    // 서버에 갈때 헤더부분에 token을 가지고 가야한다.
    headers:{
        "Content-Type" : "application/json",
    },
    withCredentials: true, //CORS 
})

// 3. 인터셉터 동작 설명
//   1) 인터셉터가 모든 요청을 가로챔
//      - 요청이 발생하면 인터셉터에서 config 객체를 확인한다.
//   2) 특정 요청 제외
//      - config.url을 기준으로 /login과 /signup 요청은 제외한다.
//   3) 제외하지 않는 다른 요청
//      - Authorization 헤더에 JWT 토큰이 자동으로 추가되게 한다.

api.interceptors.request.use(
    (config) => {
        const excludedPaths = ["/members/login","/members/register"]; // 제외할 목록
        if( !excludedPaths.includes(config.url)){
            // token 추가
            const tokens = localStorage.getItem("tokens");
            if(tokens){
                const {accessToken} = JSON.parse(tokens);
                if(accessToken){
                    config.headers.Authorization = `Bearer ${accessToken}`
                }
            }
        }
        return config;
    }
    ,(error) => {
        return Promise.reject(error);
    }
);