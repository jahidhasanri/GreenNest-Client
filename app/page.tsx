import Banner from "./components/Banner/banner";
import CheckOutOurCategories from "./components/CheckOutOurCategories/CheckOutOurCategories";
import AboutOurService from "./components/OurServices/aboutourservice";



export default function Home() {
  return (
    <div>
    <Banner></Banner>
    <AboutOurService></AboutOurService>
    <CheckOutOurCategories></CheckOutOurCategories>
    </div>
  );
}
