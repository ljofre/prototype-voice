
Polymer({
    
    //propiedades
    state: false,
    // metodos
    ready: function () {
        var speechInput = this.$.speechInput;
        var speechMic = this.$.speechMic ;
        var speechPhrase = this.$.speechPhrase;
        var check_icon = this.$.check_icon;
        speechInput.style.display = 'none';
        speechMic.style.display = 'none';
        //Separamos las palabras que son suseptibles de reconocer
        var words = speechPhrase.innerText.split('/');

        check_icon.style.color = "black";

        speechMic.addEventListener('speech-mic-result', function (e) {
            
            speechInput.value = e.detail.transcript;

            //Iteramos sobre el listado de palabras buscando la palabra reconocida
            for (var i in words) {
                
                if (speechInput.value.toLowerCase().trim() == words[i].toLowerCase().trim()) {
                    speechMic.stop();
                    console.log("La palabra coincidio con: " + words[i]);
                    check_icon.style.color = "green";
                    i = words.length;
                }
                
                else {
                    console.log("no coincide " + words[i].toLowerCase() + " con " + speechInput.value.toLowerCase());

                    check_icon.style.color = "red";
                }
            }
        });
    },

    speak: function () {
        voice = this.$.voice;
        voice.speak();
    },

    listen: function(){
          this.$.speechMic.toggleRecognition();
    }

});