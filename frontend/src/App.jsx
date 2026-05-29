import './App.css';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>SWS AI Document Hub</h1>
        <button className="bell">🔔 0</button>
      </header>

      <div className="upload-box">
        <h2>Document Upload</h2>

        <input type="file" multiple accept=".pdf" />

        <p>Upload one or more PDF files</p>
      </div>

      <div className="library">
        <h2>Document Library</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="3">No documents uploaded</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
