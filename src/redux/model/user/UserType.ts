import UserRole from "./UserRole";

type UserType = {
    id: number;
    fullName: string;
    email: string;
    role: UserRole;
} | null;

export default UserType;