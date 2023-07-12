import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from '../config/Axios';
import {Grid, Typography} from '@material-ui/core'
import CustomizedTooltips from './common/customTooltip';
import PrimaryButton from './common/primaryButton';
import swal from 'sweetalert';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  main:{
    paddingLeft:"5%",
    paddingRight:"5%",
    paddingTop:"5%"
  },
  color:{
    backgroundColor:"#40E4CE"
  },
  padding:{
    paddingBottom:"2%"
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function UsersTable() {
  const classes = useStyles();
  const [userData, setUserData] = useState([])
  const [backupUserData, setBackupUserData] = useState([])
  const [cityBaseUser, setCityBaseUser] = useState([])
  const [cityBaseAverage, setCityBaseAverage] = useState([])
  const [show, setShow] = useState(false)
  const handleFilter1 = () => {
    setShow(false)
    const filtereddata1 = backupUserData && backupUserData.filter((user) => Number(user.income.split('$')[1]) < 5)
    const filtereddata2 = filtereddata1 && filtereddata1.filter((user) => user.car === 'Mercedes-Benz' || user.car === 'BMW')
    setUserData(filtereddata2)
    swal({ icon: 'success', title: 'Applied Filter 1' });
  }

  const handleFilter2 = () => {
    setShow(false)
    const filtereddata1 = backupUserData && backupUserData.filter((user) => Number(user.phone_price) > 10000)
    setUserData(filtereddata1)
    swal({ icon: 'success', title: 'Applied Filter 2' });
  }

  const handleFilter3 = () => {
    setShow(false)
    const filtereddata1 = backupUserData && backupUserData.filter((user) => user.last_name.charAt(0) === 'M')
    const filtereddata2 = filtereddata1 && filtereddata1.filter((user) => user.quote.length > 15)
    const filtereddata3 = filtereddata2 && filtereddata2.filter((user) => user.email.split('@')[0].slice(1, -1) === user.last_name.toLowerCase())
    setUserData(filtereddata3)
    swal({ icon: 'success', title: 'Applied Filter 3' });
  }

  const handleFilter4 = () => {
    setShow(false)
    const filtereddata1 = backupUserData && backupUserData.filter((user) =>user.car === 'Mercedes-Benz' || user.car === 'BMW' || user.car === 'Audi')
    const filtereddata2 = filtereddata1 && filtereddata1.filter((user) => /\d/.test(user.email) === false )
    setUserData(filtereddata2)
    swal({ icon: 'success', title: 'Applied Filter 4' });
  }

  const handleFilter5 = () => {
    let obj ={}
    let obj2 = {}
    let arr = []
        backupUserData.map((ele) => {
            if(!obj[ele.city]){
                let sum = 0
                let numberOfUsers = backupUserData.filter((ele2) => ele2.city === ele.city)
                let average = numberOfUsers && numberOfUsers.map((ele) => sum = sum + Number(ele.income.split('$')[1]))
                obj[ele.city] = numberOfUsers.length
                arr.push([ele.city,numberOfUsers.length])
                obj2[ele.city] = sum / numberOfUsers.length
            }
            console.log('sd')
        })
       console.log(obj, obj2, 'object')
       setCityBaseUser(arr)
       setCityBaseAverage(obj2)
       setShow(true)
       swal({ icon: 'success', title: 'Applied Filter 5' });
  }

  useEffect(() => {
    axios.get(`/users/data`).then((response) => {
      if (response?.data) {
        setUserData(response?.data);
        setBackupUserData(response?.data)
        console.log(response)
      }
    });
  }, []);

  return (
    <Grid container direction="column" item xs={12} className={classes.main}>
        <Grid container item xs={12} className={classes.padding}>
            <Grid item xs={2}>
            <Grid container item xs={12}>
            <Grid item xs={6}>
            <PrimaryButton
             onClick={handleFilter1}
             children="Filter 1"
            />
             </Grid>
            <Grid item xs={1}>
            <CustomizedTooltips
              title={
                <>
                  <Typography>Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.</Typography>
                </>
              }
            />
            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={2}>
            <Grid container item xs={12}>
            <Grid item xs={6}>
            <PrimaryButton
             onClick={handleFilter2}
             children="Filter 2"
            />
             </Grid>
            <Grid item xs={1}>
            <CustomizedTooltips
              title={
                <>
                  <Typography>Male Users which have phone price greater than 10,000.</Typography>
                </>
              }
            />
            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={2}>
            <Grid container item xs={12}>
            <Grid item xs={6}>
            <PrimaryButton
             onClick={handleFilter3}
             children="Filter 3"
            />
             </Grid>
            <Grid item xs={1}>
            <CustomizedTooltips
              title={
                <>
                  <Typography>Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.</Typography>
                </>
              }
            />
            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={2}>
            <Grid container item xs={12}>
            <Grid item xs={6}>
            <PrimaryButton
             onClick={handleFilter4}
             children="Filter 4"
            />
             </Grid>
            <Grid item xs={1}>
            <CustomizedTooltips
              title={
                <>
                  <Typography>Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.</Typography>
                </>
              }
            />
            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={2}>
            <Grid container item xs={12}>
            <Grid item xs={6}>
            <PrimaryButton
             onClick={handleFilter5}
             children="Filter 5"
            />
             </Grid>
            <Grid item xs={1}>
            <CustomizedTooltips
              title={
                <>
                  <Typography>Show the data of top 10 cities which have the highest number of users and their average income.</Typography>
                </>
              }
            />
            </Grid>
            </Grid>
            </Grid>
        </Grid>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
        {!show &&  <TableRow className={classes.color}>
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Income</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Car</TableCell>
            <TableCell align="right">Phone Price</TableCell>
            <TableCell align="right">Quote</TableCell>
          </TableRow>}
          {show &&  <TableRow className={classes.color}>
            <TableCell>City Name</TableCell>
            <TableCell align="right">Number of Users</TableCell>
            <TableCell align="right">Average</TableCell>
          </TableRow>
          }
        </TableHead>
        <TableBody>
          {!show && userData && userData.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.first_name}
              </TableCell>
              <TableCell align="right">{row.last_name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.income}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.car}</TableCell>
              <TableCell align="right">{row.phone_price}</TableCell>
              <TableCell align="right"> {row.quote}</TableCell>
            </TableRow>
          ))}
          {show ?cityBaseUser && cityBaseUser.map((ele) => (
            <TableRow key={ele}>
             <TableCell component="th" scope="row">
               {ele[0]}
             </TableCell>
             <TableCell align="right">{ele[1]}</TableCell>
             <TableCell align="right">${cityBaseAverage[ele[0]].toFixed(2)}</TableCell>
            </TableRow>
          )):""}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>   
  );
}
