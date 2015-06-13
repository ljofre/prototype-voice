Polymer("alternatives-speech-element", {

    ready: function () {
        this.alternatives = JSON.parse(this.alternatives);
        var alternatives = this.alternatives;
        var speechMic = this.$.speechMic;
        var check_icon = this.$.check_icon;
        speechMic.style.display = 'none';
        check_icon.style.color = "black";

        speechMic.addEventListener('speech-mic-result', function (e) {
            var transcript = e.detail.transcript;
            var words = alternatives.choices[alternatives.correct];
            words = words.split('/');
            
            //Iter sobre el listado de palabras buscando la palabra reconocida
            for (var i in words) {

                if (this.transcript.toLowerCase().trim().search(words[i].toLowerCase().trim()) != 0) {
                    speechMic.stop();
                    console.log("La palabra coincidio con: " + words[i]);
                    check_icon.style.color = "green";
                }

                else {
                    console.log("no coincide " + words[i].toLowerCase() + " con " + transcript);
                    check_icon.style.color = "red";
                }
            }
        });
    },

    speak: function (e) {
        var voiceElement = this.$.texts.querySelector('.' + e.srcElement.id);
        voiceElement.speak();
    },

    listen: function () {
        this.$.speechMic.toggleRecognition();
    }

});