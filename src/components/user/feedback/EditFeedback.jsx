import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useFetcher, useNavigate, useParams } from "react-router-dom"
import api from "../../../api/CallAPI"

export default function EditFeedback() {
    const navigate = useNavigate()
    const [feedbacks, setFeedbacks] = useState({
        comment: "",
    })
    let userId = JSON.parse(localStorage.getItem("userId"))

    let { customerFeedbackId } = useParams()

    useEffect(() => {
        try {
            api.get("CustomerFeedbacks/" + customerFeedbackId).then((data) => {
                if (data.success) {
                    setFeedbacks(data.customerFeedback)
                    console.log(data.customerFeedback)
                } else {
                    alert("Không có phản hồi!")
                }
            })
        } catch (error) {
            alert("An error has occurred. Please try again.")
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            api.put("CustomerFeedbacks/" + customerFeedbackId, feedbacks).then(
                (data) => {
                    if (data.success) {
                        alert("Sửa thành công!")
                    } else {
                        alert("Sửa thất bại!")
                    }
                }
            )
        } catch (error) {
            console.error("Error during registration:", error)
            alert("An error occurred during registration. Please try again.")
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center">Sửa Phản hồi mới</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="comment">Bình luận</label>
                                <textarea
                                    className="form-control"
                                    id="comment"
                                    name="comment"
                                    value={feedbacks?.comment}
                                    onChange={(e) =>
                                        setFeedbacks({
                                            ...feedbacks,
                                            comment: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Sửa
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
