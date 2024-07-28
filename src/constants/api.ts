const API = {
    SIGNIN: process.env.REACT_APP_API_BASE_URL + '/auth/login',
    SIGNUP: process.env.REACT_APP_API_BASE_URL + '/auth/signup',
    SIGNOUT: process.env.REACT_APP_API_BASE_URL + '/auth/signout',
    VERIFY_TOKEN: process.env.REACT_APP_API_BASE_URL + '/auth/verifyToken',
    
    PROFILE: process.env.REACT_APP_API_BASE_URL + '/auth/profile',

    FLIGHTS: process.env.REACT_APP_API_BASE_URL + '/flights',
    TICKET: process.env.REACT_APP_API_BASE_URL + '/tickets',
};

export default API;