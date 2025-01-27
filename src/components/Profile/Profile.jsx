import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = (data) => {
    setProfileData(data);
    setIsEditing(false);
  };

  const handleEdit = () => {
    reset(profileData);
    setIsEditing(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile Page</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-lg">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-lg">Email</label>
            <input
              type="email"
              {...register("email", { 
                required: "Email is required", 
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address" }
              })}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-lg">Mobile Number</label>
            <input
              type="text"
              {...register("mobile", { 
                required: "Mobile number is required", 
                pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10 digit mobile number" } 
              })}
              placeholder="Enter your mobile number"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
          </div>

          <div>
            <label className="block text-lg">Age</label>
            <input
              type="number"
              {...register("age", { required: "Age is required", min: 1, max: 120 })}
              placeholder="Enter your age"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>

          <div>
            <label className="block text-lg">Blood Group</label>
            <select {...register("bloodGroup", { required: "Blood group is required" })} className="w-full p-3 border border-gray-300 rounded-md">
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>}
          </div>

          <div>
            <label className="block text-lg">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: "Date of Birth is required" })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          <div>
            <label className="block text-lg">Gender</label>
            <div className="space-x-4">
              <label>
                <input type="radio" value="Male" {...register("gender", { required: "Gender is required" })} className="mr-2" /> Male
              </label>
              <label>
                <input type="radio" value="Female" {...register("gender")} className="mr-2" /> Female
              </label>
              <label>
                <input type="radio" value="Other" {...register("gender")} className="mr-2" /> Other
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          <div>
            <label className="block text-lg">Weight</label>
            <input
              type="number"
              {...register("weight", { required: "Weight is required", min: 1 })}
              placeholder="Enter your weight"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
          </div>

          <div>
            <label className="block text-lg">Height</label>
            <input
              type="number"
              {...register("height", { required: "Height is required", min: 1 })}
              placeholder="Enter your height"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
          </div>

          <div>
            <label className="block text-lg">Diseases</label>
            <textarea
              {...register("diseases")}
              placeholder="Enter any diseases you have"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-lg">Emergency Contact Name</label>
            <input
              type="text"
              {...register("emergencyContactName", { required: "Emergency contact name is required" })}
              placeholder="Enter emergency contact name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.emergencyContactName && <p className="text-red-500 text-sm">{errors.emergencyContactName.message}</p>}
          </div>

          <div>
            <label className="block text-lg">Emergency Contact Mobile</label>
            <input
              type="text"
              {...register("emergencyContactMobile", { required: "Emergency contact mobile is required", pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10 digit mobile number" } })}
              placeholder="Enter emergency contact mobile"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.emergencyContactMobile && <p className="text-red-500 text-sm">{errors.emergencyContactMobile.message}</p>}
          </div>

          <div>
            <label className="block text-lg">Address</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              placeholder="Enter your address"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600">Save Profile</button>
        </form>
      ) : (
        <div className="space-y-4 bg-gray-100 p-6 rounded-md border">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <p><strong>Name:</strong> {profileData?.name}</p>
          <p><strong>Email:</strong> {profileData?.email}</p>
          <p><strong>Mobile:</strong> {profileData?.mobile}</p>
          <p><strong>Age:</strong> {profileData?.age}</p>
          <p><strong>Blood Group:</strong> {profileData?.bloodGroup}</p>
          <p><strong>Date of Birth:</strong> {profileData?.dob}</p>
          <p><strong>Gender:</strong> {profileData?.gender}</p>
          <p><strong>Weight:</strong> {profileData?.weight}</p>
          <p><strong>Height:</strong> {profileData?.height}</p>
          <p><strong>Diseases:</strong> {profileData?.diseases}</p>
          <p><strong>Emergency Contact Name:</strong> {profileData?.emergencyContactName}</p>
          <p><strong>Emergency Contact Mobile:</strong> {profileData?.emergencyContactMobile}</p>
          <p><strong>Address:</strong> {profileData?.address}</p>
          <button onClick={handleEdit} className="w-full p-3 bg-green-500 text-white rounded-md mt-4 hover:bg-green-600">Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
