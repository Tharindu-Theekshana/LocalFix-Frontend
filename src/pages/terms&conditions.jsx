import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <div className="bg-blue-50 text-gray-800">
      <Navbar />
      <div className="bg-blue-800 w-[100%] h-[300px] flex flex-col justify-center items-center">
        <span className="text-white text-[45px] font-bold mt-[50px]">Terms & Conditions</span>
        <span className="text-white text-[18px]">Please read these terms and conditions carefully before using LocalFix.</span>
      </div>
        <div className="bg-blue-100 w-[100%] h-[200px] flex flex-col justify-center items-center">
        <div className=" pl-[200px] pr-[200px]">
            <div className="flex justify-center items-center ">
                <h2 className="text-[28px] font-semibold text-blue-900 mb-2 text-center ">Introduction</h2>
          </div>
              
              <p className="mb-8 text-center text-[18px] text-gray-700">
                Welcome to LocalFix! By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions.
                These terms apply to all users, including customers and service providers.
              </p>
        </div>
      </div>
      
      <div className="h-[bg-blue-50] pr-[200px] pl-[200px] pt-[50px] pb-[50px]">
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Service Overview</h2>
            <p>
              LocalFix is a platform that connects users with independent, verified service providers such as carpenters, electricians, plumbers, and more. 
              We do not directly employ or guarantee the performance of these professionals.
            </p>
          </div>

          {/* 3. User Responsibilities */}
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2 mt-[40px]">User Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Provide accurate and complete information during registration and booking.</li>
              <li>Respect service providers’ time and commitments.</li>
              <li>Use the platform only for lawful purposes.</li>
              <li>Refrain from abusive or fraudulent behavior.</li>
            </ul>
          </div>

          {/* 4. Service Provider Responsibilities */}
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2 mt-[40px]">Service Provider Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Ensure all profile details are accurate and updated.</li>
              <li>Offer services with professionalism, honesty, and reliability.</li>
              <li>Honor bookings and communicate promptly with customers.</li>
              <li>Comply with all applicable local regulations and licensing requirements.</li>
            </ul>
          </div>

          {/* 5. Payments and Fees */}
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2 mt-[40px]">Payments and Fees</h2>
            <p>
              LocalFix may charge a service fee for bookings made through the platform. 
              All payments are handled securely via integrated payment gateways. 
              Providers are responsible for any applicable taxes.
            </p>
          </div>

          {/* 6. Cancellation and Refunds */}
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2 mt-[40px]">Cancellation & Refunds</h2>
            <p>
              Users may cancel bookings under specific conditions. Refund eligibility is determined based on service type, provider agreement, and timing of the cancellation.
              LocalFix reserves the right to mediate disputes but is not responsible for refunds not authorized by the provider.
            </p>
          </div>

          {/* 7. Limitation of Liability */}
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2 mt-[40px]">Limitation of Liability</h2>
            <p>
              LocalFix is not liable for any damages resulting from the actions or negligence of service providers.
              Users agree to use the platform at their own risk and acknowledge that LocalFix acts as a facilitator only.
            </p>
          </div>

          {/* 8. Changes to Terms */}
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2 mt-[40px]">Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. Updated terms will be posted on this page and effective immediately upon publication.
              Continued use of LocalFix implies acceptance of the revised terms.
            </p>
          </div>
      </div>

          {/* 9. Contact Information */}
          <div className="text-center pb-[50px] bg-blue-200 pt-[5px]">
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-2 mt-[40px]">Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms & Conditions, please contact us at:
            </p>
            </div>
            
            <button className="mt-[30px]">
              <Link to="/Contact" className="bg-blue-800 text-white duration-300 hover:bg-blue-900 shadow-lg hover:shadow-xl hover:scale-101 font-bold py-3 px-8 rounded-lg">
                        Contact Us
              </Link>
            </button>
          </div>
      <FooterSection />
    </div>
  );
}
