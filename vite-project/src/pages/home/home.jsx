import Category from "../../components/category/category";
import HeroSection from "../../components/heroSection/heroSection";
import HomeProductCard from "../../components/homeProductCard/homeProductCard";
import Layout from "../../components/layout/layout"; 
import Testimonial from "../../components/testimonial/Testimonial";


const Home = () =>{
    return(
        <Layout>
            <HeroSection/>
            <Category/>
            <HomeProductCard/>
            <Testimonial/>
        </Layout>
    );
}

export default Home;