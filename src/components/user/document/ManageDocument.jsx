import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import ComponentPath from "routes/ComponentPath";
import UserSideNav from "../UserSideNav";
import { Box, Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Table } from "react-bootstrap";
export default function ManageDocument() {
  const [customerDocuments, setCustomerDocuments] = useState([{}]);
  const userId = JSON.parse(localStorage.getItem("userId"));  
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
    <UserSideNav>
      <Box sx={{ marginInline: "1em" }}>
        <Typography variant="h4" gutterBottom>
          Documents
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={
            ComponentPath.user.document.createDocument + orderId + "/" + userId
          }
          sx={{ mb: 2 }}
        >
          Add Document
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Document ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>File Path</TableCell>
                <TableCell>Upload Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerDocuments.map((doc) => (
                <TableRow key={doc.documentId}>
                  <TableCell>{doc.documentId}</TableCell>
                  <TableCell>{doc.orderId}</TableCell>
                  <TableCell>
                    <Button variant="contained">
                      {" "}
                      <a
                        href={"data:" + api.imageBuildUrl(doc.filePath)}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        Download File
                      </a>
                    </Button>
                  </TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>{doc.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteDocument(doc.documentId)}
                      sx={{ mr: 1 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      href={`${ComponentPath.user.document.editDocument}${doc.documentId}`}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </UserSideNav>
  );
}
