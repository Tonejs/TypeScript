/**
 * Tone is the base class of all other classes.
 */
declare class Tone {
  constructor(opts?: object);

  /**
   * Generate a buffer by rendering all of the Tone.js code
   * within the callback using the OfflineAudioContext.
   * The OfflineAudioContext is capable of rendering much faster than
   * real time in many cases. The callback function also passes in an
   * offline instance of Tone.Transport which can be used to schedule
   * events along the Transport.
   * NOTE OfflineAudioContext has the same restrictions as the
   * AudioContext in that on certain platforms (like iOS) it must be
   * invoked by an explicit user action like a click or tap.
   */
  static Offline(callback: Tone.Callback, duration: Tone.Encoding.Time): Promise<Tone.Buffer>;

  /**
   * Connect together all of the arguments in series
   */
  static connectSeries(...nodes: Array<AudioParam | Tone | AudioNode>): Tone;

  /**
   * Convert decibels into gain
   */
  static dbToGain(db: Tone.Encoding.Decibels): number;

  /**
   * If the given parameter is undefined, use the fallback.
   * If both given and fallback are object literals, it will
   * return a deep copy which includes all of the parameters
   * from both objects. If a parameter is undefined in given,
   * it will return the fallback property.
   *
   * WARNING: if object is self referential, it will go into
   * an an infinite recursive loop.
   */
  static defaultArg<G extends object, F extends object>(given: G, fallback: F): G & F;
  static defaultArg<G>(given: NonNullable<G>, fallback?: undefined | null): G;
  static defaultArg<F>(given: undefined | null, fallback: NonNullable<F>): F;
  static defaultArg<G, F>(given: G, fallback?: F): G;

  static defaults(values: any[], keys: string[], constr: (...args: any[]) => any | object): object;

  /**
   * Equal power gain scale. Good for cross-fading.
   */
  static equalPowerScale(percent: Tone.Encoding.NormalRange): number;

  /**
   * Have a child inherit all of Tone’s (or a parent’s) prototype
   * to inherit the parent’s properties, make sure to call
   * Parent.call(this) in the child’s constructor based on closure
   * library’s inherit function
   */
  static extend<
    T extends Tone.Ctor,
    P extends Tone.Ctor = Tone.Ctor<any[], Tone>
  >(child: T, parent?: P): ReturnType<T> & ReturnType<P>;

  /**
   * Convert gain to decibels.
   */
  static gainToDb(gain: number): Tone.Encoding.Decibels;

  /**
   * Convert an interval (in semitones) to a frequency ratio
   */
  static intervalToFrequencyRation(interval: Tone.Encoding.Interval): number;

  /**
   * Test if the argument is an Array
   */
  static isArray(arg: ReadonlyArray<any>): true;
  static isArray(arg: any): false;

  /**
   * Test if the argument is a boolean
   */
  static isBoolean(arg: boolean): true;
  static isBoolean(arg: any): false;

  /**
   * Test if the arg is not undefined
   */
  static isDefined(arg?: undefined): false;
  static isDefined(arg: any): true;

  /**
   * Test if the arg is a function
   */
  static isFunction(arg: (...args: any[]) => void): true;
  static isFunction(arg: any): false;

  /**
   * Test if the argument is a number
   */
  static isNumber(arg: number): true;
  static isNumber(arg: any): false;

  /**
   * Test if the given argument is an object literal (i.e. {})
   */
  static isObject(arg: object): true;
  static isObject(arg: any): false;

  /**
   * Test if the argument is a string.
   */
  static isString(arg: string): true;
  static isString(arg: any): false;

  /**
   * Test if the arg is undefined
   */
  static isUndef(arg?: undefined): true;
  static isUndef(arg: any): false;

  /**
   * Test if the argument is in the form of a note in
   * scientific pitch notation. e.g. “C4”
   */
  static isNote(arg: any): boolean;

  /**
   * Returns a Promise which resolves when all of the
   * buffers have loaded
   */
  static loaded(): Promise<void>;

  /**
   * Return the current time of the AudioContext clock
   */
  static now(): number;

  /** The AudioContext */
  readonly context: Tone.Context;

  /**
   * Recieve the input from the desired channelName to the input
   */
  receive(channelName: string, channelNumber?: number): this;

  /**
   * Send this signal to the channel name.
   */
  send(channelName: string, amount: Tone.Encoding.Decibels): GainNode;

  /**
   * Convert a frequency representation into a number.
   */
  toFrequency(freq: Tone.Encoding.Frequency): Tone.Encoding.Hertz;

  /**
   * Convert Time into seconds. Unlike the method which it
   * overrides, this takes into account transporttime and musical notation.
   * Time : 1.40 Notation: 4n or 1m or 2t Now Relative: +3n Math: 3n+16n
   * or even complicated expressions ((3n*2)/6 + 1)
   */
  toSeconds(time: Tone.Encoding.Time): Tone.Encoding.Seconds;

  /**
   * Convert a time representation into ticks.
   */
  toTicks(time: Tone.Encoding.Time): Tone.Encoding.Ticks;
}

declare namespace Tone {
  export type Ctor<A extends Array<any> = any[], T = object> = (...args: A) => T;

  export type Callback<A extends any[] = any[]> = (...args: A) => void;

  export enum State {
    Started = 'started',
    Stopped = 'stopped',
    Paused = 'paused'
  }

  export type PlayState = 'started' | 'stopped' | 'paused';

  export type ProcessingNode = Tone
    | AudioNode
    | AudioParam
    | AudioNode;

  export type FadeCurve = 'linear' | 'exponential';

  interface TimeObject {
    [key: string]: number;
  }

  export namespace Encoding {
    export type Default = number;
    export type Time = number | string | TimeObject;
    export type Frequency = number | string | TimeObject;
    export type TransportTime = number | string | TimeObject;
    export type Ticks = number;
    export type NormalRange = number;
    export type AudioRange = number;
    export type Decibels = number;
    export type Interval = number;
    export type BPM = number;
    export type Positive = number;
    export type Gain = number;
    export type Cents = number;
    export type Degrees = number;
    export type MIDI = string;
    export type BarsBeatsSixteenths = string;
    export type Samples = number;
    export type Hertz = number;
    export type Note = string;
    export type Milliseconds = number;
    export type Seconds = number;
    export type Notation = string;
  }

  export type Unit = 'number'
    | 'time'
    | 'frequency'
    | 'transportTime'
    | 'ticks'
    | 'normalRange'
    | 'audioRange'
    | 'db'
    | 'interval'
    | 'bpm'
    | 'positive'
    | 'gain'
    | 'cents'
    | 'degrees'
    | 'midi'
    | 'barsBeatsSixteenths'
    | 'samples'
    | 'hertz'
    | 'note'
    | 'milliseconds'
    | 'seconds'
    | 'notation'

  type BasicOscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle';
  type AMOscillatorType = 'amsine' | 'amsquare' | 'amsawtooth' | 'amtriangle';
  type FatOscillatorType = 'fatsine' | 'fatsquare' | 'fatsawtooth' | 'fattriangle';
  type FMOscillatorType = 'fmsine' | 'fmsquare' | 'fmsawtooth' | 'fmtriangle';
  type OscillatorType = 'pwm' | 'pulse' | BasicOscillatorType | AMOscillatorType | FatOscillatorType | FMOscillatorType;

  /**
   * A single master output which is connected to
   * the AudioDestinationNode (aka your speakers).
   * It provides useful conveniences such as the ability to
   * set the volume and mute the entire application.
   * It also gives you the ability to apply master effects to
   * your application.
   *
   * Like Tone.Transport, A single Tone.Master is created on
   * initialization and you do not need to explicitly construct one.
   */
  interface Master extends Tone {
    /**
     * Mute the output
     */
    mute: boolean;

    /**
     * The volume of the master output
     */
    volume: Volume['volume'];

    /**
     * Add a master effects chain.
     * NOTE: this will disconnect any nodes which
     * were previously chained in the master effects chain.
     */
    chain(...nodes: ProcessingNode[]): this;
  }

  const Master: Master;

  //------------------
  // Types Interfaces
  //------------------

  interface PrimitiveTypeConstructor<E, T> {
    (value: E, units?: Unit): number;
    new(value: E, units?: Unit): T;
  }

  enum TypeUnits {
    Default = 'number',
    Time = 'time',
    Frequency = 'frequency',
    TransportTime = 'transportTime',
    Ticks = 'ticks',
    NormalRange = 'normalRange',
    AudioRange = 'audioRange',
    Decibels = 'db',
    Interval = 'interval',
    BPM = 'bpm',
    Positive = 'positive',
    Gain = 'gain',
    Cents = 'cents',
    Degrees = 'degrees',
    MIDI = 'midi',
    BarsBeatsSixteenths = 'barsBeatsSixteenths',
    Samples = 'samples',
    Hertz = 'hertz',
    Note = 'note',
    Milliseconds = 'milliseconds',
    Seconds = 'seconds',
    Notation = 'notation',
  }

  /**
   * Tone.Frequency is a primitive type for encoding
   * Frequency values. Eventually all time values are
   * evaluated to hertz using the eval method
   */
  interface Frequency extends TimeBase {
    /**
     * Takes an array of semitone intervals and returns an
     * array of frequencies transposed by those intervals
     */
    harmonize(intervals: ReadonlyArray<Encoding.Interval>): ReadonlyArray<number>;

    /**
     * Return the value as a midi note
     */
    toMidi(): Encoding.MIDI;

    /**
     * Return the value of frequency in Scientific Pitch
     * Notation
     */
    toNote(): Encoding.Note;

    /**
     * Return the time in ticks
     */
    toTicks(): Encoding.Ticks;

    /**
     * Transposes the frequency by the given number of semitones
     */
    transpose(interval: Encoding.Interval): Frequency;
  }

  interface FrequencyConstructor extends PrimitiveTypeConstructor<Encoding.Frequency, Frequency> {
    ftom(frequency: Encoding.Frequency): Encoding.MIDI;
    mtof(midi: Encoding.MIDI): Encoding.Frequency;
  }

  const Frequency: FrequencyConstructor;

  /**
   * Tone.Midi is a primitive type for encoding Time values.
   * Tone.Midi can be constructed with or without the new
   * keyword. Tone.Midi can be passed into the parameter of
   * any method which takes time as an argument
   */
  interface Midi extends Frequency {
    /**
     * Return the value in hertz
     */
    toFrequency(): number;
  }

  interface MidiConstructor extends PrimitiveTypeConstructor<Encoding.MIDI, Midi> {
    ftom(frequency: Encoding.Frequency): Encoding.MIDI;
    mtof(midi: Encoding.MIDI): Encoding.Frequency;
  }

  const Midi: MidiConstructor;

  /**
   * Tone.Ticks is a primitive type for encoding Time values.
   * Tone.Ticks can be constructed with or without the new
   * keyword. Tone.Ticks can be passed into the parameter of
   * any method which takes time as an argument
   */
  interface Ticks extends TransportTime {}

  interface TicksConstructor extends PrimitiveTypeConstructor<Encoding.Ticks, Ticks> {}

  const Ticks: Ticks;

  /**
   * Tone.TimeBase is a flexible encoding of time which can
   * be evaluated to and from a string
   */
  interface TimeBase extends Tone {
    /**
     * Return the value in hertz
     */
    toFrequency(): number;

    /**
     * Returns this time in milliseconds
     */
    toMilliseconds(): number;

    /**
     * Return the time in samples
     */
    toSamples(): number;

    /**
     * Return the time in seconds
     */
    toSeconds(): number;

    /**
     * Evaluate the time value.
     * Returns the time in seconds.
     */
    valueOf(): number;
  }

  interface TimeBaseConstructor extends PrimitiveTypeConstructor<Encoding.Time, TimeBase> {}

  const TimeBase: TimeBaseConstructor;

  /**
   * Tone.Time is a primitive type for encoding Time values.
   * Tone.Time can be constructed with or without the new
   * keyword. Tone.Time can be passed into the parameter of
   * any method which takes time as an argument
   */
  interface Time extends TimeBase {
    /**
     * Quantize the time by the given subdivision. Optionally
     * add a percentage which will move the time value towards
     * the ideal quantized value by that percentage
     */
    quantize(val: number | Encoding.Time, percent?: Encoding.NormalRange): number;

    /**
     * Return the time encoded as Bars:Beats:Sixteenths
     */
    toBarsBeatsSixteenths(): Encoding.BarsBeatsSixteenths;

    /**
     * Return the value as a midi note
     */
    toMidi(): Encoding.MIDI;

    /**
     * Convert a Time to Notation. The notation values will
     * be the closest representation between 1m to 128th note
     */
    toNotation(): Encoding.Notation;

    /**
     * Return the time in ticks
     */
    toTicks(): Encoding.Ticks;
  }

  interface TimeConstructor extends PrimitiveTypeConstructor<Encoding.Time, Time> {}

  const Time: TimeConstructor;

  /**
   * Tone.TransportTime is a the time along the Transport’s
   * timeline. It is similar to Tone.Time, but instead of
   * evaluating against the AudioContext’s clock, it is
   * evaluated against the Transport’s position
   */
  interface TransportTime extends Time {}

  interface TransportTimeConstructor extends PrimitiveTypeConstructor<Encoding.TransportTime, TransportTime> {}

  const TransportTime: TransportTimeConstructor;

  //----------------
  // Core Classes
  //----------------

  /**
   * Tone.AudioNode is the base class for classes which process audio.
   * AudioNodes have inputs and outputs.
   */
  class AudioNode extends Tone {
    /**
     * The number of channels used when up-mixing and
     * down-mixing connections to any inputs to the node.
     * The default value is 2 except for specific nodes where its
     * value is specially determined.
     */
    readonly channelCount: number;

    /**
     * Determines how channels will be counted when
     * up-mixing and down-mixing connections to any inputs to the node.
     * The default value is “max”. This attribute has no effect for
     * nodes with no inputs.
     */
    readonly channelCountMode: string;

    /**
     * Determines how individual channels will be
     * treated when up-mixing and down-mixing connections to any inputs
     * to the node. The default value is “speakers”.
     */
    readonly channelInterpretation: string;

    /**
     * Get the audio context belonging to this instance.
     */
    readonly context: Context;

    /**
     * The number of inputs feeding into the AudioNode.
     * For source nodes, this will be 0.
     */
    readonly numberOfInputs: number;

    /**
     * The number of outputs coming out of the AudioNode.
     */
    readonly numberOfOutputs: number;

    /**
     * Connect the output of this node to the rest of
     * the nodes in series.
     */
    chain(...nodes: Array<ProcessingNode>): this

    /**
     * connect the output of this node to the rest of
     * the nodes in parallel
     */
    fan(...nodes: Array<ProcessingNode>): this

    /**
     * Connect the output of a ToneNode to an AudioParam,
     * AudioNode, or ToneNode
     */
    connect(unit: ProcessingNode, outputNum?: number, inputNum?: number): this;

    /**
     * Disconnect the output
     */
    disconnect(output: number | ProcessingNode): this;

    /**
     * Dispose and disconnect
     */
    dispose(): this;

    /**
     * Connect ‘this’ to the master output. Shorthand for
     * this.connect(Tone.Master)
     */
    toMaster(): this;

    /**
     *  Create input and outputs for this object.
     */
    private createInsOuts(inputs: number, outputs: number): this
  }

  type BufferArray = Float32Array | ReadonlyArray<Float32Array>

  /**
   * Buffer loading and storage. Tone.Buffer is used internally by
   * all classes that make requests for audio files such as Tone.Player,
   * Tone.Sampler and Tone.Convolver. Aside from load callbacks from
   * individual buffers, Tone.Buffer provides events which keep track
   * of the loading progress of all of the buffers.
   * These are Tone.Buffer.on(“load” / “progress” / “error”)
   */
  class Buffer extends Tone {
    constructor(url: AudioBuffer | string, onload?: Callback, onerror?: Callback);

    /**
     * Stop all of the downloads in progress
     */
    static cancelDownload(): Buffer;

    /**
     * Create a Tone.Buffer from the array. To create a
     * multichannel AudioBuffer, pass in a multidimensional
     * array
     */
    static fromArray(array: BufferArray): Buffer;

    /**
     * Creates a Tone.Buffer from a URL, returns a promise
     * which resolves to a Tone.Buffer
     */
    static fromUrl(url: string): Promise<Buffer>;

    /**
     * Loads a url using XMLHttpRequest
     */
    static load(url: string, onload: Callback, onerror: Callback, onprogress: Callback): XMLHttpRequest;

    /**
     * Checks a url’s extension to see if the current browser can
     * play that file type
     */
    static supportsType(url: string): boolean;

    /**
     * The duration of the buffer
     */
    readonly duration: number;

    /**
     * The length of the buffer in samples
     */
    readonly length: number;

    /**
     * If the buffer is loaded or not
     */
    readonly loaded: boolean;

    /**
     * The number of discrete audio channels.
     * Returns 0 if no buffer is loaded
     */
    readonly numberOfChannels: number;

    /**
     * Reverse the buffer
     */
    reverse: boolean;

    /**
     * Clean up
     */
    dispose(): this;

    /**
     * Set the audio buffer from the array.
     * To create a multichannel AudioBuffer, pass in a
     * multidimensional array
     */
    fromArray(array: BufferArray): this;

    get(): AudioBuffer;

    /**
     * Returns the Float32Array representing the PCM audio
     * data for the specific channel
     */
    getChannelData(channel: number): Float32Array;

    /**
     * Makes an xhr reqest for the selected url then decodes
     * the file as an audio buffer. Invokes the callback once
     * the audio buffer loads
     */
    load(url: string): Promise<this>;

