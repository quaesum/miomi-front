import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { ServiceCard } from "./ServiceCard";


export const Service = ({ services, baseURL }) => {
  const navigate = useNavigate();

  const handleServiceClick = (id) => {
    navigate(`/services/${id}`);
  };  


  const serviceElements = services.map((el) => (
    <ServiceCard
      key={el.id}
      {...el}
      photo={`${baseURL}${el.images[0]}`}
      handleServiceClick={handleServiceClick}
    />
  ));

  return <div className="grid grid-col-1">{serviceElements}</div>;
};
