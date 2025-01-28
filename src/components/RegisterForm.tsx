"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import confetti from "canvas-confetti";
import { User, Phone, Users, Calendar, CreditCard, QrCode } from "lucide-react";

interface FormData {
  name: string;
  phoneNumber: string;
  collectiveStrength: string;
  age: string;
  paymentStatus: string;
}

const RegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    collectiveStrength: "",
    age: "",
    paymentStatus: "",
  });

  const [statusMessage, setStatusMessage] = useState<string>("");
  const [showWhatsAppButton, setShowWhatsAppButton] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Disable the button to prevent multiple submissions
    const submitButton = e.currentTarget.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.setAttribute('disabled', 'true');
    }

    handleClick(); // Trigger confetti on submit

    try {
      const res = await fetch("/api/test-sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage(
          "Registration successful! Please complete the payment."
        );
        // Clear form fields
        setFormData({
          name: "",
          phoneNumber: "",
          collectiveStrength: "",
          age: "",
          paymentStatus: "",
        });
      } else {
        setStatusMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setStatusMessage(`Error: ${error.message}`);
      } else {
        setStatusMessage("An unknown error occurred.");
      }
    } finally {
      // Re-enable the button after the request is complete
      if (submitButton) {
        submitButton.removeAttribute('disabled');
      }
    }
    
    // Add this line to show the WhatsApp button after successful registration
    setShowWhatsAppButton(true); 
  };

  const handleClick = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#4CAF50", "#008080", "#20B2AA", "#008080"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div className="min-h-screen mt-10 bg-transparent relative overflow-hidden">
      {/* Content */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Registration Form */}
          <div className="bg-black/40 backdrop-blur-xl flex flex-col justify-center  rounded-2xl p-8 shadow-xl border border-teal-500/20">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Player Registration
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 h-5 w-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-black/20 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 h-5 w-5" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-black/20 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>

                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 h-5 w-5" />
                  <input
                    type="text"
                    name="collectiveStrength"
                    value={formData.collectiveStrength}
                    onChange={handleInputChange}
                    placeholder="Collective Strength"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-black/20 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 h-5 w-5" />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-black/20 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>

                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 h-5 w-5" />
                  <input
                    type="text"
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleInputChange}
                    placeholder="Payment Status"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-black/20 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 text-white bg-gradient-to-r from-teal-500 to-teal-400 rounded-lg hover:from-teal-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium"
              >
                Register Now
              </button>
            </form>

            {statusMessage && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  statusMessage.includes("Error")
                    ? "bg-red-500/20 text-red-200"
                    : "bg-teal-500/20 text-teal-200"
                }`}
              >
                {statusMessage}
              </div>
            )}
            
            {/* Add WhatsApp button here */}
            {showWhatsAppButton && (
              <div className="mt-4">
                <button
                  onClick={() => window.open("https://chat.whatsapp.com/Ep8tPP3Ys6NL8bLjIp3ZGk", "_blank")}
                  className="w-full py-3 px-6 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium"
                >
                  Join Our WhatsApp Group
                </button>
              </div>
            )}
          </div>

          {/* Payment QR Section */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-teal-500/20 flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              <QrCode className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Payment Details
              </h2>
              <p className="text-gray-300 mb-2">
                Scan the QR code to complete your payment
              </p>
            </div>
           
            {/* Example QR Code - Replace with your actual QR code */}
            <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
              <img
                src="./images/qr.jpeg"
                alt="Payment QR Code"
                className="w-64 h-64 object-cover"
              />
            </div>
            <div className="text-center mb-5">
              <button
                onClick={() => {
                  if (/Mobi|Android/i.test(navigator.userAgent)) {
                    window.location.href =
                      "upi://pay?pa=snehasishsaha552-1@oksbi&pn=Snehasish&mc=Snehasish&tid=1234567890&tr=uniqueReferenceId&tn=Payment%20for%20Registration&am=40.00&cu=INR";
                  } else {
                    alert(
                      "Please use a mobile device to make the payment or you can scan the QR"
                    );
                  }
                }}
                className="w-full py-3 px-6 text-white bg-gradient-to-r from-teal-500 to-teal-400 rounded-lg hover:from-teal-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium"
              >
                Pay Now
              </button>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-white mb-2">
                Registration Fee: ₹40/-
              </p>
              <p className="text-sm text-gray-300">
                After payment, please take a screenshot for your records
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
