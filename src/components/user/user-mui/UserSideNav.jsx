import { Box } from "@mui/material";
import SideMenu from "./SideMenu";
import UserAppBar from "./UserAppNavbar";

export default function UserSideNav({children}) {
  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu />
      <Box sx={{ flexGrow: 1 }}>
        <UserAppBar />
        {children}
      </Box>
    </Box>
  );
}