import config from "./config";

const TaskService = {
    list: async () => {
        return fetch(config.apiURL+'tasks',{
            method: "GET",
            headers: config.apiCallHeaders,
        }).then((response) => response.json()).then((responseData) => {
            return responseData;
        }).catch(error => console.warn(error));
    },

    get: async (id) => {
        return fetch(config.apiURL+'tasks/'+id,{
            method: "GET",
            headers: config.apiCallHeaders,
        }).then((response) => response.json()).then((responseData) => {
            return responseData;
        }).catch(error => console.warn(error));
    },

    add: async (data) => {
        return fetch(config.apiURL+'tasks',{
            method: "POST",
            headers: config.apiCallHeaders,
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((responseData) => {
            return responseData;
        }).catch(error => console.warn(error));
    },

    edit: async (data) => {
        return fetch(config.apiURL+'tasks/'+data.id,{
            method: "PUT",
            headers: config.apiCallHeaders,
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((responseData) => {
            return responseData;
        }).catch(error => console.warn(error));
    },

    remove: async (id) => {
        return fetch(config.apiURL+'tasks/'+id,{
            method: "DELETE",
            headers: config.apiCallHeaders
        }).then((response) => response.json()).then((responseData) => {
            return responseData;
        }).catch(error => console.warn(error));
    }    

};

export default TaskService;