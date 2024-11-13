import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import ReportIcon from '@mui/icons-material/Report';
import SetMealIcon from '@mui/icons-material/SetMeal';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import PaymentIcon from '@mui/icons-material/Payment';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GppGoodIcon from '@mui/icons-material/GppGood';
import QuizIcon from '@mui/icons-material/Quiz';
import FolderIcon from '@mui/icons-material/Folder';
import SpeedIcon from '@mui/icons-material/Speed';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import ComponentPath from "routes/ComponentPath";



export default function MenuContent() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  // Define menu items for each role
  const managerItems = [
    { text: 'Home', icon: <SpeedIcon />, link: ComponentPath.admin.dashboard },
    { text: 'Manage User', icon: <PeopleRoundedIcon />, link: ComponentPath.admin.user.manageUser },
    { text: 'Manage Order', icon: <LocalAtmIcon />, link: ComponentPath.admin.order.manageOrder },
    { text: 'Manage Service', icon: <RoomServiceIcon />, link: ComponentPath.admin.order.service.manageOrderService },
    { text: 'Manage FAQ', icon: <QuizIcon />, link: ComponentPath.admin.faq.manageFaq },
    { text: 'Manage Report', icon: <ReportIcon />, link: ComponentPath.admin.report.manageReport },
    { text: 'Manage Payment Type', icon: <PaymentIcon />, link: ComponentPath.admin.payment.managePaymentType },
    { text: 'Manage Blog News', icon: <NewspaperIcon />, link: ComponentPath.admin.blogNews.manageBlogNews },
    { text: 'Manage Certification', icon: <GppGoodIcon />, link: ComponentPath.admin.certification.manageCertification },
    { text: 'Manage Route', icon: <AssignmentRoundedIcon />, link: ComponentPath.admin.route.manageRoute },
    { text: 'Manage Document', icon: <FolderIcon />, link: ComponentPath.admin.order.document.manageOrderDocument },
  ];

  const salestaffItems = [
    { text: 'Sale Reports', icon: <SpeedIcon />, link: ComponentPath.admin.dashboard },
    { text: 'Manage Order', icon: <LocalAtmIcon />, link: ComponentPath.admin.order.manageOrder },
    { text: 'Manage FAQ', icon: <QuizIcon />, link: ComponentPath.admin.faq.manageFaq },
    { text: 'Manage Blog News', icon: <NewspaperIcon />, link: ComponentPath.admin.blogNews.manageBlogNews },
    { text: 'Manage Report', icon: <ReportIcon />, link: ComponentPath.admin.report.manageReport },
  ];

  const deliverstaffItems = [
    { text: 'Manage Order', icon: <LocalAtmIcon />, link: ComponentPath.admin.order.manageOrder },
    { text: 'Manage Report', icon: <ReportIcon />, link: ComponentPath.admin.report.manageReport },
    { text: 'Manage Document', icon: <FolderIcon />, link: ComponentPath.admin.order.document.manageOrderDocument },
  ];

  const getMenuItems = () => {
    if (user.roleId === 5) {
      return managerItems;
    } else if (user.roleId === 4) {
      return deliverstaffItems;
    } else if (user.roleId === 3) {
      return salestaffItems;
    }
    return [];
  };

  const menuItems = getMenuItems();
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Link to={item.link}>
              <ListItemButton selected={index === 0}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
