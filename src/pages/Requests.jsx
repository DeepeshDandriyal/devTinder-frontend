import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const reviewRequests = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/recieved",

        {
          withCredentials: true,
        }
      );

      dispatch(addRequests(res.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const requests = useSelector((store) => store.requests);
  if (!requests) return;
  if (requests.length === 0) return <h1>No request found</h1>;

  return (
    <div>
      <h1 className="text-center my-10 font-bold text-xl lg:text-3xl">
        Requests
      </h1>
      <div className="flex gap-10 items-center flex-wrap justify-center md:justify-start">
        {requests.map((data, index) => {
          return (
            <div className="flex flex-col gap-2" key={index}>
              <Card user={data?.fromUserId} />
              <div className="flex justify-center gap-2 items-center">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    reviewRequests("rejected", data._id);
                  }}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    reviewRequests("accepted", data._id);
                  }}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
