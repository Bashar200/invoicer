import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@material-ui/core/TextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Input } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import styles from './FileUpload.css';
import ChannelDropdown from '../ChannelDropdown/ChannelDropdown.js';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

export default function UploadButton() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedExcel, setSelectedExcel] = useState(null);
    const [vendor, setVendor] = React.useState('gupshup');
    const [mode, setMode] = React.useState('email');

    const handleChangeVendor = (event) => {
      setVendor(event.target.value);
    };

    const handleChangeMode = (event) => {
      setMode(event.target.value);
    };

    const handleFileChange = (event) => {
      const files = event.target.files;
      setSelectedFile(files[0]); // Assuming you only want to handle one file
    };
    const handleExcelChange = (event) => {
        const files = event.target.files;
        setSelectedExcel(files[0]); // Assuming you only want to handle one file
      };
    
    const handleUpload = () => {
      if (selectedFile || selectedExcel) {
        const formData = new FormData();
        formData.append("file", selectedFile || selectedExcel);
    
        axios
          .post(`http://192.168.5.213:80/invoice?vendor_name=${vendor}&mode=${mode}`, formData)
          .then((response) => {
            console.log("File uploaded successfully:", response.data);
            alert('File uploaded successfully');
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
  const containerStyle1 = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "200px",
    width: "100%"
  };
  const containerStyle2 = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 5px 0 0",
    height: "200px",
    margin: "auto"
  };

  const paragraphStyle = {
    fontStyle: "italic",
    fontSize: "14px",
  };

  return (
    <div>
    <div style={containerStyle}>
    <div style={containerStyle1}>
      <div style={{ position: "absolute"}}>
      <FormControl sx={{ m: 1, minWidth: 100}}>
        <Select
          value={vendor}
          onChange={handleChangeVendor}
          displayEmpty
          inputProps={{ 'aria-label': 'vendor' }}
        >
          <MenuItem value="gupshup">
            <em>Gupshup</em>
          </MenuItem>
          <MenuItem value={"sendgrid"}>Sendgrid</MenuItem>
        </Select>
        <FormHelperText>Vendor</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 100}}>
        <Select
          value={mode}
          onChange={handleChangeMode}
          displayEmpty
          inputProps={{ 'aria-label': 'Mode' }}
        >
          <MenuItem value="email">
            <em>Email</em>
          </MenuItem>
          <MenuItem value={"sms"}>SMS</MenuItem>
        </Select>
        <FormHelperText>Mode</FormHelperText>
      </FormControl>
      </div>
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
        <AddCircleOutlinedIcon className="svg_icons"/>
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
    </div>
    <div style={containerStyle}>
        <div style={containerStyle2}>
      <Input
        type="file"
        id="fileInput2"
        style={{ display: 'none' }}
        onChange={handleExcelChange}
        multiple
      />
      <label htmlFor="fileInput2">
        <IconButton color="primary" component="span">
        <FolderCopyIcon className="svg_icons"/>
        </IconButton>
      </label>
      <p style={paragraphStyle}>
        <i>*upload zip file</i>
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
    </div>

  );
}
