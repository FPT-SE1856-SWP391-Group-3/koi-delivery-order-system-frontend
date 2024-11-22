export default function SelectPaymentMethod({ setSelectPaymentMethod }) {
    return (
        <>
            <div>
                <h2>Select Payment Method</h2>
                <div>
                    <label>Payment Method</label>
                    <div>
                        <div>
                            <label htmlFor="paypal">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/2897/2897853.png"
                                    alt="COD"
                                    style={{ width: "50px" }}
                                />
                            </label>
                            <input
                                type="radio"
                                name="payment-method"
                                id="COD"
                                value="COD"
                                onClick={(e) =>
                                    setSelectPaymentMethod(e.target.value)
                                }
                            />
                        </div>
                        <div className="payment-method-item">
                            <label htmlFor="stripe">
                                <img
                                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                                    alt="VNPAY"
                                    style={{ width: "50px" }}
                                />
                            </label>
                            <input
                                type="radio"
                                name="payment-method"
                                id="VNPAY"
                                value="VNPAY"
                                onClick={(e) =>
                                    setSelectPaymentMethod(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
