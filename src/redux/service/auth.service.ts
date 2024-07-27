import axios from 'axios';
import API from '../../constants/api';
import { UserType } from '../reducer/auth.reducer';
import BaseResponse from './base_response';

class AuthService {
    static async loginUser(email: string, password: string) {
        const response = await axios.post(API.SIGNIN, {
            email,
            password
        });
        return response.data;
    }
    static async updateUser(arg: UserType, image: File | null) {
        if (image) {
            const formData = new FormData();
            formData.append("image", image);
            if (arg) {
                for (const [key, value] of Object.entries(arg)) {
                    if (value) formData.append(key, value?.toString());
                }
            }

            const response = await axios.put(API.UPDATE_USER, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data;
        } else {
            const response = await axios.post(API.UPDATE_USER, arg);
            return response.data;
        }
    }

    static async signUpUser(email: string, password: string, fullName: string) {
        const response = await axios.post(API.SIGNUP, {
            email,
            password,
            fullName
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
        const response = await axios.post(API.VERIFY_TOKEN, null, {
            headers: { token }
        });
        return response.data;
    }

    static async getProfile(id: string): Promise<BaseResponse<UserType>> {
        const response = await axios.get(API.PROFILE + `/${id}`);
        return response.data;
    }
}

export default AuthService;