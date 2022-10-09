import axios from 'axios';

const baseUrl = 'https://encuestas1.herokuapp.com';

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${baseUrl}/questions`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFiles = async data => {
  try {
    const response = await axios.post(`${baseUrl}/files`, data);

    return response;
  } catch (error) {
    console.log(error);
  }
};
