import axios from 'axios';

const baseUrl =
  'https://us-central1-proyectoencuestas1-f2ece.cloudfunctions.net';
// const baseUrl = 'http://127.0.0.1:4000';

/**
 * Obtiene las preguntas del archivo subido
 * @returns json de las preguntas
 */
export const getQuestions = async () => {
  try {
    const response = await axios.get(`${baseUrl}/get_data`);
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
    const response = await axios.post(`${baseUrl}/${path}`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
