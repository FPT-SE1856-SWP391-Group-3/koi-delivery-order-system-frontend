import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";

export default function EditOrderDocument() {
    const [orderDocument, setOrderDocument] = useState({
        orderStatusId: "",
        filePath: null,
        description: "",
    });
    const { documentId } = useParams(); // Lấy documentId từ URL params
    const navigate = useNavigate();
    console.log(documentId);

    useEffect(() => {
        // Gọi API để lấy thông tin Document dựa trên documentId
        const fetchDocument = async () => {
            try {
                api.get("OrderDocuments/" + documentId).then((data) => {
                    if (data.success) {
                        console.log(data.orderDocument);
                        setOrderDocument({
                            orderStatusId: data.orderDocument.orderStatusId,
                            filePath: data.orderDocument.filePath,
                            description: data.orderDocument.description,
                        }); // Set giá trị vào state
                    } else {
                        alert("Không tìm thấy Document!");
                    }
                });
            } catch (error) {
                console.error("Error fetching Document:", error);
                alert("An error occurred while fetching the Document.");
            }
        };

        fetchDocument();
    }, [documentId]);

    // Cập nhật Document
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn reload trang
        console.log(orderDocument);
        const documentData = new FormData();
        documentData.set('orderStatusId', orderDocument.orderStatusId);
        documentData.set('filePath', orderDocument.filePath);
        documentData.set('description', orderDocument.description);
        try {
            api.putForm("OrderDocuments/" + documentId, documentData).then((data) => {
                if (data.success) {
                    alert("Cập nhật thành công!");
                    navigate("/admin/manage-document");
                } else {
                    alert("Cập nhật thất bại!");
                }
            });
        } catch (error) {
            console.error("Error during update:", error);
            alert("An error occurred during update. Please try again.");
        }
    };

    return (
        <div>
            {/* <Header /> */}
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center">Cập nhật Document</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="orderStatusId">Order Status ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="orderStatusId"
                                    name="orderStatusId"
                                    value={orderDocument.orderStatusId}
                                    onChange={(e) =>
                                        setOrderDocument({ ...orderDocument, orderStatusId: e.target.value })
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
                                        setOrderDocument({ ...orderDocument, filePath: e.target.files[0] })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Mô tả</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={orderDocument.description}
                                    onChange={(e) =>
                                        setOrderDocument({ ...orderDocument, description: e.target.value })
                                    }
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Cập nhật
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
