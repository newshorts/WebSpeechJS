WebSpeechJS
===========

### NOTE: This is very rough, I will work on things later, but for now, this library is included for learning purposes only. I wouldn't use it in production!!!

A very simple way to get started with [web speech API](http://caniuse.com/#feat=web-speech)

Basically, you can get started with the example index page or init the library like this:

```
<!-- include the js file -->
<script src="path/to/js/webspeech.js"></script>
<script>
    // when the window loads call the script
    var options = {
        startButton: $('.start'),
        stopButton: $('.stop'),
        tmpOutput: $('.tmp'),
        finalOutput: $('.final'),
        onResult: handleWebSpeechResult
    };
    var ws = new WebSpeech($, options);

    // start the processes
    ws.init();
</script>

<!-- then in your page template, include necessary the elements -->
<p class="tmp"></p>
<p class="final"></p>
<button class="start">Start</button>
<button class="stop">Stop</button>

```

Basically, the library automatically listens for the start button click and implements the API. The stop button has not been implemented.