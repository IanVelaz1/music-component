import {html,PolymerElement} from '@polymer/polymer/polymer-element.js';
import "@polymer/paper-button/paper-button.js";
import "music-list-component/music-list-component.js";
import "@polymer/paper-input/paper-input.js"
import "@polymer/paper-slider/paper-slider.js"
 /**
* `Music-Player` is a web mp3 player. as soon as the user provides a server from wich the component will get the song list and they'll be avaliable for playing.
* Example:
* <music-component list-request-url="https://music-server-jansolote.herokuapp.com/tracks" song-url="https://music-server-jansolote.herokuapp.com/track/"></music-component>
* ### Properties
* 
|     Properties    | value (default) |                              description                              |
|-----------------|-----------------|---------------------------------------------------------------------|
|       paused      |      false      |                defines wether the song is paused or not               |
* |     songUrl      |        ""       |                  determines the direction of the song                 |
* |   songDuration   |        0        |           its set to be the duration of the song in seconds           |
* |   startingTime   |        0        |       determines the starting position of the song (in seconds)       |
* | songProgress      |        0        |                     current progresss of the song                     |
* |      volume      |        0        |               determines the volume of the audio player               |
* |  searchArgument  |        ""       |            search String (used with search-song component)            |
* |    hiddenList    |       true      |              hide the list of songs(song-list component)              |
* |     songName     |        ""       |                    name of the song to be displayed                   |
* |  listRequestUrl  |        ""       |         url of the songs list (used with song-list component)         |
* |     trackUrl     |        ""       | specific song request direction (combination of songUrl and songName) |
* | invisibleControls |      false      |               determines the visibility of the controls              | 

* ### Events
*  | song-playing     | only fires when the song is playing | 
*  |-----------------|-----------------------------------------|
*  | song-paused      | only fires once the song is paused |   
*  | slider-clicked   | fires when the time slider is clicked |
*  | dragging-changed | fires once the slider finishes dragging |
*  | volume-changed   | fires when the volume is changed | 

* ### Styling

*   |      Variable name          |   Type   |                   Used                   
*   |-----------------------------|----------|-----------------------------------------|
*  |    --music-player-component |   Mixin  |     host styling of the music player   | 
*  |    --music-controls-buttons |   Mixin  |          Control buttons styling        | 
*  |  --music-control-button-ink | Variable |  Effect of control buttons once clicked | 
*  |    --player-container-style |   Mixin  |   styling of the music player container | 
*  |--player-button-container-style |   Mixin  | Stilyng of the control buttons container | 
*  |     --music-slider-color    | Variable | color of the progress and volume sliders | 
*  |   --music-slider-knob-color | Variable |         color of the sliders knob       | 
* @customElement
* @polymer
* @demo demo/index.html
*/
class MusicComponent extends PolymerElement {
  static get template() {
    return html `
      <style>
      <style>
      :host {
        display: block;
        @apply --music-player-component;
      }
      #audioControls{
        width:100%;
        height: 40px;
        display: flex;
        border-radius: 5px;
      }
      
      paper-button.controls{
        text-align: center;
        width: 33%;
        --paper-button:{
          background-color:#1C1426;
          color:white;
          @apply --music-controls-buttons
        }
        --paper-button-ink-color:var(--music-control-button-ink,blue);
      }
      .player-container{
        @apply --player-container-style;
        width: 300px;
        margin: 0 auto;
      }
      .button-container{
        @apply --player-button-container-style;
        width: 300px;
        margin: 0 auto;
      }
      paper-slider{
        width: 100%;
        --paper-slider-active-color:var(--music-slider-color,blue);
        --paper-slider-knob-color:var(--music-slider-knob-color,blue);
      }
      paper-slider#volumeControl{
        width: 33%;
        --paper-slider-active-color:var(--music-slider-color,blue);
        --paper-slider-knob-color:var(--music-slider-knob-color,blue);
      }
      #show-ctrl{
        width: 100%;
        color: white;
        background-color:#2C4C59;
        border:none;
        padding:7px;
        border-radius: 5px;
        cursor:pointer;
        margin-bottom: 10px;
        @apply --music-controls-show-button
      }
    </style>
    <audio id="musicPlayer">
      <source src="[[trackUrl]]" type="audio/mp3" codecs="mp3">
    </audio>
    <div class="button-container" hidden$="[[invisibleControlsButton]]">
      <button id="show-ctrl" on-click="showControls">hide controls</button>
    </div>
    <div class="button-container" hidden$="[[!invisibleControlsButton]]">
      <button id="show-ctrl" on-click="showControls">show controls</button>
    </div>
    <div class="player-container">

      <div class="search-container" hidden$="[[invisibleControls]]">
        <paper-input label="search song" value="{{searchArgument}}"></paper-input>
        <music-list-component on-song-selected="selectSong" filter-argument="[[searchArgument]]" hidden-list="[[hiddenList]]"
          request-url="[[listRequestUrl]]"></music-list-component>
        <p class="song-name">[[songName]]</p>
        <div class="slider-container">
          <paper-slider min="0" value="[[songProgress]]" max="[[songDuration]]" on-dragging-changed="draggingChanged"
            step="0.1" on-click="clickedSlider"></paper-slider>
        </div>
      </div>
      <div id="audioControls">
        <paper-button class="controls" on-tap="decreaseVolume">-</paper-button>
        <template is="dom-if" if="[[!paused]]">
          <paper-button class="controls" on-tap="playSong">play</paper-button>
        </template>
        <template is="dom-if" if="[[paused]]">
          <paper-button class="controls" on-tap="pauseSong">pause</paper-button>
        </template>
        <paper-button class="controls" on-tap="increaseVolume">+</paper-button>
      </div>
      <paper-slider min="0" max="1" value="{{volume}}" step="0.01" id="volumeControl" on-value-changed="volumeChanged"></paper-slider>
    </div>
    `;
  }
  static get properties() {
    return {
      paused: {
        type: Boolean,
        value: false
      },
      songDuration: {
        type: Number,
        value: 0
      },
      startingTime: {
        type: Number,
        value: 20
      },
      songProgress: {
        type: Number,
        value: 0
      },
      volume: {
        type: Number,
        value: 0.5
      },
      searchArgument: {
        type: String,
        value: "",
        observer:"searchSong"
      },
      hiddenList: {
        type: Boolean,
        value: true
      },
      songName: {
        type: String,
        value: ""
      },
      listRequestUrl: {
        type: String,
        value: ""
      },
      songUrl: {
        type: String,
        value: ""
      },
      trackUrl: {
        type: String,
        value: ""
      },
      invisibleControls: {
        type: Boolean,
        value: false
      },
      invisibleControlsButton: {
        type: Boolean,
        value: false
      }
    };
  }

