import { useEffect, useMemo, useState } from 'react';
import './app.css';
import Assessment from './components/Assessment';
import Timer from './components/Timer';
import data from './data';
import StartAssess from './components/StartAssess';

function App() {
  const [userName, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOver, setTimeOver] = useState(false);
  const [winning, setWinning] = useState('nothing');

  const prizePyramid = useMemo(
    () =>
      [
        { id: 1, amount: '$100' },
        { id: 2, amount: '$200' },
        { id: 3, amount: '$300' },
        { id: 4, amount: '$500' },
        { id: 5, amount: '$1000' },
        { id: 6, amount: '$2000' },
        { id: 7, amount: '$4000' },
        { id: 8, amount: '$8000' },
        { id: 9, amount: '$16000' },
        { id: 10, amount: '$32000' },
        { id: 11, amount: '$64000' },
        { id: 12, amount: '$125000' },
        { id: 13, amount: '$250000' },
        { id: 14, amount: '$500000' },
        { id: 15, amount: '$1000000' },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setWinning(
        prizePyramid.find((prize) => prize.id === questionNumber - 1).amount
      );
  }, [questionNumber, prizePyramid]);

  return (
    <div className='App'>
      {userName ? (
        <>
          <div className='main'>
            {timeOver ? (
              <h1 className='endText'> You've won: {winning}</h1>
            ) : (
              <>
                <div className='top'>
                  <div className='timer'>
                    <Timer
                      setTimeOver={setTimeOver}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className='bottom'>
                  <Assessment
                    data={data}
                    setTimeOver={setTimeOver}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>

          <div className='pyramid'>
            <ul className='prizeList'>
              {prizePyramid.map((prize) => (
                <li
                  className={
                    questionNumber === prize.id
                      ? 'prizeListItem active'
                      : 'prizeListItem'
                  }
                  key={prize.id}
                >
                  <span className='prizeListItemNumber'> {prize.id} </span>
                  <span className='prizeListItemAmount'> {prize.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <StartAssess setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
