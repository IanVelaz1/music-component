[![Build Status](https://travis-ci.com/jusolete/music-component3.svg?branch=master)](https://travis-ci.com/jusolete/music-component3)
# \<music-component\>
<!--
```
<custom-element-demo>
  <template>
  <script type="module" src="./music-component.js"></script>
    <music-component list-request-url="https://music-server-jansolote.herokuapp.com/tracks" song-url="https://music-server-jansolote.herokuapp.com/track/"></music-component>
  </template>
</custom-element-demo>
```
-->


## Run npm install

```
$ npm install
```

## Properties

|     Properties    | value (default) |                              description                              |
|:-----------------:|-----------------|:---------------------------------------------------------------------:|
|       paused      |      false      |                defines wether the song is paused or not               |
|      songUrl      |        ""       |                  determines the direction of the song                 |
|    songDuration   |        0        |           its set to be the duration of the song in seconds           |
|    startingTime   |        0        |       determines the starting position of the song (in seconds)       |
| songProgress      |        0        |                     current progresss of the song                     |
|       volume      |        0        |               determines the volume of the audio player               |
|   searchArgument  |        ""       |            search String (used with search-song component)            |
|     hiddenList    |       true      |              hide the list of songs(song-list component)              |
|      songName     |        ""       |                    name of the song to be displayed                   |
|   listRequestUrl  |        ""       |         url of the songs list (used with song-list component)         |
|      trackUrl     |        ""       | specific song request direction (combination of songUrl and songName) |
| invisibleControls |      false      |               determines the visibility of the controls               |

## Events

| song-playing     | only fires when the song is playing     |
|------------------|-----------------------------------------|
| song-paused      | only fires once the song is paused      |
| slider-clicked   | fires when the time slider is clicked   |
| dragging-changed | fires once the slider finishes dragging |
| volume-changed   | fires when the volume is changed        |

## Styling


|          Variable name          |   Type   |                   Used                   |
|:-------------------------------:|:--------:|:----------------------------------------:|
|     --music-player-component    |   Mixin  |     host styling of the music player     |
|     --music-controls-buttons    |   Mixin  |          Control buttons styling         |
|    --music-control-button-ink   | Variable |  Effect of control buttons once clicked  |
|     --player-container-style    |   Mixin  |   styling of the music player container  |
| --player-button-container-style |   Mixin  | Stilyng of the control buttons container |
|       --music-slider-color      | Variable | color of the progress and volume sliders |
|    --music-slider-knob-color    | Variable |         color of the sliders knob        |

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
