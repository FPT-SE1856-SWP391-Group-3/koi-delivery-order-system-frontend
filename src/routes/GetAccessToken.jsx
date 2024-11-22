import api from "../api/CallAPI"
const GetAccessToken = async () => {
    if (!localStorage.getItem("token")) {
        return false
    }
    try {
        const data = await api.post("users/token/check", null)

        if (data.success) {
            console.log(data)
            return localStorage.getItem("token")
        } else {
            localStorage.removeItem("token")
            console.log(data)
            return false
        }
    } catch (error) {
        localStorage.removeItem("token")
        return false
    }
}

export default GetAccessToken
