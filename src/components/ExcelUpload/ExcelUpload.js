import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@material-ui/core/TextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Input } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import styles from './ExcelUpload.css';
import ChannelDropdown from '../ChannelDropdown/ChannelDropdown.js';



export default function UploadButton() {
  const [selectedFile, setSelectedFile] = useState([]);
  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFile(Array.from(files));
  };
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post("https://testing9353.free.beeceptor.com", formData)
        .then((response) => {
          console.log("File uploaded successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.error("No file selected for upload.");
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px dotted #000",
    height: "200px",
    marginTop: "20px"
  };
  const containerStyle2 = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 5px 0 0",
    height: "200px",
  };

  const paragraphStyle = {
    fontStyle: "italic",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
        <div style={containerStyle2}>
      <Input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
      <label htmlFor="fileInput">
        <IconButton color="primary" component="span">
        <FolderCopyIcon className="svg_icons"/>
        </IconButton>
      </label>
      <p style={paragraphStyle}>
        <i>*upload vendor invoice</i>
      </p>

      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
      >submit</Button>
      </div>
      <div></div>
    </div>

  );
}
