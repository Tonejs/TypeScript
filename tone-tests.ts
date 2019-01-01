import Tone from './index';

// Hello Tone
let synth: any = new Tone.Synth().toMaster();
synth.triggerAttackRelease('C4', '8n');

synth = new Tone.AMSynth().toMaster();

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('mousedown', e => {
    let el = e.target as HTMLButtonElement;
    let note = el ? el.textContent : null;
    if (note) synth.triggerAttack(note);
  });

  btn.addEventListener('mouseup', () => {
    synth.triggerRelease();
  });
});

// Time
let updateTime = () => {
  requestAnimationFrame(updateTime);
  let el = document.querySelector('span')
  if (el) el.textContent = Tone.now().toFixed(3);
}

synth = new Tone.FMSynth().toMaster();

synth.triggerAttackRelease('C4', 0.5, 0);
synth.triggerAttackRelease('E4', 0.5, 1);
synth.triggerAttackRelease('G4', 0.5, 2);
synth.triggerAttackRelease('B4', 0.5, 3);

synth = new Tone.FMSynth().toMaster()
synth.triggerAttackRelease('C4', '4n', '8n')
synth.triggerAttackRelease('E4', '8n', Tone.Time('4n'))
synth.triggerAttackRelease('G4', '16n', '2n')
synth.triggerAttackRelease('B4', '16n', Tone.Time('2n') + Tone.Time('8t'))
synth.triggerAttackRelease('G4', '16', Tone.Time('2n') + Tone.Time('8t') * 2)
synth.triggerAttackRelease('E4', '2n', '0:3')

// Scheduling
updateTime = () => {
  requestAnimationFrame(updateTime);
  let secondsEl = document.querySelector('#seconds') as HTMLBaseElement;
  let timeEl = document.querySelector('#time') as HTMLBaseElement;

  secondsEl.textContent = Tone.Transport.seconds.toFixed(2)
  timeEl.textContent = Tone.now().toFixed(2);
}

