import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

import Card from "../components/Card";
const Connections = () => {
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const connections = useSelector((store) => store.connections);

  if (!connections) return;
  if (connections.length === 0) return <h1>No connections found</h1>;

  return (
    connections && (
      <div className="">
        <h1 className="text-2xl font-bold text-center my-10">Connections</h1>
        <div className="flex gap-5 items-center flex-wrap justify-center md:justify-start">
          {connections.map((user, index) => {
            return <Card user={user} key={index} />;
          })}
        </div>
      </div>
    )
  );
};

export default Connections;
