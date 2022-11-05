import axios from 'axios';

const baseUrl = 'https://encuestas1.herokuapp.com';

/**
 * Obtiene las preguntas del archivo subido
 * @returns json de las preguntas
 */
export const getQuestions = async () => {
  try {
    const response = await axios.get(`${baseUrl}/questions`);
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
export const uploadFiles = async (data, path) => {
  try {
    const response = await axios.post(`${baseUrl}/${path}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Envía los tipos de gráficas de cada pregunta
 * @param {object} charts - Gráficos a realizar
 * @returns url de archivo a descargar
 */
export const sendCharts = async charts => {
  try {
    const response = await axios.post(`${baseUrl}/questions`, charts);
    return response;
  } catch (error) {
    console.log(error);
  }
};
