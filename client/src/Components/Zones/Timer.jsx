import React, { useState } from 'react'
import ReactDOM from "react-dom";
import Button from './Button'
import { CountdownCircleTimer} from "react-countdown-circle-timer";
import './Timer.css'

const RenderTime = () => {
    const [newTimer, setNewTimer] = useState({
        work: 0.3,
        short: 0.2,
        long: 1,
        active: 'work'
    })

    const handleChange = input => {
        const {name, value} = input.target

        switch (name) {
            case 'work':
            setNewTimer({
                ...newTimer,
                work: parseInt(value)
            })
                break;
            case 'shortBreak':
            setNewTimer({
                ...newTimer,
                short: parseInt(value)
            })
                break;
            case 'longBreak':
                setNewTimer({
                    ...newTimer,
                    long: parseInt(value)
                })
                break;

            default:
                break;
        }
        console.log(newTimer)
    }
    const handleSubmit = () => {
        console.log('Form Submitted', newTimer);
    };

    return (
      <div className="form-container">
        <form noValidate>
            <div className="input-wrapper">
                <input className='input' name="work" onChange={handleChange} value={newTimer.work} />
                <input className='input' name="shortBreak" onChange={handleChange} value={newTimer.short} />
                <input className='input' name="longBreak" onChange={handleChange} value={newTimer.long} />
            </div>
            <Button title="Set Timer" _callback={handleSubmit}/>
        </form>
      </div>
    );
  };



export default RenderTime;