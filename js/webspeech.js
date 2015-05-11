/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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

//    var analyzer, contextualizer;

    function init() {
        if (!('webkitSpeechRecognition' in window)) {
//                            console.log('starting');
            $('.start').hide();
            // do no more
            return;
        }

//        analyzer = new Analyzer(_CONTEXT);
//        contextualizer = new Contextualizer();

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
                            console.log(result);

            tmp += result.transcript;
            __.options.onResult(tmp);

//            if(evt.results[i].isFinal) {
//                tmp += result.transcript;
//                final += result.transcript;
//                console.log('this is final')
//                console.log(final)
//                console.log('TODO: start over and clear the list')
//                // TODO: need to clear out the keywords list after this so we can start over
//                __.options.onResult(tmp);
//            } else {
//                tmp += result.transcript;
////                var output = analyzer.analyze(tmp);
//
////                contextualizer.contextualize(output);
//                __.options.onResult(tmp);
//
////                if(tmp.length > 0 && result.confidence > 0.88) {
////                    // maybe we need to do something here???
////                }    
//            }

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
    __.init = function() {
        init();
    };
    
    __.start = function() {
        final = '';
        tmp = '';
        update();
        rec.start();
    };
    
//    __.onResult = function(output) {
//        console.log(output);
//    };

    return __;
}