import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import "../css/ChoosePayment.css" // Import custom CSS
import ATMCard from "../../../assets/atm-icon.png"
import VisaCard from "../../../assets/visa-icon.png"
import COD from "../../../assets/COD-icon.png"
import { FaTimes } from "react-icons/fa" // Import the icon for "X"
import api from "../../../api/CallAPI"

function ChoosePayment() {
    const orderData = JSON.parse(localStorage.getItem("orderData"))
    const [selectedPayment, setSelectedPayment] = useState("COD")
    const [searchParams] = useSearchParams()
    const [email, setEmail] = useState(searchParams.get("email"))
    const [orderId, setOrderId] = useState(searchParams.get("orderId"))
    const [totalPrice, setTotalPrice] = useState(searchParams.get("totalPrice"))
    //  const { senderInfo, serviceSelection } = orderData;

    const navigate = useNavigate()

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value)
    }

    useEffect(() => {
        api.get(`orders/${orderId}`).then((data) => {
            console.log(data)
            setTotalPrice(data.order.totalPrice)
        })
    }, [])

    const handlePaymentSubmit = () => {
        // alert(`You have selected ${selectedPayment} as your payment method.`);
        // navigate("/payment-success")

        var paymentMethodId = 0
        if (selectedPayment === "COD") {
            paymentMethodId = 1
        } else if (selectedPayment === "ATM" || selectedPayment === "Visa") {
            paymentMethodId = 2
        }

        const data = {
            orderId: orderId,
            paymentMethodId: paymentMethodId,
        }

        console.log(data)
        api.post("payments/vnpay", data).then((data) => {
            console.log(data)
            if (paymentMethodId !== 1) {
                window.location.href = data.paymentUrl
            } else {
                navigate("/payment/callback")
            }
        })
    }

    // Function to handle back navigation
    const handleBackClick = () => {
        navigate(-1) // Go back to the previous page
    }

    console.log("Order Data:", orderData)

    return (
        <div className="payment-container">
            {/* Back button with X icon */}
            <button className="back-btn" onClick={handleBackClick}>
                <FaTimes className="back-icon" />
            </button>

            <h2>Hình thức thanh toán</h2>

            <form>
                <div className="payment-methods">
                    {/* ATM Payment Option */}
                    <div>
                        <input
                            type="radio"
                            id="atm"
                            name="paymentMethod"
                            value="ATM"
                            checked={selectedPayment === "ATM"}
                            onChange={handlePaymentChange}
                        />
                        <label htmlFor="atm">
                            <img src={ATMCard} alt="ATM" />
                            Thẻ ATM nội địa (Hỗ trợ Internet Banking)
                        </label>
                    </div>

                    {/* Visa Payment Option */}
                    <div>
                        <input
                            type="radio"
                            id="visa"
                            name="paymentMethod"
                            value="Visa"
                            checked={selectedPayment === "Visa"}
                            onChange={handlePaymentChange}
                        />
                        <label htmlFor="visa">
                            <img src={VisaCard} alt="Visa" />
                            Thanh toán bằng thẻ quốc tế Visa, Master, JCB
                        </label>
                    </div>
                </div>

                {/* Customer Information Box */}
                <div className="customer-info">
                    <h3>Thông tin khách hàng</h3>
                    {/* <p>
            <strong>{senderInfo.fullName}</strong> | {senderInfo.phoneNumber}
          </p> */}
                    {/* <p>Email: {senderInfo.email}</p> */}
                    <p>Email: {email}</p>
                </div>

                {/* Order Summary Box */}
                <div className="order-summary">
                    <h3>Thông tin đơn hàng</h3>
                    {/* {serviceSelection.map((pkg, index) => (
            <p key={index}>
              {pkg.type} - {pkg.weight} kg - {pkg.length} x {pkg.width} x {pkg.height} cm
            </p>
          ))} */}
                    <p className="total">Thành tiền: {totalPrice} đ</p>
                </div>

                <div className="payment-footer">
                    <button
                        type="button"
                        className="pay-now-btn"
                        onClick={handlePaymentSubmit}
                    >
                        Thanh toán
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChoosePayment
