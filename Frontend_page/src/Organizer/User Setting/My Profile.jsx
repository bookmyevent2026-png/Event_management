import { useState } from "react";
import { FaCloudUploadAlt, FaSave } from "react-icons/fa";

const MyProfile = () => {

  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    profileName: "Sakthi",
    contactNumber: "8056897132",
    email: "sakthivelganesan@leitenindia.com",
    address: "ekuksbjhwew",
    country: "INDIA",
    state: "TAMIL NADU",
    city: "CHENNAI"
  });

  const states = {
    INDIA: ["TAMIL NADU", "KERALA", "KARNATAKA"]
  };

  const cities = {
    "TAMIL NADU": ["CHENNAI", "COIMBATORE"],
    "KERALA": ["KOCHI", "TRIVANDRUM"],
    "KARNATAKA": ["BANGALORE", "MYSORE"]
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Profile Saved!");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl text-gray-700">
          My Profile
        </h1>

        <button
          onClick={handleSave}
          className="border p-2 rounded hover:bg-gray-100"
        >
          <FaSave className="text-blue-600 text-xl"/>
        </button>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6">

        {/* PROFILE UPLOAD */}
        <div className="bg-white rounded-lg shadow p-6">

          <h2 className="text-blue-600 text-xl mb-6">
            Profile Upload
          </h2>

          <div className="flex gap-6">

            <label className="border-2 border-dashed w-40 h-40 flex flex-col items-center justify-center rounded-lg text-gray-500 cursor-pointer">

              <FaCloudUploadAlt className="text-3xl mb-2"/>

              <p className="text-center text-sm">
                Profile <br/> Upload
              </p>

              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />

            </label>

            <img
              src={
                profileImage ||
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              }
              className="w-40 h-40 object-cover rounded"
            />

          </div>

          <p className="text-sm text-gray-500 mt-4">
            Supported Files: JPG, PNG, WEBP
          </p>

        </div>

        {/* PROFILE DETAILS */}
        <div className="bg-white rounded-lg shadow p-6">

          <h2 className="text-blue-600 text-xl mb-6">
            Profile Details
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="font-medium">
                Profile Name <span className="text-red-500">*</span>
              </label>

              <input
                name="profileName"
                value={formData.profileName}
                onChange={handleChange}
                className="border w-full p-2 rounded mt-1"
              />

            </div>

            <div>
              <label className="font-medium">
                Contact Number <span className="text-red-500">*</span>
              </label>

              <input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="border w-full p-2 rounded mt-1"
              />

            </div>

            <div className="col-span-2">
              <label className="font-medium">
                Mail ID <span className="text-red-500">*</span>
              </label>

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border w-full p-2 rounded mt-1"
              />

            </div>

          </div>

        </div>

        {/* ADDRESS DETAILS */}
        <div className="bg-white rounded-lg shadow p-6">

          <h2 className="text-blue-600 text-xl mb-6">
            Address Details
          </h2>

          <div className="space-y-4">

            <div>

              <label className="font-medium">
                Address <span className="text-red-500">*</span>
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="border w-full p-2 rounded mt-1"
              />

            </div>

            <div className="grid grid-cols-3 gap-4">

              {/* COUNTRY */}
              <div>

                <label className="font-medium">
                  Country <span className="text-red-500">*</span>
                </label>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border w-full p-2 rounded mt-1"
                >
                  <option>INDIA</option>
                </select>

              </div>

              {/* STATE */}
              <div>

                <label className="font-medium">
                  State <span className="text-red-500">*</span>
                </label>

                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border w-full p-2 rounded mt-1"
                >
                  {states[formData.country].map((state) => (
                    <option key={state}>{state}</option>
                  ))}
                </select>

              </div>

              {/* CITY */}
              <div>

                <label className="font-medium">
                  City <span className="text-red-500">*</span>
                </label>

                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border w-full p-2 rounded mt-1"
                >
                  {cities[formData.state].map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MyProfile;