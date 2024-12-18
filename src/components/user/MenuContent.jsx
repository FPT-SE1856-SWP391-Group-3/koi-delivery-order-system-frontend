import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import InfoRoundedIcon from "@mui/icons-material/InfoRounded"
import HelpRoundedIcon from "@mui/icons-material/HelpRounded"
import InventoryIcon from "@mui/icons-material/Inventory"
import ComponentPath from "../../routes/ComponentPath"
import AppsIcon from "@mui/icons-material/Apps"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import { Link } from "react-router-dom"

const mainListItems = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
        href: ComponentPath.user.dashboard,
    },
    {
        text: "Create Order",
        icon: <InventoryIcon />,
        href: ComponentPath.user.order.createOrder,
    },
    {
        text: "View Order",
        icon: <AppsIcon />,
        href: ComponentPath.user.order.viewOrder,
    },
    {
        text: "Notification",
        icon: <NotificationsActiveIcon />,
        href: ComponentPath.user.notification.viewNotification,
    },
]

const secondaryListItems = [
    {
        text: "Profile",
        icon: <AccountBoxIcon />,
        href: ComponentPath.user.profile.viewProfile,
    },
    { text: "About", icon: <InfoRoundedIcon /> },
    {
        text: "Feedback",
        icon: <HelpRoundedIcon />,
        href: ComponentPath.user.feedback.viewFeedback,
    },
]

export default function MenuContent() {
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <Link to={item.href}>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>

            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <Link to={item.href}>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Stack>
    )
}
