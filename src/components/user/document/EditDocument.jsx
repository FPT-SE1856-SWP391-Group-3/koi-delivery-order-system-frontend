import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../../api/CallAPI"
import UserSideNav from "../UserSideNav"
import UserToast from "../alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function EditDocument() {
    const [customerDocument, setCustomerDocument] = useState({
        customerDocumentFile: null,
        description: "",
    })
    const { documentId } = useParams() // Lấy documentId từ URL params
    const navigate = useNavigate()
    console.log(documentId)

    useEffect(() => {
        // Gọi API để lấy thông tin Document dựa trên documentId
        const fetchDocument = async () => {
            try {
                api.get("customer-documents/" + documentId).then((data) => {
                    if (data.success) {
                        console.log(data.customerDocument)
                        setCustomerDocument({
                            description: data.customerDocument.description,
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
        console.log(document)
        const documentData = new FormData()
        documentData.append(
            "customerDocumentFile",
            customerDocument.documentFile
        )
        documentData.append("description", customerDocument.description)
        try {
            api.putForm("customer-documents/" + documentId, documentData).then(
                (data) => {
                    if (data.success) {
                        UserToast("success", "Document updated successfully!")
                    } else {
                        UserToast("error", "Failed to update document!")
                    }
                }
            )
        } catch (error) {
            console.error("Error during update:", error)
            UserToast("error", "An error occurred during update.")
        }
    }

    return (
        <>
            <UserSideNav>
                <ToastContainer />
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <h2 className="text-center">Update Document</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="documentFile">
                                            Document File
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="documentFile"
                                            name="documentFile"
                                            onChange={(e) =>
                                                setCustomerDocument({
                                                    ...document,
                                                    documentFile:
                                                        e.target.files[0],
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            value={customerDocument.description}
                                            onChange={(e) =>
                                                setCustomerDocument({
                                                    ...document,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </UserSideNav>
        </>
    )
}
