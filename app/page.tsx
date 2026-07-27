import Banner from "./components/Banner/banner";
import CheckOutOurCategories from "./components/CheckOutOurCategories/CheckOutOurCategories";
import AboutOurService from "./components/OurServices/aboutourservice";
import Products from "./components/Products/Products";



export default function Home() {
  return (
    <div className="bg-white">
    <Banner></Banner>
    <AboutOurService></AboutOurService>
    <CheckOutOurCategories></CheckOutOurCategories>
    <Products></Products>
    </div>
  );
}
