import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useFetcher, useNavigate, useParams } from "react-router-dom"
import api from "../../../api/CallAPI"
import UserToast from "../alert/UserToast"
import { ToastContainer } from "react-toastify"

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
                    UserToast("error", "No feedback found.")
                }
            })
        } catch (error) {
            UserToast("error", "An error occurred while fetching the feedback.")
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            api.put("CustomerFeedbacks/" + customerFeedbackId, feedbacks).then(
                (data) => {
                    if (data.success) {
                        UserToast("success", "Update feedback successfully!")
                    } else {
                        UserToast("error", "Failed to update feedback!")
                    }
                }
            )
        } catch (error) {
            console.error("Error during registration:", error)
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
                        <h2 className="text-center">Update Feedback</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="comment">Comment</label>
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
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
