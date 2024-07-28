const API = {
    SIGNIN: process.env.REACT_APP_API_BASE_URL + '/auth/login',
    SIGNUP: process.env.REACT_APP_API_BASE_URL + '/auth/signup',
    SIGNOUT: process.env.REACT_APP_API_BASE_URL + '/auth/signout',
    VERIFY_TOKEN: process.env.REACT_APP_API_BASE_URL + '/auth/verifyToken',
    
    PROFILE: process.env.REACT_APP_API_BASE_URL + '/auth/profile',

    FLIGHTS: process.env.REACT_APP_API_BASE_URL + '/flights',
    PRACTICLEFILE: process.env.REACT_APP_API_BASE_URL + '/practicle_file',
    JOBS: process.env.REACT_APP_API_BASE_URL + '/jobs',
    BOOKS: process.env.REACT_APP_API_BASE_URL + '/books',
    QUESTIONPAPER: process.env.REACT_APP_API_BASE_URL + '/question_paper',
    FAVOURITE: process.env.REACT_APP_API_BASE_URL + '/favourite',
    ALERTS: process.env.REACT_APP_API_BASE_URL + '/alert',
};

export default API;