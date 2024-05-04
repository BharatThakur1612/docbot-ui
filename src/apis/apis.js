import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getProjects = async () => {
    try {
        return await axios.get(`${API_URL}/projects/`);
    } catch (err) {
        return err;
    }
}

export const createProject = async (data) => {
    try {
        return await axios.post(`${API_URL}/projects/`, data);
    } catch (err) {
        return err;
    }
}

export const uploadDoc = async (doc) => {
    const headers = { 'content-type': 'multipart/form-data' }
    try {
        return await axios.post(`${API_URL}/upload/doc`, doc, headers);
    } catch (err) {
        return err;
    }
}

export const askQuestion = async (question, project_name) => {
    try {
        return await axios.post(`${API_URL}/question-response`, { question, project_name });
    } catch (err) {
        return err;
    }
}
