import { useEffect, useState } from "react"
import api from "../../../api/CallAPI"
import Modal from "react-modal"
import AddIcon from "@mui/icons-material/Add"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Fab,
    Typography,
} from "@mui/material"
import ComponentPath from "routes/ComponentPath"
import AdminSideMenu from "../components/AdminSideMenu"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function ManageCertification() {
    const [certifications, setCertifications] = useState([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedCertificationId, setSelectedCertificationId] = useState(null)

    useEffect(() => {
        try {
            api.get("Certifications/").then((data) => {
                if (data.success) {
                    setCertifications(data.certifications)
                } else {
                    console.log("Không có chứng chỉ!")
                }
            })
        } catch (error) {
            UserToast(
                "error",
                "An error occurred while fetching certifications."
            )
        }
    }, [])

    // Mở modal xác nhận xóa
    const openDeleteModal = (certificationId) => {
        setSelectedCertificationId(certificationId)
        setIsDeleteModalOpen(true)
    }

    // Đóng modal xác nhận xóa
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        setSelectedCertificationId(null)
    }

    // Xóa chứng chỉ khi người dùng xác nhận
    async function confirmDeleteCertification() {
        try {
            const data = await api.del(
                "Certifications/" + selectedCertificationId
            )
            if (data.success) {
                UserToast("success", "Xóa chứng chỉ thành công!")
                setCertifications((prevCertifications) =>
                    prevCertifications.filter(
                        (certification) =>
                            certification.certificationId !==
                            selectedCertificationId
                    )
                )
                closeDeleteModal()
            } else {
                UserToast("error", "Xóa chứng chỉ thất bại!")
            }
        } catch (error) {
            console.error("Error during deletion:", error)
            UserToast(
                "error",
                "An error occurred during deletion. Please try again."
            )
            closeDeleteModal()
        }
    }

    return (
        <>
            <ToastContainer />
            <AdminSideMenu />
            <Box sx={{ ml: "260px", p: 3 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    Certificate Management
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "10%" }}>
                                    <Typography fontWeight={600} align="center">
                                        CertificationId
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        CertificationName
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Image
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Actions
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {certifications.map((certification) => (
                                <TableRow key={certification.certificationId}>
                                    <TableCell align="center">
                                        {certification.certificationId}
                                    </TableCell>
                                    <TableCell align="center">
                                        {certification.certificationName}
                                    </TableCell>
                                    <TableCell align="center">
                                        <img
                                            src={api.imageBuildUrl(
                                                certification.certificateFile
                                            )}
                                            width="100px"
                                            alt="Certificate"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() =>
                                                openDeleteModal(
                                                    certification.certificationId
                                                )
                                            }
                                            variant="contained"
                                            color="error"
                                            sx={{ marginRight: 1 }}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            href={
                                                ComponentPath.admin
                                                    .certification
                                                    .editCertification +
                                                certification.certificationId
                                            }
                                            variant="contained"
                                            color="primary"
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: "fixed", bottom: 16, right: 16 }}
                >
                    <AddIcon />
                </Fab>

                {/* Modal xác nhận xóa */}
                <Modal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={closeDeleteModal}
                    className="modal"
                    overlayClassName="overlay"
                >
                    <h2>Confirm Deletion</h2>
                    <p>Are you sure you want to delete this certification?</p>
                    <div className="modal-buttons">
                        <button
                            className="confirm-btn"
                            onClick={confirmDeleteCertification}
                        >
                            Yes
                        </button>
                        <button
                            className="cancel-btn"
                            onClick={closeDeleteModal}
                        >
                            No
                        </button>
                    </div>
                </Modal>
            </Box>
        </>
    )
}
