import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import api from '../../../api/CallAPI';
import Header from '../common/Header';

export default function UserPayment (){

    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();
    const id  = localStorage.getItem("userId");

    useEffect(() => {
        try {
         api.get("Payments/" + id)
                .then(data => {
                    if (data.success) {
                        setPayments(data.payment);
                        console.log(data.payment);
                    } else {
                        alert('Không có phương thức thanh toán!');
                    }
                });
        } catch (error) {
            alert('An error has occurred. Please try again.');
        }
    }, [id]);

    async function deletePayment(paymentId) {
        try {
          api.del("Payments/" + paymentId).then((data) => {
            if (data.success) {
              alert("Xóa thành công!");
              const newPayments = payments.filter(
                (payment) => payment.paymentId !== paymentId
              );
              setPayments(newPayments);
            } else {
              alert("Xóa thất bại!");
            }
          });
        } catch (error) {
          console.error("Error during deletion:", error);
          alert("An error occurred during deletion. Please try again.");
        }
    }

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-9">
                        <div className="container">
                            <h2>Quản lý phương thức thanh toán</h2>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Mã phương thức thanh toán</th>
                                        <th>Chủ thẻ</th>
                                        <th>Phương thức thanh toán</th>
                                        <th>Số thẻ</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map(payment => (
                                        <tr key={payment.paymentId}>
                                            <td>{payment.paymentId}</td>                                           
                                            <td>{payment.userName}</td>
                                            <td>{payment.paymentMethodName}</td>
                                            <td>{payment.paymentNumber}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => deletePayment(payment.paymentId)}>Xóa</button>
                                                <Link to={{ pathname: `/edit-payment/${payment.paymentId}`, state: payment }}>Sửa </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <a href="/add-payment">Thêm phương thức thanh toán</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}