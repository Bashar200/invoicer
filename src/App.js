import './App.css';
import HomePage from './components/Home/HomePage.js';
import FileUpload  from './components/FileUpload/FileUpload.js';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          {/* <Route path="/upload-docs" element={<FileUpload/>} /> */}
        </Routes>
    </Router>
  );
}