  ready() {
    super.ready();
    this.isSongReady();
  }

  isSongReady() {
    const musicPlayer = this.shadowRoot.querySelector("#musicPlayer");
    musicPlayer.addEventListener("loadedmetadata", (event) => {
      this.set("songDuration", musicPlayer.duration)
    });
  }

  playSong() {
    const musicPlayer = this.shadowRoot.querySelector("#musicPlayer");
    musicPlayer.play();
    musicPlayer.addEventListener("timeupdate", (event) => {
      this.set("songProgress", musicPlayer.currentTime);

    });
    let songObject = {
      songUrl: this.trackUrl,
      duration: this.songDuration
    }
    this.dispatchEvent(new CustomEvent("song-playing", {
      bubbles: false,
      composed: false,
      detail: songObject
    }))
    this.set("paused", true);
  }

  pauseSong() {
    const musicPlayer = this.shadowRoot.querySelector("#musicPlayer");
    let songObject = {
      songUrl: this.trackUrl,
      currentTime: musicPlayer.currentTime
    }

    musicPlayer.pause();
    this.set("startingTime", musicPlayer.currentTime);
    this.set("paused", false);
    this.dispatchEvent(new CustomEvent("song-paused", {
      bubbles: false,
      composed: false,
      detail: songObject
    }))
  }

  clickedSlider(event) {
    let sliderValue = event.target.getAttribute("value")
    let musicPlayer = this.shadowRoot.querySelector("#musicPlayer");
    musicPlayer.currentTime = sliderValue;
    this.dispatchEvent(new CustomEvent("slider-clicked", {
      bubbles: false,
      composed: false,
      detail: sliderValue
    }));
  }

  draggingChanged(event) {
    let isDragging = event.detail.value;
    if (isDragging === false) {
      const musicPlayer = this.shadowRoot.querySelector("#musicPlayer");
      musicPlayer.currentTime = event.target.getAttribute("value");
      this.dispatchEvent(new CustomEvent("dragging-changed", {
        composed: false,
        bubbles: false,
        detail: musicPlayer.currentTime
      }))
    }
  }

  volumeChanged(event) {
    const musicPlayer = this.shadowRoot.querySelector("#musicPlayer");
    this.set("volume", event.detail.value);
    musicPlayer.volume = this.volume;
    this.dispatchEvent(new CustomEvent("volume-changed", {
      bubbles: false,
      composed: false,
      detail: this.volume
    }))
  }

  selectSong(event) {
    this.set("trackUrl", "");
    this.set("trackUrl", `${this.songUrl}${event.detail}`);
    this.set("songName", event.detail);
    const musicPlayer = this.shadowRoot.querySelector("#musicPlayer");
    musicPlayer.load();
    musicPlayer.addEventListener("loadedmetadata", (event) => {
      this.set("songDuration", musicPlayer.duration)
    });
    musicPlayer.play();
    let songObject = {
      songUrl: this.trackUrl,
      duration: this.songDuration
    }
    this.dispatchEvent(new CustomEvent("song-playing", {
      bubbles: false,
      composed: false,
      detail: songObject
    }))
    musicPlayer.addEventListener("timeupdate", (event) => {
      this.set("songProgress", musicPlayer.currentTime);
    });

    this.set("songProgress", 0);
    this.set("paused", true);
  }

  searchSong() {
    if (this.searchArgument.length === 0) {
      this.set("hiddenList", true);
    } else {
      this.set("hiddenList", false);
    }

  }

  increaseVolume() {
    if (this.volume <= 1) {
      this.set("volume", this.volume + 0.10);
      this.dispatchEvent(new CustomEvent("volume-changed", {
        bubbles: false,
        composed: false,
        detail: this.volume
      }))
    }
  }

  decreaseVolume() {
    if (this.volume >= 0) {
      this.set("volume", this.volume - 0.10);
      this.dispatchEvent(new CustomEvent("volume-changed", {
        bubbles: false,
        composed: false,
        detail: this.volume
      }))
    }

  }

  showControls() {
    this.set("invisibleControls", !this.invisibleControls);
    this.set("invisibleControlsButton",!this.invisibleControlsButton);

  }

}

window.customElements.define('music-component', MusicComponent);