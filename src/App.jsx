import { useEffect, useState } from "react";
import Card from "./components/Card";

const shuffleArr = (arr) => {
  const chosenIndexes = new Set();
  const newArr = [];

  while (arr.length !== newArr.length) {
    const rand = Math.floor(Math.random() * arr.length);

    if (!chosenIndexes.has(rand)) {
      newArr.push(arr[rand]);
      chosenIndexes.add(rand);
    }
  }

  return newArr;
}

const App = () => {
  const [images, setImages] = useState([]);
  const [gameOn, setGameOn] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const { data } = await response.json();

      const shuffledMemes = shuffleArr(data.memes)
      const images = [];

      for (let i = 0; i < 9; i++) {
        const { id, url } = shuffledMemes[i];
        images.push({ id, url });
      }

      setImages(images);
    }

    if (gameOn) fetchData();
  }, [gameOn]);

  useEffect(() => {
    if (score !== 0) {
      setImages((prevImages) => shuffleArr(prevImages));
    }
  }, [score]);

  useEffect(() => {
    if (!gameOn) {
      if (score > bestScore) {
        setBestScore(score);
      } 

      setScore(0);
      setGameOn(true);
    }
  }, [gameOn, score, bestScore]);

  useEffect(() => {
    const cards = images.map(({ id, url }) => (
      <Card key={id} image={url} setGameOn={setGameOn} setScore={setScore} />
    ));

    setCards(cards);
  }, [images]);

  return (
    <>
      <header>
        <h1>Memory Game</h1>
        <div className="score-display">
          <div className="current-score">Score: {score}</div>
          <div className="best-score">Best Score: {bestScore}</div>
        </div>
      </header>

      <main>
        <p className="description">Get points by clicking on an image but don&apos;t click on any more than once!</p>

        <div className="cards">{cards}</div>
      </main>
    </>
  );
};

export default App;
