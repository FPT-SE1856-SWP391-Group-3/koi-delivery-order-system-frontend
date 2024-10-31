// UserLayout.jsx
import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import ComponentPath from "routes/ComponentPath";
// Material UI Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MailIcon from "@mui/icons-material/Mail";

export default function UserLayout({ children }) {
  const NAVIGATION = [
    {
      kind: "header",
      title: "Main items",
    },
    {
      segment: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      segment: "orders",
      title: "Orders",
      icon: <ShoppingCartIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Profile",
    },
    {
      segment: "myProfile",
      title: "My Profile",
      icon: <AccountCircleIcon />,
      href: ComponentPath.user.profile.viewProfile,
    },
    {
      segment: "createOrder",
      title: "Create Order",
      icon: <ShoppingCartIcon />,
      href: ComponentPath.user.order.createOrder,
    },
    {
      segment: "viewOrder",
      title: "View Order",
      icon: <ShoppingCartIcon />,
      href: ComponentPath.user.order.viewOrder,
    },
    {
      segment: "viewNotification",
      title: "View Notification",
      icon: <MailIcon />,
      href: ComponentPath.user.notification.viewNotification,
    },
    {
      segment: "logout",
      title: "Logout",
      icon: <LogoutIcon />,
    },
  ];

  return (
    <AppProvider navigation={NAVIGATION}>
      <DashboardLayout>
        <PageContainer>{children}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
