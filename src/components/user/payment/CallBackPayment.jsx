import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import "../css/ChoosePayment.css" // Import custom CSS
import api from "../../../api/CallAPI"

function useOnceCall(cb, condition = true) {
    const isCalledRef = React.useRef(false)

    React.useEffect(() => {
        if (condition && !isCalledRef.current) {
            isCalledRef.current = true
            cb()
        }
    }, [cb, condition])
}

function CallBackPayment() {
    const [searchParams] = useSearchParams()
    const [responseCode, setResponseCode] = useState(
        searchParams.get("vnp_ResponseCode")
    )
    const [query, setQuery] = useState(window.location.search.substring(1))

    const apiOneTimePayment = () => {
        api.get(`payments/callback?${query}`).then((data) => {
            console.log(data)
        })
    }

    useOnceCall(apiOneTimePayment)

    return (
        <div className="payment-container">
            <h2>Tình trạng thanh toán</h2>
            <h1>
                {responseCode === "00"
                    ? "Thanh toán thành công"
                    : responseCode === null || responseCode === undefined
                      ? "Đang thanh toán với COD"
                      : "Thanh toán thất bại"}
            </h1>
        </div>
    )
}

export default CallBackPayment
