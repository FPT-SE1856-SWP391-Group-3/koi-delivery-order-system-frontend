import Body from "./user/common/Body";
import Footer from "./user/common/Footer";
import Header from "./user/common/Header";
import Navbar from "./user/common/Navbar";
import { slides } from "../data/slidedata.json";

export default function HomePage() {
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      <Header data={slides} />
      <Body />
      <Footer />
    </>
  );
}
