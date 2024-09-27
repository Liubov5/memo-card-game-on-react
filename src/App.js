import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, resetStatus, setCurrentCard, setMatched, setPreviousCard, setStatus } from './store/cardsSlice';
import Card from './components/Card';

const App = () => {
  const dispatch = useDispatch();
  const cards = useSelector(({cards})=>cards);
  
  const handleClick = (index) => {
      dispatch(setStatus(index));
      cards.previousCard === null  ? dispatch(setPreviousCard(index)) : dispatch(setCurrentCard(index));
  }

  //проверка на мэтч
  useEffect(()=>{
    if(cards.previousCard && cards.currentCard) {
      if(cards.previousCard.id === cards.currentCard.id) {
        dispatch(setMatched(cards.previousCard.id));
        dispatch(resetStatus(cards.previousCard.id))
        console.log("match");
      }else{
        console.log("no match")
      }

      dispatch(setCurrentCard(null));
      dispatch(setPreviousCard(null));
      
    }
  }, [cards.previousCard, cards.currentCard]);

  useEffect(()=>{
    dispatch(fetchImages())
  },[])

  return (
    <>
      <div className='container'>
        {cards.gameItems.map((item, index)=><Card key={index} src={item.image} index={index} handleClick={handleClick} status={item.status} matched={item.matched}/>)}
      </div>
     
    </>
  )
}

export default App