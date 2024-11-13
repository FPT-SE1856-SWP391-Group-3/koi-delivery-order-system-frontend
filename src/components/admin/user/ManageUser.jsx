import { useEffect, useState } from "react"
import api from "../../../api/CallAPI"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableSortLabel,
    TableHead,
    TableRow,
    IconButton,
    InputBase,
    Paper,
    Button,
    Box,
    Modal,
    MenuItem,
    Collapse,
    TablePagination,
    Typography,
    Menu,
} from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import SearchIcon from "@mui/icons-material/Search"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AdminSideMenu from "../components/AdminSideMenu"
import UpdateUser from "./UpdateUser"
import ManageUserAddress from "../address/ManageUserAddress"

export default function ManageUser() {
    const [users, setUsers] = useState([])
    const [sortOrder, setSortOrder] = useState("asc")
    const [searchQuery, setSearchQuery] = useState("")
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false) // State for update modal
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [menuState, setMenuState] = useState({ anchorEl: null, userId: null })

    // Fetch users and sort automatically
    const fetchUsers = async () => {
        try {
            const data = await api.get("Users")
            if (data.success) {
                const sortedData = [...data.users].sort((a, b) => {
                    return sortOrder === "asc"
                        ? a.userName.localeCompare(b.userName)
                        : b.userName.localeCompare(a.userName)
                })
                setUsers(sortedData)
            } else {
                alert("Failed to fetch users list.")
            }
        } catch (error) {
            console.error("Error fetching users:", error)
            alert("An error occurred while fetching users. Please try again.")
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [sortOrder])

    const handleSortByName = () => {
        const order = sortOrder === "asc" ? "desc" : "asc"
        setSortOrder(order)
    }

    // Function to open delete confirmation modal with the correct userId
    const openConfirmDeleteModal = (userId) => {
        setSelectedUserId(userId) // Set the selected user ID
        setIsConfirmDeleteOpen(true) // Open the delete confirmation modal
        handleMenuClose() // Close the menu to avoid state issues
    }

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteOpen(false)
        setSelectedUserId(null)
    }

    // Function to delete the selected user
    const confirmDeleteUser = async () => {
        if (!selectedUserId) return // Ensure there's a selected user ID before proceeding
        try {
            const data = await api.del("Users/" + selectedUserId)
            if (data.success) {
                alert("Xóa thành công!")
                fetchUsers() // Reload the user list after deletion
            } else {
                alert("Xóa thất bại!")
            }
        } catch (error) {
            console.error("Error deleting user:", error)
            alert(
                "An error occurred while deleting the user. Please try again."
            )
        }
        closeConfirmDeleteModal()
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleMenuOpen = (event, userId) => {
        setMenuState({ anchorEl: event.currentTarget, userId }) // Set anchorEl and userId
    }

    const handleMenuClose = () => {
        setMenuState({ anchorEl: null, userId: null }) // Reset anchorEl and userId on close
    }

    const openUpdateModal = (userId) => {
        setSelectedUserId(userId)
        setIsUpdateModalOpen(true) // Open the update modal
        handleMenuClose()
    }

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false)
        setSelectedUserId(null)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    // Filtered users based on the search query
    const filteredUsers = users.filter((user) =>
        user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <>
            <AdminSideMenu />
            <Box sx={{ ml: "260px", p: 3 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    User Management
                </Typography>

                {/* Search bar */}
                <Box display="flex" mb={2}>
                    <Paper
                        component="form"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: 300,
                        }}
                    >
                        <IconButton sx={{ p: "10px" }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search user..."
                            inputProps={{ "aria-label": "search user" }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Paper>
                </Box>

                {/* User Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align="center">
                                    <Typography fontWeight="bold">
                                        ID
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active={true}
                                        direction={sortOrder}
                                        onClick={handleSortByName}
                                    >
                                        <Typography fontWeight="bold">
                                            Name
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography fontWeight="bold">
                                        PhoneNumber
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography fontWeight="bold">
                                        Role
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography fontWeight="bold">
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((user) => (
                                        <CollapsibleRow
                                            key={user.userId}
                                            user={user}
                                            onEdit={() =>
                                                openUpdateModal(user.userId)
                                            }
                                            onDelete={() =>
                                                openConfirmDeleteModal(
                                                    user.userId
                                                )
                                            }
                                            handleMenuOpen={handleMenuOpen}
                                            menuState={menuState}
                                            handleMenuClose={handleMenuClose}
                                        />
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                        >
                                            No results found for{" "}
                                            <strong>`{searchQuery}`</strong>.
                                            <br />
                                            Try checking for typos or using
                                            complete words.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {filteredUsers.length > 0 && (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredUsers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    )}
                </TableContainer>

                {/* Update User Modal */}
                <Modal open={isUpdateModalOpen} onClose={closeUpdateModal}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            textAlign: "center",
                        }}
                    >
                        <UpdateUser
                            userId={selectedUserId}
                            onUpdateSuccess={() => {
                                fetchUsers()
                                closeUpdateModal()
                            }}
                        />
                    </Box>
                </Modal>

                {/* Confirm Delete Modal */}
                <Modal
                    open={isConfirmDeleteOpen}
                    onClose={closeConfirmDeleteModal}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Confirm Deletion
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            paragraph
                        >
                            Are you sure you want to <strong>Delete</strong>{" "}
                            this user? This action cannot be undone.
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 2,
                                mt: 3,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="error"
                                onClick={confirmDeleteUser}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={closeConfirmDeleteModal}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </>
    )
}

// Collapsible Row Component
function CollapsibleRow({
    user,
    onEdit,
    onDelete,
    handleMenuOpen,
    menuState,
    handleMenuClose,
}) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{user.userId}</TableCell>
                <TableCell align="center">{user.userName}</TableCell>
                <TableCell align="center">{user.phoneNumber}</TableCell>
                <TableCell align="center">{user.roleName}</TableCell>
                <TableCell align="center">
                    <Typography
                        variant="body2"
                        sx={{
                            backgroundColor: "rgba(0, 200, 0, 0.1)",
                            color: "green",
                            fontWeight: 500,
                            borderRadius: 2,
                            px: 1.5,
                            py: 0.5,
                            display: "inline-block",
                            minWidth: 60,
                        }}
                        align="center"
                    >
                        Active
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <IconButton onClick={(e) => handleMenuOpen(e, user.userId)}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={menuState.anchorEl}
                        open={
                            Boolean(menuState.anchorEl) &&
                            menuState.userId === user.userId
                        }
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={onEdit}>
                            <EditIcon fontSize="small" /> Edit
                        </MenuItem>
                        <MenuItem onClick={onDelete}>
                            <DeleteIcon
                                fontSize="small"
                                sx={{ color: "#FF5630" }}
                            />{" "}
                            Delete
                        </MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    colSpan={7}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                            <Typography variant="h6" gutterBottom>
                                Address Information
                            </Typography>
                            <ManageUserAddress userId={user.userId} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
