import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";
import { useForm } from "react-hook-form";

export default function CreateCertification() {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    let userId = JSON.parse(localStorage.getItem('userId'));

    // Add Certification
    const onSubmit = async (data) => {
        const certificationData = new FormData();
        certificationData.append('certificationName', data.certificationName);
        certificationData.append('certificateFile', data.certificateFile[0]);
        try {
              api.postForm("Certifications/", certificationData)
                .then(data => {
                    if (data.success) {
                        alert('Thêm thành công!');
                        navigate('/admin/manage-certification');
                    } else {
                        alert('Thêm thất bại!');
                    }
                });
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration. Please try again.");
        }
    }

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h2 className="text-center">Thêm Chứng Chỉ mới</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="certificationName">Tên Chứng Chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="certificationName"
                    name="certificationName"
                    {...register("certificationName")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="certificateFile">Tệp Chứng Chỉ</label>
                  <input
                    type="file"
                    className="form-control"
                    id="certificateFile"
                    name="certificateFile"
                    accept="multipart/form-data"
                    {...register("certificateFile")}
                  />
                </div>
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
