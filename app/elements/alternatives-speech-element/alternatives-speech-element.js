Polymer("alternatives-speech-element", {
    
    //propiedades
    state: false,
    // metodos
    ready: function () {
        this.alternatives = JSON.parse(this.alternatives);
        this.choices = this.alternatives["alternatives"];
        this.correct = this.alternatives["correct"];
        this.$.voice.text = this.choices[this.correct];
        
        var speechInput = this.$.speechInput;
        var speechMic = this.$.speechMic;
       
        var check_icon = this.$.check_icon;
        speechInput.style.display = 'none';
        speechMic.style.display = 'none';
        //Separamos las palabras que son suseptibles de reconocer
        check_icon.style.color = "black";


    },

    domReady: function () {
        
        var speechMic = this.$.speechMic;
         var speechPhrase = this.$.speechPhrase;
         var speechInput = this.$.speechInput;
         var check_icon = this.$.check_icon;
         
        speechMic.addEventListener('speech-mic-result', function (e) {
            this.$.speechPhrase.textContent = this.choices[this.correct];
            var words = speechPhrase.innerText.split('/');
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

    speak: function (e) {
        var voiceElement = this.$.texts.querySelector('.' + e.srcElement.id);
        voiceElement.speak();
    },

    listen: function () {

        this.$.speechMic.toggleRecognition();
    }

});