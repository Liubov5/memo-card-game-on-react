import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, resetState, resetStatus, setCurrentCard, setMatched, setPreviousCard, setStatus } from './store/cardsSlice';
import Card from './components/Card';
import { IconRefresh } from '@tabler/icons-react';


const App = () => {
  const dispatch = useDispatch();
  const cards = useSelector(({cards})=>cards);
  
  const handleClick = (index) => {
      dispatch(setStatus(index)); //здесь меняется статус, чтобы картинка перевернулась
      cards.previousCard === null  ? dispatch(setPreviousCard(index)) : dispatch(setCurrentCard(index)); //здесь устанавливаются предыдущая и настоящая карта
  }

  //проверка на мэтч
  useEffect(()=>{
    if(cards.previousCard && cards.currentCard) { //если оба заполнены
      if(cards.previousCard.id === cards.currentCard.id) { //если оба похожи
        setTimeout(()=>{
          dispatch(setMatched(cards.previousCard.id)); //устанавливаем метч  
        }, 1000)
      }else{ //no match, должны закрыться обратно
        setTimeout(()=>{
          dispatch(resetStatus({previousId:cards.previousCard.id, currentId:cards.currentCard.id}))
        }, 1000) 
      }
      dispatch(setCurrentCard(null));
      dispatch(setPreviousCard(null));     
    }

    if(cards.final_count === 8) {
      alert("Вы победили игра закончена!");
    }
  }, [cards.previousCard, cards.currentCard, cards.final_count]);


  useEffect(()=>{
    dispatch(fetchImages())
  },[])

  const resetGame = () => {
    dispatch(fetchImages());
    dispatch(resetState());
    dispatch(setCurrentCard(null));
    dispatch(setPreviousCard(null));

  }
  return (
    <>
      <div className='container'>
        <section className='reset'>
            <IconRefresh onClick={resetGame}/>
        </section>
        {cards.gameItems.map((item, index)=><Card  key={index} src={item.image} index={index} handleClick={handleClick} status={item.status} matched={item.matched}/>)}
      </div>
     
    </>
  )
}

export default App