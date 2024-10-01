import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";

export default function ManageKoi(){
    
        
        const [kois, setKois] = useState([]);
        const navigate = useNavigate();


        useEffect(() => {
            try {
                api.get('Kois/')
                    .then(data => {
                        if (data.success) {
                            setKois(data.kois);
                            console.log(data.kois);
                        } else {
                            console.log('Không có địa chỉ!');
                        }
                    });
            } catch (error) {
                alert("An error has occurred. Please try again.");
            }
        }, []);
    
        async function deleteKoi(koiId) {
            try {
                api.del("Kois/" + koiId).then((data) => {
                  if (data.success) {
                    alert("Xóa thành công!");
                    const newKois = kois.filter((koi) => koi.koiId !== koiId);
                    setKois(newKois);
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
            <Header />
            <h1>Koi</h1>
            <a href="/admin/add-koi">Add Koi</a>
            {kois.map((koi) => (
              <div key={koi.koiId}>
                <h3>KoiId: {koi.koiId}</h3>
                <h3>Name: {koi.koiName}</h3>
                <h3>Type: {koi.koiTypeName}</h3>
                <h3>Price: {koi.price}</h3>
                <h3>Wight: {koi.weight}</h3>
                <button onClick={() => deleteKoi(koi.koiId)}>Delete</button>
                <a href={"/admin/edit-koi/" + koi.koiId}>Update</a>
              </div>
            ))}
          </div>
        );
        

}