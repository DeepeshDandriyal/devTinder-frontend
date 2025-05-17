import React from "react";

const Card = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm p-2">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        {about && <p>{about}</p>}
      </div>
    </div>
  );
};

export default Card;