    /**
     * Pass in an AudioBuffer or Tone.Buffer to set the value of
     * this buffer
     */
    set(buffer: AudioBuffer | Buffer): this;

    /**
     * Cut a subsection of the array and return a buffer of
     * the subsection. Does not modify the original buffer
     */
    slice(start: Encoding.Time, end?: Encoding.Time): this;

    /**
     * Get the buffer as an array. Single channel buffers will
     * return a 1-dimensional Float32Array, and multichannel buffers
     * will return multidimensional arrays
     */
    toArray(channel?: number): BufferArray;

    /**
     * Sums muliple channels into 1 channel
     */
    toMono(channel?: number): BufferArray;
  }

  /**
   * A data structure for holding multiple buffers
   */
  class Buffers extends Tone {
    constructor(urls: object | string[], callback?: Callback)

    /**
     * A path which is prefixed before every url
     */
    baseUrl: string;

    /**
     * If the buffers are loaded or not
     */
    readonly loaded: boolean;

    /**
     * Add a buffer by name and url to the Buffers
     */
    add(name: string, url: string | Buffer | AudioBuffer, callback?: Callback): this;

    /**
     * Clean up
     */
    dispose(): this;

    /**
     * Get a buffer by name. If an array was loaded, then use
     * the array index
     */
    get(name: string | number): Buffer;

    /**
     * True if the buffers object has a buffer by that name
     */
    has(name: string | number): boolean;
  }

  /**
   * Wrapper around the native AudioContext.
   */
  class Context extends Emitter {
    constructor(context?: AudioContext);

    /**
     * What the source of the clock is, either “worker”
     * (Web Worker [default]), “timeout” (setTimeout),
     * or “offline” (none).
     */
    clockSource: string | Encoding.Seconds;

    /**
     * The type of playback, which affects tradeoffs between audio
     * output latency and responsiveness. In addition to setting the
     * value in seconds, the latencyHint also accepts the strings
     * “interactive” (prioritizes low latency),
     * “playback” (prioritizes sustained playback),
     * “balanced” (balances latency and performance),
     * and “fastest” (lowest latency, might glitch more often).
     */
    latencyHint: string | Encoding.Seconds;

    /**
     * The amount of time events are scheduled into the future
     */
    lookAhead: number;

    /**
     * How often the Web Worker callback is invoked. This number
     * corresponds to how responsive the scheduling can be.
     * Context.updateInterval + Context.lookAhead gives you the total
     * latency between scheduling an event and hearing it.
     */
    updateInterval: number;

    /**
     * Clears a previously scheduled timeout with Tone.context.setTimeout
     */
    clearTimeout(id: number): this;

    /**
     * Promise which is invoked when the context is running.
     * Tries to resume the context if it’s not started.
     */
    close(): Promise<any>;

    createAnalyser(): AnalyserNode;
    createBiquadFilter(): BiquadFilterNode;
    createConstantSource(): ConstantSourceNode;
    createPanner(): PannerNode;
    createStereoPanner(): StereoPannerNode;

    /**
     * Unlike other dispose methods, this returns a Promise which
     * executes when the context is closed and disposed
     */
    dispose(): this;
    dispose(): Promise<this>;

    /**
     * Generate a looped buffer at some constant value.
     */
    getConstant(val: number): AudioBufferSourceNode;

    /**
     * The current audio context time
     */
    now(): number;

    /**
     * Promise which is invoked when the context is running.
     * Tries to resume the context if it’s not started.
     */
    ready(): Promise<any>;

    /**
     * A setTimeout which is gaurenteed by the clock source.
     * Also runs in the offline context.
     */
    setTimeout(fn: Callback, timeout: Encoding.Seconds): number;
  }

  /**
   * Wrapper around the OfflineAudioContext
   */
  class OfflineContext extends Context {
    constructor(channels: number, duration: number, sampleRate: number)

    /**
     * Close the context
     */
    close(): Promise<undefined>;

    /**
     * Override the now method to point to the internal clock time
     */
    now(): number;

    createBufferSource(): BufferSource;

    /**
     * Render the output of the OfflineContext
     */
    render(): Promise<AudioBuffer>;
  }

  /**
   * Wrapper around Web Audio’s native DelayNode.
   */
  class Delay extends Tone {
    constructor(delayTime?: Encoding.Time, maxDelay?: Encoding.Time)

    /**
     * The amount of time the incoming signal is delayed.
     */
    delayTime: Param<Encoding.Time>;

    /**
     * The maximum delay time. This cannot be changed.
     * The value is passed into the constructor.
     */
    readonly maxDelay: Encoding.Time;

    /** Clean up */
    dispose(): this;
  }

  /**
   * A sample accurate clock which provides a callback at the
   * given rate. While the callback is not sample-accurate
   * (it is still susceptible to loose JS timing), the time passed
   * in as the argument to the callback is precise.
   * For most applications, it is better to use Tone.Transport
   * instead of the Clock by itself since you can synchronize
   * multiple callbacks.
   */
  class Clock extends Emitter {
    constructor(callback: Callback, frequency: Encoding.Frequency)

    /**
     * The callback function to invoke at the scheduled tick
     */
    callback: Callback;

    /**
     * The rate the callback function should be invoked
     */
    frequency: TickSignal<Encoding.BPM>;

    /**
     * Returns the playback state of the source, either
     * “started”, “stopped” or “paused”
     */
    readonly state: State;

    /**
     * Clean up
     */
    dispose(): this;

    /**
     * Return the elapsed seconds at the given time
     */
    getSecondsAtTime(time: Encoding.Time): Encoding.Seconds;

    /**
     * Returns the scheduled state at the given time
     */
    getStateAtTime(time: Encoding.Time): State;

    /**
     * Get the clock’s ticks at the given time
     */
    getTicksAtTime(time: Encoding.Time): Encoding.Ticks;

    /**
     * Get the time of the next tick
     */
    nextTickTime(ticks: Encoding.Ticks, before: Encoding.Time): this;

    /**
     * Pause the clock. Pausing does not reset the tick counter
     */
    pause(time?: Encoding.Time): this;

    /**
     * Set the clock’s ticks at the given time
     */
    setTicksAtTime(ticks: Encoding.Ticks, time: Encoding.Time): this;

    /**
     * Start the clock at the given time. Optionally pass
     * in an offset of where to start the tick counter from
     */
    start(time?: Encoding.Time, offset?: Encoding.Ticks): this;

    /**
     * Stop the clock. Stopping the clock resets the tick counter to 0
     */
    stop(time?: Encoding.Time): this;
  }

  /**
   * Tone.Emitter gives classes which extend it the ability
   * to listen for and emit events.
   */
  class Emitter extends Tone {
    /**
     * Add Emitter functions (on/off/emit) to the object
     */
    static mixin(object: object): Emitter;

    /** Clean up */
    dispose(): this;

    /**
     * Invoke all of the callbacks bound to the event with any
     * arguments passed in.
     */
    emit(event: string, ...args: any[]): this;

    /**
     * Remove the event listener.
     */
    off(event: string, callback: Callback): this;

    /**
     * Bind a callback to a specific event.
     */
    on(event: string, callback: Callback): this;

    /**
     * Bind a callback which is only invoked once
     */
    once(event: string, callback: Callback): this;
  }

  interface GainOptions {
    gain: Encoding.Gain;
    convert: boolean;
  }

  /**
   * A thin wrapper around the Native Web Audio GainNode. The GainNode is
   * a basic building block of the Web Audio API and is useful for
   * routing audio and adjusting gains.
   */
  class Gain extends Tone {
    constructor(gain?: Encoding.Gain, units?: Unit)

    /**
     * The gain parameter of the gain node.
     */
    readonly gain: Param<Encoding.Gain>;
  }

  /**
   * Transport for timing musical events. Supports tempo curves and
   * time changes. Unlike browser-based timing
   * (setInterval, requestAnimationFrame) Tone.Transport timing events
   * pass in the exact time of the scheduled event in the argument of the
   * callback function. Pass that time value to the object you’re scheduling.
   * A single transport is created for you when the library is initialized.
   * The transport emits the events: “start”, “stop”, “pause”, and “loop”
   * which are called with the time of that event as the argument.
   */
  interface Transport extends Emitter {
    /**
     * Pulses Per Quarter note. This is the smallest resolution the
     * Transport timing supports. This should be set once on initialization
     * and not set again. Changing this value after other objects have been
     * created can cause problems.
     */
    PPQ: number;

    /**
     * The Beats Per Minute of the Transport.
     */
    bpm: Clock["frequency"];

    /**
     * If the transport loops or not.
     */
    loop: boolean;

    /**
     * When the Tone.Transport.loop = true, this is the ending
     * position of the loop.
     */
    loopEnd: Encoding.Time;

    /**
     * When the Tone.Transport.loop = true, this is the starting
     * position of the loop.
     */
    loopStart: Encoding.Time;

    /**
     * The Transport’s position in Bars:Beats:Sixteenths. Setting the
     * value will jump to that position right away.
     */
    position: Encoding.BarsBeatsSixteenths;

    /**
     * The Transport’s loop position as a normalized value. Always returns
     * 0 if the transport if loop is not true.
     */
    progress: Encoding.NormalRange;

    /**
     * The Transport’s position in seconds Setting the value will jump
     * to that position right away.
     */
    seconds: Encoding.Seconds;

    /**
     * Returns the playback state of the source, either
     * “started”, “stopped”, or “paused”
     */
    readonly state: State;

    /**
     * The swing value. Between 0-1 where 1 equal to the note +
     * half the subdivision.
     */
    swing: Encoding.NormalRange;

    /**
     * Set the subdivision which the swing will be applied to.
     * The default value is an 8th note. Value must be less than
     * a quarter note.
     */
    swingSubdivision: Encoding.Time;

    /**
     * The transports current tick position.
     */
    ticks: Encoding.Ticks;

    /**
     * The time signature as just the numerator over 4.
     * For example 4/4 would be just 4 and 6/8 would be 3.
     */
    timeSignature: number | [number, number];

    /**
     * Remove scheduled events from the timeline after the given time.
     * Repeated events will be removed if their startTime is after
     * the given time
     */
    cancel(after: Encoding.TransportTime): this;

    /**
     * Clear the passed in event id from the timeline
     */
    clear(eventId: number): this;

    /**
     * Return the elapsed seconds at the given time.
     */
    getSecondsAtTime(time: Encoding.Time): Encoding.Seconds;

    /**
     * Get the clock’s ticks at the given time.
     */
    getTicksAtTime(time: Encoding.Time): Encoding.Ticks;

    /**
     * Returns the time aligned to the next subdivision of the Transport.
     * If the Transport is not started, it will return 0.
     * Note: this will not work precisely during tempo ramps
     */
    nextSubdivision(subdivision: Encoding.Time): number;

    /**
     * Pause the transport and all sources synced to the transport.
     */
    pause(time: Encoding.Time): this;

    /**
     * Schedule an event along the timeline.
     */
    schedule(callback: Callback, time: Encoding.TransportTime): number;

    /**
     * Schedule an event that will be removed after it is invoked.
     * Note that if the given time is less than the current transport time,
     * the event will be invoked immediately
     */
    scheduleOnce(callback: Callback, time: Encoding.TransportTime): number;

    /**
     * Schedule a repeated event along the timeline.
     * The event will fire at the interval starting at the startTime
     * and for the specified duration.
     */
    scheduleRepeat(callback: Callback, interval: Encoding.Time, startTime?: Encoding.TransportTime, duration?: Encoding.Time): number;

    /**
     * Set the loop start and stop at the same time.
     */
    setLoopPoints(startPosition: Encoding.TransportTime, endPosition: Encoding.TransportTime): this;

    /**
     * Start the transport and all sources synced to the transport.
     */
    start(time?: Encoding.Time, offset?: Encoding.TransportTime): this;

    /**
     * Stop the transport and all sources synced to the transport
     */
    stop(time?: Encoding.Time): this;

    /**
     * Attaches the signal to the tempo control signal so that any
     * changes in the tempo will change the signal in the same ratio.
     */
    syncSignal(signal: Signal, ratio: number): this;

    /**
     * Toggle the current state of the transport.
     * If it is started, it will stop it, otherwise it will
     * start the Transport.
     */
    toggle(time: Encoding.Time): this;

    /**
     * Unsyncs a previously synced signal from the transport’s
     * control. See Tone.Transport.syncSignal.
     */
    unsyncSignal(signal: Signal): this;
  }

  const Transport: Transport;

  /**
   * Tone.TransportEvent is an internal class used by
   * Tone.Transport to schedule events.
   * Do no invoke this class directly, it is handled from within
   * Tone.Transport.
   */
  class TransportEvent extends Tone {
    /**
     * Reference to the Transport that created it
     */
    Transport: Transport;

    /**
     * The callback to invoke
     */
    callback: Callback;

    /**
     * The unique id of the event
     */
    id: number;

    /**
     * The time the event starts
     */
    time: Encoding.Ticks;

    /**
     * Clean up
     */
    dispose(): this;

    /**
     * Invoke the event callback.
     */
    invoke(time: Encoding.Time): void;
  }

  /**
   * Tone.TransportRepeatEvent is an internal class used by
   * Tone.Transport to schedule repeat events. This class should
   * not be instantiated directly
   */
  class TransportRepeatEvent extends TransportEvent {
    /**
     * Clean up
     */
    dispose(): this;

    /**
     * Invoke the callback. Returns the tick time which the
     * next event should be scheduled at
     */
    invoke(time: number): void;
  }

  /**
   * Both Tone.Panner3D and Tone.Listener have a position in 3D
   * space using a right-handed cartesian coordinate system.
   * The units used in the coordinate system are not defined;
   * these coordinates are independent/invariant of any particular
   * units such as meters or feet. Tone.Panner3D objects have an
   * forward vector representing the direction the sound is projecting.
   * Additionally, they have a sound cone representing how directional
   * the sound is. For example, the sound could be omnidirectional,
   * in which case it would be heard anywhere regardless of its forward,
   * or it can be more directional and heard only if it is facing the
   * listener. Tone.Listener objects (representing a person’s ears) have
   * an forward and up vector representing in which direction the person
   * is facing. Because both the source stream and the listener can be
   * moving, they both have a velocity vector representing both the speed
   * and direction of movement. Taken together, these two velocities can
   * be used to generate a doppler shift effect which changes the pitch.
   *
   * Note: the position of the Listener will have no effect on nodes not
   * connected to a Tone.Panner3D
   */
  class Listener extends Tone {
    constructor();

    /**
     * The x coordinate of the listeners front direction.
     * i.e. which way they are facing.
     */
    forwardX: number;

    /**
     * The y coordinate of the listeners front direction.
     * i.e. which way they are facing
     */
    forwardY: number;

    /**
     * The z coordinate of the listeners front direction.
     * i.e. which way they are facing
     */
    forwardZ: number;

    /**
     * The x position of the panner object.
     */
    positionX: number;

    /**
     * The y position of the panner object
     */
    positionY: number;

    /**
     * The z position of the panner object
     */
    positionZ: number;

    /**
     * The x coordinate of the listener’s up direction.
     * i.e. the direction the listener is standing in
     */
    upX: number;

    /**
     * The y coordinate of the listener’s up direction.
     * i.e. the direction the listener is standing in
     */
    upY: number;

    /**
     * The z coordinate of the listener’s up direction.
     * i.e. the direction the listener is standing in.
     */
    upZ: number;

    /**
     * Clean up
     */
    dispose(): this;

    /**
     * Sets the orientation of the listener using two vectors,
     * the forward vector (which direction the listener is facing)
     * and the up vector (which the up direction of the listener).
     * An up vector of 0, 0, 1 is equivalent to the listener standing
     * up in the Z direction.
     */
    setOrientation(x: number, y: number, z: number, upX: number, upY: number, upZ: number): this;

    /**
     * Sets the position of the listener in 3d space
     */
    setPosition(x: number, y: number, z: number): this;
  }

  interface EventObject { time: Encoding.Time; }

  /**
   * A Timeline class for scheduling and maintaining state along
   * a timeline. All events must have a “time” property.
   * Internally, events are stored in time order for fast retrieval.
   */
  class Timeline extends Tone {
    constructor(memory: Encoding.Positive)

    /**
     * The number of items in the timeline.
     */
    readonly length: number;

    /**
     * The memory of the timeline, i.e. how many events in
     * the past it will retain
     */
    memory: Encoding.Positive;

    /**
     * Insert an event object onto the timeline.
     * Events must have a “time” attribute.
     */
    add<T extends EventObject = EventObject>(event: T): this;

    /**
     * Cancel events after the given time
     */
    cancel(time: number): this;

    /**
     * Cancel events before or equal to the given time
     */
    cancelBefore(time: number): this;

    /**
     * Clean up
     */
    dispose(): this;

    /**
     * Iterate over everything in the array
     */
    forEach(callback: Callback): this;

    /**
     * Iterate over everything in the array after the given time
     */
    forEachAtTime(time: number, callback: Callback): this;

    /**
     * Iterate over everything in the array at or before the given time
     */
    forEachBefore(time: number, callback: Callback): this;

    /**
     * Iterate over everything in the array between the startTime
     * and endTime. The timerange is inclusive of the startTime,
     * but exclusive of the endTime.
     */
    forEachBetween(startTime: number, endTime: number, callback: Callback): this;

    /**
     * Iterate over everything in the array at or after the given time.
     * Similar to forEachAfter, but includes the item(s) at the given time
     */
    forEachFrom(time: number, callback: Callback): this;

    /**
     * Get the nearest event whose time is less than or equal to
     * the given time
     */
    get(time: number, comparator: string): void;

    /**
     * Get the event which is scheduled after the given time
     */
    getAfter(time: number, comparator: string): void;

    /**
     * Get the event before the event at the given time
     */
    getBefore(time: number, comparator: string): void;

    /**
     * Return the first event in the timeline without removing it
     */
    peek<T extends EventObject = EventObject>(): T;

    /**
     * Returns the previous event if there is one. null otherwise
     */
    previousEvent<T extends EventObject = EventObject>(event: T): T;

    /**
     * Remove an event from the timeline
     */
    remove<T extends EventObject = EventObject>(event: T): this;

    /**
     * Return the first event in the timeline and remove it
     */
    shift<T extends EventObject = EventObject>(): T;
  }

  /**
   * A Timeline State. Provides the methods:
   * setStateAtTime("state", time) and getValueAtTime(time).
   */
  class TimelineState extends Timeline {
    constructor(initial: string | undefined)

    /**
     * Return the event before the time with the given state
     */
    getLastState<T extends EventObject = EventObject>(state: State, time: Encoding.Time): T;

    /**
     * Return the event after the time with the given state
     */
    getNextState<T extends EventObject = EventObject>(state: State, time: Encoding.Time): T;

    /**
     * Returns the scheduled state scheduled before or at the given time
     */
    getValueAtTime(time: number): string;

    /**
     * Add a state to the timeline
     */
    setStateAtTime(state: string, time: number): this;
  }

  class Param<E = Encoding.Default, T = number> extends AudioNode {
    constructor(param: AudioParam, units: Unit, convert: boolean)

    /**
     * If the value should be converted or not
     */
    convert: boolean;

    /**
     * The units of the parameter
     */
    units: Encoding.Default;

    /**
     * The current value of the parameter
     */
    value: T;

    /**
     * The minimum output value of the parameter
     */
    minValue: number;

    /**
     * The maximum output value of the parameter
     */
    maxValue: number;

    /**
     * This is similar to cancelScheduledValues except it holds
     * the automated value at time until the next automated event
     */
    cancelAndHoldAtTime(time: Encoding.Time): this;

    /**
     * Cancels all scheduled parameter changes with times greater
     * than or equal to startTime
     */
    cancelScheduledValues(time: Encoding.Time): this;

    /**
     * Start exponentially approaching the target value at the
     * given time. Since it is an exponential approach it will
     * continue approaching after the ramp duration. The rampTime
     * is the time that it takes to reach over 99% of the way towards
     * the value. This methods is similar to setTargetAtTime except
     * the third argument is a time instead of a ‘timeConstant’
     */
    exponentialApproachValueAtTime(value: E, time: Encoding.Time, rampTime: Encoding.Time): this;

    /**
     * Schedules an exponential continuous change in parameter
     * value from the current time and current value to the given
     * value over the duration of the rampTime
     */
    exponentialRampTo(value: E, rampTime: Encoding.Time, startTime?: Encoding.Time): this;

    /**
     * Schedules an exponential continuous change in parameter value
     * from the previous scheduled parameter value to the given value
     */
    exponentialRampToValueAtTime(value: E, endTime: Encoding.Time): this;

    /**
     * Get the signals value at the given time. Subsequent scheduling
     * may invalidate the returned value
     */
    getValueAtTime(time: Encoding.Time): T;

    /**
     * Schedules an linear continuous change in parameter value from
     * the current time and current value to the given value over
     * the duration of the rampTime
     */
    linearRampTo(value: E, rampTime: Encoding.Time, startTime?: Encoding.Time): this;

    /**
     * Schedules a linear continuous change in parameter value from
     * the previous scheduled parameter value to the given value
     */
    linearRampToValueAtTime(value: E, endTime: Encoding.Time): this;

    /**
     * Ramps to the given value over the duration of the rampTime.
     * Automatically selects the best ramp type (exponential or linear)
     * depending on the units of the signal
     */
    rampTo(value: E, rampTime: Encoding.Time, startTime?: Encoding.Time): this;

    /**
     * Creates a schedule point with the current value at the current
     * time. This is useful for creating an automation anchor point
     * in order to schedule changes from the current value
     */
    setRampPoint(now?: Encoding.Time): this;

    /**
     * Start exponentially approaching the target value at the
     * given time with a rate having the given time constant
     */
    setTargetAtTime(value: E, startTime: Encoding.Time, timeConstant: Encoding.Time): this;

    /**
     * Schedules a parameter value change at the given time
     */
    setValueAtTime(value: E, time: Encoding.Time): this;

    /**
     * Sets an array of arbitrary parameter values starting at
     * the given time for the given duration
     */
    setValueCurveAtTime(values: ReadonlyArray<E>, startTime: Encoding.Time, duration: Encoding.Time, scaling?: Encoding.NormalRange): this;

    /**
     * Start exponentially approaching the target value at the given time.
     * Since it is an exponential approach it will continue approaching
     * after the ramp duration. The rampTime is the time that it takes
     * to reach over 99% of the way towards the value
     */
    targetRampTo(value: E, rampTime: Encoding.Time, startTime?: Encoding.Time): this;

    /**
     * Clean up
     */
    dispose(): this;

    private _exponentialApproach(t0: number, v0: number, t1: number, timeConstant: number, t: number): number;
    private _linearInterpolate(t0: number, v0: number, t1: number, v1: number, t: number): number;
    private _exponentialInterpolate(t0: number, v0: number, t1: number, v1: number, t: number): number;
  }

  /**
   * Similar to Tone.Timeline, but all events represent intervals
   * with both “time” and “duration” times. The events are placed in
   * a tree structure optimized for querying an intersection point with
   * the timeline events. Internally uses an Interval Tree to
   * represent the data
   */
  class IntervalTimeline extends Tone {
    /**
     * The number of items in the timeline
     */
    readonly length: number;

    /**
     * Insert an event object onto the timeline.
     * Events must have a “time” attribute.
     */
    add<T extends EventObject = EventObject>(event: T): this;

    /**
     * Cancel events after the given time
     */
    cancel(time: number): this;

    /**
     * Clean up
     */
    dispose(): this;

    /**
     * Iterate over everything in the timeline
     */
    forEach(callback: Callback): this;

    /**
     * Iterate over everything in the array in which
     * the given time overlaps with the time and duration
     * time of the event
     */
    forEachAtTime(time: number, callback: Callback): this;

    /**
     * Iterate over everything in the array in which the time
     * is greater than or equal to the given time
     */
    forEachFrom(time: number, callback: Callback): this;

    /**
     * Get an event whose time and duration span the give time.
     * Will return the match whose “time” value is closest to
     * the given time
     */
    get<T extends EventObject = EventObject>(event: T): T;

    /**
     * Remove an event from the timeline
     */
    remove<T extends EventObject = EventObject>(event: T): this;
  }


  /**
   * Tone.Draw is useful for synchronizing visuals and audio events.
   * Callbacks from Tone.Transport or any of the Tone.Event classes
   * always happen before the scheduled time and are not synchronized
   * to the animation frame so they are not good for triggering tightly
   * synchronized visuals and sound. Tone.Draw makes it easy to
   * schedule callbacks using the AudioContext time and
   * uses requestAnimationFrame
   */
  interface Draw extends Tone {
    /**
     * The amount of time before the scheduled time that the
     * callback can be invoked. Default is half the time of an
     * animation frame (0.008 seconds)
     */
    anticipation: number;

    /**
     * The duration after which events are not invoked
     */
    expiration: number;

    /**
     * Cancel events scheduled after the given time
     */
    cancel(after?: Encoding.Time): this;

    /**
     * Schedule a function at the given time to be invoked on the
     * nearest animation frame
     */
    schedule(callback: Callback, time: Encoding.Time): this;
  }

  const Draw: Draw;

  //------------------
  // Component Classes
  //------------------

  /**
   * Tone.Compressor is a thin wrapper around the Web Audio
   * DynamicsCompressorNode. Compression reduces the volume of
   * loud sounds or amplifies quiet sounds by narrowing or “compressing”
   * an audio signal’s dynamic range
   */
  class Compressor extends AudioNode {
    constructor(threshold?: Encoding.Decibels | object, ratio?: Encoding.Positive)

    /**
     * The attack parameter
     */
    attack: Param<Encoding.Time>;

    /**
     * The knee parameter
     */
    knee: Param<Encoding.Decibels>;

    /**
     * The ratio value
     */
    ratio: Param<number>;

    /**
     * The release parameter
     */
    release: Param<Encoding.Time>;

    /**
     * The threshold value
     */
    threshold: Param<Encoding.Decibels>;
  }

  /**
   * Tone.Gate only passes a signal through when the incoming
   * signal exceeds a specified threshold. To do this, Gate uses
   * a Tone.Follower to follow the amplitude of the incoming signal
   */
  class Gate extends AudioNode {
    constructor(threshold?: Encoding.Decibels | object, attack?: Encoding.Time, release?: Encoding.Time)

    /**
     * The attack parameter
     */
    attack: Follower["attack"];

    /**
     * The release parameter
     */
    release: Follower["release"];

    /**
     * The threshold value
     */
    threshold: GreaterThan<Encoding.Decibels>["value"];
  }

  /**
   * Get the current waveform data of the connected audio source
   */
  class FFT extends AudioNode {
    constructor(size?: number)

    /**
     * The size of analysis. This must be a power of two in
     * the range 32 to 32768
     */
    size: Analyser["size"];
  }

  /**
   * Tone.Solo lets you isolate a specific audio stream.
   * When an instance is set to solo=true, it will mute all
   * other instances
   */
  class Solo extends AudioNode {
    /**
     * The input and output node
     */
    input: Gain;

    /**
     * If the current instance is muted
     */
    readonly muted: boolean;

    /**
     * Isolates this instance and mutes all other instances of
     * Tone.Solo. Only one instance can be soloed at a time.
     * A soloed instance will report solo=false when another
     * instance is soloed
     */
    solo: boolean;
  }

  /**
   * Tone.Limiter will limit the loudness of an incoming signal.
   * It is composed of a Tone.Compressor with a fast attack and release.
   * Limiters are commonly used to safeguard against signal clipping.
   * Unlike a compressor, limiters do not provide smooth gain reduction
   * and almost completely prevent additional gain above the threshold
   */
  class Limiter extends AudioNode {
    constructor(threshold: number)

    /**
     * The threshold of the limiter
     */
    threshold: Compressor["threshold"];
  }

  /**
   * Tone.Mono coerces the incoming mono or stereo signal into a mono
   * signal where both left and right channels have the same value.
   * This can be useful for stereo imaging
   */
  class Mono extends AudioNode {}

  /**
   * Tone.Meter gets the RMS of an input signal with some averaging
   * applied. It can also get the raw value of the input signal
   */
  class Meter extends AudioNode {
    constructor(smoother: number)

    /**
     * A value from 0 -> 1 where 0 represents no time averaging
     * with the last analysis frame.
     */
    readonly smoothing: number;

    /**
     * Get the current decibel value of the incoming signal
     */
    getLevel(): Encoding.Decibels;

    /**
     * Get the signal value of the incoming signal
     */
    getValue(): number;
  }

  /**
   * Tone.Panner is an equal power Left/Right Panner and
   * does not support 3D. Panner uses the StereoPannerNode
   * when available
   */
  class Panner extends AudioNode {
    constructor(initialPan?: Encoding.NormalRange);

    /**
     * The pan control. -1 = hard left, 1 = hard right
     */
    pan: StereoPannerNode["pan"];
  }

  type EnvelopeCurve = 'linear' |
    'exponential' |
    'sine' |
    'cosine' |
    'bounce' |
    'ripple' |
    'step' |
    number[];

  /**
   * Tone.Envelope is an ADSR envelope generator.
   * Tone.Envelope outputs a signal which can be connected to an
   * AudioParam or Tone.Signal
   */
  class Envelope extends AudioNode {
    constructor(attack?: Encoding.Time, decay?: Encoding.Time, sustain?: Encoding.NormalRange, release?: Encoding.Time)

    /**
     * When triggerAttack is called, the attack time is the
     * amount of time it takes for the envelope to reach it’s
     * maximum value
     */
    attack: Encoding.Time;

    /**
     * The shape of the attack. Can be any of these strings:
     * linear, exponential, sine, cosine, bounce, ripple, step
     * Can also be an array which describes the curve.
     * Values in the array are evenly subdivided and linearly
     * interpolated over the duration of the attack
     */
    attackCurve: EnvelopeCurve;

    /**
     * After the attack portion of the envelope, the value will
     * fall over the duration of the decay time to it’s sustain value
     */
    decay: Encoding.Time;
     
    /**
     * The shape of the decay
     */
    decayCurve: EnvelopeCurve;

    /**
     * After triggerRelease is called, the envelope’s value will
     * fall to it’s miminum value over the duration of the release time
     */
    release: Encoding.Time;

    /**
     * The shape of the release
     */
    releaseCurve: EnvelopeCurve;

    /**
     * The sustain value is the value which the envelope rests
     * at after triggerAttack is called, but before triggerRelease
     * is invoked
     */
    sustain: Encoding.NormalRange;

    /**
     * Read the current value of the envelope. Useful for
     * syncronizing visual output to the envelope
     */
    readonly value: number;

    /**
     * Cancels all scheduled envelope changes after the given time
     */
    cancel(after: Encoding.Time): this;

    /**
     * Get the scheduled value at the given time.
     * This will return the unconverted (raw) value
     */
    getValueAtTime(time: number): number;

    /**
     * Trigger the attack portion of the ADSR envelope
     */
    triggerAttack(time?: Encoding.Time, velocity?: Encoding.NormalRange): this;

    /**
     * triggerAttackRelease is shorthand for triggerAttack,
     * then waiting some duration, then triggerRelease
     */
    triggerAttackRelease(duration: Encoding.Time, time?: Encoding.Time, velocity?: Encoding.NormalRange): this;

    /**
     * Triggers the release of the envelope
     */
    triggerRelease(time?: Encoding.Time): this;
  }

  /**
   * Tone.Crossfade provides equal power fading between two inputs
   */
  class CrossFade extends AudioNode {
    constructor(initialFade?: Encoding.NormalRange)

    /**
     * Alias for input[0]
     */
    a: Gain;

    /**
     * Alias for input[1]
     */
    b: Gain;

    /**
     * The mix between the two inputs. A fade value of 0 will
     * output 100% input[0] and a value of 1 will output 100%
     * input[1]
     */
    fade: Signal<Encoding.NormalRange>;
  }

  /**
   * Tone.Split splits an incoming signal into left and right channels
   */
  class Split extends AudioNode {
    /**
     * Left channel output. Alias for output[0]
     */
    left: Gain;

    /**
     * Right channel output. Alias for output[1]
     */
    right: Gain;
  }

  /**
   * LFO stands for low frequency oscillator. Tone.LFO produces an output
   * signal which can be attached to an AudioParam or Tone.Signal in order
   * to modulate that parameter with an oscillator. The LFO can also be
   * synced to the transport to start/stop and change when the tempo changes
   */
  class LFO extends AudioNode {
    constructor(frequency?: Encoding.Frequency | object, min?: number, max?: number)

    /**
     * The amplitude of the LFO, which controls the output range
     * between the min and max output. For example if the min is
     * -10 and the max is 10, setting the amplitude to 0.5 would
     * make the LFO modulate between -5 and 5
     */
    amplitude: Oscillator["volume"];

    /**
     * The LFO's frequency
     */
    frequency: Oscillator["frequency"];

    /**
     * The maximum output of the LFO
     */
    max: Scale["max"];

    /**
     * The minimum output of the LFO
     */
    min: Scale["min"];

    /**
     * Mute the output
     */
    mute: boolean;

    /**
     * The phase of the LFO
     */
    phase: number;

    /**
     * Returns the playback state of the source, either
     * “started” or “stopped”
     */
    readonly state: State;

    /**
     * The type of the oscillator: sine, square, sawtooth, triangle
     */
    type: Oscillator["type"];

    /**
     * The output units of the LFO
     */
    units: Encoding.Default;

    /**
     * Start the LFO
     */
    start(time?: Encoding.Time): this;

    /**
     * Stop the LFO
     */
    stop(time?: Encoding.Time): this;

    /**
     * Sync the start/stop/pause to the transport and the
     * frequency to the bpm of the transport
     */
    sync(): this;

    /**
     * Unsync the LFO from the transport control
     */
    unsync(): this;
  }

  /**
   * Tone.EQ3 is a three band EQ with control over low, mid, and high
   * gain as well as the low and high crossover frequencies
   */
  class EQ3 extends AudioNode {
    constructor(lowLevel?: Encoding.Decibels, midLevel?: Encoding.Decibels, highLevel?: Encoding.Decibels)

    /**
     * The Q value for all of the filters
     */
    Q: MultibandSplit["Q"];

    /**
     * The gain in decibels of the high part
     */
    high: Gain["gain"];

    /**
     * The mid/high crossover frequency
     */
    highFrequency: MultibandSplit["highFrequency"];

    /**
     * The gain in decibels of the low part
     */
    low: Gain["gain"];

    /**
     * The low/mid crossover frequency
     */
    lowFrequency: MultibandSplit["lowFrequency"];

    /**
     * The gain in decibels of the mid part
     */
    mid: Gain["gain"];
  }

  type AnalysisType = 'fft' | 'waveform';

  /**
   * Wrapper around the native Web Audio’s AnalyserNode.
   * Extracts FFT or Waveform data from the incoming signal
   */
  class Analyser extends AudioNode {
    constructor(type?: AnalysisType, size?: number)

    /**
     * The size of analysis. This must be a power of two in the
     * range 32 to 32768
     */
    size: number;

    /**
     * 0 represents no time averaging with the last analysis fram
     */
    smoothing: AnalyserNode["smoothingTimeConstant"];

    /**
     * The analysis function returned by analyser.getValue(),
     * either “fft” or “waveform”
     */
    type: AnalysisType;

