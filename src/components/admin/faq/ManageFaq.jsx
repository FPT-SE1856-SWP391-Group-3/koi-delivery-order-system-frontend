import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";

export default function ManageFaq() {
    const [faqs, setFaqs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            api.get('Faqs/')
                .then(data => {
                    if (data.success) {
                        setFaqs(data.faqs);
                        console.log(data.faqs);
                    } else {
                        console.log('Không có địa chỉ!');
                    }
                });
        } catch (error) {
            alert("An error has occurred. Please try again.");
        }
    }, []);

    async function deleteFaq(faqId) {
        try {
            api.del("Faqs/" + faqId).then((data) => {
              if (data.success) {
                alert("Xóa thành công!");
                const newFaqs = faqs.filter((faq) => faq.faqId !== faqId);
                setFaqs(newFaqs);
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
            <h1>FAQs</h1>
            <a href="/admin/newFaq">Add FAQ</a>
            {faqs.map((faq) => (
                <div key={faq.faqid}>
                    <h3>FaqId: {faq.faqid}</h3>
                    <h3>Question: {faq.question}</h3>
                    <h3>Answer: {faq.answer}</h3>
                    <button onClick={() => deleteFaq(faq.faqid)}>Delete</button>
                    <a href={"/admin/update-faq/" + faq.faqid}>Update</a>
                </div>
            ))}
        </div>
    );
}
