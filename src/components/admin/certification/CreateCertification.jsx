import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useFieldArray, useForm } from "react-hook-form";

export default function CreateCertification() {
  const { control, register, handleSubmit } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "certifications",
    }
  );
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));

  // Add Certification
  const onSubmit = async (data) => {
    console.log(data);
    try {
      data.certifications.forEach((certification, index) => {
        const certificationData = new FormData();
        certificationData.append(
          "certificationName",
          certification.certificationName
        );
        certificationData.append(
          "certificateFile",
          certification.certificateFile[0]
        );
        api.postForm("Certifications/", certificationData).then((data) => {
          if (data.success) {
            alert("Thêm thành công!");
            navigate("/admin/manage-certification");
          } else {
            alert("Thêm thất bại!");
          }
        });
      });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  console.log(fields);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Thêm Chứng Chỉ mới</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map((field, index) => (
                <>
                  <div>
                    <label
                      htmlFor={`certifications.${index}.certificationName`}
                    >
                      Tên Chứng Chỉ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`certifications.${index}.certificationName`}
                      name={`certifications.${index}.certificationName`}
                      {...register(`certifications.${index}.certificationName`)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`certifications.${index}.certificateFile`}>
                      Tệp Chứng Chỉ
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id={`certifications.${index}.certificateFile`}
                      name={`certifications.${index}.certificateFile`}
                      accept="multipart/form-data"
                      {...register(`certifications.${index}.certificateFile`)}
                    />
                  </div>
                  <button type="button" onClick={() => remove(index)}>
                    Xoa
                  </button>
                </>
              ))}
              <button
                type="button"
                onClick={() =>
                  append({
                    certificationName: "",
                    certificateFile: null,
                  })
                }
              >
                Them
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