(document.querySelector('.playToggle') as HTMLBaseElement).addEventListener('change', e => {
  let target = e.target as HTMLFormElement
  if (target.checked) {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
});

synth = new Tone.PluckSynth().toMaster();

let triggerSynth = (time: Tone.Encoding.Time) => {
  synth.triggerAttackRelease('C2', '8n', time)
}

Tone.Transport.schedule(triggerSynth, 0)
Tone.Transport.schedule(triggerSynth, "0:2")
Tone.Transport.schedule(triggerSynth, "0:2:2.5")

Tone.Transport.loopEnd = "1m";
Tone.Transport.loop = true;

(document.querySelector(".playToggle") as HTMLBaseElement).addEventListener('change', e => {
  let target = e.target as HTMLFormElement
  if (target.checked) {
    Tone.Transport.start('+0.1');
  } else {
    Tone.Transport.stop();
  }
});

// BPM
(document.querySelector('#bpm') as HTMLBaseElement).addEventListener('input', e => {
  let target = e.target as HTMLFormElement;
	Tone.Transport.bpm.value = parseInt(target.value);
})

synth = new Tone.MetalSynth().toMaster();

triggerSynth = (time: Tone.Encoding.Time) => {
  synth.triggerAttackRelease('16n', time);
}

Tone.Transport.schedule(triggerSynth, 0)
Tone.Transport.schedule(triggerSynth, 2 * Tone.Time('8t'))
Tone.Transport.schedule(triggerSynth, Tone.Time('4n') + Tone.Time('8t'))
Tone.Transport.schedule(triggerSynth, Tone.Time('4n') + 2 * Tone.Time('8t'))
Tone.Transport.schedule(triggerSynth, Tone.Time('0:2') + Tone.Time('8t'))
Tone.Transport.schedule(triggerSynth, Tone.Time('0:3') + Tone.Time('8t'))

Tone.Transport.loopEnd = '1m'
Tone.Transport.loop = true;

(document.querySelector(".playToggle") as HTMLBaseElement).addEventListener('change', e => {
  let target = e.target as HTMLFormElement
  if (target.checked) {
    Tone.Transport.start('+0.1');
  } else {
    Tone.Transport.stop();
  }
});

// Loops
synth = new Tone.MembraneSynth().toMaster();
let loop = new Tone.Loop(time => {
	synth.triggerAttackRelease("C1", "8n", time)
}, "4n");

loop.start(0).stop('2m');

(document.querySelector(".playToggle") as HTMLBaseElement).addEventListener('change', e => {
  let target = e.target as HTMLFormElement
  if (target.checked) {
    Tone.Transport.start('+0.1');
  } else {
    Tone.Transport.stop();
  }
});

synth = new Tone.Synth().toMaster();
//pass in an array of events
let part = new Tone.Part((time, event) => {
	//the events will be given to the callback with the time they occur
	synth.triggerAttackRelease(event.note, event.dur, time)
}, [
  { time : 0, note : 'C4', dur: '4n'},
	{ time : '4n + 8n', note : 'E4', dur: '8n'},
	{ time : '2n', note : 'G4', dur: '16n'},
  { time : '2n + 8t', note : 'B4', dur: '4n'},
])

//start the part at the beginning of the Transport's timeline
part.start(0);

//loop the part 3 times
part.loop = 3;
part.loopEnd = '1m';

// Instruments
var synthA = new Tone.Synth({
	oscillator : {
  	type : 'fmsquare',
    modulationType : 'sawtooth',
    modulationIndex : 3,
    harmonicity: 3.4
  },
  envelope : {
  	attack : 0.001,
    decay : 0.1,
    sustain: 0.1,
    release: 0.1
  }
}).toMaster()

var synthB = new Tone.Synth({
	oscillator : {
  	type : 'triangle'
  },
  envelope : {
  	attack : 2,
    decay : 1,
    sustain: 0.4,
    release: 4
  }
}).toMaster();

(document.querySelector('#synthA') as HTMLBaseElement).addEventListener('mousedown', () => {
  synthA.triggerAttack('C4');
});
(document.querySelector('#synthA') as HTMLBaseElement).addEventListener('mouseup', () => {
  synthA.triggerRelease();
});
(document.querySelector('#synthB') as HTMLBaseElement).addEventListener('mousedown', () => {
  synthB.triggerAttack('C4');
});
(document.querySelector('#synthB') as HTMLBaseElement).addEventListener('mouseup', () => {
  synthB.triggerRelease();
});

let polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

(document.querySelector('#chord')  as HTMLBaseElement).addEventListener('mousedown', () => {
	//an array of notes can be passed into PolySynth
	polySynth.triggerAttack(['C4', 'E4', 'G4', 'B4']);
});

(document.querySelector('#chord')  as HTMLBaseElement).addEventListener('mouseup', () => {
	//unlike the other instruments, the notes need to be passed into triggerRelease
	polySynth.triggerRelease(['C4', 'E4', 'G4', 'B4']);
});

// Effects
var distortion = new Tone.Distortion(0.6)
var tremolo = new Tone.Tremolo().start()

polySynth = new Tone.PolySynth(4, Tone.Synth).chain(distortion, tremolo, Tone.Master)

// Sources
let pwm = new Tone.PWMOscillator("Bb3").toMaster();

(document.querySelector(".playToggle") as HTMLBaseElement).addEventListener('change', e => {
  let target = e.target as HTMLFormElement
  if (target.checked) {
    pwm.start();
  } else {
    pwm.stop();
  }
});

// Signals
var filter = new Tone.Filter({
	type : 'bandpass',
	Q : 12
}).toMaster()

//schedule a series of frequency changes
filter.frequency.setValueAtTime('C5', 0)
filter.frequency.setValueAtTime('E5', 0.5)
filter.frequency.setValueAtTime('G5', 1)
filter.frequency.setValueAtTime('B5', 1.5)
filter.frequency.setValueAtTime('C6', 2)
filter.frequency.linearRampToValueAtTime('C1', 3)

var noise = new Tone.Noise("brown").connect(filter).start(0).stop(3)

//schedule an amplitude curve
noise.volume.setValueAtTime(-20, 0)
noise.volume.linearRampToValueAtTime(20, 2)
noise.volume.linearRampToValueAtTime(-Infinity, 3)
