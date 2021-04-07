import './App.scss';
import { useState, useEffect, useCallback } from 'react';
const heaterBank = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const pianoBank = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const activeStyle = {
  backgroundColor: 'orange',
  boxShadow: '0 3px orange',
  height: 77,
  marginTop: 13
};

const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10,
  boxShadow: '3px 3px 5px black'
};

function DrumPad(props) {
  const [padStyle, setPadStyle] = useState(inactiveStyle);
  const { power, keyTrigger, clipId, clip, updateDisplay, keyCode } = props;

  const playSound = useCallback(() => {
    if (power) {
      const sound = document.getElementById(keyTrigger);
      sound.currentTime = 0;
      sound.play();
      setPadStyle(activeStyle);

      setTimeout(() => {
        setPadStyle(inactiveStyle);
      }, 100);

      // replace hyphens with space since the clip ids
      // need a hyphen to work with html
      updateDisplay(clipId.replace(/-/g, ' '));
    }
  }, [setPadStyle, power, keyTrigger, clipId, updateDisplay]);

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.keyCode === keyCode) {
        playSound();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [playSound, keyCode]);

  return <div
    className='drum-pad'
    id={clipId}
    onClick={playSound}
    style={padStyle}
  >
    <audio
      className='clip'
      id={keyTrigger}
      src={clip}
    />
    {keyTrigger}
  </div>
};

function PadBank(props) {
  const padBank = props.currentPadBank.map((drumObj, i, padBankArr) => {
    return (
      <DrumPad
        clip={props.power ? padBankArr[i].url : '#'}
        clipId={padBankArr[i].id}
        keyCode={padBankArr[i].keyCode}
        keyTrigger={padBankArr[i].keyTrigger}
        power={props.power}
        updateDisplay={props.updateDisplay}
      />
    );
  });
  return <div className='pad-bank'>{padBank}</div>
}
function App() {
  const nonBreakingSpace = String.fromCharCode(160);
  const [powerState, setPowerState] = useState(true);
  const powerSlider = powerState ? { float: 'right' } : { float: 'left' };

  const [currentPadBank, setCurrentPadBank] = useState(heaterBank);
  const [currentPadBankId, setCurrentPadBankId] = useState('Heater Kit');
  const bankSlider =
    currentPadBank === pianoBank
      ? {
        float: 'left'
      }
      : {
        float: 'right'
      };
  const [display, setDisplay] = useState(nonBreakingSpace);
  const [volumeSliderValue, setVolumeSliderValue] = useState(0.3);
  
  const handlePowerClick = (event) => {
    setPowerState(!powerState);
    clearDisplay();
  };

  const clearDisplay = () => setDisplay(nonBreakingSpace);
  const handleVolumeChange = event => {
    if (powerState) {
      setVolumeSliderValue(event.target.value)
      setDisplay('Volume:' + Math.round(event.target.value * 100));
      // clear the display after 1 second
      setTimeout(() => {
        // don't clear if something else has changed it already
        if (display.startsWith('Volume')) {
          clearDisplay();
        }
      }, 1000);
    }
  };

  const handleSelectBankClick = event => {
    console.log("handleSelectBankClick")
    if (powerState) {
      // swap between the two banks
      if (currentPadBankId === 'Heater Kit') {
        // set to piano kit
        setCurrentPadBank(pianoBank);
        setDisplay('Smooth Piano Kit');
        setCurrentPadBankId('Smooth Piano Kit');
      } else {
        // set to heater kit
        setCurrentPadBank(heaterBank);
        setDisplay('Heater Kit');
        setCurrentPadBankId('Heater Kit');
      }
    }
  };
  const displayClipName = name => {
    if (powerState)
      setDisplay(name);
  }

  // manually override the volume of each clip with the current volume
  // Seems hacky, there's probably a better way to do this
  const clips = [].slice.call(document.getElementsByClassName('clip'));
  clips.forEach(sound => {
    sound.volume = volumeSliderValue;
  });

  return (
    <div className='inner-container' id="drum-machine">
      <div id="drum-triggers">
        <PadBank
          clipVolume={volumeSliderValue}
          currentPadBank={currentPadBank}
          power={powerState}
          updateDisplay={displayClipName}
        />
      </div>
      <div className='logo'>
        <div className='inner-logo '>{'ZT Drums' + String.fromCharCode(160)}</div>
      </div>
      <div className='controls-container'>
        <div className='control'>
          <p>Power</p>
          <div className='select' onClick={handlePowerClick}>
            <div className='inner' style={powerSlider} />
          </div>
        </div>
        <p id="display">{display}</p>
        <div id='volume-slider'>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={volumeSliderValue}
            onChange={handleVolumeChange}
          />
        </div>
        <div className='control'>
          <p>Bank</p>
          <div className='select' onClick={handleSelectBankClick}>
            <div className='inner' style={bankSlider} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
