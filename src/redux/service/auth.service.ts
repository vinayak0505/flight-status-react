import axios from 'axios';
import API from '../../constants/api';
import { Role, UserType } from '../reducer/auth.reducer';
import BaseResponse from './base_response';

class AuthService {
    static async loginUser(email: string, password: string) {
        console.log(email, password);
        
        const response = await axios.post(API.SIGNIN, {
            email,
            password
        });
        console.log(response.data);
    
        return response.data;
    }

    static async signUpUser(email: string, password: string, fullName: string, role: Role) {
        const response = await axios.post(API.SIGNUP, {
            email,
            password,
            fullName,
            role
        });
        return response.data;
    }

    static async logoutUser(token: string) {
        const response = await axios.put(API.SIGNOUT, null, {
            headers: { token }
        });
        return response.data;
    }

    static async verifyToken(token: string) {
        const response = await axios.post(API.VERIFY_TOKEN, token);
        return response.data;
    }

    static async getProfile(id: string): Promise<BaseResponse<UserType>> {
        const response = await axios.get(API.PROFILE + `/${id}`);
        return response.data;
    }
}

export default AuthService;