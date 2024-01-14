import { useState } from "react";

const Card = ({ image, setScore, setGameOn }) => {
  const [clickTracker, setClickTracker] = useState(0)
  
  const handleClick = () => {
    if (clickTracker === 0) {
      setClickTracker(1);
      setScore((prevScore) => prevScore + 1);
    } else {
      setGameOn(false);
    }
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt="" />
    </div>
  )
}

export default Card;