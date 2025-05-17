import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast, { Toaster } from "react-hot-toast";
import Card from "./Card";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const notify = () => toast("User update successfull");
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      notify();
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-around items-center">
      <div className="flex justify-center my-5">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <div>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Photo</legend>
                <input
                  type="text"
                  value={photoUrl}
                  className="input"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  value={age}
                  className="input"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  value={gender}
                  className="input"
                  onChange={(e) => setGender(e.target.value.toLowerCase())}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  value={about}
                  className="input"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>

            <div className="card-actions justify-center mt-2 flex flex-col items-center">
              <p className="text-red-500">{error}</p>
              <button className="btn btn-primary" onClick={() => saveProfile()}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Card user={{ firstName, lastName, age, gender, photoUrl, about }} />
      </div>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "green",
          },
          duration: 2000,
        }}
      />
    </div>
  );
};

export default EditProfile;