    /**
     * Run the analysis given the current settings and return
     * the result as a TypedArray
     */
    getValue(): Float32Array;
  }

  /**
   * Tone.Follower is a crude envelope follower which will
   * follow the amplitude of an incoming signal. Take care with
   * small (< 0.02) attack or decay values as follower has some
   * ripple which is exaggerated at these values
   */
  class Follower extends AudioNode {
    constructor(attack?: Encoding.Time | Object, release?: Encoding.Time);

    /**
     * The attack time
     */
    attack: Encoding.Time;

    /**
     * The release time
     */
    release: Encoding.Time;

    /**
     * When signals connect to other signals or AudioParams,
     * they take over the output value of that signal or AudioParam.
     * For all other nodes, the behavior is the same as a default
     * connect
     */
    connect(node: SignalNode, outputNumber?: number, inputNumber?: number): this;
  }


  interface VolumeOptions {
    volume?: Encoding.Decibels;
    mute?: boolean;
  }

  /**
   * Tone.Volume is a simple volume node, useful for creating a
   * volume fader
   */
  class Volume extends AudioNode {
    constructor(volume?: Encoding.Decibels)
    constructor(options?: VolumeOptions)

    /**
     * The output node
     */
    private output: Gain;

    /**
     * Mute the output
     */
    mute: boolean;

    /**
     * Volume control in decibels
     */
    volume: Gain['gain'];
  }

  /**
   * Tone.Merge brings two signals into the left and right
   * channels of a single stereo channel
   */
  class Merge extends AudioNode {
    /**
     * The left input channel. Alias for input[0]
     */
    left: Gain;

    /**
     * The right input channel. Alias for input[1]
     */
    right: Gain;
  }

  export type FilterType = 'lowpass'
    | 'highpass'
    | 'bandpass'
    | 'lowshelf'
    | 'highshelf'
    | 'notch'
    | 'allpass'
    | 'peaking';

  export type FilterRolloff = -12 | -24 | -48 | -96

  interface FilterOptions {
    type?: FilterType;
    frequency?: Encoding.Frequency;
    rolloff?: FilterRolloff;
    Q?: Encoding.Positive;
    gain?: Encoding.Gain;
  }

  /**
   * Tone.Filter is a filter which allows for all of the same
   * native methods as the BiquadFilterNode. Tone.Filter has
   * the added ability to set the filter rolloff at
   * -12 (default), -24 and -48
   */
  class Filter extends AudioNode {
    constructor(options?: FilterOptions);
    constructor(frequency?: Encoding.Frequency, type?: FilterType, rolloff?: FilterRolloff)

    /**
     * The Q or Quality of the filter
     */
    readonly Q: Signal<Encoding.Positive>;

    /**
     * The detune parameter
     */
    readonly detune: Signal<Encoding.Cents>;

    /**
     * The cutoff frequency of the filter
     */
    readonly frequency: Signal<Encoding.Frequency>;

    /**
     * The gain of the filter, only used in certain filter Encoding
     */
    readonly gain: Signal<Encoding.Gain>;

    /**
     * The rolloff of the filter which is the drop in db per octave.
     * Implemented internally by cascading filters. Only accepts
     * the values -12, -24, -48 and -96
     */
    rolloff: FilterRolloff;

    /**
     * The type of the filter. Encoding: “lowpass”, “highpass”,
     * “bandpass”, “lowshelf”, “highshelf”, “notch”, “allpass”,
     * or “peaking”
     */
    type: FilterType;
  }

  /**
   * Get the current waveform data of the connected audio source
   */
  class Waveform extends AudioNode {
    constructor(size?: number)

    /**
     * The size of analysis. This must be a power of two in
     * the range 32 to 32768
     */
    size: number;

    /**
     * Gets the waveform of the audio source. Returns
     * the waveform data of length size as a Float32Array with
     * values between -1 and 1
     */
    getValue(): ReadonlyArray<number>;
  }

  interface CompressorOptions {
    ratio?: number;
    threshold?: number;
    release?: number;
    attack?: number;
    knee?: number;
  }

  interface MidSideCompressorOptions {
    mid?: CompressorOptions;
    side?: CompressorOptions;
  }

  /**
   * Tone.MidSideCompressor applies two different compressors
   * to the mid and side signal components
   */
  class MidSideCompressor extends AudioNode {
    constructor(options: MidSideCompressorOptions)

    /**
     * The compressor applied to the mid signal
     */
    mid: Compressor;

    /**
     * The compressor applied to the side signal
     */
    side: Compressor;
  }

  /**
   * Tone.Lowpass is a lowpass feedback comb filter. It
   * is similar to Tone.FeedbackCombFilter, but includes a
   * lowpass filter
   */
  class LowpassCombFilter extends AudioNode {
    constructor(delayTime?: Encoding.Time | object, resonance?: Encoding.NormalRange, dampening?: Encoding.Frequency)

    /**
     * The dampening control of the feedback
     */
    dampening: Param<Encoding.Frequency>;

    /**
     * The delayTime of the comb filter
     */
    delayTime: Delay["delayTime"];

    /**
     * The amount of feedback of the delayed signal
     */
    resonance: Gain["gain"];
  }

  /**
   * Tone.PanVol is a Tone.Panner and Tone.Volume in one
   */
  class PanVol extends AudioNode {
    constructor(pan: Encoding.AudioRange, volume: number)

    /**
     * Mute/unmute the volume
     */
    mute: boolean;

    /**
     * The L/R panning control
     */
    pan: Panner["pan"];

    /**
     * The volume control in decibels
     */
    volume: Volume["volume"];
  }

  /**
   * Split the incoming signal into three bands (low, mid, high)
   * with two crossover frequency controls
   */
  class MultibandSplit extends AudioNode {
    constructor(lowFrequency?: Encoding.Frequency | object, highFrequency?: Encoding.Frequency)

    /**
     * The quality of all the filters
     */
    Q: Signal<number>;

    /**
     * The high band output. Alias for output[2]
     */
    high: Filter;

    /**
     * The mid/high crossover frequency
     */
    highFrequency: Signal<Encoding.Frequency>;

    /**
     * The low band output. Alias for output[0]
     */
    low: Filter;

    /**
     * The low/mid crossover frequency
     */
    lowFrequency: Signal<Encoding.Frequency>;

    /**
     * The mid band output. Alias for output[1]
     */
    mid: Filter;
  }

  /**
   * Comb filters are basic building blocks for physical modeling
   */
  class FeedbackCombFilter extends AudioNode {
    constructor(delayTime?: Encoding.Time | object, resonance?: Encoding.NormalRange)

    /**
     * The amount of delay of the comb filter
     */
    delayTime: Delay["delayTime"];

    /**
     * The amount of feedback of the delayed signal
     */
    resonance: Gain["gain"];
  }

  interface CompressorOptions {
    ratio?: number;
    threshold?: number;
    release?: number;
    attack?: number;
    knee?: number;
  }

  interface MultibandCompressorOptions {
    low?: CompressorOptions;
    mid?: CompressorOptions;
    high?: CompressorOptions;
    lowFrequency?: Encoding.Frequency;
    highFrequency?: Encoding.Frequency;
  }

  /**
   * A compressor with seperate controls over low/mid/high dynamics
   */
  class MultibandCompressor extends AudioNode {
    constructor(options: MultibandCompressorOptions)

    /**
     * The compressor applied to the high frequencies
     */
    high: Compressor;

    /**
     * The mid/high crossover frequency
     */
    highFrequency: Signal<Encoding.Frequency>;

    /**
     * The compressor applied to the low frequencies
     */
    low: Compressor;

    /**
     * The low/mid crossover frequency
     */
    lowFrequency: Signal<Encoding.Frequency>;

    /**
     * The compressor applied to the mid frequencies
     */
    mid: Compressor;
  }

  interface ADSREnvelopeOptions {
    attack?: Encoding.Time;
    attackCurve?: EnvelopeCurve;
    decay?: Encoding.Time;
    decayCurve?: EnvelopeCurve;
    sustain?: Encoding.NormalRange;
    release?: Encoding.Time;
    releaseCurve?: EnvelopeCurve;
  }

  interface FrequencyEnvelopeOptions extends ADSREnvelopeOptions {
    baseFrequency?: Encoding.Frequency;
    octaves?: Encoding.Positive;
    exponent?: number;
  }

  /**
   * Tone.FrequencyEnvelope is a Tone.ScaledEnvelope, but
   * instead of min and max it’s got a baseFrequency and octaves
   * parameter
   */
  class FrequencyEnvelope extends Envelope {
    constructor(options: FrequencyEnvelopeOptions)
    constructor(attack: Encoding.Time, decay: Encoding.Time, sustain: Encoding.NormalRange, release: Encoding.Time)

    /**
     * The envelope's minimum output value. This is the value
     * which it starts at
     */
    baseFrequency: Encoding.Frequency;

    /**
     * The envelope's exponent value
     */
    exponent: number;

    /**
     * The number of octaves above the baseFrequency that
     * the envelope will scale to
     */
    octaves: Encoding.Positive;
  }

  interface ScaledEnvelopeOptions extends ADSREnvelopeOptions {
    min?: number;
    max?: number;
    exponent?: number;
  }

  /**
   * Tone.ScaledEnvelop is an envelope which can be scaled to
   * any range. It’s useful for applying an envelope to a frequency
   * or any other non-NormalRange signal parameter
   */
  class ScaledEnvelope extends Envelope {
    constructor(options: FrequencyEnvelopeOptions)
    constructor(attack: Encoding.Time, decay: Encoding.Time, sustain: Encoding.NormalRange, release: Encoding.Time)

    /**
     * The envelope's exponent value
     */
    exponent: number;

    /**
     * The envelope's max output value
     */
    max: number;

    /**
     * The envelope's min output value.
     * This is the value it starts at.
     */
    min: number;
  }

  interface AmplitudeEnvelopeOptions extends ADSREnvelopeOptions {}

  /**
   * Tone.AmplitudeEnvelope is a Tone.Envelope connected to a
   * gain node. Unlike Tone.Envelope, which outputs the envelope’s
   * value, Tone.AmplitudeEnvelope accepts an audio signal as the
   * input and will apply the envelope to the amplitude of the signal
   */
  class AmplitudeEnvelope extends Envelope {
    constructor(options: AmplitudeEnvelopeOptions)
    constructor(attack?: Encoding.Time, decay?: Encoding.Time, sustain?: Encoding.NormalRange, release?: Encoding.Time,)
  }

  type DistanceModel = 'linear' | 'inverse' | 'exponential';
  type PanningModel = 'equalpower' | 'HRTF';

  /**
   * A spatialized panner node which supports equalpower or
   * HRTF panning. Tries to normalize the API across various browsers
   */
  class Panner3D extends AudioNode {
    constructor(positionX: number, positionY: number, positionZ: number)

    /**
     * The angle, in degrees, inside of which there will be no
     * volume reduction
     */
    coneInnerAngle: Encoding.Degrees;

    /**
     * The angle, in degrees, outside of which the volume will reduced
     * to a constant value of coneOuterGain
     */
    coneOuterAngle: Encoding.Degrees;

    /**
     * The gain outside of the coneOuterAngle
     */
    coneOuterGain: Gain;

    /**
     * The distance model used by, “linear”, “inverse”, or “exponential”
     */
    distanceModel: DistanceModel;

    /**
     * The maximum distance between source and listener, after
     * which the volume will not be reduced any further
     */
    maxDistance: Encoding.Positive;

    /**
     * The x orientation of the panner object
     */
    orientationX: number;

    /**
     * The y orientation of the panner object
     */
    orientationY: number;

    /**
     * The z orientation of the panner object
     */
    orientationZ: number;

    /**
     * The panning model. Either “equalpower” or “HRTF”
     */
    panningModel: PanningModel;

    /**
     * The x position of the panner object
     */
    positionX: number;

    /**
     * The y position of the panner object
     */
    positionY: number;

    /**
     * The z position of the panner object
     */
    positionZ: number;

    /**
     * A reference distance for reducing volume as source move
     * further from the listener
     */
    refDistance: number;

    /**
     * Describes how quickly the volume is reduced as source
     * moves away from listener
     */
    rolloffFactor: number;

    /**
     * Sets the orientation of the source in 3D space
     */
    setOrientation(x: number, y: number, z: number): this;

    /**
     * Sets the position of the source in 3D space
     */
    setPosition(x: number, y: number, z: number): this;
  }

  /**
   * Mid/Side processing separates the the ‘mid’ signal (which
   * comes out of both the left and the right channel) and the
   * ‘side’ (which only comes out of the the side channels).
   * MidSideMerge merges the mid and side signal after they’ve
   * been seperated by Tone.MidSideSplit
   */
  class MidSideMerge extends AudioNode {
    /**
     * The mid signal input. Alias for input[0]
     */
    mid: Gain;

    /**
     * The side signal input. Alias for input[1]
     */
    side: Gain;

    /**
     * Multiply the left by sqrt(1/2)
     */
    private _timesTwoLeft: Multiply;

    /**
     * Multiply the right by sqrt(1/2)
     */
    private _timesTwoRight: Multiply;
  }

  /**
   * Mid/Side processing separates the the ‘mid’ signal (which
   * comes out of both the left and the right channel) and the
   * ‘side’ (which only comes out of the the side channels)
   */
  class MidSideSplit extends AudioNode {
    /**
     * Multiply the _midAdd by sqrt(1/2)
     */
    mid: Multiply;

    /**
     * Multiply the _sideSubtract by sqrt(1/2)
     */
    side: Multiply;

    /**
     * The mid send. Connect to mid processing. Alias for output[0]
     */
    private _midAdd: Add;

    /**
     * The side output. Connect to side processing. Alias for Output[1]
     */
    private _sideSubtract: Subtract;
  }

  //-------------------
  // Instrument Classes
  //-------------------

  interface InstrumentOptions {
    volume: Encoding.Decibels;
  }

  /**
   * Base-class for all instruments
   */
  class Instrument<O = InstrumentOptions> extends AudioNode {
    constructor(opts?: O)

    /**
     * The volume of the output in decibels.
     */
    volume: Volume["volume"];

    /**
     * Clean up
     */
    dispose(): this;

    /**
     * Sync the instrument to the Transport. All subsequent calls
     * of triggerAttack and triggerRelease will be scheduled
     * along the transport
     */
    sync(): this;

    /**
     * Trigger the attack and then the release after the duration
     */
    triggerAttackRelease(
      note: Encoding.Frequency,
      duration: Encoding.Time,
      time?: Encoding.Time,
      velocity?: Encoding.NormalRange
    ): this;

    /**
     * Unsync the instrument from the Transport
     */
    unsync(): this;
  }

  /**
   * This is an abstract base class for other monophonic instruments
   * to extend.
   *
   * IMPORTANT: It does not make any sound on its own and shouldn’t
   * be directly instantiated.
   */
  class Monophonic<O> extends Instrument<O> {
    /**
     * The glide time between notes
     */
    portamento: Encoding.Time;

    /**
     * Get the level of the output at the given time.
     * Measures the envelope(s) value at the time
     */
    getLevelAtTime(time: Encoding.Time): Encoding.NormalRange;

    /**
     * Set the note at the given time. If no time is given,
     * the note will set immediately
     */
    setNote(note: Encoding.Frequency, time?: Encoding.Time): this;

    /**
     * Trigger the attack of the note optionally with a given velocity
     */
    triggerAttack(note: Encoding.Frequency, time?: Encoding.Time, velocity?: number): this;

    /**
     * Trigger the release portion of the envelope
     */
    triggerRelease(time?: Encoding.Time): this;
  }

  interface NoiseSynthOptions {
    noise: { type: NoiseType; };
    envelope?: ADSREnvelopeOptions;
  }

  /**
   * Tone.NoiseSynth is composed of a noise generator (Tone.Noise),
   * one filter (Tone.Filter), and two envelopes (Tone.Envelop).
   * One envelope controls the amplitude of the noise and the other
   * is controls the cutoff frequency of the filter
   */
  class NoiseSynth extends Instrument {
    constructor(options: NoiseSynthOptions)

    /**
     * The amplitude envelope
     */
    envelope: AmplitudeEnvelope;

    /**
     * The noise source
     */
    noise: Noise;

    /**
     * Trigger the attack of the note optionally with a given velocity
     */
    triggerAttack(note: Encoding.Frequency, time?: Encoding.Time, velocity?: number): this;

    /**
     * Trigger the release portion of the envelope
     */
    triggerRelease(time?: Encoding.Time): this;
  }

  interface OscillatorOptions<T = BasicOscillatorType> {
    type?: T;
    modulationType?: T;
    modulationIndex?: number;
    harmonicity?: number;
  }

  interface SynthOptions {
    oscillator?: OscillatorOptions<OscillatorType>;
    envelope?: ADSREnvelopeOptions;
  }

  /**
   * Tone.Synth is composed simply of a Tone.OmniOscillator
   * routed through a Tone.AmplitudeEnvelope
   */
  class Synth extends Monophonic<SynthOptions> {
    /**
     * The detune control
     */
    detune: OmniOscillator["detune"];

    /**
     * The amplitude envelope
     */
    envelope: AmplitudeEnvelope;

    /**
     * The frequency control
     */
    frequency: OmniOscillator["frequency"];

    /**
     * The oscillator
     */
    oscillator: OmniOscillator;
  }

  interface AMSynthOptions {
    harmonicity?: Encoding.Positive;
    detune?: Encoding.Cents;
    oscillator?: OscillatorOptions;
    envelope?: ADSREnvelopeOptions;
    modulation?: OscillatorOptions;
    modulationEnvelope?: ADSREnvelopeOptions;
  }

