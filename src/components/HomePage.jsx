import Footer from "./user/common/Footer";
import Header from "./user/common/Header";
import Navbar from "./user/common/Navbar";

export default function HomePage() {
    let user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Navbar/>
            <Header/>
            <h1>Hello {user == null
                ? 'Guest' : user.userName}</h1>
            <Footer/>
        </>
    )
}