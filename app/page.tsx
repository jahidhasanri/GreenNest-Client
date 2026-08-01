import Banner from "./components/Banner/banner";
import Blogs from "./components/Blogs/blogs";
import CheckOutOurCategories from "./components/CheckOutOurCategories/CheckOutOurCategories";
import Newslatter from "./components/NewsLatter/newslatter";
import AboutOurService from "./components/OurServices/aboutourservice";
import Products from "./components/Products/Products";




export default function Home() {
  return (
    <div className="bg-white">
    <Banner></Banner>
    <AboutOurService></AboutOurService>
    <Products></Products>
    <CheckOutOurCategories></CheckOutOurCategories>
    <Blogs></Blogs>
   <Newslatter></Newslatter>
   

    </div>
  );
}