  /**
   * AMSynth uses the output of one Tone.Synth to modulate
   * the amplitude of another Tone.Synth. The harmonicity
   * (the ratio between the two signals) affects the timbre
   * of the output signal greatly
   */
  class AMSynth extends Monophonic<AMSynthOptions> {
    /**
     * The detune control
     */
    detune: Signal<Encoding.Cents>;

    /**
     * The amplitude envelope
     */
    envelope: Synth["envelope"];

    /**
     * The frequency
     */
    frequency: Signal<Encoding.Frequency>;

    /**
     * Harmonicity is the ratio between the two voices. A
     * harmonicity of 1 is no change. Harmonicity = 2 means a
     * change of an octave
     */
    harmonicity: Multiply<Encoding.Positive>;

    /**
     * The modulator’s oscillator which is applied to the
     * amplitude of the oscillator
     */
    modulation: Oscillator;

    /**
     * The modulator’s envelope
     */
    modulationEnvelope: AmplitudeEnvelope;

    /**
     * The oscillator
     */
    oscillator: OmniOscillator;
  }

  interface MonoSynthOptions {
    frequency?: Encoding.Frequency;
    detune?: Encoding.Cents;
    oscillator?: OscillatorOptions;
    filter?: FilterOptions;
    envelope?: ADSREnvelopeOptions;
    filterEnvelope?: FrequencyEnvelopeOptions;
  }

  /**
   * Tone.MonoSynth is composed of one oscillator, one
   * filter, and two envelopes. The amplitude of the Tone.Oscillator
   * and the cutoff frequency of the Tone.Filter are
   * controlled by Tone.Envelopes
   */
  class MonoSynth extends Monophonic<MonoSynthOptions> {
    /**
     * The detune control
     */
    detune: OmniOscillator["detune"];

    /**
     * The amplitude envelope
     */
    envelope: AmplitudeEnvelope;

    /**
     * The frequency
     */
    frequency: OmniOscillator["frequency"];

    /**
     * The modulator’s oscillator which is applied to the
     * amplitude of the oscillator
     */
    filter: Filter;

    /**
     * The modulator’s envelope
     */
    filterEnvelope: FrequencyEnvelope;

    /**
     * The oscillator
     */
    oscillator: OmniOscillator;
  }

  interface VoiceOptions {
    volume?: Encoding.Decibels;
    portamento?: number;
    oscillator?: OscillatorOptions;
    filterEnvelope?: ADSREnvelopeOptions;
    envelope?: ADSREnvelopeOptions;
  }

  interface DuoSynthOptions {
    vibratoAmount?: Encoding.Positive;
    vibratoRate?: Encoding.Frequency;
    harmonicity?: Encoding.Positive;
  }

  /**
   * Tone.DuoSynth is a monophonic synth composed of two
   * MonoSynths run in parallel with control over the frequency
   * ratio between the two voices and vibrato effect
   */
  class DuoSynth extends Monophonic<DuoSynthOptions> {
    /**
     * The frequency control
     */
    frequency: Signal<Encoding.Frequency>;

    /**
     * Harmonicity is the ratio between the two voices. A
     * harmonicity of 1 is no change. Harmonicity = 2 means
     * a change of an octave
     */
    harmonicity: Multiply<Encoding.Positive>;

    /**
     * The amount of vibrato
     */
    vibratoAmount: Gain["gain"];

    /**
     * The vibrato frequency
     */
    vibratoRate: LFO["frequency"];

    /**
     * The first voice
     */
    voice0: MonoSynth;

    /**
     * The second voice
     */
    voice1: MonoSynth;
  }

  interface SamplesObject {
    [note: string]: string;
  }

  /**
   * Automatically interpolates between a set of pitched
   * samples. Pass in an object which maps the note’s pitch
   * or midi value to the url, then you can trigger the attack
   * and release of that note like other instruments. By
   * automatically repitching the samples, it is possible to
   * play pitches which were not explicitly included which
   * can save loading time. For sample or buffer playback where repitching
   * is not necessary, use Tone.Player
   */
  class Sampler extends Instrument {
    constructor(samples: SamplesObject, onload?: Callback, baseUrl?: string)

    /**
     * The envelope applied to the beginning of the sample
     */
    attack: Encoding.Time;

    /**
     * The envelope applied to the end of the sample
     */
    release: Encoding.Time;

    /**
     * If the buffers are loaded or not
     */
    readonly loaded: boolean;

    /**
     * Add a note to the sampler
     */
    add(note: Encoding.Note | Encoding.MIDI, url: string | Buffer | AudioBuffer, callback?: Callback): void;

    /**
     * Release all currently active notes
     */
    releaseAll(time?: Encoding.Time): this;

    /**
     * Trigger the attack of the note optionally with a given velocity
     */
    triggerAttack(note: Encoding.Frequency, time?: Encoding.Time, velocity?: number): this;

    /**
     * Trigger the release portion of the envelope
     */
    triggerRelease(time?: Encoding.Time): this;
  }

  type ModulationOptions = OscillatorOptions;

  interface FMSynthOptions {
    harmonicity?: Encoding.Positive;
    modulationIndex?: Encoding.Positive;
    detune?: Encoding.Cents;
    oscillator?: OscillatorOptions;
    envelope?: ADSREnvelopeOptions;
    modulation?: ModulationOptions;
    modulationEnvelope?: ADSREnvelopeOptions;
  }

  /**
   * FMSynth is composed of two Tone.Synths where one
   * Tone.Synth modulates the frequency of a second
   * Tone.Synth. A lot of spectral content can be explored
   * using the modulationIndex parameter
   */
  class FMSynth extends Monophonic<FMSynthOptions> {
    /**
     * The detune control
     */
    detune: Signal<Encoding.Cents>;

    /**
     * The amplitude envelope
     */
    envelope: Synth["envelope"];

    /**
     * The frequency
     */
    frequency: Signal<Encoding.Frequency>;

    /**
     * Harmonicity is the ratio between the two voices. A
     * harmonicity of 1 is no change. Harmonicity = 2 means a
     * change of an octave
     */
    harmonicity: Multiply<Encoding.Positive>;

    /**
     * The modulator’s oscillator which is applied to the
     * amplitude of the oscillator
     */
    modulation: Synth["oscillator"];

    /**
     * The modulator’s envelope
     */
    modulationEnvelope: Synth["envelope"];

    /**
     * The modulationIndex of the oscillators which make
     * up the source.
     */
    modulationIndex: Multiply<Encoding.Positive>;

    /**
     * The oscillator
     */
    oscillator: Synth["oscillator"];
  }

  interface PluckSynthOptions {
    attackNoise?: number;
    dampening?: Encoding.Frequency;
    resonance?: Encoding.NormalRange;
  }

  /**
   * Karplus-String string synthesis. Often out of tune. Will
   * change when the AudioWorkerNode is available across browsers
   */
  class PluckSynth extends Instrument {
    constructor(options?: PluckSynthOptions)

    /**
     * The amount of noise at the attack.
     * Nominal range of [0.1, 20]
     */
    attackNoise: number;

    /**
     * The dampening control i.e. the lowpass filter
     * frequency of the comb filter
     */
    dampening: LowpassCombFilter["dampening"];

    /**
     * The resonance control
     */
    resonance: LowpassCombFilter["resonance"];

    /**
     * Trigger the attack of the note optionally with a given velocity
     */
    triggerAttack(note: Encoding.Frequency, time?: Encoding.Time): this;
  }

  interface MetalSynthOptions {
    frequency?: Encoding.Frequency;
    harmonicity?: Encoding.Positive;
    modulationIndex?: Encoding.Positive;
    resonance?: Encoding.NormalRange;
    octaves?: number;
  }

  /**
   * A highly inharmonic and spectrally complex source with a
   * highpass filter and amplitude envelope which is good for
   * making metalophone sounds
   */
  class MetalSynth extends Instrument {
    constructor(options?: MetalSynthOptions)

    /**
     * The amplitude envelope
     */
    envelope: Envelope;

    /**
     * The frequency
     */
    frequency: Signal<Encoding.Frequency>;

    /**
     * Harmonicity is the ratio between the two voices. A
     * harmonicity of 1 is no change. Harmonicity = 2 means a
     * change of an octave
     */
    harmonicity: FMOscillator["harmonicity"];

    /**
     * The modulationIndex of the oscillators which make
     * up the source.
     */
    modulationIndex: FMOscillator["modulationIndex"];

    /**
     * The number of octaves above the “resonance” frequency
     * that the filter ramps during the attack/decay envelope
     */
    octaves: number;

    /**
     * The frequency of the highpass filter attached
     * to the envelope
     */
    resonance: Scale["min"];

    /**
     * Trigger the attack of the note optionally with a given velocity
     */
    triggerAttack(note: Encoding.Frequency, time?: Encoding.Time, velocity?: number): this;

    /**
     * Trigger the release portion of the envelope
     */
    triggerRelease(time?: Encoding.Time): this;
  }

  type Synths = Synth | AMSynth | DuoSynth | FMSynth | MonoSynth | PluckSynth | MetalSynth | MembraneSynth;

  interface PolySynthOptions {
    polyphony?: number;
    volume?: Encoding.Decibels;
    detune?: Encoding.Cents;
    voice?: new () => Synths;
  }

  /**
   * Tone.PolySynth handles voice creation and allocation for
   * any instruments passed in as the second paramter.
   * PolySynth is not a synthesizer by itself, it merely
   * manages voices of one of the other types of synths,
   * allowing any of the monophonic synthesizers to be polyphonic
   */
  class PolySynth<T extends Instrument = Synth> extends Instrument {
    constructor(options?: PolySynthOptions)
    constructor(polyphony?: number, voice?: new () => Synths)

    /**
     * The detune control
     */
    detune: Signal<Encoding.Cents>;

    /**
     * The array of voices
     */
    voices: ReadonlyArray<T>;

    /**
     * Get the synth’s attributes. Given no arguments get will
     * return all available object properties and their
     * corresponding values. Pass in a single attribute to
     * retrieve or an array of attributes. The attribute
     * strings can also include a “.” to access deeper properties
     */
    get(params?: string | string[]): ReadonlyArray<any>;

    /**
     * Trigger the release portion of all the currently
     * active voices
     */
    releaseAll(time?: Encoding.Time): this;

    /**
     * Set a member/attribute of the voices
     */
    set(attributes: object): this;
    set(params: string, value: any, rampTime?: Encoding.Time): this;


    /**
     * Trigger the attack of the note optionally with a given velocity
     */
    triggerAttack(notes: Encoding.Frequency[], time?: Encoding.Time, velocity?: number): this;

    /**
     * Trigger the release portion of the envelope
     */
    triggerRelease(notes: Encoding.Frequency[], time?: Encoding.Time): this;
  }

  interface MembraneSynthOptions {
    pitchDecay?: Encoding.Time;
    octaves?: Encoding.Positive;
    oscillator?: OscillatorOptions;
    envelope?: ADSREnvelopeOptions;
  }

  /**
   * Tone.MembraneSynth makes kick and tom sounds using a single
   * oscillator with an amplitude envelope and frequency ramp.
   * A Tone.OmniOscillator is routed through a Tone.AmplitudeEnvelope
   * to the output. The drum quality of the sound comes from the
   * frequency envelope applied during Tone.MembraneSynth.triggerAttack(note).
   * The frequency envelope starts at note * .octaves and
   * ramps to note over the duration of .pitchDecay.
   */
  class MembraneSynth extends Instrument<MembraneSynthOptions> {
    /**
     * The amplitude envelope
     */
    envelope: AmplitudeEnvelope;

    /**
     * The number of octaves above the “resonance” frequency
     * that the filter ramps during the attack/decay envelope
     */
    octaves: number;

    /**
     * The oscillator
     */
    oscillator: OmniOscillator;

    /**
     * The amount of time the frequency envelope takes
     */
    pitchDecay: Encoding.Time;

    /**
     * Trigger the attack of the note optionally with a given velocity
     */
    triggerAttack(note: Encoding.Frequency, time?: Encoding.Time, velocity?: number): this;

    /**
     * Trigger the release portion of the envelope
     */
    triggerRelease(time?: Encoding.Time): this;
  }

  //----------------
  // Event Classes
  //----------------

  /**
   * Tone.Event abstracts away Tone.Transport.schedule and
   * provides a schedulable callback for a single or
   * repeatable events along the timeline
   */
  class Event extends Tone {
    constructor(callback: Callback, value: any)

    /**
     * The callback to invoke
     */
    callback: Callback;

    /**
     * If the note should loop or not between
     * Tone.Event.loopStart and Tone.Event.loopEnd. An integer
     * value corresponds to the number of loops the Event does
     * after it starts
     */
    loop: boolean | number;

    /**
     * If loop is true, the loop will end at this position
     */
    loopEnd: Encoding.Time;

    /**
     * If loop is true, the loop will start at this position
     */
    loopStart: Encoding.Time;

    /**
     * If mute is true, the callback won’t be invoked
     */
    mute: boolean;

    /**
     * The playback rate of the note. Defaults to 1
     */
    playbackRate: number;

    /**
     * The probablility of the notes being triggered
     */
    probability: Encoding.NormalRange;

    /**
     * The current progress of the loop interval. Returns 0 if
     * the event is not started yet or it is not set to loop
     */
    readonly progress: Encoding.NormalRange;

    /**
     * Returns the playback state of the note,
     * either “started” or “stopped”
     */
    readonly state: 'started' | 'stopped';

    /**
     * Cancel all scheduled events greater than or equal
     * to the given time
     */
    cancel(time?: Encoding.TransportTime): this;

    /**
     * Start the Event at the given time
     */
    start(time: Encoding.TransportTime): this;

    /**
     * Stop the Event at the given time
     */
    stop(time: Encoding.TransportTime): this;
  }

  type TimeEventPair = [Encoding.Time, Encoding.Note];

  interface TimeEventObject {
    time: Encoding.Time;
    note: Encoding.Note;
    dur?: Encoding.Note;
    velocity?: number;
  }

  /**
   * Tone.Part is a collection Tone.Events which can be
   * started/stopped and looped as a single unit
   */
  class Part extends Event {
    constructor(callback: Callback<[Encoding.Time, TimeEventObject]>, events: ReadonlyArray<TimeEventPair | TimeEventObject>)

    /**
     * The number of notes in the part
     */
    readonly length: Encoding.Positive;

    /**
     * Add a an event to the part
     */
    add(time: Encoding.Time, value: any): this;

    /**
     * Get/Set an Event’s value at the given time. If a value
     * is passed in and no event exists at the given time, one
     * will be created with that value. If two events are at
     * the same time, the first one will be returned
     */
    at(time: Encoding.TransportTime, value?: any): Event;
  }

  type NoteArray = ReadonlyArray<Encoding.Note>;
  type NoteSequence = ReadonlyArray<Encoding.Note | NoteArray>;
  type SequenceArray = ReadonlyArray<Encoding.Note | NoteArray | NoteSequence>

  /**
   * A sequence is an alternate notation of a part. Instead
   * of passing in an array of [time, event] pairs, pass in
   * an array of events which will be spaced at the given
   * subdivision. Sub-arrays will subdivide that beat by the
   * number of items are in the array
   */
  class Sequence extends Part {
    constructor(callback: Callback, events: SequenceArray, subdivision: Encoding.Time)

    /**
     * The subdivision of the sequence. This can only be set
     * in the constructor. The subdivision is the interval
     * between successive steps
     */
    readonly subdivision: Encoding.Time;
  }

  /**
   * Tone.Loop creates a looped callback at the specified
   * interval. The callback can be started, stopped and
   * scheduled along the Transport’s timeline
   */
  class Loop extends Tone {
    constructor(callback: Callback<[Encoding.Time]>, interval: Encoding.Time)

    /**
     * The callback to invoke
     */
    callback: Callback;

    /**
     * Random variation +/-0.01s to the scheduled time. Or
     * give it a time value which it will randomize by
     */
    humanize: boolean | Encoding.Time;

    /**
     * The time between successive callbacks
     */
    interval: Encoding.Time;

    /**
     * The number of iterations of the loop. The default value
     * is Infinity (loop forever)
     */
    iterations: Encoding.Positive;

    /**
     * If mute is true, the callback won’t be invoked
     */
    mute: boolean;

    /**
     * The playback rate of the note. Defaults to 1
     */
    playbackRate: number;

    /**
     * The probablility of the notes being triggered
     */
    probability: Encoding.NormalRange;

    /**
     * The current progress of the loop interval. Returns 0 if
     * the event is not started yet or it is not set to loop
     */
    readonly progress: Encoding.NormalRange;

    /**
     * Returns the state of the loop,
     * either “started” or “stopped”
     */
    readonly state: 'started' | 'stopped';

    /**
     * Cancel all scheduled events greater than or equal
     * to the given time
     */
    cancel(time?: Encoding.TransportTime): this;

    /**
     * Start the loop at the given time
     */
    start(time: Encoding.TransportTime): this;

    /**
     * Stop the loop at the given time
     */
    stop(time: Encoding.TransportTime): this;
  }

  /**
   * Tone.Pattern arpeggiates between the given notes in a
   * number of patterns
   */
  class Pattern extends Loop {
    constructor(callback: Callback, values: ReadonlyArray<Encoding.Note>)

    /**
     * The current index in the values array
     */
    index: Encoding.Positive;

    /**
     * The pattern type
     */
    pattern: ControlPattern;

    /**
     * The current value of the pattern
     */
    readonly value: Encoding.Note;
  }

  //----------------
  // Effect Classes
  //----------------

  interface EffectOptions {
    wet?: Encoding.NormalRange;
  }

