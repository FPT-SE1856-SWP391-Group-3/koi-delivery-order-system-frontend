import React, { useEffect, useState } from "react";
import "../../css/CreateOrder.css";
import api from "../../../../api/CallAPI";
import { set, useFieldArray } from "react-hook-form";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
const ServiceSelection = ({onChange, stateChange}) => {
  const [orderServiceDetails, setOrderServiceDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const {register, handleSubmit, control, watch, getValues, setValue} = useForm({
    defaultValues: {
      itemList: [{koiName: "", weight: "", price: "", amount: "", koiCondition: ""}],
    }
  });

  const { fields: itemField, append: itemAppend, remove: itemRemove, update: updateField } = useFieldArray({
    control,
    name: "itemList"
  });

  useEffect(() => {
     api.get("OrderServiceDetails/").then((data) => {
      if (data.success) {
        console.log(data.orderServiceDetails);
        setOrderServiceDetails(data.orderServiceDetails);
      } else {
        console.log("Không có dịch vụ!");
      }
    }); 
  }, []);


  return (
    <div className="section">
      <h2>Service Selection</h2>
      <div className="sectionCompo">
        {itemField.map((item, index) => (
          <>
            {" "}
            <div id="item" key={item.id}>
              <label>Package Type {index + 1}</label>
              <input
                type="text"
                placeholder="Enter package type."
                {...register(`itemList.${index}.koiName`)}
                onChange={(e) => {
                  console.log(getValues("itemList"));
                  onChange(getValues("itemList"));
                  stateChange();
                }}
              />
              <label>Weight</label>
              <input
                type="text"
                placeholder="gram"
                {...register(`itemList.${index}.weight`)}
                onChange={(e) => {
                  console.log(getValues("itemList"));
                  onChange(getValues("itemList"));
                  stateChange();
                }}
              />
              <label>Price</label>
              <input
                type="text"
                placeholder="0đ"
                {...register(`itemList.${index}.price`)}
                onChange={(e) => {
                  console.log(getValues("itemList"));
                  onChange(getValues("itemList"));
                  stateChange();
                }}
              />
              <label>Amount</label>
              <input
                type="text"
                placeholder="0"
                {...register(`itemList.${index}.amount`)}
                onChange={(e) => {
                  console.log(getValues("itemList"));
                  onChange(getValues("itemList"));
                  stateChange();
                }}
              />
              <label>Condition</label>
              <input
                type="text"
                placeholder="Enter condition"
                {...register(`itemList.${index}.koiCondition`)}
                onChange={(e) => {
                  console.log(getValues("itemList"));
                  onChange(getValues("itemList"));
                  stateChange();
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (itemField.length === 1) {
                    return;
                  }
                  itemRemove(index);
                }}
              >
                Xóa
              </button>
            </div>
          </>
        ))}
        <button
          type="button"
          onClick={() =>
            itemAppend({
              koiName: "",
              weight: "",
              price: "",
              amount: "",
              koiCondition: "",
            })
          }
        >
          Add Package
        </button>
        {orderServiceDetails.map((orderServiceDetail) => (
          <>
            <h1>Các dịch vụ</h1>
            <p>Gía dịch vụ: {orderServiceDetail.orderServiceDetailName} </p>
            <p>Giá cước: {orderServiceDetail.orderServiceDetailPrice} </p>
          </>
        ))}
        <div>
          <h3>Total Price: {totalPrice}đ</h3>
        </div>
      </div>
    </div>
  );
};

ServiceSelection.propTypes = {
  onChange: PropTypes.func.isRequired,
  stateChange: PropTypes.func.isRequired,
};


export default ServiceSelection;