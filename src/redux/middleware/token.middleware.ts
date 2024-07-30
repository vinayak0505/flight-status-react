import axios from "axios";

// token middle for storing or removing token
// this will automatically catch error state and remove token when get not authenticated state
export const tokenMiddleware = (_: any) => (next: any) => (action: any) => {
    switch (action.type) {
        case "auth/loginUser/fulfilled":
        case "auth/signUpUser/fulfilled":
        case "auth/verifyToken/fulfilled":
            if (action?.payload?.token != null) {
                saveToken(action.payload.token);
            }
            break;

        case "auth/verifyToken/rejected":
        case "auth/logoutUser/fulfilled":
            removeToken();
            break;
    }
    next(action);
};

const saveToken = (token: string) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

const removeToken = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
}