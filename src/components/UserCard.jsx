import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, _id } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      //send req
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      //remove this card from feed and show next card
      //dispatch action to remove this user from feed
      dispatch(removeUser(userId));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm p-2">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions  flex gap-5 ">
          <button
            className="btn btn-primary "
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
