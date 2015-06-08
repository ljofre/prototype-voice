Polymer("alternatives-speech-element", {

    ready: function () {
        var alternatives = JSON.parse(this.alternatives);
        this.alternatives = JSON.parse(this.alternatives);
        var speechInput = this.$.speechInput;
        var speechMic = this.$.speechMic;
        var check_icon = this.$.check_icon;
        speechInput.style.display = 'none';
        speechMic.style.display = 'none';
        //Separamos las palabras que son suseptibles de reconocer
        check_icon.style.color = "black";
        
        speechMic.addEventListener('speech-mic-result', function (e) {
            speechInput.value = e.detail.transcript;
            var words = alternatives.choices[alternatives.correct];
            words = words.split('/');
            
            //Iteramos sobre el listado de palabras buscando la palabra reconocida
            for (var i in words) {

                if (speechInput.value.toLowerCase().trim() == words[i].toLowerCase().trim()) {
                    speechMic.stop();
                    console.log("La palabra coincidio con: " + words[i]);
                    check_icon.style.color = "green";
                }

                else {
                    console.log("no coincide " + words[i].toLowerCase() + " con " + speechInput.value.toLowerCase());
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