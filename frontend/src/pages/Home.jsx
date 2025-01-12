import Hero from "../components/Hero";
import DealsSection from "../components/DealsSection";
import NewArrivals from "../components/NewArrivals";
import InstagramFeed from "../components/InstagramFeed";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
export default function Home() {
    return (
        <>  
           <div className="dark:bg-slate-900">
           <Hero/>
           <DealsSection/>
           <NewArrivals/>
           <InstagramFeed/>
           <Testimonials/>
           <Footer/>
           </div>
        </>
    );
}
