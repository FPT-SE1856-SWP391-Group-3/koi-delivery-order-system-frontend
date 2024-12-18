import * as React from "react"
import { styled } from "@mui/material/styles"
import Avatar from "@mui/material/Avatar"
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import MenuContent from "./MenuContent"
import OptionsMenu from "./OptionsMenu"
import logo from "/Logo.png"

const drawerWidth = 240

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: "border-box",
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: "border-box",
    },
})

export default function SideMenu() {
    const [user, setUser] = React.useState(
        JSON.parse(localStorage.getItem("user"))
    )

    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: "none", md: "block" },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: "background.paper",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: "calc(var(--template-frame-height, 0px) + 4px)",
                    p: 1.5,
                }}
            >
                <Avatar
                    sizes="small"
                    alt="avatar"
                    src={logo}
                    sx={{ width: 56, height: 56 }}
                />
                <Typography variant="h5" sx={{ color: "#e65a5a;" }}>
                    KOI Delivery
                </Typography>
            </Box>
            <Divider />
            <MenuContent />
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: "center",
                    borderTop: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Avatar
                    sizes="small"
                    alt="Riley Carter"
                    src="/static/images/avatar/7.jpg"
                    sx={{ width: 36, height: 36 }}
                />
                <Box sx={{ mr: "auto" }}>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, lineHeight: "16px" }}
                    >
                        {user.fullName}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                    >
                        {user.email}
                    </Typography>
                </Box>
                <OptionsMenu />
            </Stack>
        </Drawer>
    )
}
