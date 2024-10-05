import Header from "./user/common/Header";

export default function HomePage() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    return (
        <>
            <Header />
            <h1>Home Page</h1>
            <h1>Hello {user == null
                ? 'Guest' : user.userName}</h1>
        </>
    )
}