  /**
   * Tone.Effect is the base class for effects. Connect the
   * effect between the effectSend and effectReturn
   * GainNodes, then control the amount of effect which goes
   * to the output using the wet control
   */
  class Effect extends AudioNode {
    constructor(wet?: Encoding.NormalRange)
    constructor(options?: EffectOptions)

    /**
     * The wet control is how much of the effected will pass
     * through to the output.
     * 1 = 100% effected signal, 0 = 100% dry signal
     */
    wet: CrossFade["fade"];
  }

  /**
   * Base class for Stereo effects.
   * Provides effectSendL/R and effectReturnL/R
   */
  class StereoEffect extends Effect {}

  interface FeedbackEffectOptions {
    feedback?: Encoding.NormalRange;
  }

  /**
   * Tone.FeedbackEffect provides a loop between an audio
   * source and its own output. This is a base-class for
   * feedback effects
   */
  class FeedbackEffect extends Effect {
    constructor(feedback?: Encoding.NormalRange)
    constructor(options?: FeedbackEffectOptions)

    /**
     * The amount of signal which is fed back into
     * the effect input
     */
    feedback: Gain["gain"];
  }

  /**
   * Base class for stereo feedback effects where the
   * effectReturn is fed back into the same channel
   */
  class StereoFeedbackEffect extends StereoEffect {
    /**
     * The amount of signal which is fed back into
     * the effect input
     */
    feedback: Signal<Encoding.NormalRange>;
  }

  /**
   * Just like a stereo feedback effect, but the feedback is
   * routed from left to right and right to left instead of
   * on the same channel
   */
  class StereoXFeedbackEffect extends StereoEffect {
    /**
     * The amount of signal which is fed back into
     * the effect input
     */
    feedback: Signal<Encoding.NormalRange>;
  }

  /**
   * Mid/Side processing separates the the ‘mid’ signal
   * (which comes out of both the left and the right channel)
   * and the ‘side’ (which only comes out of the the side channels)
   * and effects them separately before being recombined.
   * Applies a Mid/Side seperation and recombination.
   * This is a base-class for Mid/Side Effects
   */
  class MidSideEffect extends Effect {}

  interface ChorusOptions {
    frequency?: Encoding.Frequency;
    delayTime?: Encoding.Milliseconds;
    depth?: Encoding.NormalRange;
    type?: BasicOscillatorType;
    spread?: Encoding.Degrees;
  }

  /**
   * Tone.Chorus is a stereo chorus effect composed of a left
   * and right delay with a Tone.LFO applied to the delayTime
   * of each channel
   */
  class Chorus extends StereoEffect {
    constructor(options?: ChorusOptions)
    constructor(frequency?: Encoding.Frequency, delayTime?: Encoding.Milliseconds, depth?: Encoding.NormalRange)

    /**
     * The delayTime in milliseconds of the chorus. A larger
     * delayTime will give a more pronounced effect. Nominal
     * range a delayTime is between 2 and 20ms
     */
    delayTime: Encoding.Milliseconds;

    /**
     * The depth of the effect. A depth of 1 makes the delayTime
     * modulate between 0 and 2*delayTime (centered around the delayTime)
     */
    depth: Encoding.NormalRange;

    /**
     * The frequency of the LFO which modulates the delayTime
     */
    frequency: Encoding.Frequency;

    /**
     * Amount of stereo spread. When set to 0, both LFO’s will
     * be panned centrally. When set to 180, LFO’s will be panned
     * hard left and right respectively
     */
    spread: Encoding.Degrees;

    /**
     * The oscillator type of the LFO
     */
    type: BasicOscillatorType;
  }

  interface AutoPannerOptions {
    depth?: Encoding.NormalRange;
    frequency?: Encoding.Frequency;
    type?: BasicOscillatorType;
  }

  /**
   * Tone.AutoPanner is a Tone.Panner with an LFO connected
   * to the pan amount
   */
  class AutoPanner extends Effect {
    constructor(options?: AutoPannerOptions)
    constructor(frequency?: Encoding.Frequency)

    /**
     * The amount of panning between left and right.
     * 0 = always center. 1 = full range between left and right
     */
    depth: LFO["amplitude"];

    /**
     * How fast the panner modulates between left and right
     */
    frequency: LFO["frequency"];

    /**
     * Oscillator type
     */
    type: BasicOscillatorType;

    /**
     * Start the effect
     */
    start(time?: Encoding.Time): this;

    /**
     * Stop the effect
     */
    stop(time?: Encoding.Time): this;

    /**
     * Sync the panner to the transport
     */
    sync(delay?: Encoding.Time): this;

    /**
     * Unsync the panner from the transport
     */
    unsync(): this;
  }

  interface FollowerOptions {
    attack?: Encoding.Time;
    release?: Encoding.Time;
  }

  interface AutoWahOptions {
    baseFrequency?: Encoding.Frequency;
    octaves?: Encoding.Positive;
    sensitivity?: Encoding.Decibels;
    Q?: Encoding.Positive;
    gain?: number;
    follower?: FollowerOptions;
  }

  /**
   * Tone.AutoWah connects a Tone.Follower to a bandpass
   * filter (Tone.Filter). The frequency of the filter is
   * adjusted proportionally to the incoming signal’s amplitude
   */
  class AutoWah extends Effect {
    constructor(options?: AutoWahOptions)
    constructor(baseFrequency?: Encoding.Frequency, octaves?: Encoding.Positive, sensitivity?: Encoding.Decibels)

    /**
     * The quality of the filter
     */
    Q: Filter["Q"];

    /**
     * The base frequency from which the sweep will start from
     */
    baseFrequency: Encoding.Frequency;

    /**
     * The gain of the filter
     */
    gain: Filter["gain"];

    /**
     * The number of octaves that the filter will sweep above
     * the baseFrequency
     */
    octaves: Encoding.Positive;

    /**
     * The sensitivity to control how responsive the input
     * signal the filter is
     */
    sensitivity: Encoding.Decibels;
  }

  /**
   * Tone.PitchShift does near-realtime pitch shifting to
   * the incoming signal. The effect is achieved by speeding
   * up or slowing down the delayTime of a DelayNode using
   * a sawtooth wave
   */
  class PitchShift extends FeedbackEffect {
    constructor(pitch?: Encoding.Interval)

    /**
     * The amount of delay on the input signal
     */
    delayTime: FeedbackDelay["delayTime"];

    /**
     * Repitch the incoming signal by some interval
     * (measured in semi-tones)
     */
    pitch: Encoding.Interval;

    /**
     * The window size corresponds roughly to the sample
     * length in a looping sampler. Smaller values are desirable
     * for a less noticeable delay time of the pitch shifted
     * signal, but larger values will result in smoother pitch
     * shifting for larger intervals. A nominal range of
     * 0.03 to 0.1 is recommended
     */
    windowSize: Encoding.Time;
  }

  interface StereoWidenerOptions {
    width: Encoding.NormalRange;
  }

  /**
   * Applies a width factor to the mid/side seperation.
   * 0 is all mid and 1 is all side
   */
  class StereoWidener extends MidSideEffect {
    constructor(options?: StereoWidenerOptions)
    constructor(width?: Encoding.NormalRange)

    /**
     * The width control.
     * 	- 0.0 = 100% mid.
     * 	- 0.5 = no change
     * 	- 1.0 = 100% side.
     */
    width: Signal<Encoding.NormalRange>;

    private _oneMinusWidth: Tone;
  }

  /**
   * Tone.Tremolo modulates the amplitude of an incoming
   * signal using a Tone.LFO. The type, frequency, and depth
   * of the LFO is controllable
   */
  class Tremolo extends StereoEffect {
    constructor(frequency?: Encoding.Frequency, depth?: Encoding.NormalRange)

    /**
     * The depth of the effect. A depth of 0, has no effect
     * on the amplitude, and a depth of 1 makes the amplitude
     * modulate fully between 0 and 1
     */
    depth: Signal<Encoding.NormalRange>;

    /**
     * The frequency of the tremolo
     */
    frequency: Signal<Encoding.Frequency>;

    /**
     * Amount of stereo spread. When set to 0, both LFO’s
     * will be panned centrally. When set to 180, LFO’s will
     * be panned hard left and right respectively
     */
    spread: Encoding.Degrees;

    /**
     * The Tremolo’s oscillator type
     */
    type: BasicOscillatorType;

    /**
     * Start the effect
     */
    start(time?: Encoding.Time): this;

    /**
     * Stop the effect
     */
    stop(time?: Encoding.Time): this;

    /**
     * Sync the panner to the transport
     */
    sync(delay?: Encoding.Time): this;

    /**
     * Unsync the panner from the transport
     */
    unsync(): this;
  }

  interface PingPongDelayOptions {
    delayTime?: Encoding.Time;
    maxDelayTime?: Encoding.NormalRange;
    feedback?: Encoding.NormalRange;
  }

  /**
   * Tone.PingPongDelay is a feedback delay effect where the
   * echo is heard first in one channel and next in the
   * opposite channel. In a stereo system these are the
   * right and left channels. PingPongDelay in more simplified
   * terms is two Tone.FeedbackDelays with independent delay values.
   * Each delay is routed to one channel (left or right),
   * and the channel triggered second will always trigger at
   * the same interval after the first
   */
  class PingPongDelay extends StereoXFeedbackEffect {
    constructor(options?: PingPongDelayOptions)
    constructor(delayTime?: Encoding.Time, feedback?: Encoding.NormalRange)

    /**
     * The delay time signal
     */
    delayTime: Signal<Encoding.Time>;
  }

  interface ConvolverOptions {
    url?: string | Buffer;
    onload?: Callback;
  }

  /**
   * Tone.Convolver is a wrapper around the Native Web Audio
   * ConvolverNode. Convolution is useful for reverb and
   * filter emulation
   */
  class Convolver extends Effect {
    constructor(options?: ConvolverOptions)
    constructor(url?: String | Buffer, onload?: Callback)

    /**
     * The convolver's buffer
     */
    buffer: AudioBuffer;

    /**
     * Load an impulse response url as an audio buffer.
     * Decodes the audio asynchronously and invokes the
     * callback once the audio buffer loads
     */
    load(url: string, callback?: Callback): Promise<this>
  }

  interface ChebyShevOptions {
    order?: Encoding.Positive;
    oversample?: OverSampleType;
  }

  /**
   * Tone.ChebyShev is a Chebyshev waveshaper, an effect
   * which is good for making different types of distortion sounds.
   * Note that odd orders sound very different from even ones,
   * and order = 1 is no change
   */
  class ChebyShev extends Effect {
    constructor(options?: ChebyShevOptions)
    constructor(order?: Encoding.Positive)

    /**
     * The order of the Chebyshev polynomial which creates
     * the equation which is applied to the incoming signal
     * through a Tone.WaveShaper.
     * The equations are in the form:
     * 	- order 2: 2x^2 + 1
     * 	- order 3: 4x^3 + 3x
     */
    order: Encoding.Positive;

    /**
     * The oversampling of the effect.
     * Can either be “none”, “2x” or “4x”
     */
    oversample: OversamplingType;
  }

  /**
   * A Vibrato effect composed of a Tone.Delay and a Tone.LFO.
   * The LFO modulates the delayTime of the delay,
   * causing the pitch to rise and fall
   */
  class Vibrato extends Effect {
    constructor(frequency: Encoding.Frequency, depth: Encoding.NormalRange)

    /**
     * The depth of the vibrato
     */
    depth: LFO["amplitude"];

    /**
     * The frequency of the vibrato
     */
    frequency: LFO["frequency"];

    /**
     * Type of oscillator attached to the vibrato
     */
    type: BasicOscillatorType;
  }

  /**
   * Tone.Bitcrusher downsamples the incoming signal to
   * a different bitdepth. Lowering the bitdepth of the
   * signal creates distortion
   */
  class BitCrusher extends Effect {
    constructor(bits: number)

    /**
     * The bit depth of the effect
     * Nominal range of 1-8
     */
    bits: number;
  }

  /**
   * Simple convolution created with decaying noise.
   * Generates an Impulse Response Buffer with Tone.Offline
   * then feeds the IR into ConvolverNode.
   * Note: the Reverb will not make any sound until generate
   * has been invoked and resolved
   */
  class Reverb extends Convolver {
    constructor(decay?: Encoding.Time)

    /**
     * The duration of the reverb
     */
    decay: Encoding.Time;

    /**
     * The amount of time before the reverb is fully ramped in
     */
    preDelay: Encoding.Time;

    /**
     * Generate the Impulse Response.
     * Returns a promise while the IR is being generated
     */
    generate(): Promise<this>;
  }

  interface DistortionOptions {
    distortion?: Encoding.NormalRange;
    oversample?: OversamplingType;
  }

  /**
   * Tone.Distortion is a simple distortion effect
   * using Tone.WaveShaper
   */
  class Distortion extends Effect {
    constructor(object?: DistortionOptions)
    constructor(distortion?: Encoding.NormalRange)

    /**
     * The amount of distortion
     */
    distortion: Encoding.NormalRange;

    /**
     * The oversampling of the effect.
     * Can either be “none”, “2x” or “4x”
     */
    oversample: OversamplingType;
  }

  interface JCReverbOptions {
    roomSize: Encoding.NormalRange;
  }

  /**
   * Tone.JCReverb is a simple Schroeder Reverberator tuned
   * by John Chowning in 1970. It is made up of three allpass
   * filters and four Tone.FeedbackCombFilter
   */
  class JCReverb extends Effect {
    constructor(object?: JCReverbOptions)
    constructor(roomSize?: Encoding.NormalRange)

    /**
     * Room size control values between [0, 1]
     */
    roomSize: Signal<Encoding.NormalRange>;
  }

  interface FreeverbOptions {
    roomSize?: Encoding.NormalRange;
    dampening?: Encoding.Frequency;
  }

  /**
   * Tone.Freeverb is a reverb based on Freeverb
   */
  class Freeverb extends Effect {
    constructor(object?: FreeverbOptions)
    constructor(roomSize?: Encoding.NormalRange, dampening?: Encoding.Frequency)

    /**
     * The amount of dampening of the reverberant signal
     */
    dampening: Signal<Encoding.Frequency>;

    /**
     * The roomSize value, a larger roomSize will result
     * in a longer decay
     */
    roomSize: Signal<Encoding.NormalRange>;
  }

  interface AutoFilterOptions {
    frequency?: Encoding.Frequency;
    type?: BasicOscillatorType;
    depth?: Encoding.NormalRange;
    baseFrequency?: Encoding.Frequency;
    octaves?: Encoding.Positive;
    filter?: FilterOptions;
  }

  /**
   * Tone.AutoFilter is a Tone.Filter with a Tone.LFO connected
   * to the filter cutoff frequency. Setting the LFO rate and
   * depth allows for control over the filter modulation
   * rate and depth
   */
  class AutoFilter extends Effect {
    constructor(object?: AutoFilterOptions)
    constructor(frequency?: Encoding.Frequency, baseFrequency?: Encoding.Frequency, octaves?: Encoding.Positive)

    /**
     * The range of the filter modulating between
     * the min and max frequency
     * 	- 0 = no modulation
     * 	- 1 = full modulation
     */
    depth: LFO["amplitude"];

    /**
     * The filter node
     */
    filter: Filter;

    /**
     * How fast the filter modulates between min and max
     */
    frequency: LFO["frequency"];

    /**
     * The minimum value of the filter’s cutoff frequency
     */
    min: Encoding.Frequency;

    /**
     * The maximum value of the filter’s cutoff frequency
     */
    octaves: Encoding.Positive;

    /**
     * Type of oscillator attached to the AutoFilter.
     * Possible values:
     * 	- “sine”
     * 	- “square”
     * 	- “triangle”
     * 	- “sawtooth”
     */
    type: BasicOscillatorType;

    /**
     * Start the effect
     */
    start(time?: Encoding.Time): this;

    /**
     * Stop the effect
     */
    stop(time?: Encoding.Time): this;

    /**
     * Sync the filter to the transport
     */
    sync(delay?: Encoding.Time): this;

    /**
     * Unsync the filter from the transport
     */
    unsync(): this;
  }

  interface FeedbackDelayOptions {
    delayTime: Encoding.Time;
    maxDelay: Encoding.NormalRange;
  }

  /**
   * Tone.FeedbackDelay is a DelayNode in which part of
   * output signal is fed back into the delay
   */
  class FeedbackDelay extends FeedbackEffect {
    constructor(object?: FeedbackDelayOptions)
    constructor(delayTime?: Encoding.Time, feedback?: Encoding.NormalRange)

    /**
     * the delayTime of the DelayNode
     */
    delayTime: Delay["delayTime"];
  }

  interface PhaserOptions {
    frequency: Encoding.Frequency;
    octaves: Encoding.Positive;
    stages: number;
    Q: Encoding.Positive;
    baseFrequency: Encoding.Frequency;
  }

  /**
   * Tone.Phaser is a phaser effect. Phasers work by
   * changing the phase of different frequency components of
   * an incoming signal
   */
  class Phaser extends StereoEffect {
    constructor(object?: PhaserOptions)
    constructor(frequency?: Encoding.Frequency, octaves?: Encoding.Positive, baseFrequency?: Encoding.Frequency)

    /**
     * The quality factor of the filters
     */
    Q: Signal<Encoding.Positive>;

    /**
     * The base frequency of the filters
     */
    baseFrequency: Encoding.Frequency;

    /**
     * The frequency of the effect
     */
    frequency: LFO["frequency"];

    /**
     * The number of octaves the phase goes above the
     * base frequency
     */
    octaves: Encoding.Positive;
  }

  //----------------
  // Control Classes
  //----------------

  type ControlPattern =
    'up' |
    'down' |
    'upDown' |
    'downUp' |
    'alternateUp' |
    'alternateDown' |
    'random' |
    'randomWalk' |
    'randomOnce'

