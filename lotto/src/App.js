import LottoBall from "./LottoBall";
import Lottery from "./Lottery";

function App() {
  return (
    <div className="App">
      <Lottery lottoType='Megaball' maxNum={40} numBalls={8} />
      <Lottery lottoType='Mini Daily' maxNum={10} numBalls={4} />
    </div>
  );
}

export default App;
