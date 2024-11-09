import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import UserSideNav from "../UserSideNav";

export default function AddDocument({ orderId, userId }) {
  const { control, register, handleSubmit } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "customerDocuments",
    }
  );
  const navigate = useNavigate();
  // const [customerDocumentFile, setCustomerDocumentFile] = useState([]);
  // let { orderId, userId } = useParams();

  // const handleFileChange = (e) => {
  //   setCustomerDocumentFile([...customerDocumentFile, e.target.files[0]]); //append the file list
  // };

  const onSubmit = async (data) => {
    try {
      console.log(data.customerDocuments);
      data.customerDocuments.forEach((customerDocument, index) => {
        console.log(customerDocument);
        const customerData = new FormData();
        customerData.append("orderId", orderId);
        customerData.append(
          "customerDocumentFile",
          customerDocument.customerDocumentFile[0]
        );
        customerData.append("description", customerDocument.description);
        customerData.append("userId", userId);
        console.log(customerData);
        api.postForm("CustomerDocuments/", customerData).then((data) => {
          if (data.success) {
            console.log(`File ${index + 1} uploaded successfully!`);
            alert("Thêm thành công!");
          } else {
            console.log(`File ${index + 1} uploaded successfully!`);
            alert("Thêm thất bại!");
          }
        });
      });
    } catch (error) {
      console.error("Error :", error);
      alert("Error! Please try again.");
    }
  };

  return (
    <div>
      <UserSideNav />
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center">Thêm Tài liệu mới</h2>
            <div className="form-group">
              <label htmlFor={`orderId`}>Mã đơn hàng</label>
              <input
                type="number"
                className="form-control"
                id={`orderId`}
                name={`orderId`}
                value={orderId}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor={`userId`}>Mã người dùng</label>
              <input
                type="number"
                className="form-control"
                id={`userId`}
                name={`userId`}
                value={userId}
                readOnly
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map((field, index) => (
                <>
                <h5>Tài liều thứ {index + 1}</h5>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      id={`customerDocuments.${index}.orderId`}
                      name={`customerDocuments.${index}.orderId`}
                      value={orderId}
                      readOnly
                      hidden
                      {...register(`customerDocuments.${index}.orderId`)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`customerDocuments.${index}.userId`}>
                      Mã người dùng
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id={`customerDocuments.${index}.userId`}
                      name={`customerDocuments.${index}.userId`}
                      value={userId}
                      readOnly
                      hidden
                      {...register(`customerDocuments.${index}.userId`)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="customerDocumentFile"
                      name="customerDocumentFile"
                      type="file"
                      accept="multipart/form-data"
                      {...register(
                        `customerDocuments.${index}.customerDocumentFile`
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Mô tả</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      {...register(`customerDocuments.${index}.description`)}
                    />
                  </div>
                  <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                    Delete
                  </button>
                </>
              ))}
              <button type="button" className="btn btn-secondary" onClick={() => append({})}>
                Add document
              </button>
              <button type="submit" className="btn btn-primary">
                Thêm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
