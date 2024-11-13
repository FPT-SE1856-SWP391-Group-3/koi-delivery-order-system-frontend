import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import "../koi/EditKoi.css"

export default function EditKoi({ koiId, onClose, onUpdateSuccess }) {
    const [updateKoi, setUpdateKoi] = useState({
        koiName: "",
        koiTypeId: "",
        price: "",
        weight: "",
    })

    useEffect(() => {
        // Gọi API để lấy thông tin koi dựa trên koiId
        const fetchKoi = async () => {
            try {
                const data = await api.get("Kois/" + koiId)
                if (data.success) {
                    setUpdateKoi(data.koi) // Set giá trị vào state
                } else {
                    alert("Không tìm thấy koi!")
                }
            } catch (error) {
                console.error("Error fetching koi:", error)
                alert("An error occurred while fetching the koi.")
            }
        }

        if (koiId) fetchKoi()
    }, [koiId])

    // Cập nhật koi
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await api.put("Kois/" + koiId, updateKoi)
            if (data.success) {
                alert("Cập nhật thành công!")
                onUpdateSuccess() // Gọi callback để cập nhật danh sách Koi trong ManageKoi
                onClose() // Đóng modal sau khi cập nhật thành công
            } else {
                alert("Cập nhật thất bại!")
            }
        } catch (error) {
            console.error("Error during update:", error)
            alert("An error occurred during update. Please try again.")
        }
    }
    return (
        <div className="updatekoi-container">
            <h1 className="form-title">Update Koi</h1>
            <form onSubmit={handleSubmit} className="updatekoi-form">
                <div className="form-group">
                    <label htmlFor="name">Koi Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter koi name..."
                        value={updateKoi.koiName}
                        onChange={(e) =>
                            setUpdateKoi({
                                ...updateKoi,
                                koiName: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id">Koi Type</label>
                    <input
                        type="number"
                        className="form-control"
                        id="id"
                        name="id"
                        placeholder="Enter koi type ID..."
                        value={updateKoi.koiTypeId}
                        min="1"
                        onChange={(e) =>
                            setUpdateKoi({
                                ...updateKoi,
                                koiTypeId: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        placeholder="Enter koi price..."
                        value={updateKoi.price}
                        onChange={(e) =>
                            setUpdateKoi({
                                ...updateKoi,
                                price: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="weight"
                        name="weight"
                        placeholder="Enter koi weight..."
                        value={updateKoi.weight}
                        min="1"
                        onChange={(e) =>
                            setUpdateKoi({
                                ...updateKoi,
                                weight: e.target.value,
                            })
                        }
                    />
                </div>
                <button type="submit" className="btn-update">
                    UPDATE
                </button>
            </form>
        </div>
    )
}
