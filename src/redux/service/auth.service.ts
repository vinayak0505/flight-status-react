import axios from 'axios';
import API from '../../constants/api';
import BaseResponse from './base_response';
import UserRole from '../model/user/UserRole';
import UserType from '../model/user/UserType';
import { getFirebaseToken } from '../../notifications/firebase_messaging_init';

class AuthService {
    static async loginUser(email: string, password: string) {
        const response = await axios.post(API.SIGNIN, {
            firebase_token: getFirebaseToken(),
            user: {
                email,
                password
            }
        });
        return response.data;
    }

    static async signUpUser(email: string, password: string, fullName: string, role: UserRole) {
        const response = await axios.post(API.SIGNUP, {
            firebase_token: getFirebaseToken(),
            user: {
                email,
                password,
                fullName,
                role
            }
        });
        return response.data;
    }

    static async logoutUser(token: string) {
        // TODO: add logout in future
        return true;
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