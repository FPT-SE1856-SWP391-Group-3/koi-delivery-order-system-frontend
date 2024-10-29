import { useForm } from "react-hook-form";
import api from "../../../api/CallAPI";
import "../report/CreateTransportationReportDetails.css";

export default function CreateTransportationReportDetails({
  orderId,
  onClose,
  onAddSuccess,
}) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("TransportationReportDetails", {
        ...data,
        orderId,
      });
      if (response.success) {
        alert("Thêm báo cáo thành công!");
        onAddSuccess(); // Cập nhật danh sách sau khi thêm thành công
        onClose(); // Đóng modal
      } else {
        alert("Thêm báo cáo thất bại!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };
  return (
    <div className="transportation-container">
      <h1 className="form-title">Add New Transportation Report</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="transportation-form">
        <div className="form-group">
          <label htmlFor="orderId">OrderId</label>
          <input
            type="number"
            className="form-control"
            id="orderId"
            name="orderId"
            value={orderId}
            readOnly
            {...register("orderId")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="issueTypeId">Type of Problem</label>
          <input
            type="number"
            className="form-control"
            id="issueTypeId"
            name="issueTypeId"
            {...register("issueTypeId")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            {...register("description")}
          />
        </div>
        <button type="submit" className="btn-add">
          ADD
        </button>
      </form>
    </div>
  );
}
