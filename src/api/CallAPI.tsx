import axios from 'axios';

const API_BASE_URL = "https://localhost:7160/api"; // Địa chỉ API chung

// Hàm cấu hình URL đầy đủ
const buildUrl = (url: string) => ` ${API_BASE_URL}/${url}`;

// Hàm GET
const get = async (url: string, params: any) => {
  const fullUrl = buildUrl(url);
  return axios.get(fullUrl, { params })
    .then(response => response.data)
    .catch(error => {
      console.error(`GET ${fullUrl} failed:`, error);
      throw error;
    });
};

// Hàm POST
const post = async (url: string, data: any) => {
  const fullUrl = buildUrl(url);
  console.log(fullUrl);
  return axios.post(fullUrl, data)
    .then(response => response.data)
    .catch(error => {
      console.error(`POST ${fullUrl} failed:`, error);
      throw error;
    });
};

// Hàm PUT
const put = async (url: string, data: any) => {
  const fullUrl = buildUrl(url);
  return axios.put(fullUrl, data)
    .then(response => response.data)
    .catch(error => {
      console.error(`PUT ${fullUrl} failed:`, error);
      throw error;
    });
};

// Hàm DELETE
const del = async (url: string) => {
  const fullUrl = buildUrl(url);
  return axios.delete(fullUrl)
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
  buildUrl
};





//const responseWithData = async (method, url, data) => {
//    try {
//        fetch(baseURL + url, {
//            method: method,
//            body: JSON.stringify(data),
//            headers: {
//                'Content-Type': 'application/json',
//            },
//        });  

//    } catch (error) {
//        console.error("Error during API call:", error);
//        throw error; // Bắn lỗi để handle trong hàm gọi
//    }
//};

//const responseWithURL = (url) => {
//    try {
//        let response = fetch(baseURL + url);

//        if (!response.ok) {
//            throw new Error(`HTTP error! status: ${response.status}`);
//        }

//        return response;
//    } catch (error) {
//        console.error("Error during API call:", error);
//        throw error;
//    }
//};

//export default { responseWithData, responseWithURL };