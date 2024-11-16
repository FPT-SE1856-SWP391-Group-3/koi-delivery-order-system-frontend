import * as React from "react"
import { styled } from "@mui/material/styles"
import Divider, { dividerClasses } from "@mui/material/Divider"
import Menu from "@mui/material/Menu"
import MuiMenuItem from "@mui/material/MenuItem"
import { paperClasses } from "@mui/material/Paper"
import { listClasses } from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon, { listItemIconClasses } from "@mui/material/ListItemIcon"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded"
import MenuButton from "../components/MenuButton"
import { ButtonGroup } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import ComponentPath from "../../../routes/ComponentPath"

const MenuItem = styled(MuiMenuItem)({
    margin: "2px 0",
})

export default function OptionsMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate() // To programmatically navigate

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleProfileClick = () => {
        handleClose()
        navigate(ComponentPath.user.profile.viewProfile)
    }

    return (
        <React.Fragment>
            <MenuButton
                aria-label="Open menu"
                onClick={handleClick}
                sx={{ borderColor: "transparent" }}
            >
                <MoreVertRoundedIcon />
            </MenuButton>
            <Menu
                anchorEl={anchorEl}
                id="menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                sx={{
                    [`& .${listClasses.root}`]: {
                        padding: "4px",
                    },
                    [`& .${paperClasses.root}`]: {
                        padding: 0,
                    },
                    [`& .${dividerClasses.root}`]: {
                        margin: "4px -4px",
                    },
                }}
            >
                {/* Profile Menu Item */}
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>

                <Divider />
                <Divider />

                {/* Logout Menu Item */}
                <MenuItem
                    onClick={handleClose}
                    sx={{
                        [`& .${listItemIconClasses.root}`]: {
                            ml: "auto",
                            minWidth: 0,
                        },
                    }}
                >
                    <Link to="/logout">
                        <ButtonGroup>
                            <ListItemText>Logout</ListItemText>
                            <ListItemIcon>
                                <LogoutRoundedIcon fontSize="small" />
                            </ListItemIcon>
                        </ButtonGroup>
                    </Link>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
