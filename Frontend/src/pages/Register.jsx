// import { useState } from "react";
// import API from "../api";

// export default function Register() {
//   const [data, setData] = useState({ name:"", email:"", password:"" });

//   const handle = async () => {
//     const res = await API.post("/auth/register", data);
//     alert(res.data.msg);
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <input placeholder="Name" onChange={e=>setData({...data,name:e.target.value})}/>
//       <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
//       <input placeholder="Password" type="password" onChange={e=>setData({...data,password:e.target.value})}/>
//       <button onClick={handle}>Register</button>
//     </div>
//   );
// }

import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handle = async () => {
    try {
      const res = await API.post("/auth/register", data);
      toast.success(res.data.msg || "Registration successful! Check email.");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button
          onClick={handle}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-200"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => (window.location = "/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}