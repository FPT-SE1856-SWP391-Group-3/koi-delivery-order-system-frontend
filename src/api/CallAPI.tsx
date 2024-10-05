import axios from 'axios';

// Địa chỉ API cơ bản
const API_BASE_URL = "https://localhost:7160/api";

// Hàm cấu hình URL đầy đủ
const buildUrl = (url: string) => `${API_BASE_URL}/${url}`;

// Lấy token từ localStorage
const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem("token") || "");
  } catch {
    return null;
  }
};

// Tạo một instance axios với cấu hình mặc định
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tao mot instance axios de gui file
const formApiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Thêm một interceptor để kiểm tra response lỗi `401`
apiInstance.interceptors.response.use(
  (response) => {
    return response; // Trả về response nếu không có lỗi
  },
  (error) => {
    // Kiểm tra mã lỗi trả về
    if (error.response && error.response.status === 401) {
      // Xóa token và điều hướng về trang login
      localStorage.removeItem("token");
      window.location.href = "/login"; // Chuyển hướng người dùng đến trang login
    }
    return Promise.reject(error);
  }
);

// Thêm một interceptor để thêm Authorization header tự động
apiInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hàm GET
const get = async (url: string, params: any = {}) => {
  const fullUrl = buildUrl(url);
  return apiInstance.get(fullUrl, { params })
    .then(response => response.data)
    .catch(error => {
      console.error(`GET ${fullUrl} failed:`, error);
      throw error;
    });
};

// Hàm POST
const post = async (url: string, data: any) => {
  const fullUrl = buildUrl(url);
  return apiInstance.post(fullUrl, data)
    .then(response => response.data)
    .catch(error => {
      console.error(`POST ${fullUrl} failed:`, error);
      throw error;
    });
};

// Hàm POST file
const postForm = async (url: string, data: any) => {
  const fullUrl = buildUrl(url);
  return formApiInstance.post(fullUrl, data)
    .then(response => response.data)
    .catch(error => {
      console.error(`POST ${fullUrl} failed:`, error);
      throw error;
    });
};

// Hàm PUT
const put = async (url: string, data: any) => {
  const fullUrl = buildUrl(url);
  return apiInstance.put(fullUrl, data)
    .then(response => response.data)
    .catch(error => {
      console.error(`PUT ${fullUrl} failed:`, error);
      throw error;
    });
};

// Hàm DELETE
const del = async (url: string) => {
  const fullUrl = buildUrl(url);
  return apiInstance.delete(fullUrl)
    .then(response => response.data)
    .catch(error => {
      console.error(`DELETE ${fullUrl} failed:`, error);
      throw error;
    });
};

// Export các hàm để sử dụng ở nơi khác
export default {
  get,
  post,
  put,
  del,
  postForm,
  buildUrl
};