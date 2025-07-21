import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosConstruct, IoMdTime, IoMdPricetag } from "react-icons/io";
import { Link } from "react-router-dom";

export default function AboutUs() {
    const teamMembers = [
        {
            name: "E.M.T Theekshana",
            role: "Team Leader",
            skills: "Full Stack Developer",
            img: "src/imgs/Theekshana.png"
        },
        {
            name: "M. D Isuru Pramod",
            role: "Frontend Developer",
            skills: "React Specialist",
            img: "src/imgs/Isuru.png"
        },
        {
            name: "W.A. Yasindu Hansaja",
            role: "UI/UX Designer",
            skills: "User Experience",
            img: "src/imgs/Yasindu.png"
        },
        {
            name: "H. Kaveesha Sulakshana",
            role: "Frontend Developer",
            skills: "Responsive Design",
            img: "src/imgs/Kaveesha.png"
        },
        {
            name: "Manuthi Rivithma",
            role: "Quality Assurance",
            skills: "Testing Specialist",
            img: "src/imgs/Manuthi.png"
        }
    ];

    return (
        <div className="bg-blue-50 min-h-screen">
            <Navbar />
            
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-[30px]">About LocalFix</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 font-light">
                        Connecting you with trusted professionals for all your home service needs in Sri Lanka
                    </p>
                    <div className="mt-10">
                    <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-16 container mx-auto px-4">
    <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 relative inline-block">
                            <span className="relative z-10">Revolutionizing Home Services</span>
                            <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-200 opacity-50 -z-0" style={{bottom: '5px'}}></span>
                        </h2>
                        <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                            At LocalFix, we're revolutionizing how Sri Lankans find and book skilled service providers. 
                            Whether you need a plumber, carpenter, mason, or electrician, our platform ensures you 
                            connect with verified professionals who deliver quality work.
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-12 hover:shadow-xl w duration-300  hover:scale-103 items-center justify-center flex flex-col">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Why We Started</h2>
                        <p className="text-gray-700 mb-4 space-y-4 text-lg text-center mt-[20px]">
                            Finding reliable help for home repairs shouldn't be stressful. Yet many face challenges with 
                            unverified workers, unclear pricing, and no-show appointments.
                        </p>
                        <p className="text-gray-700 space-y-4 text-lg text-center">
                            LocalFix was born to bring transparency, convenience, and trust to home services. Every professional 
                            on our platform is background-checked, customer-reviewed, and committed to excellence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className="py-12 bg-blue-100">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                                <IoIosConstruct />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-center">Verified Professionals</h3>
                            <p className="text-gray-600 text-center">
                                Every service provider undergoes rigorous verification and background checks.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                                <IoMdPricetag />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-center">Transparent Pricing</h3>
                            <p className="text-gray-600 text-center">
                                No hidden costs. Get fair, upfront pricing before booking any service.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                                <IoMdTime />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-center">On-Time Guarantee</h3>
                            <p className="text-gray-600 text-center">
                                Professionals arrive when promised or your service is discounted.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission/Vision Section */}
            <section className="py-16 container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 hover:shadow-xl hover:scale-103 duration-300">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Mission</h2>
                        <p className="text-gray-700">
                            To empower Sri Lankan households and businesses by connecting them with dependable, 
                            verified service professionals through an intuitive digital platform.
                        </p>
                    </div>
                    
                    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 hover:shadow-xl hover:scale-103 duration-300">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Vision</h2>
                        <p className="text-gray-700">
                            To become Sri Lanka's most trusted service marketplace, setting the standard for 
                            quality and reliability in skilled trades from minor fixes to major renovations.
                        </p>
                    </div>
                    
                    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 hover:shadow-xl hover:scale-103 duration-300">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Promise</h2>
                        <p className="text-gray-700">
                            Quality service, transparent pricing, and skilled professionals every single time. 
                            Your satisfaction is the foundation of our business.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-blue-900 mb-4">Meet Our Team</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We're a passionate group of professionals dedicated to improving Sri Lanka's home services industry.
                        </p>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg duration-300  hover:scale-105">
                                <div className="p-4 flex justify-center">
                                    <div className="h-32 w-32 rounded-full bg-blue-100 border-4 border-blue-200 overflow-hidden">
                                        <img src={member.img} alt={member.name} className="h-full w-full object-cover" />
                                    </div>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                                    <p className="text-blue-600 font-medium">{member.role}</p>
                                    <p className="text-sm text-gray-500 mt-1">{member.skills}</p>
                                    
                                    <div className="flex justify-center gap-3 mt-4">
                                        <a href="#" className="text-blue-600 hover:text-blue-800">
                                            <FaFacebook className="text-lg" />
                                        </a>
                                        <a href="#" className="text-gray-600 hover:text-gray-800">
                                            <MdEmail className="text-lg" />
                                        </a>
                                        <a href="#" className="text-gray-800 hover:text-black">
                                            <FaGithub className="text-lg" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-blue-500 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Experience LocalFix?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust us for their home service needs.
                    </p>
                    <button className="  duration-300 active:scale-100 hover:shadow-md hover:scale-105"><Link to="/" className="bg-white text-blue-700 hover:bg-red-700 duration-300 hover:text-white font-bold py-3 px-8 rounded-lg">
                        Book a Service Now
                    </Link></button>
                    
                </div>
            </section>

            <FooterSection />
        </div>
    )
}