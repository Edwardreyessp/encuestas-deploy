import { useState } from 'react';

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  function addFileHandler(event) {
    addFiles(event.target.files);
  }

  const addFiles = fileObject => {
    for (let index = 0; index < fileObject.length; index++) {
      setFiles(curr => [...curr, fileObject[index]]);
    }
  };

  return (
    <form>
      <div className="preview">
        {files.map((file, i) => (
          <p key={i + '-file-name'}>{file.name}</p>
        ))}
      </div>
      <input multiple type="file" name="file" onChange={addFileHandler} />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FileUploader;
