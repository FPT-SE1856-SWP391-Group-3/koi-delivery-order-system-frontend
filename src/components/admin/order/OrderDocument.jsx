import React, { useEffect, useState } from "react";
import api from "../../../api/CallAPI";
import AdminSideMenu from "../components/AdminSideMenu";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { format } from "date-fns"; // Import date formatting library

export default function ManageOrderDocument() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all order documents when the component mounts
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get("OrderDocuments");
        console.log("API Response for OrderDocuments:", response);

        if (!response.success) {
          setError(response.message);
          return;
        }

        setDocuments(response.orderDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDocuments();
  }, []);
  

  // Delete a document by its ID
  const deleteDocument = async (documentId) => {
    try {
      const response = await api.del(`OrderDocuments/${documentId}`);
      if (response.success) {
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc.orderDocumentId !== documentId)
        );
        alert("Document deleted successfully.");
      } else {
        alert("Failed to delete the document.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AdminSideMenu />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Order Documents
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : documents.length === 0 ? (
          <Alert severity="info">No documents available.</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document ID</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>File Path</TableCell>
                  <TableCell>Upload Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.orderDocumentId}>
                    <TableCell>{document.orderDocumentId}</TableCell>
                    <TableCell>{document.orderId}</TableCell>
                    <TableCell>{document.status ? "Active" : "Inactive"}</TableCell>
                    <TableCell>
                      <a href={api.imageBuildUrl(document.filePath)} target="_blank" rel="noopener noreferrer">
                        View File
                      </a>
                    </TableCell>
                    <TableCell>
                      {document.uploadDate
                        ? format(new Date(document.uploadDate), "yyyy-MM-dd")
                        : "Not Set"}
                    </TableCell>
                    <TableCell>{document.description || "No Description"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        href={`/admin/order/document/edit/${document.orderDocumentId}`}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => deleteDocument(document.orderDocumentId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

