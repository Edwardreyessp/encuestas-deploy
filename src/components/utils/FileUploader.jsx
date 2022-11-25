import {
  Button,
  Card,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { uploadFile } from '../../firebase/config';
import { uploadFiles } from '../../services/Index';

const defaultFiletypeScheme = {
  word: ['doc', 'docx'],
  rda: ['rda', 'Rda'],
  excel: ['xlsx'],
};

/**
 * Component to upload files
 * @component
 * @prop {Object{}} fileTypes - the accepted file types with their extensions
 * @example {Object{}.word} - Array with the word file extension ['doc', 'docx']
 * @prop {number} numberOfFiles - The required number of files to be send
 */
const FileUploader = ({
  fileTypes = defaultFiletypeScheme,
  numberOfFiles,
  path = '/',
}) => {
  const [files, setFiles] = useState([]);
  // const [payload, setPayload] = useState({});
  const filesLength = files.length;
  // const filesExtensions = Object.entries(fileTypes).map(
  //   ([, extension]) => extension
  // );
  /*
   * NOTE: function to accept only required file types
   * const acceptedFiles = filesExtensions
   *  .flatMap(extension => extension)
   *  .join(',');
   */
  const payload = {};

  /**
   * Handle uploaded files
   * @function
   * @param {event} event - default event trigerred by the file input
   */
  function addFileHandler(event) {
    addFiles(event.target.files);
  }

  /**
   * Manage added files
   * @function
   * @param {FileObject} fileObject - Web API file object with uploaded files
   */
  const addFiles = fileObject => {
    for (let index = 0; index < fileObject.length; index++) {
      setFiles(curr => [...curr, fileObject[index]]);
    }
  };

  /**
   * Generates material ui list of the files to be uploaded
   * @function
   * @param {Array} list - The array of items to list
   * @returns {(ListItem|Array)} Array of mui ListItem's of the files to be uploaded
   */
  function generateUploadFilesList(list) {
    return list.map((file, i) => {
      return (
        <ListItem
          key={i + '-file'}
          secondaryAction={
            <IconButton onClick={() => removeFileHandler(file.name)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={file.name} />
        </ListItem>
      );
    });
  }

  /**
   * Handle click on delete button
   * @function
   * @param {string} fileName - The name of the file to be removed
   */
  function removeFileHandler(fileName) {
    removeFile(fileName);
  }

  /**
   * Remove selected file according to its name
   * @param {string} fileName - The name of the file to be removed
   */
  function removeFile(fileName) {
    const filteredList = files.filter(file => file.name !== fileName);
    setFiles(filteredList);
  }

  /**
   * Uploads the files and prepares the payload to be send to the API
   * @event
   */
  async function handleSubmit() {
    try {
      for (const file of files) {
        const extension = getExtension(file.name);
        const fileType = getFileType(extension);
        const url = await uploadFile(file, file.name);
        constructPayload(fileType, url);
      }
    } catch (error) {
      throw new Error(`Error uploading files to firebase: ${error}`);
    } finally {
      uploadFiles(payload, 'files');
      cleanFiles();
    }
  }

  /**
   * Gets the file extesion from the file name
   * @function
   * @param {string} fileName - the name of the file
   * @returns {string} the characters after the dot in the the name
   */
  function getExtension(fileName) {
    const regex = /\w+$/;
    const extension = fileName.match(regex)[0];
    return extension;
  }

  /**
   * Finds the general file type according to and extension
   * @function
   * @param {string} extension - A file extension
   * @returns {string} The file type
   */
  function getFileType(extension) {
    const list = Object.entries(fileTypes);
    for (let fileTypeArr of list) {
      const [fileType, extensionList] = fileTypeArr;
      if (extensionList.includes(extension)) return fileType;
    }
    throw new Error(`No existe el tipo de archivo con extension ${extension}`);
  }

  /**
   * Constructs the payload object to be send to the API
   * @function
   * @param {string} fileType - The general name of the file type
   * @param {string} url - The url of the uploaded file
   */
  function constructPayload(fileType, url) {
    payload[`${fileType}`] = url;
    // setPayload(curr => {
    //   return { ...curr, [`${fileType}`]: url };
    // });
  }

  /**
   * Clean the file list after the documents are uploaded
   * @function
   */
  function cleanFiles() {
    setFiles([]);
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 500 }}>
      <Grid
        container
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
      >
        <Grid xs={12}>
          <div className="preview">
            <List>
              {files.length > 0 ? (
                generateUploadFilesList(files)
              ) : (
                <p>Sin archivos seleccionados</p>
              )}
            </List>
          </div>
        </Grid>
        <Grid
          xs={12}
          display="flex"
          justifyContent="end"
          className="file-uploader-wrapper"
          sx={{ padding: '10px' }}
        >
          <Button
            variant="contained"
            color="success"
            component="label"
            sx={{ margin: '0 10px' }}
          >
            Selecciona los archivos
            <input multiple type="file" name="file" onChange={addFileHandler} />
          </Button>
          <Button
            variant="contained"
            disabled={filesLength !== numberOfFiles}
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FileUploader;
