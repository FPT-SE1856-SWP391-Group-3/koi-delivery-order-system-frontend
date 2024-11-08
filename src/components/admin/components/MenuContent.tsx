import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ReportIcon from '@mui/icons-material/Report';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import PaymentIcon from '@mui/icons-material/Payment';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GppGoodIcon from '@mui/icons-material/GppGood';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QuizIcon from '@mui/icons-material/Quiz';
import FolderIcon from '@mui/icons-material/Folder';
import SpeedIcon from '@mui/icons-material/Speed';
import { Link } from "react-router-dom";
import { useState } from 'react';
import ComponentPath from "routes/ComponentPath";



export default function MenuContent() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  // Define menu items for each role
  const managerItems = [
    { text: 'Home', icon: <SpeedIcon />, link: ComponentPath.admin.dashboard },
    { text: 'User', icon: <PeopleRoundedIcon />, link: ComponentPath.admin.user.manageUser },
    { text: 'Order', icon: <LocalAtmIcon />, link: ComponentPath.admin.order.manageOrder },
    { text: 'Routing for Orders', icon: <LocalShippingIcon />, link: ComponentPath.admin.route.manageRoute },
    { text: 'Route', icon: <LocalShippingIcon />, link: ComponentPath.admin.route.createRoute },
    { text: 'Feedback', icon: <QuizIcon />, link: ComponentPath.user.feedback.viewFeedback },
    { text: 'Report', icon: <ReportIcon />, link: ComponentPath.admin.report.manageReport },
    { text: 'Feedback', icon: <FeedbackIcon />, link: ComponentPath.admin.report.manageReport },
    { text: 'FAQ', icon: <QuizIcon />, link: ComponentPath.admin.faq.manageFaq },
    { text: 'Blog News', icon: <NewspaperIcon />, link: ComponentPath.admin.blogNews.manageBlogNews },
    { text: 'Service', icon: <RoomServiceIcon />, link: ComponentPath.admin.order.service.manageOrderService },
    { text: 'Payment Method', icon: <PaymentIcon />, link: ComponentPath.admin.payment.managePaymentType },
    { text: 'Certificate', icon: <GppGoodIcon />, link: ComponentPath.admin.certification.manageCertification },
    { text: 'Document', icon: <FolderIcon />, link: ComponentPath.admin.order.document.manageOrderDocument },
  ];

  const salestaffItems = [
    { text: 'Sale Reports', icon: <SpeedIcon />, link: ComponentPath.admin.dashboard },
    { text: 'Order', icon: <LocalAtmIcon />, link: ComponentPath.admin.order.manageOrder },
    { text: 'FAQ', icon: <QuizIcon />, link: ComponentPath.admin.faq.manageFaq },
    { text: 'Feedback', icon: <FeedbackIcon />, link: ComponentPath.admin.report.manageReport },
    { text: 'Blog News', icon: <NewspaperIcon />, link: ComponentPath.admin.blogNews.manageBlogNews },
    { text: 'Report', icon: <ReportIcon />, link: ComponentPath.admin.report.manageReport },
  ];

  const deliverstaffItems = [
    { text: 'Order', icon: <LocalAtmIcon />, link: ComponentPath.admin.order.manageOrder },
    { text: 'Report', icon: <ReportIcon />, link: ComponentPath.admin.report.manageReport },
    { text: 'Document', icon: <FolderIcon />, link: ComponentPath.admin.order.document.manageOrderDocument },
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
