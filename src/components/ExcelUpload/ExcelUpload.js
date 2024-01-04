import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import styles from './ExcelUpload.css';

export default function ExcelUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    console.log({selectedFile})
    const handleFileChange = (event) => {
        console.log(event.target)
        return
      const files = event.target.files;
      setSelectedFile(files[0]);
    };
    
    const handleUpload = () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        
        axios
          .post("http://192.168.5.42:80/invoice/gupshup/whatsapp", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
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
        onChange={(e)=>{
            console.log(e)
        }}
        onFocus={()=>{
            console.log('focud')
        }}
        multiple
      />
      <label htmlFor="fileInput">
        <IconButton color="primary" component="span">
        <FolderCopyIcon className="svg_icons_1"/>
        </IconButton>
      </label>
      <p style={paragraphStyle}>
        <i>*upload excel zip</i>
      </p>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
      >submit</Button>
      </div>
      <div></div>
    </div>

  );
}
