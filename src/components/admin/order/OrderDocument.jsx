import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { set } from "react-hook-form";
import ComponentPath from "routes/ComponentPath";

export default function ManageOrderDocument() {
  const [orderDocuments, setOrderDocuments] = useState([{}]);
  const [orderIds, setOrderIds] = useState([]);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log(orderId);
      api.get("OrderDocuments/").then((data) => {
        if (data.success) {
          setOrderDocuments(data.orderDocuments);
          console.log(data.orderDocuments);
        } else {
          console.log("Không có tài liệu!");
        }
      });

      api.get("Orders/orderId").then((data) => {
        if (data.success) {
          setOrderIds(data.orderIds);
        } else {
          console.log("Không có đơn hàng!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, [orderId]);

  async function deleteDocument(documentId) {
    try {
      api.del("OrderDocuments/" + documentId).then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          const newDocuments = orderDocuments.filter(
            (document) => document.orderDocumentId !== documentId
          );
          setOrderDocuments(newDocuments);
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
      <h1>Documents</h1>
      {orderIds.map((orderId) => {
        // Lọc danh sách tài liệu theo orderId
        const filteredDocuments = orderDocuments.filter(
          (document) => document.orderId === orderId
        );

        // Chỉ hiển thị bảng nếu có tài liệu phù hợp
        if (filteredDocuments.length === 0) {
          return null; // Không hiển thị gì nếu không có tài liệu
        }

        return (
          <div key={orderId}>
            <h2>Order ID: {orderId}</h2>
            <table>
              <thead>
                <tr>
                  <th>OrderDocumentId</th>
                  <th>OrderId</th>
                  <th>OrderStatusId</th>
                  <th>FilePath</th>
                  <th>UploadDate</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((document) => (
                  <tr key={document.orderDocumentId}>
                    <td>{document.orderDocumentId}</td>
                    <td>{document.orderId}</td>
                    <td>{document.orderStatusId}</td>
                    <td>
                      <img
                        src={api.imageBuildUrl(document.filePath)}
                        width="100px"
                        alt="Document"
                      />
                    </td>
                    <td>{document.uploadDate}</td>
                    <td>{document.description}</td>
                    <td>{document.status ? "Active" : "Inactive"}</td>
                    <td>
                      <button
                        onClick={() => deleteDocument(document.orderDocumentId)}
                      >
                        Delete
                      </button>
                      <a
                        href={
                          ComponentPath.admin.order.document.editOrderDocment + document.orderDocumentId
                        }
                      >
                        Update
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
