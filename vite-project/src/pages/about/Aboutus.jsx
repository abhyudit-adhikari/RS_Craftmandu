import Layout from "../../components/layout/Layout";

const AboutUS = () => {
    return (
        <Layout>
            <div className="playfair max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Intro Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#dd3333] mb-6">
                        About RS Craftmandu
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Welcome to RS Craftmandu, a premier export business dedicated to bringing the finest Nepali craftsmanship to the world. 
                        Specializing in high-quality handmade felt products, we bridge the gap between traditional Himalayan artistry and modern global aesthetics. 
                        Our mission is to empower local artisans while delivering sustainable, eco-friendly, and uniquely beautiful products to our international clients.
                    </p>
                </div>

                {/* Divider */}
                <div className="w-24 h-1 bg-[#dd3333] mx-auto mb-16 rounded-full"></div>

                {/* Founders Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        Meet The Founders
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        
                        {/* Founder 1: Mrs. Roshna Shrestha */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <div className="bg-gray-200 h-80 w-full flex items-center justify-center">
                                {/* Placeholder for Photo */}
                                <span className="text-gray-500 font-medium">
                                    [Photo: Mrs. Roshna Shrestha]
                                </span>
                                {/* Remove the span above and uncomment below when you have the photo */}
                                {/* <img src="URL_TO_ROSHNA_PHOTO" alt="Mrs. Roshna Shrestha" className="w-full h-full object-cover" /> */}
                            </div>
                            <div className="p-8 text-center">
                                <h3 className="text-2xl font-bold text-[#dd3333] mb-2">Mrs. Roshna Shrestha</h3>
                                <p className="text-gray-500 font-semibold mb-4">Co-Founder</p>
                                <p className="text-gray-600">
                                    A visionary entrepreneur with a deep passion for Nepali heritage. Mrs. Shrestha leads with a commitment to quality and a heart for community development, ensuring that every product tells a story of skill and dedication.
                                </p>
                            </div>
                        </div>

                        {/* Founder 2: Mrs. Sujana Paudel */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <div className="bg-gray-200 h-80 w-full flex items-center justify-center">
                                {/* Placeholder for Photo */}
                                <span className="text-gray-500 font-medium">
                                    [Photo: Mrs. Sujana Paudel]
                                </span>
                                {/* Remove the span above and uncomment below when you have the photo */}
                                {/* <img src="URL_TO_SUJANA_PHOTO" alt="Mrs. Sujana Paudel" className="w-full h-full object-cover" /> */}
                            </div>
                            <div className="p-8 text-center">
                                <h3 className="text-2xl font-bold text-[#dd3333] mb-2">Mrs. Sujana Paudel</h3>
                                <p className="text-gray-500 font-semibold mb-4">Co-Founder</p>
                                <p className="text-gray-600">
                                    Bringing innovative business strategies and a global perspective, Mrs. Sujana Paudel plays a pivotal role in expanding RS Craftmandu's reach. Her focus on sustainable business practices drives the company toward a brighter future.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Closing Statement */}
                <div className="text-center mt-16 bg-[#dd3333] text-white p-8 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Made in Nepal. Loved by the World.</h3>
                    <p>Thank you for supporting authentic Nepali craftsmanship.</p>
                </div>

            </div>
        </Layout>
    );
}

export default AboutUS;