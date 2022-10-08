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
   * @event
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
   * Generates material ui list items
   * @function
   * @param {array} list - The array of items to list
   * @param {string} keyIdentifier - A identifier of the list
   * @param {@mui/icon} icon - An action icon
   * TODO: allows selection of the text property
   */
  function generateListItems(list, keyIdentifier, icon) {
    return list.map((file, i) => {
      return (
        <ListItem
          key={i + keyIdentifier}
          secondaryAction={<IconButton edge="end">{icon}</IconButton>}
        >
          <ListItemText primary={file.name} />
        </ListItem>
      );
    });
  }

  return (
    <form>
      <div className="preview">
        <List>
          {files.length > 0 ? (
            generateListItems(files, '-uploaded-files', <DeleteIcon />)
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
