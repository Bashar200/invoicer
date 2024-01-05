import axios from "axios";

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const url = "http://192.168.5.213:80"

// export default function DataGridDemo () {
//   const [rows, setRows] = React.useState({});
//   const [columns, setColumns] = React.useState({})
//   const [page, setPage] = React.useState(0);
//   const [vendors, setVendors] = React.useState([]);

//   async function getRows () {
//     var dat = {}
//     vendors.map(async (vendor) => {
//       var response = await axios.get(`${url}/invoice?vendor_name=${vendor}`)
//       setRows({...rows, [vendor] : response.data})
//         dat[vendor] = response.data
//     })
//     console.log(dat)
//   }

//   function getColumns () {
//     let col = {}
//     console.log(rows)
//     vendors.map((vendor) => {
//       if (!rows[vendor] || rows[vendor].length === 0)
//       setColumns({[vendor] : []})
//       else {
//         let cols = []
//         for(let key in rows[vendor][0])
//           cols.push({"field": key, "headerName": key})
//         setColumns({...columns, [vendor] : cols})
//       }    
//     })
//   }
//   React.useEffect(() => {
//     setVendors(["gupshup", "abcd"])
//   },[]);

//   React.useEffect(() => {
//     getRows()
//   },[vendors]);

//   React.useEffect(() => {
//     getColumns()
//   },[vendors,rows]);

//   return (
//     vendors.forEach((vendor) => {
//       <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows[vendor]}
//         columns={columns[vendor]}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         rowCount={10}
//         pageSizeOptions={[5, 10]}
//         // checkboxSelection
//         // onPageChange={getRows}
//         // onPaginationModelChange={getRows}
//       />
//     </div>
//     })
//   );
// } 

function Grid1() {

  const [rows1, setRows] = React.useState([]);
  const [columns1, setColumns] = React.useState([])
  const [page1, setPage] = React.useState(0);

  function getColumns () {
    if (!rows1 || rows1.length === 0)
      return []
    let cols = []
    for(let key in rows1[0])
      cols.push({"field": key, "headerName": key})
    setColumns(cols)
  }

  function getRows () {
    let dat = null
    axios
      .get(`${url}/invoice?vendor_name=gupshup`)
      .then((response) => {
        console.log("Data fetched successfully:", response.data);
        dat = response.data
        setRows(dat)
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        dat = []
      });
    return dat
  }

  React.useEffect(() => {
    getRows()
  },[]);

  React.useEffect(() => {
    getColumns()
  },[rows1]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows1}
        columns={columns1}
        initialState={{
          pagination: {
            paginationModel: { page: page1, pageSize: 5 },
          },
        }}
        rowCount={10}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        // onPageChange={getRows}
        // onPaginationModelChange={getRows}
      />
    </div>
  );
}

function Grid2() {

  const [rows2, setRows] = React.useState([]);
  const [columns2, setColumns] = React.useState([])
  const [page2, setPage] = React.useState(0);

  function getColumns () {
    if (!rows2 || rows2.length === 0)
      return []
    let cols = []
    for(let key in rows2[0])
      cols.push({"field": key, "headerName": key})
    setColumns(cols)
  }

  function getRows () {
    let dat = null
    axios
      .get(`${url}/invoice?vendor_name=abcd`)
      .then((response) => {
        console.log("Data fetched successfully:", response.data);
        dat = response.data
        setRows(dat)
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        dat = []
      });
    return dat
  }

  React.useEffect(() => {
    getRows()
  },[]);

  React.useEffect(() => {
    getColumns()
  },[rows2]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows2}
        columns={columns2}
        initialState={{
          pagination: {
            paginationModel: { page: page2, pageSize: 5 },
          },
        }}
        rowCount={10}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        // onPageChange={getRows}
        // onPaginationModelChange={getRows}
      />
    </div>
  );
}

export default function DataGridDemo () {
  const style = {
    padding: "10px"
  }
  return (
    <>
      <Grid1 style={style}/>
      <Grid2 style={style}/>
    </>
  )
}