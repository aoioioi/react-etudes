import React, { useState } from 'react';
import LottoBall from './LottoBall';
import './Lottery.css';

function Lottery(props) {
  const lottoConfig = {
    title: props.lottoType,
    numBalls: props.numBalls,
    maxNum: props.maxNum
  }

  let arr = Array.from({ length: lottoConfig.numBalls });
  const [nums, setNums] = useState(arr);
  console.log(nums);

  function generate() {
    let arr1 = Array.from({ length: 3 });
    setNums(nums.map(n => Math.floor(Math.random() * lottoConfig.maxNum) + 1));
  }

  function handleClick() {
    generate();
  }

  return (
    <div className="Lottery">
      <h1>{lottoConfig.title}</h1>
      <div>
        {nums.map(n => (
          <LottoBall num={n} />
        ))}
      </div>
      <button onClick={handleClick}>Get Winning Numbers</button>
    </div>
  );
}

export default Lottery;