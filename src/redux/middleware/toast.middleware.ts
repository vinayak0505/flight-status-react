import { toast } from "react-toastify";

// toast middleware for sending toast form anywhere within content
// this will automatically cathc error state and display toast
export const toastMiddleware = (_: any) => (next: any) => (action: any) => {
  switch (action?.type) {
    case "auth/loginUser/fulfilled":
      toast.info("Logged in successfully");
      break;
    case "auth/signUpUser/fulfilled":
      toast.info("SignUp successfully");
      break;
    case "auth/logoutUser/fulfilled":
      toast.info("Logged out successfully");
      break;
    case "helper/customToast":
      if (typeof action?.payload === "string") {
        toast.info(action.payload);
      }
      break;
    default:
      if (action.error?.message) {
        toast.error(action.error.message);
      }
  }
  next(action);
};