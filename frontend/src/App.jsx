import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [documents, setDocuments] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/files"
      );

      setDocuments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    const files = e.target.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      alert("Upload Successful");

      fetchFiles(); // refresh table
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>SWS AI Document Hub</h1>

        <button className="bell">
          🔔 0
        </button>
      </header>

      <div className="upload-box">
        <h2>Document Upload</h2>

        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleUpload}
        />

        <p>Upload one or more PDF files</p>
      </div>

      <div className="library">
        <h2>Document Library</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td colSpan="3">
                  No documents uploaded
                </td>
              </tr>
            ) : (
              documents.map((file, index) => (
                <tr key={index}>
                  <td>{file}</td>
                  <td>PDF</td>
                  <td>Uploaded</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;