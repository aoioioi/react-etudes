import React from 'react';
import './LottoBall.css';

function LottoBall(props) {
  return (
    <div className="Ball">{props.num}</div>
  );
}

export default LottoBall;