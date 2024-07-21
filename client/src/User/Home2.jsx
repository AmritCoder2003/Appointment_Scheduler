import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
} from "@mui/material";
import { useDispatch ,useSelector} from "react-redux";
import { showLoading, hideLoading } from "../redux/alert";
import { useNavigate } from "react-router-dom";
function Home2() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const getData = async () => {
      dispatch(showLoading());
      try {
        const response = await axios.get(
          "http://localhost:8000/api/doctor/approved-doctor",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.data);
        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setDoctors(response.data.data);
        } else {
          setDoctors([]);
          console.error("API response is not an array:", response.data);
        }
        dispatch(hideLoading());
      } catch (error) {
        console.log(error);
        dispatch(hideLoading());
      }
    };
    getData();
  }, []);
  
  return (
    <Layout>
      <Grid
        container
        spacing={3}
        sx={{ width: { xs: "100%", md: "70%" }, ml: { xs: 0, md: 30 }, p: 3 }}
      >
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor._id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://plus.unsplash.com/premium_photo-1668487826871-2f2cac23ad56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D"
                title="green iguana"
              />
              <CardContent>
                <Typography
                  sx={{ color: "#1976d2" }}
                  variant="h5"
                  component="div"
                  gutterBottom
                >
                  Dr. {doctor.firstName} {doctor.lastName}
                </Typography>
                <Typography variant="body2" color="black">
                  Email: {doctor.email}
                </Typography>
                <Typography variant="body2" color="black">
                  Phone: {doctor.phoneNumber}
                </Typography>
                <Typography variant="body2" color="black">
                  Address: {doctor.address}
                </Typography>
                <Typography variant="body2" color="black">
                  Specialization: {doctor.specialization}
                </Typography>
                <Typography variant="body2" color="black">
                  Experience: {doctor.experience} years
                </Typography>
                <Typography variant="body2" color="black">
                  Fee: {doctor.fee}
                </Typography>
                <Typography variant="body2" color="black">
                  Schedule: {doctor.schedulefrom} to {doctor.scheduleto}
                </Typography>
              </CardContent>

            { !user?.user?.isDoctor  && <Button
                variant="contained"
                color="primary"
                sx={{ mb: 3, ml: 8 }}
                onClick={() => navigate(`/book-appointment/${doctor._id}`)}
              >
                Book Appointment
              </Button>}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default Home2;
