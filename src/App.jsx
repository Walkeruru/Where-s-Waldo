import { useState } from 'react'
import { ImageMap } from '@qiuz/react-image-map';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, query, orderBy, limit , collection, getDocs } from "firebase/firestore";
import Scoreboard from './components/Scoreboard';
import Cronometro from './components/Cronometro';
import StartScreen from './components/StartScreen';
import Tooltip from '@mui/joy/Tooltip';
import './App.css'

const firebaseConfig = {
  apiKey: "AIzaSyDV7kTltt_r-jjjJRpcvWGp3y8aYjMtix0",
  authDomain: "todo-app-eb8ed.firebaseapp.com",
  projectId: "todo-app-eb8ed",
  storageBucket: "todo-app-eb8ed.appspot.com",
  messagingSenderId: "1050467682833",
  appId: "1:1050467682833:web:33b2ce203151586865bfb0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [isShown, setIsShown] = useState(false);
  const [position, setPosition] = useState([0, 0]) // State to save the position where you clicked
  const [areaClickeada, setAreaClickeada] = useState();
  const [personajes, setPersonajes] = useState(['Waldo', 'Sokka', 'Robin']);
  const [encontrado, setEncontrado] = useState();
  const [alertaBuena, setAlertaBuena] = useState(false);
  const [alertaMala, setAlertaMala] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [time,setTime] = useState(0);
  const [scoreboard,setScoreboard] = useState([]);
  const [startGame,setStartGame] = useState(true);
  const [playerName,setPlayerName] = useState('Guest')


  const handleClick = (event) => {
    setIsShown(current => !current)
    setPosition([event.pageX, event.pageY]) // Save the pos where you clicked
  }

  const onMapClick = (area, index) => {
    setAreaClickeada(area);
  }

  const startGameOn = () =>{
    setStartGame(current => !current);
  }
  const handleChangeName = (event) =>{
    setPlayerName(event.target.value);
  }
  
  const restartGame = () =>{
    setIsShown(false);
    setPersonajes(['Waldo', 'Sokka', 'Robin']);
    setIsGameOver(false);
    setTime(0);
  };

  const handleSelect = async (event) => {
    let personaje = event.target.id;
    //hace el request a la base de datos para obtener la ubicacion del personaje
    const docRef = doc(db, "personajes", personaje)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && areaClickeada.height == docSnap.data().height) {
      setPersonajes(personajes.filter(pers => pers != personaje))
      setAlertaBuena(true);
      setEncontrado(personaje)
      setTimeout(() => {
        setAlertaBuena(false);
      }, 2000);
      if (personajes.length == 1) {
        //agrega el tiempo a la db
        await setDoc(doc(db, "times",`Player${crypto.randomUUID()}`), {
          id: playerName.charAt(0).toUpperCase() + playerName.slice(1),
          timer: time,
        });
        setPersonajes(personajes.filter(pers => pers != personaje))
        const q = query(collection(db,'times'), orderBy("timer", "asc"), limit(10));
        const docTime = await getDocs(q);
        setScoreboard(docTime.docs);
        setIsGameOver(true);

      }
    } else {
      setAlertaMala(true);
      setTimeout(() => {
        setAlertaMala(false);
      }, 2000);
    }
  }

  const mapArea = [{ "width": "100%", "height": "100%", "left": "0%", "top": "0%" },
  { "width": "5.598958333333326%", "height": "6.813996316758744%", "left": "57.16145833333336%", "top": "18.968692449355427%" },
  { "width": "5.526041666666665%", "height": "6.659300184162062%", "left": "61.97916666666664%", "top": "92.05156537753224%" },
  { "width": "3.963541666666665%", "height": "6.290976058931859%", "left": "20.25520833333332%", "top": "71.9779005524862%" }
  ]

  return (
    <>
      {!startGame && <nav className='navbar'>
        <ul>
          <li>Where's Waldo?</li>
          <li><Cronometro time={time} set={setTime}></Cronometro></li>
          <Tooltip title={`Aun falta encontrar a ${personajes.length} personajes : ${personajes.map(personaje=>personaje)}`} color="warning">
          <li> {personajes.length} </li>
        </Tooltip>
        </ul>
      </nav>}
      {startGame && <StartScreen startBtn={startGameOn} handleChange={handleChangeName} ></StartScreen>}
      {isGameOver && <Scoreboard handleClick={restartGame} board={scoreboard}></Scoreboard>}
      {alertaBuena && <div className='alert buena'><p>encontraste a {encontrado}!</p></div>}
      {alertaMala && <div className='alert mala'><p>sigue buscando!</p></div>}

      {!startGame && <div className="gamepage" onClick={handleClick}>

        {isShown && (
          <ul className="menu" style={{
            position: "absolute",
            left: position[0],
            top: position[1],
            tranform: "translateX(-50%)",
            transform: "translateY(-50%)",
            zIndex: '1000'
          }}>

            {personajes.map(personaje => {
              return <li className="menu-item" id={personaje} key={personaje} onClick={handleSelect}>{personaje}</li>
            })}

          </ul>
        )}

        <ImageMap
          onLoad={() => setTime(0)}
          className="usage-map"
          src={"./whereswaldo.webp"}
          map={mapArea}
          onMapClick={onMapClick}
        />

      </div>}
    </>
  )
}

export default App
