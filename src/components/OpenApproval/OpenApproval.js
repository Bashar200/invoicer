import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'invoice_id', headerName: 'Invoice ID', width: 150 },
  { field: 'approver_stage', headerName: 'Approval Stage', width: 150 },
  {
    field: 'last_notification_send',
    headerName: 'Last Notification Send',
    width: 180,
  },
  {
    field: 'created',
    headerName: 'Created',
    width: 150,
  },
  {
    field: 'count_vendor',
    headerName: 'Count Vender',
    width: 150,
  },
  {
    field: 'count_db',
    headerName: 'Count DB',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];

const MyDropdown = ({vendor , vendorCount}) => {
  const [selectedOption, setSelectedOption] = React.useState('');
  const [data, setData] = React.useState([]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    vendorCount(event.target.value);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.5.213:80/vendors/distinct');
        setData([...response.data.map((e) => e.vendor_name)]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); 

  return (
    <FormControl>
      <Select
        label="Vendor"
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
      >
        {data.map((item) => 
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      )}
      </Select>
    </FormControl>
  );
};



const MyDropdown2 = ({month_ , monthCount}) => {
  const [selectedOption, setSelectedOption] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [data, setData] = React.useState(['December','November','October','September','August','July']);
  const [monthMap , setMonthMap] = React.useState({'December':'2023-12','November':'2023-11','October':'2023-10','September':'2023-09','August':'2023-08','July':'2023-07'})

  const handleChange = (event) => {
    
    setSelectedOption(event.target.value);
    monthCount(monthMap[event.target.value]);
  };

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://192.168.5.213:80/vendors/distinct');
  //       console.log([...data,response.data.map((e) => e.vendor_name)]);
  //       setData([...response.data.map((e) => e.vendor_name)]);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   // Call the fetchData function
  //   fetchData();
  // }, []); 

  return (
    <FormControl>
      <Select
        label="Vendor"
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
      >
        {data.map((item) => 
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      )}
      </Select>
    </FormControl>
  );
};




export default function DataTable() {
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "150px",
    justifyContent:'space-between'
  };
  const [listData,setListData] = React.useState([]);
  const [month,setMonth1] = React.useState('2023-12');
  const [vendor,setVendor1] = React.useState('qwerty');
  const [selectedIds, setSelectedIds] = React.useState(null);

  const monthCount = (val) => {
    setMonth1(val);
  };

  const vendorCount = (val) => {
    setVendor1(val);
  };


  const handleClickCall = (params,event,details) => {
    console.log(params);
    setSelectedIds(params.row.invoice_id);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://192.168.5.213:80/invoice/${selectedIds}/approve`,{'approved_by':'Approver 1'});
        console.log(response.data);
        const status = response.data ? `Invoice ID: ${selectedIds} has been approved` : `Invoice ID: ${selectedIds} is already approved by precedents`;
        alert(` ${status}`);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedIds]); 


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.5.213:80/invoice-request?vendor_name=${vendor}&month=${month}`);
        setListData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [month,vendor,selectedIds]); 


  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={containerStyle}>
      <MyDropdown vendor={vendor} vendorCount={vendorCount}/> 
      <MyDropdown2 month={month} monthCount={monthCount}/>
      </div>
      <DataGrid
        rows={listData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        onRowClick={handleClickCall}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      >
        </DataGrid>
        
    </div>
  );
}