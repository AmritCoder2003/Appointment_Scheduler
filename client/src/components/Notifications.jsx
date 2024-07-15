import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Box, List, ListItem, ListItemText, IconButton, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Layout from '../User/Layout';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/alert';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '../redux/user';

const Notifications = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const [selectedTab, setSelectedTab] = useState(0);

  const unseennotification = user?.noti || [];
  const seennotification = user?.seennoti || [];
  const navigate = useNavigate();

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:8000/api/doctor/markAllAsSeen", {
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });
      console.log(response.data);
      dispatch(hideLoading());
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setUser(response.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const deleteNotification = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:8000/api/doctor/deleteNotification", {
        userId: user?.userId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setUser(response.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <Box sx={{
        width: { xs: '100%', md: '70%' },
        ml: { xs: 0, md: 30 },
        typography: 'body1',
        p: 3,
      }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label={`Unseen Notifications (${unseennotification.length})`} />
          <Tab label={`Seen Notifications (${seennotification.length})`} />
        </Tabs>

        <TabPanel value={selectedTab} index={0}>
          {unseennotification.length === 0 ? (
            <Typography>No unseen notifications.</Typography>
          ) : (
            <>
              <Button onClick={markAllAsSeen} variant="contained" color="primary">
                Mark All as Seen
              </Button>
              <List>
                {unseennotification.map((notification) => (
                  <ListItem
                    key={notification.id}
                    secondaryAction={
                      <IconButton onClick={() => navigate(notification.onClickPath)} edge="end">
                        <CheckIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={notification.message} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          {seennotification.length === 0 ? (
            <Typography>No seen notifications.</Typography>
          ) : (
            <>
              <Button onClick={deleteNotification} variant="contained" color="secondary">
                Delete All
              </Button>
              <List>
                {seennotification.map((notification) => (
                  <ListItem
                    key={notification.id}
                    secondaryAction={
                      <IconButton edge="end">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={notification.message} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </TabPanel>
      </Box>

      <ToastContainer />
    </Layout>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default Notifications;
