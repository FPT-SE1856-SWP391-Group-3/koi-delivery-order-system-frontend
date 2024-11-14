import React, { useEffect, useState, useMountEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import "../css/ChoosePayment.css" // Import custom CSS
import api from "../../../api/CallAPI"
import { set } from "react-hook-form"
import ComponentPath from "../../../routes/ComponentPath"
import { ToastContainer } from "react-toastify"
import UserToast from "../alert/UserToast"

function useOnceCall(cb, condition = true) {
    const isCalledRef = React.useRef(false)

    React.useEffect(() => {
        if (condition && !isCalledRef.current) {
            isCalledRef.current = true
            cb()
        }
    }, [cb, condition])
}

function ValidateEmailCallBack() {
    const [searchParams] = useSearchParams()
    const [code, getCode] = useState("")

    const navigate = useNavigate()

    const apiOneTimeValidate = () => {
        const data = {
            validateEmailToken: searchParams.get("token"),
            email: searchParams.get("email"),
        }

        api.post(`Users/validate`, data).then((data) => {
            getCode(data.code)
            console.log(data)
        })
    }

    const apiOneTimeRevalidate = (event) => {
        event.preventDefault()
        UserToast("info", "Đã gửi lại email xác nhận")
        const data = {
            clientURI:
                window.location.origin + ComponentPath.user.user.validateEmail,
            email: searchParams.get("email"),
        }

        api.post(`Users/revalidate`, data).then((data) => {
            UserToast("success", "Gửi lại email xác nhận thành công")
            console.log(data)
        })
    }

    useOnceCall(apiOneTimeValidate)

    return (
        <div className="payment-container">
            <ToastContainer />
            <h2>Validate Email</h2>
            <h1>
                {code === "ves" ? (
                    "Xác nhận email thành công"
                ) : (
                    <>
                        Xác nhận email thất bại. Vui lòng bấm vào
                        <a href="" onClick={(e) => apiOneTimeRevalidate(e)}>
                            {" "}
                            <u>đây</u>
                        </a>{" "}
                        để gửi lại email xác nhận
                    </>
                )}
            </h1>
        </div>
    )
}

export default ValidateEmailCallBack
