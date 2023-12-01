import React from "react";
import { useGetLeaveQuery } from "../Features/apiSlice";

const ShowData = () => {
  const { data, isLoading, error } = useGetLeaveQuery();
  console.log(data);
  return (
    <div>
      <h1>hello show data </h1>
    </div>
  );
};

export default ShowData;
