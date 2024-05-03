import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getProjects = async () => {
    try {
        // const res = await axios.get(`${API_URL}/projects`);
        // console.log(res.body)
        return [{ name: 'Test', created_at: new Date() }, { name: 'Test1', created_at: new Date() }, { name: 'Test3', created_at: new Date() }];
    } catch (err) {
        console.log(err);
    }
}

export const uploadDoc = async (doc) => {
    try {
        await axios.post(`${API_URL}/upload/doc`, { data: doc });
    } catch (err) {
        console.log(err);
    }
}

export const askQuestion = async (question, project_name) => {
    try {
        const res = await axios.post(`${API_URL}/question-response`, { question, project_name });
        console.log(res.body)
        return { response: 'Yes this workss' };
    } catch (err) {
        console.log(err);
    }
}

