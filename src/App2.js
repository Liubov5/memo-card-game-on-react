import './App.css';
import { useEffect, useState } from 'react';
import { IconReload } from '@tabler/icons-react';
import Card from './components/Card';
import friutItems from "./fruits.json";

function App2() {
  let [fruits, setFruits] = useState([]);
  const [fruitOne, setFruitOne] = useState(null);
  const [fruitTwo, setFruitTwo] = useState(null);

  useEffect(()=> {
    if (fruitOne && fruitTwo) {
      if( fruitOne.src === fruitTwo.src) {
        setFruits(prevFruits => {
          return prevFruits.map(item=> {
            if(item.src === fruitOne.src) {
              return {...item, matched: true};
            }else {
              return item;
            }
          })
        })
      }

      setTimeout(()=>{
        setFruitOne(null)
        setFruitTwo(null)
      },500)
    }
  }, [fruitOne, fruitTwo])

  const resetGame = () => {
    setFruits(prevFruits => {
      return prevFruits.map(item=> {
        if (item.matched) {
          return {...item, matched:false}
        }
        return item;
      })
    })

    setFruitOne(null);
    setFruitTwo(null);

    setTimeout(()=>{
      initGame();
    }, 500)
  }

  const initGame = () => {
    const allFruits = [...friutItems, ...friutItems].sort(()=>Math.random() - .5).map(item=>({...item, id: Math.random()}));
    setFruits(allFruits)
  }

  const chooseCard = (fruit) => {
    fruitOne ? setFruitTwo(fruit) : setFruitOne(fruit)
  }
  return (
    <>
      <h1>Memory Game</h1>
      {
        fruits.length ? <>
          <button className='reset' onClick={resetGame}>
            <IconReload/>
          </button>
          <div className='game-block'>
            {
              fruits.map((fruit, key)=>{
                return <Card chooseCard={chooseCard} flipped={fruit === fruitOne || fruit === fruitTwo || fruit.matched} key={key} fruit={fruit}/>
              })
            }
          </div>
          </> : <button onClick={initGame} className='start-game'>START GAME</button>
      }
    </>
  );
}

export default App2;
