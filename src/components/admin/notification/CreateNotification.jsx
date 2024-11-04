import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"

import { useForm } from "react-hook-form"

export default function CreateNotification() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    let userId = JSON.parse(localStorage.getItem("userId"))

    // Create notification
    const onSubmit = async (data) => {
        console.log(data)
        try {
            api.post("Notifications/", data).then((data) => {
                if (data.success) {
                    alert("Notification created successfully!")
                    navigate("/")
                } else {
                    alert("Failed to create notification!")
                }
            })
        } catch (error) {
            console.error("Error during notification creation:", error)
            alert(
                "An error occurred during notification creation. Please try again."
            )
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center">Create New Notification</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="notificationTitle">
                                    Notification Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="notificationTitle"
                                    name="notificationTitle"
                                    {...register("notificationTitle")}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="senderId">Sender ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="senderId"
                                    name="senderId"
                                    {...register("senderId")}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="receiverId">Receiver ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="receiverId"
                                    name="receiverId"
                                    {...register("receiverId")}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="notificationContent">
                                    Notification Content
                                </label>
                                <textarea
                                    className="form-control"
                                    id="notificationContent"
                                    name="notificationContent"
                                    {...register("notificationContent")}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
