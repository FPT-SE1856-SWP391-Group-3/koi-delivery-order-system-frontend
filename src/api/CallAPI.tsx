import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_ENDPOINT

// Địa chỉ API cơ bản
const API_BASE_URL = BASE_URL

// Hàm cấu hình URL đầy đủ
const buildUrl = (url: string) => `${API_BASE_URL}/${url}`

const imageBuildUrl = (imageUrl: string) => BASE_URL + "/" + imageUrl

// Lấy token từ localStorage
const getToken = () => {
    try {
        return JSON.parse(localStorage.getItem("token") || "")
    } catch {
        return null
    }
}

// Tạo một instance axios với cấu hình mặc định
const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
})

const apiFileInstance = axios.create({
    baseURL: API_BASE_URL,
})

// Tao mot instance axios de gui file
const formApiInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
})

// Thêm một interceptor để thêm Authorization header tự động
apiInstance.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Hàm GET
const getFile = (url: string, path: any = {}) => {
    const fullUrl = buildUrl(url)
    const params = { path: path }
    return apiFileInstance
        .get(fullUrl, { params, responseType: "blob" })
        .then((response) => response.data)
        .catch((error) => {
            console.error(`GET ${fullUrl} failed:`, error)
            throw error
        })
}

// Hàm GET địa chỉ
const getAddress = (url: string) => {
    return apiInstance
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
            console.error(`GET ${url} failed:`, error)
            throw error
        })
}

const get = async (url: string, params: any = {}) => {
    const fullUrl = buildUrl(url)
    return apiInstance
        .get(fullUrl, { params })
        .then((response) => response.data)
        .catch((error) => {
            console.error(`GET ${fullUrl} failed:`, error)
            throw error
        })
}

// Hàm POST
const post = async (url: string, data: any) => {
    const fullUrl = buildUrl(url)
    return apiInstance
        .post(fullUrl, data)
        .then((response) => response.data)
        .catch((error) => {
            console.error(`POST ${fullUrl} failed:`, error)
            throw error
        })
}

// Hàm POST file
const postForm = async (url: string, data: any) => {
    const fullUrl = buildUrl(url)
    return formApiInstance
        .post(fullUrl, data)
        .then((response) => response.data)
        .catch((error) => {
            console.error(`POST ${fullUrl} failed:`, error)
            throw error
        })
}

// Hàm PUT
const put = async (url, data) => {
    const fullUrl = buildUrl(url)
    console.log("Attempting PUT request to:", fullUrl, "with data:", data)
    return apiInstance
        .put(fullUrl, data)
        .then((response) => response.data)
        .catch((error) => {
            console.error(
                `PUT ${fullUrl} failed with status ${error.response?.status}:`,
                error
            )
            throw error
        })
}
const putForm = async (url: string, data: any) => {
    const fullUrl = buildUrl(url)
    return formApiInstance
        .put(fullUrl, data)
        .then((response) => response.data)
        .catch((error) => {
            console.error(`POST ${fullUrl} failed:`, error)
            throw error
        })
}

// Hàm DELETE
const del = async (url: string, data?: any) => {
    const fullUrl = buildUrl(url)
    return apiInstance
        .delete(fullUrl, { data })
        .then((response) => response.data)
        .catch((error) => {
            console.error(`DELETE ${fullUrl} failed:`, error)
            throw error
        })
}

// Export các hàm để sử dụng ở nơi khác
export default {
    get,
    post,
    put,
    del,
    postForm,
    getFile,
    buildUrl,
    imageBuildUrl,
    putForm,
    getAddress,
}
