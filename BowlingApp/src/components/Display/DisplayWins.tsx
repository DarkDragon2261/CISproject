import { useState } from "react";
import { Subject, Observer } from "./observer"

function DisplayWins () {

let wins : number = 0;
let WinsCounter : Subject = new Subject();
let Display1 : Observer = new Observer();
const [DisplayWins1, setDisplayWins1] = useState<number>(0);

let Display2 : Observer = new Observer();
const [DisplayWins2, setDisplayWins2] = useState<number>(0);

const handleClick = (wins:number) => {
    WinsCounter.setWins(wins);
    setDisplayWins1(Display1.wins);
    setDisplayWins2(Display2.wins);
    
}

const Suscribe = (Observer1 : Observer) => {
    WinsCounter.attachObserver(Observer1);
    
}

const UnSuscribe = (Observer1 : Observer) => {
    WinsCounter.detachObserver(Observer1);
}


    return (
        <div className="DisplayBackground">
            <div>
                Display1: {DisplayWins1}
            </div>
            <div>
                Display2: {DisplayWins2}
            </div>
            <button onClick={() => handleClick(wins + 1)}> Update Wins?</button>
        </div>
        
    )
}

export default DisplayWins;