import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { Link } from "react-router-dom";
import ComponentPath from "routes/ComponentPath";

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, link: "/admindashboard" },
  { text: 'Manage User', icon: <PeopleRoundedIcon />, link: ComponentPath.admin.user.manageUser },
  { text: 'Manage Order', icon: <AssignmentRoundedIcon />, link: ComponentPath.admin.order.service.manageOrderService },
  { text: 'Manage Koi', icon: <AssignmentRoundedIcon />, link: ComponentPath.admin.koi.manageKoi },
  { text: 'Manage Report', icon: <AssignmentRoundedIcon />, link: ComponentPath.admin.report.manageReport },
  { text: 'Manage Payment Type', icon: <AssignmentRoundedIcon />, link: ComponentPath.admin.payment.managePaymentType },
  { text: 'Manage Blog News', icon: <AssignmentRoundedIcon />, link: ComponentPath.admin.blogNews.manageBlogNews },
  { text: 'Manage Certification', icon: <AssignmentRoundedIcon />, link: ComponentPath.admin.certification.manageCertification },
  { text: 'Manage Document', icon: <AssignmentRoundedIcon />, link: ComponentPath.admin.order.document.manageOrderDocument },
];


export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
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
