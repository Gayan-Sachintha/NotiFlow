import httpCommon from "./http-common";

class UserServices{
    login(data, role){
        return httpCommon.post(`/user/login/${role}`, data);
    }

    register(data, role){
        return httpCommon.post(`/user/register/${role}`, data);
    }
}

export default new UserServices();