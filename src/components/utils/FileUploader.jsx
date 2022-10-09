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

const FileUploader = ({ fileTypes, numberOfFiles }) => {
  const [files, setFiles] = useState([]);
  const filesLength = files.length;

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
            <input
              multiple
              type="file"
              name="file"
              onChange={addFileHandler}
              accept={fileTypes}
            />
          </Button>
          <Button variant="contained" disabled={filesLength !== numberOfFiles}>
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FileUploader;
