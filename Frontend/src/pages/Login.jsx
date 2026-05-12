// import { useState } from "react";
// import API from "../api";

// export default function Login() {
//   const [step, setStep] = useState(1);
//   const [data, setData] = useState({ email:"", password:"", otp:"" });

//   const login = async () => {
//     await API.post("/auth/login", data);
//     setStep(2);
//   };

//   const verifyOtp = async () => {
//     const res = await API.post("/auth/verify-otp", data);
//     localStorage.setItem("token", res.data.token);
//     window.location = "/dashboard";
//   };

//   return (
//     <div>
//       {step === 1 ? (
//         <>
//           <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
//           <input type="password" placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>
//           <button onClick={login}>Login</button>
//         </>
//       ) : (
//         <>
//           <input placeholder="OTP" onChange={e=>setData({...data,otp:e.target.value})}/>
//           <button onClick={verifyOtp}>Verify OTP</button>
//         </>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ email: "", password: "", otp: "" });

  const login = async () => {
    try {
      await API.post("/auth/login", data);
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await API.post("/auth/verify-otp", data);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      setTimeout(() => {
        window.location = "/dashboard";
      }, 1500);
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          {step === 1 ? "Login" : "Verify OTP"}
        </h2>

        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
            />

            <button
              onClick={login}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={(e) =>
                setData({ ...data, otp: e.target.value })
              }
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
            >
              Verify & Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}   