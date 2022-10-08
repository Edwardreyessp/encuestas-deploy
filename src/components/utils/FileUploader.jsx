import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const FileUploader = () => {
  const [files, setFiles] = useState([]);

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

  return (
    <form>
      <div className="preview">
        <List>
          {files.length > 0 ? (
            generateUploadFilesList(files)
          ) : (
            <p>Sin archivos seleccionados</p>
          )}
        </List>
      </div>
      <input multiple type="file" name="file" onChange={addFileHandler} />
      <Button variant="contained">Enviar</Button>
    </form>
  );
};

export default FileUploader;
