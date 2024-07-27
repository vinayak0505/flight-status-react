const API = {
    SIGNIN: process.env.REACT_APP_BASE_URL + '/auth/signIn',
    SIGNUP: process.env.REACT_APP_BASE_URL + '/auth/signUp',
    SIGNOUT: process.env.REACT_APP_BASE_URL + '/auth/signOut',
    VERIFY_TOKEN: process.env.REACT_APP_BASE_URL + '/auth/verifyToken',
    UPDATE_USER: process.env.REACT_APP_BASE_URL + '/auth/updateUser',
    PROFILE: process.env.REACT_APP_BASE_URL + '/auth/profile',
    NOTES: process.env.REACT_APP_BASE_URL + '/note',
    PRACTICLEFILE: process.env.REACT_APP_BASE_URL + '/practicle_file',
    JOBS: process.env.REACT_APP_BASE_URL + '/jobs',
    BOOKS: process.env.REACT_APP_BASE_URL + '/books',
    QUESTIONPAPER: process.env.REACT_APP_BASE_URL + '/question_paper',
    FAVOURITE: process.env.REACT_APP_BASE_URL + '/favourite',
    ALERTS: process.env.REACT_APP_BASE_URL + '/alert',
};

export default API;