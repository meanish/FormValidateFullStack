import React from "react";
import "../styles/CardButton.css";

const CardButton = ({ props }) => {
  return (
    <button>
      <span class="circle1"></span>
      <span class="circle2"></span>
      <span class="circle3"></span>
      <span class="circle4"></span>
      <span class="circle5"></span>
      <span class="text">{props}</span>
    </button>
  );
};

export default CardButton;