  /**
   * Generate patterns from an array of values. Has a number
   * of arpeggiation and randomized selection patterns.
   * 	* “up” - cycles upward
   * 	* “down” - cycles downward
   * 	* “upDown” - up then and down
   *  * “downUp” - cycles down then and up
   *	* “alternateUp” - jump up two and down one
    *  * “alternateDown” - jump down two and up one
    *  * “random” - randomly select an index
    *  * “randomWalk” - randomly moves one index away from the
    * 		current position
    *  * “randomOnce” - randomly select an index without repeating
    * 		until all values have been chosen.
    */
  class CtrlPattern<T = any> extends Tone {
    constructor(values: ReadonlyArray<T>, type?: ControlPattern)

    /**
     * The current position in the values array
     */
    index: number;

    /**
     * The pattern used to select the next item from
     * the values array
     */
    type: ControlPattern;

    /**
     * The value at the current index of the pattern
     */
    readonly value: T;

    /**
     * The array of values to arpeggiate over
     */
    values: ReadonlyArray<T>;

    /**
     * Return the next value given the current position
     * and pattern
     */
    next(): T;
  }

  interface MarkovWeightedState {
    value: string;
    probability: number;
  }

  type MarkovStateArray = string[] | ReadonlyArray<MarkovWeightedState>;

  interface ControlMarkovValues {
    [state: string]: string | MarkovStateArray;
  }

  /**
   * Tone.CtrlMarkov represents a Markov Chain where each
   * call to Tone.CtrlMarkov.next will move to the next
   * state. If the next state choice is an array, the next
   * state is chosen randomly with even probability for all of
   * the choices. For a weighted probability of the next
   * choices, pass in an object with “state” and “probability”
   * attributes. The probabilities will be normalized and then chosen.
   * If no next options are given for the current state, the
   * state will stay there
   */
  class CtrlMarkov extends Tone {
    constructor(values: ControlMarkovValues)

    /**
     * The current state of the Markov values. The next state
     * will be evaluated and returned when
     * Tone.CtrlMarkov.next is invoked
     */
    readonly value: string;

    /**
     * The Markov values with states as the keys and next
     * state(s) as the values
     */
    values: ControlMarkovValues;

    /**
     * Returns the next state of the Markov values
     */
    next(): string;
  }

  /**
   * Choose a random value.
   */
  class CtrlRandom extends Tone {
    constructor(min: number | Encoding.Time, max: number | Encoding.Time)

    /**
     * If the return value should be an integer
     */
    integer: boolean;

    /**
     * The maximum return value
     */
    max: number | Encoding.Time;

    /**
     * The minium return value
     */
    min: number | Encoding.Time;

    /**
     * Return a random value between min and max
     */
    readonly value: number | Encoding.Time;
  }

  /**
   * Tone.CtrlInterpolate will interpolate between given
   * values based on the “index” property. Passing in an
   * array or object literal will interpolate each of the parameters.
   * Note (i.e. “C3”) and Time (i.e. “4n + 2”) can be interpolated.
   * All other values are assumed to be numbers
   */
  class CtrlInterpolate<T = any> extends Tone {
    constructor(values: ReadonlyArray<T>, index: Encoding.Positive)

    /**
     * The interpolated index between values. For example: a
     * value of 1.5 would interpolate equally between the
     * value at index 1 and the value at index 2
     */
    index: Encoding.Positive;

    /**
     * The current interpolated value based on the index
     */
    readonly value: T;

    /**
     * The values to interpolate between
     */
    values: ReadonlyArray<T>;
  }

  //----------------
  // Source Classes
  //----------------


  /**
   * Base class for sources. Sources have start/stop methods and
   * the ability to be synced to the start/stop of Tone.Transport
   */
  class Source extends AudioNode {
    /**
     * The fadeIn time of the amplitude envelope
     */
    fadeIn: Encoding.Time;

    /**
     * The fadeOut time of the amplitude envelope
     */
    fadeOut: Encoding.Time;

    /**
     * Mute the output
     */
    mute: boolean;

    /**
     * Returns the playback state of the source, either
     * “started” or “stopped”
     */
    readonly state: State;

    /**
     * The volume of the output in decibels
     */
    readonly volume: Volume['volume'];

    /**
     * Start the source at the specified time. If no time is
     * given, start the source now
     */
    start(time?: Encoding.Time): this;

    /**
     * Stop the source at the specified time. If no time is
     * given, start the source now
     */
    stop(time?: Encoding.Time): this;

    /**
     * Sync the source to the Transport so that all subsequent
     * calls to start and stop are synced to the TransportTime
     * instead of the AudioContext time
     */
    sync(): this;

    /**
     * Unsync the source to the Transport
     */
    unsync(): this;
  }

  export type NoiseType = 'white' | 'pink' | 'brown';

  export interface NoiseOptions {
    type?: NoiseType;
    playbackRate?: number;
  }

  /**
   * Tone.Noise is a noise generator. It uses looped noise
   * buffers to save on performance. Tone.Noise supports the
   * noise encoding:
   *    - “white”
   *    - “brown”
   *    - "pink"
   */
  class Noise extends Source {
    constructor(type: NoiseType)
    constructor(options?: NoiseOptions);

    /**
     * The type of the noise. Can be:
     *    - “white”
     *    - “brown”
     *    - “pink”
     */
    type: NoiseType;

    /**
     * Restarts the noise
     */
    restart(time?: Encoding.Time): void;

    private _source: BufferSource;

    /**
     * The playback rate of the noise. Affects the
     * “frequency” of the noise
     */
    private _playbackRate: BufferSource['playbackRate'];
  }

  class TickSource extends Tone {
    constructor(frequency: Encoding.Frequency)

    /**
     * The frequency the callback function should be
     * invoked
     */
    frequency: TickSignal<Encoding.Frequency>;

    /**
     * The time since ticks=0 that the TickSource has been
     * running. Accounts for tempo curves
     */
    seconds: Encoding.Seconds;

    /**
     * Returns the playback state of the source, either
     * “started” or “stopped”
     */
    readonly state: State;

    /**
     * The number of times the callback was invoked. Starts
     * counting at 0 and increments after the callback was invoked.
     * Returns -1 when stopped
     */
    ticks: Encoding.Ticks;

    /**
     * Cancel start/stop/pause and setTickAtTime events
     * scheduled after the given time
     */
    cancel(time?: Encoding.Time): this;

    /**
     * Invoke the callback event at all scheduled ticks
     * between the start time and the end time
     */
    forEachTickBetween(startTime: Encoding.Time, endTime: Encoding.Time, callback: Callback): this;

    /**
     * Return the elapsed seconds at the given time
     */
    getSecondsAtTime(time: Encoding.Time): Encoding.Seconds;

    /**
     * Returns the scheduled state at the given time
     */
    getStateAtTime(time: Encoding.Time): State;

    /**
     * Get the elapsed ticks at the given time
     */
    getTicksAtTime(time: Encoding.Time): Encoding.Ticks;

    /**
     * Get the time of the given tick. The second argument is
     * when to test before. Since ticks can be set
     * (with setTicksAtTime) there may be multiple times for a
     * given tick value
     */
    getTimeOfTick(ticks: Encoding.Ticks, before?: Encoding.Time): Encoding.Time;

    /**
     * Pause the clock. Pausing does not reset the tick counter
     */
    pause(time?: Encoding.Time): this;

    /**
     * Set the clock’s ticks at the given time
     */
    setTicksAtTime(ticks: Encoding.Ticks, time: Encoding.Time): this;

    /**
     * Start the clock at the given time. Optionally pass in
     * an offset of where to start the tick counter from
     */
    start(time?: Encoding.Time, offset?: Encoding.Ticks): this;

    /**
     * Stop the clock. Stopping the clock resets the tick counter to 0
     */
    stop(time?: Encoding.Time): this;
  }

  /**
   * Tone.Player is an audio file player with start, loop,
   * and stop functions
   */
  class Player extends Source {
    constructor(url: string | AudioBuffer, onload?: Callback)

    /**
     * If the file should play as soon as the buffer is loaded
     */
    autostart: boolean;

    /**
     * The audio buffer belonging to the player
     */
    buffer: Buffer;

    /**
     * The fadeIn time of the amplitude envelope
     */
    fadeIn: Encoding.Time;

    /**
     * The fadeOut time of the amplitude envelope
     */
    fadeOut: Encoding.Time;

    /**
     * If all the buffer is loaded
     */
    readonly loaded: boolean;

    /**
     * If the buffer should loop once it’s over
     */
    loop: boolean;

    /**
     * If loop is true, the loop will end at this position
     */
    loopEnd: Encoding.Time;

    /**
     * If loop is true, the loop will start at this position
     */
    loopStart: Encoding.Time;

    /**
     * The playback speed. 1 is normal speed. This is not a
     * signal because Safari and iOS currently don’t support
     * playbackRate as a signal
     */
    playbackRate: number;

    /**
     * The current playback position of the buffer
     */
    position: number;

    /**
     * The direction the buffer should play in
     */
    reverse: boolean;

    /**
     * Load the audio file as an audio buffer. Decodes the
     * audio asynchronously and invokes the callback once the
     * audio buffer loads. Note: this does not need to be
     * called if a url was passed in to the constructor. Only
     * use this if you want to manually load a new url
     */
    load(url: string, callback?: Callback): Promise<this>;

    /**
     * Stop and then restart the player from the beginning
     * (or offset)
     */
    restart(startTime?: Encoding.Time, offset?: Encoding.Time, duration?: Encoding.Time): this;

    /**
     * Seek to a specific time in the player’s buffer. If the
     * source is no longer playing at that time, it will stop
     */
    seek(offset: Encoding.Time, time?: Encoding.Time): this;

    /**
     * Set the loop start and end. Will only loop if loop is
     * set to true
     */
    setLoopPoints(loopStart: Encoding.Time, loopEnd: Encoding.Time): this;

    /**
     * Play the buffer at the given startTime. Optionally add
     * an offset and/or duration which will play the buffer
     * from a position within the buffer for the given duration
     */
    start(startTime?: Encoding.Time, offset?: Encoding.Time, duration?: Encoding.Time): this;
  }

  /**
   * Wrapper around the native BufferSourceNode
   */
  class BufferSource extends AudioNode {
    constructor(buffer: AudioBuffer | Buffer, onload: Callback)

    /**
     * The audio buffer belonging to the player
     */
    buffer: Buffer;

    /**
     * The curve applied to the fades, either "linear" or "exponential"
     */
    curve: FadeCurve;

    /**
     * The fadeIn time of the amplitude envelope
     */
    fadeIn: Encoding.Time;

    /**
     * The fadeOut time of the amplitude envelope
     */
    fadeOut: Encoding.Time;

    /**
     * If the buffer should loop or not.
     */
    loop: boolean;

    /**
     * If loop is true, the loop will end at this position
     */
    loopEnd: Encoding.Time;

    /**
     * If loop is true, the loop will start at this position
     */
    loopStart: Encoding.Time;

    /**
     * The callback to invoke after the buffer source is done playing
     */
    onended: Callback;

    /**
     * The playbackRate of the buffer
     */
    playbackRate: Param<Encoding.Positive>;

    /**
     * Returns the playback state of the source,
     * either “started” or “stopped”
     */
    readonly state: State;

    /**
     * Cancel a scheduled stop event
     */
    cancelStop(): this;

    /**
     * Get the playback state at the given time
     */
    getStateAtTime(time: Encoding.Time): State;

    /**
     * Start the buffer
     */
    start(startTime?: Encoding.Time, offset?: Encoding.Time, duration?: Encoding.Time, gain?: Encoding.Gain, fadeInTime?: Encoding.Time): this;

    /**
     * Stop the buffer. Optionally add a ramp time to fade
     * the buffer out
     */
    stop(time?: Encoding.Time, fadeOutTime?: Encoding.Time): this;
  }

  /**
   * Tone.Oscillator supports a number of features including
   * phase rotation, multiple oscillator types, and Transport syncing
   */
  class Oscillator extends Source {
    constructor(frequency?: Encoding.Frequency, type?: BasicOscillatorType)

    /**
     * The detune control
     */
    detune: Signal<Encoding.Cents>;

    /**
     * The frequency control
     */
    frequency: Signal<Encoding.Frequency>;

    /**
     * The partials of the waveform. A partial represents the
     * amplitude at a harmonic. The first harmonic is the
     * fundamental frequency, the second is the octave and so
     * on following the harmonic series. Setting this value
     * will automatically set the type to “custom”. The value
     * is an empty array when the type is not “custom”.
     * This is not available on “pwm” and “pulse” oscillator types
     */
    partials: ReadonlyArray<Encoding.Frequency>;

    /**
     * The phase of the oscillator in degrees
     */
    phase: Encoding.Degrees;

    /**
     * The type of the oscillator. Can be any of the basic
     * types: sine, square, triangle, sawtooth. Or prefix the
     * basic types with “fm”, “am”, or “fat” to use the
     * FMOscillator, AMOscillator or FatOscillator Encoding. The
     * oscillator could also be set to “pwm” or “pulse”. All
     * of the parameters of the oscillator’s class are accessible
     * when the oscillator is set to that type, but throws an error when
     * it’s not
     */
    type: OscillatorType;

    /**
     * Restart the oscillator. Does not stop the oscillator,
     * but instead just cancels any scheduled ‘stop’ from being invoked
     */
    restart(time?: Encoding.Time): this;

    /**
     * Sync the signal to the Transport’s bpm. Any changes to
     * the transports bpm, will also affect the oscillators frequency
     */
    syncFrequency(): this;

      /**
      * Unsync the oscillator’s frequency from the Transport
      */
      unsyncFrequency(): this;
  }

  /**
   * Tone.FatOscillator
   */
  class FatOscillator extends Source {
    constructor(frequency: Encoding.Frequency, type: BasicOscillatorType, modulationType: BasicOscillatorType)

    /**
     * The number of detuned oscillators
     */
    count: number;

    /**
     * The detune control
     */
    detune: Signal<Encoding.Cents>;

    /**
     * The frequency control
     */
    frequency: Signal<Encoding.Frequency>;

    /**
     * The partials of the waveform. A partial represents the
     * amplitude at a harmonic. The first harmonic is the
     * fundamental frequency, the second is the octave and so
     * on following the harmonic series. Setting this value
     * will automatically set the type to “custom”. The value
     * is an empty array when the type is not “custom”.
     * This is not available on “pwm” and “pulse” oscillator types
     */
    partials: ReadonlyArray<Encoding.Frequency>;

    /**
     * The phase of the oscillator in degrees
     */
    phase: Encoding.Degrees;

    /**
     * The detune spread between the oscillators. If “count”
     * is set to 3 oscillators and the “spread” is set to 40,
     * the three oscillators would be detuned like this: [-20, 0, 20]
     * for a total detune spread of 40 cents
     */
    spread: Encoding.Cents;

    /**
     * The type of the carrier oscillator
     */
    type: OscillatorType;
  }

  type BufferURL = string | Buffer | AudioBuffer;

  interface URLMap {
    [name: string]: BufferURL;
  }

  interface PlayersOptions {
    urls: URLMap;
    volume?: Encoding.Decibels;
    mute?: boolean;
    onload?: Callback;
    fadeIn?: number;
    fadeOut?: number;
  }

  /**
   * Tone.Players combines multiple Tone.Player objects
   */
  class Players extends AudioNode {
    constructor(options?: PlayersOptions)
    constructor(urls: URLMap, onload?: Callback)

    /**
     * If all the buffers are loaded or not
     */
    readonly loaded: boolean;

    /**
     * The state of the players object.
     * Returns “started” if any of the players are playing
     */
    readonly state: State;

    /**
     * The volume of the output in decibels
     */
    volume: Volume["volume"];

    /**
     * Add a player by name and url to the Players
     */
    add(name: string, url: BufferURL, callback: Callback): void;

    /**
     * Get a player by name
     */
    get(name: string): Player | undefined;

    /**
     * True if the buffers object has a buffer by that name
     */
    has(name: string): boolean;

    /**
     * Stop all of the players at the given time
     */
    stopAll(time?: Encoding.Time): this;
  }

  /**
   * Tone.PWMOscillator modulates the width of a
   * Tone.PulseOscillator at the modulationFrequency.
   * This has the effect of continuously changing the timbre
   * of the oscillator by altering the harmonics generated
   */
  class PWMOscillator extends Source {
    constructor(frequency: Encoding.Frequency, modulationFrequency?: Encoding.Frequency)

    /**
     * The detune control
     */
    detune: Oscillator["detune"];

    /**
     * The frequency control
     */
    frequency: Oscillator["frequency"];

    /**
     * The modulation rate of the oscillator
     */
    modulationFrequency: PulseOscillator["frequency"];

    /**
     * The phase of the oscillator in degrees
     */
    phase: Oscillator["phase"];

    /**
     * The type of the oscillator. Always returns “pwm”
     */
    readonly type: "pwm";
  }

  /**
   * Tone.AMOscillator
   */
  class AMOscillator extends Oscillator {
    constructor(frequency: Encoding.Frequency, type: BasicOscillatorType, modulationType: BasicOscillatorType)

    /**
     * The detune control signal
     */
    detune: Oscillator["detune"];

    /**
     * The oscillator’s frequency
     */
    frequency: Oscillator["frequency"];

    /**
     * Harmonicity is the frequency ratio between the carrier
     * and the modulator oscillators. A harmonicity of 1 gives
     * both oscillators the same frequency. Harmonicity = 2 means
     * a change of an octave
     */
    harmonicity: Multiply<Encoding.Positive>;

