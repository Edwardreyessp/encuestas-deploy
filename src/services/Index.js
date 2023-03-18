import axios from 'axios';

// const baseUrl = 'https://us-central1-proyectoencuestas1-f2ece.cloudfunctions.net';
// const baseUrl = 'http://127.0.0.1:4000';
// const baseUrl = 'https://encuestas1.herokuapp.com';
// const baseUrl = 'http://34.74.36.230';
// const baseUrl = 'https://proyectoencuestas1-f2ece.uc.r.appspot.com';

/**
 * Obtiene las preguntas del archivo subido
 * @returns json de las preguntas
 */
export const getQuestions = async path => {
  try {
    const response = await axios.get(`${path}/questions`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Manda a la DB los archivos
 * @param {object} data - Url de los archivos
 * @returns respuesta de confirmación de la DB
 */
export const axiosPost = async (data, path) => {
  try {
    const response = await axios.post(`${path}`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
