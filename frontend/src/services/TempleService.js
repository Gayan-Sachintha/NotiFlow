import httpCommon from "./http-common";

class TempleService{
    getAll(){
        return httpCommon.get("/temple/getApprovedTemples");
    }
}

export default new TempleService();