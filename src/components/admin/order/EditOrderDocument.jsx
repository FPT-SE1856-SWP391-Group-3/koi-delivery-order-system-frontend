import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../../api/CallAPI"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function EditOrderDocument() {
    const [orderDocument, setOrderDocument] = useState({
        orderStatusId: "",
        filePath: null,
        description: "",
    })
    const { documentId } = useParams() // Lấy documentId từ URL params
    const navigate = useNavigate()
    console.log(documentId)

    useEffect(() => {
        // Gọi API để lấy thông tin Document dựa trên documentId
        const fetchDocument = async () => {
            try {
                api.get("order-documents/" + documentId).then((data) => {
                    if (data.success) {
                        console.log(data.orderDocument)
                        setOrderDocument({
                            orderStatusId: data.orderDocument.orderStatusId,
                            filePath: data.orderDocument.filePath,
                            description: data.orderDocument.description,
                        }) // Set giá trị vào state
                    } else {
                        UserToast("error", "No document found.")
                    }
                })
            } catch (error) {
                console.error("Error fetching Document:", error)
                UserToast(
                    "error",
                    "An error occurred while fetching the Document."
                )
            }
        }

        fetchDocument()
    }, [documentId])

    // Cập nhật Document
    const handleSubmit = async (e) => {
        e.preventDefault() // Ngăn chặn reload trang
        console.log(orderDocument)
        const documentData = new FormData()
        documentData.set("orderStatusId", orderDocument.orderStatusId)
        documentData.set("filePath", orderDocument.filePath)
        documentData.set("description", orderDocument.description)
        try {
            api.putForm("order-documents/" + documentId, documentData).then(
                (data) => {
                    if (data.success) {
                        UserToast("success", "Update document successfully!")
                        navigate("/admin/manage-document")
                    } else {
                        UserToast("error", "Failed to update document!")
                    }
                }
            )
        } catch (error) {
            console.error("Error during update:", error)
            UserToast(
                "error",
                "An error occurred during update. Please try again."
            )
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center">Update Document</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="orderStatusId">
                                    Order Status ID
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="orderStatusId"
                                    name="orderStatusId"
                                    value={orderDocument.orderStatusId}
                                    onChange={(e) =>
                                        setOrderDocument({
                                            ...orderDocument,
                                            orderStatusId: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="filePath">File Path</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="filePath"
                                    name="filePath"
                                    onChange={(e) =>
                                        setOrderDocument({
                                            ...orderDocument,
                                            filePath: e.target.files[0],
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={orderDocument.description}
                                    onChange={(e) =>
                                        setOrderDocument({
                                            ...orderDocument,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