    /**
     * The type of the modulator oscillator. Only if the
     * oscillator is set to “am” or “fm” types
     */
    modulationType: Oscillator["type"];

    /**
     * The partials of the waveform. A partial represents the
     * amplitude at a harmonic. The first harmonic is the
     * fundamental frequency, the second is the octave and so
     * on following the harmonic series. Setting this value
     * will automatically set the type to “custom”. The value
     * is an empty array when the type is not “custom”.
     * This is not available on “pwm” and “pulse” oscillator types
     */
    partials: ReadonlyArray<Encoding.Frequency>;

    /**
     * The phase of the oscillator in degrees
     */
    phase: Oscillator["phase"];

    /**
     * The type of the carrier oscillato
     */
    type: Oscillator["type"];
  }

  /**
   * Wrapper around the native fire-and-forget
   * OscillatorNode. Adds the ability to reschedule the stop method
   */
  class OscillatorNode extends AudioNode {
    constructor(buffer: AudioBuffer | Buffer, onload: Callback)

    /**
     * The detune control
     */
    detune: Param<Encoding.Cents>;

    /**
     * The frequency control
     */
    frequency: Param<Encoding.Frequency>;

    /**
     * The callback to invoke after the buffer source is done playing
     */
    onended: Callback;

    /**
     * Returns the playback state of the source, either
     * “started”, “stopped” or “paused”
     */
    readonly state: State;

    /**
     * The type of the carrier oscillato
     */
    type: BasicOscillatorType;

    /**
     * Cancel a scheduled stop event
     */
    cancelStop(): this;

    /**
     * Get the playback state at the given time
     */
    getStateAtTime(time: Encoding.Time): State;

    /**
     * Sets an arbitrary custom periodic waveform given a PeriodicWave
     */
    setPeriodicWave(periodicWave: PeriodicWave): this;

    /**
     * Start the oscillator
     */
    start(time?: Encoding.Time): this;

    /**
     * Stop the oscillator node at the given time
     */
    stop(time?: Encoding.Time): this;
  }

  /**
   * Tone.PulseOscillator is a pulse oscillator with control
   * over pulse width, also known as the duty cycle. At 50%
   * duty cycle (width = 0.5) the wave is a square and only
   * odd-numbered harmonics are present. At all other widths
   * even-numbered harmonics are present
   */
  class PulseOscillator extends Source {
    constructor(frequency: Encoding.Frequency, width: Encoding.NormalRange)

    /**
     * The detune control
     */
    detune: Oscillator["detune"];

    /**
     * The frequency control
     */
    frequency: Oscillator["frequency"];

    /**
     * The phase of the oscillator in degrees
     */
    phase: Oscillator["phase"];

    /**
     * The type of the oscillator. Always returns "pulse"
     */
    readonly type: 'pulse';

    /**
     * The width of the oscillator
     */
    width: Signal<Encoding.NormalRange>;
  }

  /**
   * Tone.FMOscillator
   */
  class FMOscillator extends Source {
    /**
     * The detune control
     */
    detune: Oscillator["detune"];

    /**
     * The frequency control
     */
    frequency: Oscillator["frequency"];

    /**
     * Harmonicity is the frequency ratio between the carrier
     * and the modulator oscillators. A harmonicity of 1 gives
     * both oscillators the same frequency. Harmonicity = 2 means
     * a change of an octave
     */
    harmonicity: Multiply<Encoding.Positive>;

    /**
     * The modulation index which is in essence the depth or
     * amount of the modulation. In other terms it is the
     * ratio of the frequency of the modulating signal (mf) to
     * the amplitude of the modulating signal (ma) – as in ma/mf
     */
    modulationIndex: Multiply<Encoding.Positive>;

    /**
     * The type of the modulator oscillator
     */
    modulationType: Oscillator["type"];

    /**
     * The partials of the waveform. A partial represents the
     * amplitude at a harmonic. The first harmonic is the
     * fundamental frequency, the second is the octave and so
     * on following the harmonic series. Setting this value
     * will automatically set the type to “custom”. The value
     * is an empty array when the type is not “custom”.
     * This is not available on “pwm” and “pulse” oscillator types
     */
    partials: Oscillator["partials"];

    /**
     * The phase of the oscillator in degrees
     */
    phase: Oscillator["phase"];

    /**
     * The type of the carrier oscillator
     */
    type: Oscillator["type"];
  }

  /**
   * Tone.OmniOscillator aggregates Tone.Oscillator,
   * Tone.PulseOscillator, Tone.PWMOscillator, Tone.FMOscillator,
   * Tone.AMOscillator, and Tone.FatOscillator into one class.
   * The oscillator class can be changed by setting the type.
   * omniOsc.type = "pwm" will set it to the Tone.PWMOscillator.
   * Prefixing any of the basic types (“sine”, “square4”, etc.)
   * with “fm”, “am”, or “fat” will use the FMOscillator,
   * AMOscillator or FatOscillator respectively
   */
  class OmniOscillator extends Source {
    constructor(frequency: Encoding.Frequency, type: OscillatorType)

    /**
     * The number of detuned oscillators
     */
    count: FatOscillator["count"];

    /**
     * The detune control
     */
    detune: Signal<Encoding.Cents>;

    /**
     * The frequency control
     */
    frequency: Signal<Encoding.Frequency>;

    /**
     * Harmonicity is the frequency ratio between the carrier
     * and the modulator oscillators. A harmonicity of 1 gives
     * both oscillators the same frequency. Harmonicity = 2 means
     * a change of an octave
     */
    harmonicity: FMOscillator["harmonicity"] | AMOscillator["harmonicity"];

    /**
     * The modulationFrequency Signal of the oscillator
     * (only if the oscillator type is set to pwm)
     */
    modulationFrequency: PWMOscillator["modulationFrequency"];

    /**
     * The type of the modulator oscillator. Only if the
     * oscillator is set to “am” or “fm” types
     */
    modulationType: FMOscillator["modulationType"] | AMOscillator["modulationType"];

    /**
     * The partials of the waveform. A partial represents the
     * amplitude at a harmonic. The first harmonic is the
     * fundamental frequency, the second is the octave and so
     * on following the harmonic series. Setting this value
     * will automatically set the type to “custom”. The value
     * is an empty array when the type is not “custom”.
     * This is not available on “pwm” and “pulse” oscillator types
     */
    partials: ReadonlyArray<Encoding.Frequency>;

    /**
     * The phase of the oscillator in degrees
     */
    phase: Oscillator["phase"];

    /**
     * The detune spread between the oscillators. If “count”
     * is set to 3 oscillators and the “spread” is set to 40,
     * the three oscillators would be detuned like this: [-20, 0, 20]
     * for a total detune spread of 40 cents
     */
    spread: FatOscillator["spread"];

    /**
     * The type of the oscillator. Can be any of the basic
     * types: sine, square, triangle, sawtooth. Or prefix the
     * basic types with “fm”, “am”, or “fat” to use the
     * FMOscillator, AMOscillator or FatOscillator Encoding. The
     * oscillator could also be set to “pwm” or “pulse”. All
     * of the parameters of the oscillator’s class are accessible
     * when the oscillator is set to that type, but throws an error when
     * it’s not
     */
    type: OscillatorType;

    /**
     * The width of the oscillator
     * (only if the oscillator is set to “pulse”)
     */
    width: PulseOscillator["width"];

    restart(time?: Encoding.Time): this;

    /**
     * Set a member/attribute of the oscillator
     */
    set(params: object): this;
    set(key: string, value: number, rampTime: Encoding.Time): this;
  }

  /**
   * Tone.GrainPlayer implements granular synthesis. Granular
   * Synthesis enables you to adjust pitch and playback rate
   * independently. The grainSize is the amount of time each
   * small chunk of audio is played for and the overlap is
   * the amount of crossfading transition time between successive grains
   */
  class GrainPlayer extends Source {
    constructor(url: string | Buffer, callback?: Callback)

    /**
     * The audio buffer belonging to the player
     */
    buffer: Buffer;

    /**
     * The detune control
     */
    detune: Encoding.Cents;

    /**
     * The size of each chunk of audio that the buffer is
     * chopped into and played back at
     */
    grainSize: Encoding.Time;

    /**
     * If the buffer should loop once it’s over
     */
    loop: boolean;

    /**
     * If loop is true, the loop will end at this position
     */
    loopEnd: Encoding.Time;

    /**
     * If loop is true, the loop will start at this position
     */
    loopStart: Encoding.Time;

    /**
     * This is the duration of the cross-fade between
     * sucessive grains
     */
    overlap: Encoding.Time;

    /**
     * The playbackRate of the buffer
     */
    playbackRate: Encoding.Positive;

    /**
     * The direction the buffer should play in
     */
    reverse: boolean;

    /**
     * Jump to a specific time and play it
     */
    seek(offset: Encoding.Time, time?: Encoding.Time): this;

    /**
     * Play the buffer at the given startTime. Optionally add
     * an offset and/or duration which will play the buffer
     * from a position within the buffer for the given duration
     */
    start(startTime?: Encoding.Time, offset?: Encoding.Time, duration?: Encoding.Time): this;
  }

  /**
   * Tone.UserMedia uses MediaDevices.getUserMedia to open up
   * and external microphone or audio input.
   * Access to an external input is limited to secure (HTTPS) connections
   */
  class UserMedia extends AudioNode {
    constructor(volume?: Encoding.Decibels)

    /**
     * Returns a promise which resolves with the list
     * of audio input devices available
     */
    static enumerateDevices(): Promise<ReadonlyArray<MediaDeviceInfo>>

    /**
     * Returns an identifier for the represented device that
     * is persisted across sessions. It is un-guessable by
     * other applications and unique to the origin of the
     * calling application. It is reset when the user clears
     * cookies (for Private Browsing, a different identifier
     * is used that is not persisted across sessions).
     * Returnsundefined when the device is not open
     */
    readonly deviceId: string | undefined;

    /**
     * Returns a group identifier. Two devices have the same
     * group identifier if they belong to the same physical device.
     * Returns undefined when the device is not open
     */
    readonly groupId: string | undefined;

    /**
     * Returns a label describing this device
     * (for example “Built-in Microphone”).
     * Returns undefined when the device is not open or label
     * is not available because of permissions
     */
    readonly label: string | undefined;

    /**
     * Mute the output
     */
    mute: boolean;

    /**
     * Returns the playback state of the source, “started” when
     * the microphone is open and “stopped” when the mic is closed
     */
    readonly state: State;

    /**
     * If getUserMedia is supported by the browser
     */
    static readonly supported: boolean;

    /**
     * The volume of the output in decibels
     */
    volume: Volume["volume"];

    /**
     * Close the media stream
     */
    close(): this;

    /**
     * Open the media stream. If a string is passed in, it is
     * assumed to be the label or id of the stream, if a
     * number is passed in, it is the input number of the stream.
     */
    open(labelOrId: string | number): Promise<MediaStream>;
  }

  //----------------
  // Signal Classes
  //----------------

  type SignalNode = AudioParam | AudioNode | Signal | Tone;

  /**
   * Base class for all Signals.
   * Used Internally
   */
  class SignalBase extends Tone {
    /**
     * When signals connect to other signals or AudioParams,
     * they take over the output value of that signal or AudioParam.
     * For all other nodes, the behavior is the same as a default connect
     */
    connect(node: ProcessingNode | Signal | SignalBase, outputNumber?: number, inputNumber?: number): this;
  }

  interface SignalOptions<E = Encoding.Default> {
    value: E;
    units: Unit;
    convert: boolean;
  }

  /**
   * A signal is an audio-rate value. Tone.Signal is a core
   * component of the library. Unlike a number, Signals
   * can be scheduled with sample-level accuracy.
   * Tone.Signal has all of the methods available to native
   * Web Audio AudioParam as well as additional conveniences
   */
  class Signal<E = Encoding.Default, T = number> extends Param<E, T> {
    constructor(value?: E | AudioParam, units?: Unit)

    /**
     * Connect the output of a ToneNode to an AudioParam,
     * AudioNode, or ToneNode
     */
    connect(node: ProcessingNode | Signal | SignalBase, outputNum?: number, inputNum?: number): this;
  }

  /**
   * Add a signal and a number or two signals. When no value
   * is passed into the constructor, Tone.Add will sum
   * input[0] and input[1]. If a value is passed into the constructor,
   * the it will be added to the input
   */
  class Add<E = Encoding.Default, T = number> extends Signal<E, T> {
    constructor(value?: number)
  }

  /**
   * Multiply two incoming signals. Or, if a number is given
   * in the constructor, multiplies the incoming signal by that
   * value
   */
  class Multiply<E = Encoding.Default, T = number> extends Signal<E, T> {
    constructor(value?: number)
  }

  /**
   * Performs a linear scaling on an input signal. Scales a
   * NormalRange input to between outputMin and outputMax
   */
  class Scale extends SignalBase {
    constructor(outputMin?: number, outputMax?: number)

    /**
     * The maximum output value. This number is output when
     * the value input value is 1
     */
    max: number;

    /**
     * The minimum output value. This number is output when
     * the value input value is 0
     */
    min: number;
  }

  /**
   * Pow applies an exponent to the incoming signal. The
   * incoming signal must be AudioRange
   */
  class Pow extends SignalBase {
    constructor(exp: Encoding.Positive)

    /**
     * The value of the exponent
     */
    value: Encoding.Positive;
  }

  /**
   * Convert an incoming signal between 0, 1 to an equal power
   * gain scale
   */
  class EqualPowerGain extends SignalBase {}

  /**
   * Tone.TransportTimelineSignal extends Tone.Signal, but
   * adds the ability to synchronize the signal to the signal
   * to the Tone.Transport
   */
  class TransportTimelineSignal<E = Encoding.Default, T = number> extends Signal<E, T> {}

  /**
   * Maps a NormalRange [0, 1] to an AudioRange [-1, 1]
   */
  class GainToAudio extends SignalBase {}

  /**
   * Subtract the signal connected to input[1] from the
   * signal connected to input[0]. If an argument is provided
   * in the constructor, the signals .value will be subtracted
   * from the incoming signal
   */
  class Subtract<E = Encoding.Default, T = number> extends Signal<E, T> {
    constructor(value?: number)
  }

  /**
   * Return the absolute value of an incoming signal
   */
  class Abs extends SignalBase {}

  /**
   * Normalize takes an input min and max and maps it
   * linearly to NormalRange [0,1]
   */
  class Normalize extends SignalBase {
    constructor(inputMin: number, inputMax: number)

    /**
     * The maximum value the input signal will reach
     */
    max: number;

    /**
     * The minium value the input signal will reach
     */
    min: number;
  }

  /**
   * Performs an exponential scaling on an input signal.
   * Scales a NormalRange value [0,1] exponentially to the
   * output range of outputMin to outputMax
   */
  class ScaleExp extends SignalBase {
    constructor(outputMin?: number, outputMax?: number, exponent?: number)

    /**
     * Instead of interpolating linearly between the min and
     * max values, setting the exponent will interpolate between
     * the two values with an exponential curve
     */
    exponent: number;

    /**
     * The maximum output value. This number is output when
     * the value input value is 1
     */
    max: number;

    /**
     * The minimum output value. This number is output when
     * the value input value is 0
     */
    min: number;
  }

  /**
   * Tone.Zero outputs 0’s at audio-rate. The reason this has
   * to be it’s own class is that many browsers optimize out
   * Tone.Signal with a value of 0 and will not process nodes
   * further down the graph
   */
  class Zero extends SignalBase {}

  /**
   * Output 1 if the signal is greater than the value,
   * otherwise outputs 0. can compare two signals or a signal
   * and a number
   */
  class GreaterThan<E = Encoding.Default, T = number> extends Signal<E, T> {
    constructor(value?: number)
  }

  /**
   * AudioToGain converts an input in AudioRange [-1,1] to
   * NormalRange [0,1]
   */
  class AudioToGain extends SignalBase {}

  type OversamplingType = 'none' | '2x' | '4x';
  type WaveShaperMappingFn = (currentPosition: number, arrayPosition: number) => number;

  /**
   * Wraps the native Web Audio API WaveShaperNode
   */
  class WaveShaper extends SignalBase {
    constructor(mapping: WaveShaperMappingFn | ReadonlyArray<number> | number, bufferLen?: number)

    /**
     * The array to set as the waveshaper curve. For linear
     * curves array length does not make much difference, but
     * for complex curves longer arrays will provide smoother interpolation
     */
    curve: ReadonlyArray<number>;

    /**
     * Specifies what type of oversampling (if any) should be
     * used when applying the shaping curve. Can either be
     * “none”, “2x” or “4x”
     */
    oversample: OversamplingType;

    /**
     * Uses a mapping function to set the value of the curve
     */
    setMap(mapping: WaveShaperMappingFn): this;
  }

  /**
   * GreaterThanZero outputs 1 when the input is strictly
   * greater than zero
   */
  class GreaterThanZero extends SignalBase {}

  /**
   * Tone.TickSignal extends Tone.Signal, but adds the
   * capability to calculate the number of elapsed ticks.
   * exponential and target curves are approximated with
   * multiple linear ramps
   */
  class TickSignal<E = Encoding.Frequency, T = number> extends Signal<E, T> {
    constructor(value?: Encoding.Frequency)
  }

  /**
   * Negate the incoming signal. i.e. an input signal of
   * 10 will output -10
   */
  class Negate extends SignalBase {}

  /**
   * Signal-rate modulo operator. Only works in AudioRange
   * [-1, 1] and for modulus values in the NormalRange
   */
  class Modulo extends SignalBase {
    constructor(modulus: Encoding.NormalRange)

    /**
     * The modulus value
     */
    value: Encoding.NormalRange;
  }
}

export = Tone;
export as namespace Tone;
