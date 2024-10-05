import api from "../../api/CallAPI";
import { useState } from "react";
export default function UploadFile() {
    const [file, setFile] = useState([]);    //define list instead
  
  const handleFileChange = (e) => {
    setFile([...file,e.target.files[0]])      //append the file list
    };

  const importFile= async (e) => {

    console.log(file);   //check all files
    for (const uploadedFile of file){
      if (uploadedFile) {
        const formData = new FormData();      //make a bew FormData for every file.
        formData.append("file",uploadedFile,uploadedFile.name); //append the file to the formdata
        try {
         api.postFile("CustomsDocuments/test", formData).then((data) => {
           if (data.success) {
             alert("Upload thành công!");
           } else {
             alert("Upload thất bại!");
           }
         });
        } catch (ex) {
          console.log(ex);
        }
  };}}
    

  return (
    <>
      <input
      id="uploadFile"
        name="uploadFile"
        type="file"
        accept="multipart/form-data"
        onChange={handleFileChange}
      />
      <input type="button" value="upload" onClick={importFile} />
    </>
  );
    
    

}