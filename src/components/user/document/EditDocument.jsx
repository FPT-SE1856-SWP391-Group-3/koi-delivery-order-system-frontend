import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import UserSideNav from "../UserSideNav";

export default function EditDocument() {
  const [customerDocument, setCustomerDocument] = useState({
    customerDocumentFile: null,
    description: "",
  });
  const { documentId } = useParams(); // Lấy documentId từ URL params
  const navigate = useNavigate();
  console.log(documentId);

  useEffect(() => {
    // Gọi API để lấy thông tin Document dựa trên documentId
    const fetchDocument = async () => {
      try {
        api.get("CustomerDocuments/" + documentId).then((data) => {
          if (data.success) {
            console.log(data.customerDocument);
            setCustomerDocument({
              description: data.customerDocument.description,
            }); // Set giá trị vào state
          } else {
            alert("Không tìm thấy Document!");
          }
        });
      } catch (error) {
        console.error("Error fetching Document:", error);
        alert("An error occurred while fetching the Document.");
      }
    };

    fetchDocument();
  }, [documentId]);

  // Cập nhật Document
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    console.log(document);
    const documentData = new FormData();
    documentData.set(
      "customerDocumentFile",
      customerDocument.customerDocumentFile
    );
    documentData.set("description", customerDocument.description);
    try {
      api
        .putForm("CustomerDocuments/" + documentId, documentData)
        .then((data) => {
          if (data.success) {
            alert("Cập nhật thành công!");
            navigate("/admin/manage-document");
          } else {
            alert("Cập nhật thất bại!");
          }
        });
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during update. Please try again.");
    }
  };

  return (
    <>
      <UserSideNav>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <h2 className="text-center">Cập nhật Document</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="documentFile">Tệp tài liệu</label>
                    <input
                      type="file"
                      className="form-control"
                      id="documentFile"
                      name="documentFile"
                      onChange={(e) =>
                        setCustomerDocument({
                          ...document,
                          documentFile: e.target.files[0],
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Mô tả</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={customerDocument.description}
                      onChange={(e) =>
                        setCustomerDocument({
                          ...document,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Cập nhật
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </UserSideNav>
    </>
  );
}
