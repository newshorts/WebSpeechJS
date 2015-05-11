/* 
 * Do whatever you want with this
 * 
 * Mike Newell
 */


function WebSpeech($, options) {
    
    var __ = this;
    
    var defaults = {
        startButton: $('.start'),
        stopButton: $('.stop'),
        tmpOutput: $('.tmp'),
        finalOutput: $('.final'),
        onResult: function(result) { console.log(result) }
    };
    __.options = $.extend({}, defaults, options || {});
    
    var rec,
        final = '',
        tmp = '';

    function init() {
        if (!('webkitSpeechRecognition' in window)) {
            $('.start').hide();
            // do no more
            return;
        }

        rec= new webkitSpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onstart = handleStart;
        rec.onresult = handleResult;
        rec.onerror = handleError;
        rec.onend = handleEnd;
        rec.soundend = handleSoundEnd;
    }

    function handleStart(evt) {
        console.log('started')
        console.log(evt)
        $(window).trigger('microphoneStarted');
    }

    function handleResult(evt) {
        tmp = '';
        for(var i = evt.resultIndex; i < evt.results.length; i++) {
            var result = evt.results[i][0];
            
            if(evt.results[i].isFinal) {
                // return the final output
            } else {
                tmp += result.transcript;
                __.options.onResult(tmp);
            }

            update();
        }
    }

    function handleError(evt) {
        console.log('error');
        console.log(evt);
    }

    function handleEnd(evt) {
        console.log('end');
        console.log(evt);
        console.log(evt.error);
    }

    function handleSoundEnd(evt) {
        console.log('sound ended');
        console.log(evt);
    }

    function update() {
        $('.tmp').text(tmp);
        $('.final').text(final);
    }

    // events
    $('.start').on('click', function(evt) {
        evt.preventDefault();
        // start the web speech api
        final = '';
        tmp = '';
        update();
        rec.start();
    });

    $('.stop').on('click', function(evt) {
        evt.preventDefault();
        rec.stop();
    });

    // public
    __.start = function() {
        final = '';
        tmp = '';
        update();
        rec.start();
    };

    init();

    return __;
}