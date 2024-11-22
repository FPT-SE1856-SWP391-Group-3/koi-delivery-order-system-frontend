import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import { useFieldArray, useForm } from "react-hook-form"
import "../certification/CreateCertification.css"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function CreateCertification() {
    const { control, register, handleSubmit } = useForm()
    const { fields, append, prepend, remove, swap, move, insert } =
        useFieldArray({
            control,
            name: "certifications",
        })
    const navigate = useNavigate()
    let userId = JSON.parse(localStorage.getItem("userId"))

    // Add Certification
    const onSubmit = async (data) => {
        console.log(data)
        try {
            data.certifications.forEach((certification, index) => {
                const certificationData = new FormData()
                certificationData.append(
                    "certificationName",
                    certification.certificationName
                )
                certificationData.append(
                    "certificateFile",
                    certification.certificateFile[0]
                )
                api.postForm("certifications/", certificationData).then(
                    (data) => {
                        if (data.success) {
                            UserToast(
                                "success",
                                "Add certification successfully!"
                            )
                            navigate("/admin/manage-certification")
                        } else {
                            UserToast("error", "Failed to add certification!")
                        }
                    }
                )
            })
        } catch (error) {
            console.error("Error during registration:", error)
            UserToast("error", "Error! Please try again.")
        }
    }

    console.log(fields)
    return (
        <>
            <ToastContainer />
            <a className="back-button" href="/admin/manage-certification">
                Back
            </a>
            <div className="addcertificate-container">
                <h1 className="form-title">Add new Certificate</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="addcertificate-form"
                >
                    {fields.map((field, index) => (
                        <>
                            <div>
                                <label
                                    htmlFor={`certifications.${index}.certificationName`}
                                >
                                    Certificate Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`certifications.${index}.certificationName`}
                                    name={`certifications.${index}.certificationName`}
                                    {...register(
                                        `certifications.${index}.certificationName`
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor={`certifications.${index}.certificateFile`}
                                >
                                    Certificate File
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id={`certifications.${index}.certificateFile`}
                                    name={`certifications.${index}.certificateFile`}
                                    accept="multipart/form-data"
                                    {...register(
                                        `certifications.${index}.certificateFile`
                                    )}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="delete-btn"
                            >
                                Delete[-]
                            </button>
                        </>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            append({
                                certificationName: "",
                                certificateFile: null,
                            })
                        }
                        className="add-btn"
                    >
                        Add[+]
                    </button>
                    <button type="submit" className="btn-add">
                        ADD
                    </button>
                </form>
            </div>
        </>
    )
}
