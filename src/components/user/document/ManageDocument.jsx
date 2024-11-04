import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import ComponentPath from "routes/ComponentPath";
import UserSideNav from "../UserSideNav";
import { Button } from "@mui/material";

export default function ManageDocument() {
  const [customerDocuments, setCustomerDocuments] = useState([{}]);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log(orderId);
      api.get("CustomerDocuments/order/" + orderId).then((data) => {
        if (data.success) {
          setCustomerDocuments(data.customerDocuments);
          console.log(data.customerDocuments);
        } else {
          console.log("Không có tài liệu!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, [orderId]);

  async function deleteDocument(documentId) {
    try {
      api.del("CustomerDocuments/" + documentId).then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          const newDocuments = customerDocuments.filter(
            (document) => document.documentId !== documentId
          );
          setCustomerDocuments(newDocuments);
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
      <UserSideNav>
        <h1>Documents</h1>
        <Button variant="contained" color="primary" href={ComponentPath.user.document.createDocument}>
          Add Document
        </Button>
        <table>
          <thead>
            <tr>
              <th>DocumentId</th>
              <th>OrderId</th>
              <th>FilePath</th>
              <th>UploadDate</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerDocuments.map((customerDocument) => (
              <tr key={customerDocument.documentId}>
                <td>{customerDocument.documentId}</td>
                <td>{customerDocument.orderId}</td>
                <td>
                  {api.imageBuildUrl(customerDocument.filePath)}
                </td>
                <td>
                  <Button variant="contained" color="primary">
                    <a
                      download
                      href={"data:" + api.imageBuildUrl(customerDocument.filePath)}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      Download
                    </a>
                  </Button>
                </td>
                <td>{customerDocument.uploadDate}</td>
                <td>{customerDocument.description}</td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteDocument(customerDocument.documentId)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    href={ComponentPath.user.document.editDocument + customerDocument.documentId}
                    style={{ marginLeft: '10px' }}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </UserSideNav>
    </div>
  );
}
