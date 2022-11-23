import axios from 'axios';

const baseUrl = 'https://encuestas1.herokuapp.com';
// const baseUrl = 'http://127.0.0.1:4000';
const urlPos = '/pos';

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
 * Envía modificaciones de preguntas, configuración y gráficas
 * @param {object} allData - Json de los datos
 * @returns url de archivo a descargar
 */
export const sendModifiedQuestions = async allData => {
  try {
    const response = await axios.post(`${baseUrl}/questions`, allData);
    return response;
  } catch (error) {
    console.log(error);
  }
};

/* POSESTRATIFICACIÓN */

/**
 * Envía la configuración de los estratos
 * @param {object} data - Json de los datos
 * @returns Array de opciones para elegir en los estratos
 */
export const sendConfig = async data => {
  try {
    const response = await axios.post(`${baseUrl}${urlPos}/data`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Envía los nombres de estratos y las opciones elegidas
 * @param {object} data - Json de los estratos
 * @returns Url de archivo a descargar
 */
export const sendEstratos = async data => {
  try {
    const response = await axios.post(`${baseUrl}${urlPos}/data`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
