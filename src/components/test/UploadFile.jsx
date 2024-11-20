import api from "../../api/CallAPI"
import { useEffect, useState } from "react"
import UserToast from "../user/alert/UserToast"
import { ToastContainer } from "react-toastify"
export default function UploadFile() {
    const [file, setFile] = useState([]) //define list instead
    const [image, setImage] = useState({})

    const handleFileChange = (e) => {
        setFile([...file, e.target.files[0]]) //append the file list
    }

    const importFile = async (e) => {
        console.log(file) //check all files
        for (const uploadedFile of file) {
            if (uploadedFile) {
                const formData = new FormData() //make a bew FormData for every file.
                formData.append("file", uploadedFile, uploadedFile.name) //append the file to the formdata
                try {
                    api.postFile("CustomsDocuments/test", formData).then(
                        (data) => {
                            if (data.success) {
                                UserToast("success", "Upload successfully!")
                            } else {
                                UserToast("error", "Upload failed!")
                            }
                        }
                    )
                } catch (ex) {
                    console.log(ex)
                }
            }
        }
    }

    useEffect(() => {
        var response = api.getFile(
            "Certifications/image",
            "Resources\\fb1b3108-dc39-4ba1-b0e5-699e34d5a85d_0dc8f74f9258d109ebfc0b889758ccbf6c814d0f_output.png"
        )
        console.log(response)
        response.then((data) => {
            setImage(data)
            console.log(image)
        })
    }, [image])

    return (
        <>
            <ToastContainer />
            <input
                id="uploadFile"
                name="uploadFile"
                type="file"
                accept="multipart/form-data"
                onChange={handleFileChange}
            />
            <input type="button" value="upload" onClick={importFile} />
            <img src={image} alt="image" />
        </>
    )
}
