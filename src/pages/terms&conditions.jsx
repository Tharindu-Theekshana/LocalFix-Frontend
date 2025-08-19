import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <div className="bg-blue-50 text-gray-800">
      <Navbar />


      <div className="bg-blue-800 w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] flex flex-col justify-center items-center text-center px-4">
        <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold mt-6">
          Terms & Conditions
        </span>
        <span className="text-white text-sm sm:text-base md:text-lg mt-2">
          Please read these terms and conditions carefully before using LocalFix.
        </span>
      </div>


      <div className="bg-blue-100 w-full py-10 px-4 sm:px-8 md:px-16 lg:px-40 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-900 mb-4">
          Introduction
        </h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Welcome to LocalFix! By accessing or using our website and services,
          you agree to comply with and be bound by the following terms and
          conditions. These terms apply to all users, including customers and
          service providers.
        </p>
      </div>


      <div className="px-4 sm:px-8 md:px-16 lg:px-40 py-10 space-y-10">

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
            Service Overview
          </h2>
          <p className="text-gray-700">
            LocalFix is a platform that connects users with independent,
            verified service providers such as carpenters, electricians,
            plumbers, and more. We do not directly employ or guarantee the
            performance of these professionals.
          </p>
        </div>


        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
            User Responsibilities
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Provide accurate and complete information during registration and booking.</li>
            <li>Respect service providers’ time and commitments.</li>
            <li>Use the platform only for lawful purposes.</li>
            <li>Refrain from abusive or fraudulent behavior.</li>
          </ul>
        </div>


        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
            Service Provider Responsibilities
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Ensure all profile details are accurate and updated.</li>
            <li>Offer services with professionalism, honesty, and reliability.</li>
            <li>Honor bookings and communicate promptly with customers.</li>
            <li>Comply with all applicable local regulations and licensing requirements.</li>
          </ul>
        </div>


        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
            Payments and Fees
          </h2>
          <p className="text-gray-700">
            LocalFix may charge a service fee for bookings made through the
            platform. All payments are handled securely via integrated payment
            gateways. Providers are responsible for any applicable taxes.
          </p>
        </div>


        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
            Cancellation & Refunds
          </h2>
          <p className="text-gray-700">
            Users may cancel bookings under specific conditions. Refund
            eligibility is determined based on service type, provider agreement,
            and timing of the cancellation. LocalFix reserves the right to
            mediate disputes but is not responsible for refunds not authorized
            by the provider.
          </p>
        </div>


        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
            Limitation of Liability
          </h2>
          <p className="text-gray-700">
            LocalFix is not liable for any damages resulting from the actions or
            negligence of service providers. Users agree to use the platform at
            their own risk and acknowledge that LocalFix acts as a facilitator
            only.
          </p>
        </div>


        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
            Changes to Terms
          </h2>
          <p className="text-gray-700">
            We reserve the right to update these terms at any time. Updated
            terms will be posted on this page and effective immediately upon
            publication. Continued use of LocalFix implies acceptance of the
            revised terms.
          </p>
        </div>
      </div>


      <div className="text-center bg-blue-200 py-10 px-4">
        <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 text-sm sm:text-base">
          If you have any questions or concerns about these Terms & Conditions,
          please contact us at:
        </p>
        <div className="mt-6">
          <Link
            to="/Contact"
            className="bg-blue-800 text-white duration-300 hover:bg-blue-900 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold py-3 px-6 sm:px-8 rounded-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
