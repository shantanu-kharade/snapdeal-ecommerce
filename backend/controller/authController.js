import { loginService, registerService, logoutService } from '../service/authService.js'

const loginUser = async (req, res) => {
    try {
        const userLogin = await loginService(req, res);
        res.send(userLogin);
    }
    catch (error) {
        res.send(error.message);
    }
}

const registerUser = async (req, res) => {
    try {
        // const userRequest = await validateUserBody(req, res, () => {});
        const userRegister = await registerService(req, res);
        res.send(userRegister);
    }
    catch (error) {
        res.send(error.message);
    }

}


const logoutUser = async (req, res) => {
    try {
        const userLogout = await logoutService(req, res);
        res.send(userLogout);
    }
    catch (error) {
        res.send(error.message);
    }
}


export {
    loginUser,
    registerUser,
    logoutUser
}