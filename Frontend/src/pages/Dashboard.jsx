// export default function Dashboard() {
//   const token = localStorage.getItem("token");

//   if (!token) return <h2>Please Login</h2>;

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Welcome! You are logged in for 30 minutes.</p>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

  const [activeTab, setActiveTab] = useState("profile");

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  const token = localStorage.getItem("token");

  // 🧑 PROFILE FETCH
  const getProfile = async () => {
    try {
      const res = await API.get("/user/profile", {
        headers: { Authorization: token }
      });

      setUser(res.data);
      setForm({ name: res.data.name, email: res.data.email });
    } catch {
      toast.error("Session expired");
      localStorage.removeItem("token");
      window.location = "/login";
    }
  };

  useEffect(() => {
    if (!token) window.location = "/login";
    else getProfile();
  }, []);

  // ✏️ UPDATE PROFILE
  const updateProfile = async () => {
    try {
      const res = await API.put("/user/update", form, {
        headers: { Authorization: token }
      });

      setUser(res.data);
      setEdit(false);
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  // 🖼️ UPLOAD IMAGE
  const uploadImage = async () => {
    if (!file) return toast.error("Select image");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await API.post("/user/upload", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      });

      setUser(res.data);
      toast.success("Image updated");
    } catch {
      toast.error("Upload failed");
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    window.location = "/login";
  };

  // 🛒 DEMO PRODUCTS
  const products = [
    { id: 1, name: "iPhone 15", price: "Rs.120,000", 
        img: "https://www.logicainfoway.com/wp-content/uploads/2024/03/004.jpg" },
    { id: 2, name: "MacBook Pro", price: "Rs.250,000", 
        img: "https://i.ebayimg.com/images/g/EGUAAOSwSWhjxdjA/s-l1200.jpg" },
    { id: 3, name: "Nike Shoes", price: "Rs.12,000", 
        img: "https://static.nike.com/a/images/f_auto,cs_srgb/w_960,c_limit/5b1a9ccf-1ec8-4e62-958f-5f301b9e851f/what-are-the-best-nike-basketball-shoes.jpg" },
    { id: 4, name: "Headphones", price: "Rs.5,000", 
        img: "https://img.drz.lazcdn.com/static/np/p/50f9f56fdc8981e775704eb3ef20cf39.jpg_720x720q80.jpg" }
  ];

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-5">

        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          My Dashboard
        </h1>

        <ul className="space-y-4 text-gray-600 font-medium">

          <li
            onClick={() => setActiveTab("profile")}
            className={`cursor-pointer hover:text-blue-500 ${
              activeTab === "profile" && "text-blue-600 font-bold"
            }`}
          >
            🧑 Profile
          </li>

          <li
            onClick={() => setActiveTab("products")}
            className={`cursor-pointer hover:text-blue-500 ${
              activeTab === "products" && "text-blue-600 font-bold"
            }`}
          >
            🛒 Products
          </li>

          <li
            onClick={() => setActiveTab("settings")}
            className={`cursor-pointer hover:text-blue-500 ${
              activeTab === "settings" && "text-blue-600 font-bold"
            }`}
          >
            ⚙️ Settings
          </li>

          <li
            onClick={logout}
            className="cursor-pointer text-red-500 hover:text-red-700"
          >
            🚪 Logout
          </li>
        </ul>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="bg-white shadow p-4 rounded-lg flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Welcome {user.name}</h2>
          <span className="text-gray-500">{user.email}</span>
        </div>

        {/* ================= PROFILE ================= */}
        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-2xl shadow max-w-md">

            {/* IMAGE */}
            <div className="flex flex-col items-center">
              <img
                src={
                  user.profilePic
                    ? `http://localhost:5000/uploads/${user.profilePic}`
                    : "https://via.placeholder.com/100"
                }
                className="w-24 h-24 rounded-full border mb-3"
              />

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <button
                onClick={uploadImage}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Upload
              </button>
            </div>

            {/* DETAILS */}
            <div className="mt-5 text-center">

              {edit ? (
                <>
                  <input
                    className="border p-2 w-full mb-2"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />

                  <input
                    className="border p-2 w-full mb-3"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />

                  <button
                    onClick={updateProfile}
                    className="bg-green-500 text-white px-4 py-2 w-full"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>

                  <button
                    onClick={() => setEdit(true)}
                    className="mt-3 bg-yellow-500 text-white px-4 py-2 w-full"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* ================= PRODUCTS ================= */}
        {activeTab === "products" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                >
                  <img
                    src={p.img}
                    className="w-full h-40 object-cover rounded"
                  />

                  <h3 className="font-bold mt-2">{p.name}</h3>
                  <p className="text-gray-500">{p.price}</p>

                  <button className="mt-2 bg-blue-500 text-white w-full py-1 rounded">
                    Add to Cart
                  </button>
                </div>
              ))}

            </div>
          </div>
        )}

        {/* ================= SETTINGS ================= */}
        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-xl shadow max-w-md">

            <h2 className="text-xl font-bold mb-4">Settings</h2>

            <p className="text-gray-600 mb-3">
              Account Settings
            </p>

            <button className="bg-red-500 text-white px-4 py-2 rounded w-full">
              Delete Account
            </button>

            <button
              onClick={logout}
              className="mt-3 bg-gray-800 text-white px-4 py-2 rounded w-full"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
