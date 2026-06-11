import axios from "axios"

const API_BASE_URL = "http://localhost:3000/api/auth"

export async function register({ username, email, password }) {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, {
            username,
            email,
            password
        }, {
            withCredentials: true
        })
        return response.data
    } catch (err) {
        console.error("Register API error:", err)
        throw err
    }
}

export async function login({ email, password }) {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            email,
            password
        }, {
            withCredentials: true
        })
        return response.data
    } catch (err) {
        console.error("Login API error:", err)
        throw err
    }
}

export async function logout() {
    try {
        const response = await axios.get(`${API_BASE_URL}/logout`, {
            withCredentials: true
        })
        return response.data
    } catch (err) {
        console.error("Logout API error:", err)
        throw err
    }
}

export async function getMe() {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-me`, { 
            withCredentials: true 
        })
        return response.data
    } catch (err) {
        console.error("GetMe API error:", err)
        throw err
    }
}