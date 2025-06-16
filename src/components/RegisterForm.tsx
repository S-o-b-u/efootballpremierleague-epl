"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import confetti from "canvas-confetti";
import {
  User,
  Phone,
  Users,
  Calendar,
  CreditCard,
  QrCode,
  Image,
} from "lucide-react";

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
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [showWhatsAppButton, setShowWhatsAppButton] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Drag and Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setStatusMessage("File size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setStatusMessage("Please upload an image file");
        return;
      }
      setScreenshotFile(file);
    }
  };

  // Input Handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "age" && isNaN(Number(value))) {
      return;
    }
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setStatusMessage("File size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setStatusMessage("Please upload an image file");
        return;
      }
      setScreenshotFile(file);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatusMessage("");
    try {
      if (!screenshotFile) {
        setStatusMessage("Please upload a screenshot.");
        setIsSubmitting(false);
        return;
      }
      if (
        !formData.name ||
        !formData.phoneNumber ||
        !formData.collectiveStrength ||
        !formData.age ||
        !formData.paymentStatus
      ) {
        setStatusMessage("Please fill in all fields.");
        setIsSubmitting(false);
        return;
      }
      if (Number(formData.age) < 13) {
        setStatusMessage("You must be at least 13 years old to register.");
        setIsSubmitting(false);
        return;
      }
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        payload.append(key, value)
      );
      payload.append("screenshot", screenshotFile);
      payload.append("timestamp", new Date().toISOString());
      const res = await fetch("/api/upload-screenshot", {
        method: "POST",
        body: payload,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit form");
      }
      await res.json();
      handleConfetti();
      setStatusMessage("Registration successful! Screenshot uploaded.");
      setFormData({
        name: "",
        phoneNumber: "",
        collectiveStrength: "",
        age: "",
        paymentStatus: "",
      });
      setScreenshotFile(null);
      setShowWhatsAppButton(true);
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setStatusMessage(
        `Error: ${
          error instanceof Error
            ? error.message
            : "An error occurred while submitting."
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confetti Animation
  const handleConfetti = () => {
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
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });
      requestAnimationFrame(frame);
    };
    frame();
  };

  // Payment Handler
  const handlePayment = () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href =
        "upi://pay?pa=trishandewanji69x-3@okaxis&pn=Trishan&tn=Payment%20for%20Registration&am=30.00&cu=INR";
    } else {
      alert(
        "Please use a mobile device to make the payment or you can scan the QR"
      );
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease;
        }
        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
      <div className="h-full flex w-full items-center justify-center mt-10 relative overflow-hidden py-8">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative">
         
          <div className="grid top-[4vh] md:top-[5vh] mb-10 md:mb-5 grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {/* Registration Form */}
            <div className=" backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-teal-500/30 hover:border-teal-400/50 transition-all relative overflow-auto hover:shadow-teal-500/10 group">

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-teal-200 to-teal-300 animate-gradient">
                Player Registration
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-5 relative z-10"
                encType="multipart/form-data"
              >
                <div className="space-y-5">
                  {[
                    {
                      icon: User,
                      name: "name",
                      placeholder: "Full Name",
                      type: "text",
                      hint: "Enter your full name as per official documents",
                    },
                    {
                      icon: Phone,
                      name: "phoneNumber",
                      placeholder: "Phone Number",
                      type: "tel",
                      hint: "Enter your active WhatsApp number",
                    },
                    {
                      icon: Users,
                      name: "collectiveStrength",
                      placeholder: "Collective Strength",
                      type: "text",
                      hint: "Enter your FIFA team's overall rating",
                    },
                    {
                      icon: Calendar,
                      name: "age",
                      placeholder: "Age",
                      type: "number",
                      hint: "Must be 13 years or older",
                    },
                    {
                      icon: CreditCard,
                      name: "paymentStatus",
                      placeholder: "Payment Status",
                      type: "text",
                      hint: "Enter 'Paid' after completing payment",
                    },
                  ].map(({ icon: Icon, name, placeholder, type, hint }) => (
                    <div key={name} className="relative group">
                      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 h-5 w-5 transition-all group-hover:scale-110" />
                      <input
                        type={type}
                        name={name}
                        value={formData[name as keyof FormData]}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        required
                        min={undefined}
                        className="w-full pl-12 pr-4 py-3 bg-black/30 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-400 transition-all hover:border-teal-500/50 focus:bg-black/40 backdrop-blur-sm hover:shadow-inner"
                      />
                      {/* <span className="absolute top-[5.5vh] md:top-[7.5vh] left-1 text-xs text-lime-100 opacity-0 group-hover:opacity-100 transition-opacity">
                        {hint}
                      </span> */}
                    </div>
                  ))}
                </div>
                <div className="relative group mt-4">
                  <label
                    htmlFor="screenshot-upload"
                    className="block text-sm font-medium text-teal-200 mb-2"
                  >
                    Upload Payment Screenshot
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-4 transition-all backdrop-blur-sm flex items-center ${
                      dragActive
                        ? "border-teal-400 bg-teal-400/10"
                        : "border-teal-500/30 hover:border-teal-500/50 hover:bg-black/30"
                    }`}
                  >
                    <Image className="mr-3 text-teal-400 h-5 w-5" />
                    <input
                      id="screenshot-upload"
                      type="file"
                      name="screenshot"
                      accept="image/*"
                      required
                      onChange={handleFileChange}
                      className="w-full bg-transparent text-white cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600 transition-all"
                    />
                  </div>
                  {screenshotFile && (
                    <p className="mt-2 text-xs text-teal-300">
                      Selected file: {screenshotFile.name}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 text-white bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500 rounded-lg hover:from-teal-600 hover:via-teal-500 hover:to-teal-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all relative group overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-teal-500/20 active:scale-[0.98]"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400 to-teal-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  <span className="relative">
                    {isSubmitting ? "Registering..." : "Register Now"}
                  </span>
                </button>
              </form>
              {statusMessage && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    statusMessage.includes("Error")
                      ? "bg-red-500/20 text-red-200 border border-red-500/30"
                      : "bg-teal-500/20 text-teal-200 border border-teal-500/30"
                  } animate-fadeIn`}
                >
                  {statusMessage}
                </div>
              )}
              {showWhatsAppButton && (
                <div className="mt-4 animate-slideUp">
                  <button
                    onClick={() =>
                      window.open(
                        "https://chat.whatsapp.com/Eb15asRKysA1HR8hMML43J",
                        "_blank"
                      )
                    }
                    className="w-full py-3 px-6 text-white bg-green-500 rounded-lg hover:bg-green-600 font-medium transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2.29 22l4.17-1.59C7.88 21.44 9.87 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.58-.56-5.02-1.52l-3.38 1.29 1.29-3.38C3.56 15.58 3 13.85 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z" />
                    </svg>
                    Join Our WhatsApp Group
                  </button>
                </div>
              )}
            </div>
            {/* Payment Details */}
            <div className="backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-teal-500/30 hover:border-teal-400/50 transition-all flex flex-col justify-center items-center relative overflow-auto hover:shadow-teal-500/10 group">
              <div className="absolute inset-0 bg-gradient-to-tl from-teal-500/10 via-teal-500/5 to-transparent pointer-events-none opacity-75 group-hover:animate-pulse"></div>
              <div className="text-center mb-6 relative z-10 animate-float">
                <QrCode className="w-12 h-12 text-teal-400 mx-auto mb-4 animate-pulse hover:scale-110 transition-transform" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-teal-200 to-teal-300 animate-gradient">
                  Payment Details
                </h2>
                <p className="text-gray-300 text-sm md:text-base hover:text-teal-200 transition-colors">
                  Scan the QR code to complete your payment
                </p>
                <p className="text-teal-400 text-lg font-semibold mt-2">
                  Registration Fee: ₹30
                </p>
              </div>
              <div className="space-y-6 flex-grow">
                <div className="bg-gradient-to-br from-white to-gray-100 p-2 rounded-xl shadow-2xl w-full max-w-[240px] sm:max-w-[280px] mx-auto relative z-10 transform hover:scale-[1.02] transition-all group hover:shadow-teal-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  <img
                    src="./images/qr.png"
                    alt="Payment QR Code"
                    className="w-full aspect-square object-contain rounded-lg"
                  />
                </div>
                <button
                  onClick={handlePayment}
                  type="button"
                  className="w-full py-3 px-6 text-white bg-teal-600 rounded-lg hover:bg-teal-700 font-medium transition-all mt-2"
                >
                  Pay via UPI (Mobile Only)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
