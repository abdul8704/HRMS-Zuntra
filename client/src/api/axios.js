import axios from "axios";

const BASE_URL = "http://localhost:5000"; 

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, 
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// response interceotor incase jwt token is expired. 
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 403 &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] =
                            "Bearer " + token;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await axios.post(
                    `${BASE_URL}/auth/refresh-token`, 
                    {},
                    { withCredentials: true } 
                );

                const newToken = res.data.accessToken;
                localStorage.setItem("accessToken", newToken);
                api.defaults.headers["Authorization"] = "Bearer " + newToken;
                processQueue(null, newToken);
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem("accessToken");
                window.location.href = "/";             // kick out incase of refresh token expires
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
