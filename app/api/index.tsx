import axios from "axios"

// const base_url = process.env.NEXT_PUBLIC_LIVE_URL
const base_url = process.env.NEXT_PUBLIC_BASE_URL

export const post_request = async (endpoint: string, payload: any) => {

    try {
        const response = await axios.post(`${base_url}/${endpoint}`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response;
    } catch (err: any) {
        return err;
    }
};

export const patch_request = async (endpoint: string, payload: any) => {
    try {
        const response = await axios.patch(`${base_url}/${endpoint}`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response;
    } catch (err: any) {
        return err;
    }
};

export const patch_auth_request = async (endpoint: string, payload: any) => {
    try {
        const auth_id = localStorage.getItem('x-id-key')
        const response = await axios.patch(`${base_url}/${endpoint}`, payload, {
            headers: {
                "Content-Type": "application/json",
                "x-id-key": auth_id
            }
        });

        return response;
    } catch (err: any) {
        return err;
    }
};

export const post_auth_request = async (endpoint: string, payload: any) => {
    try {
        const auth_id = localStorage.getItem('x-id-key')
        const response = await axios.post(`${base_url}/${endpoint}`, payload, {
            headers: {
                "Content-Type": "application/json",
                "x-id-key": auth_id
            }
        });

        return response;
    } catch (err: any) {
        return err;
    }
};



export const get_request = async (endpoint: string) => {
    try {
        const response = await axios.get(`${base_url}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        return response;
    } catch (err: any) {
        return err;
    }
};

export const get_auth_request = async (endpoint: string) => {
    try {
        const auth_id = localStorage.getItem('x-id-key')
        const response = await axios.get(`${base_url}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                "x-id-key": auth_id
            }
        });

        return response;
    } catch (err: any) {
        return err;
    }
};

export const delete_auth_request = async (endpoint: string) => {
    try {
        const auth_id = localStorage.getItem('x-id-key')
        const response = await axios.delete(`${base_url}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                "x-id-key": auth_id
            }
        });

        return response;
    } catch (err: any) {
        return err;
    }
};

