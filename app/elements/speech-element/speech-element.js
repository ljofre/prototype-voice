(function () {
    Polymer("speech-element",{
        // metodos
        ready: function () {
            this.$.speechMic.style.display = 'none';
            this.$.check_icon.style.color = "black";
        },
        resultEvent: function (e) {
            var transcript = e.detail.transcript;
            var words = this.$.speechPhrase.innerText.split('/');
            //Iter sobre el listado de palabras buscando la palabra reconocida
            for (var i in words) {

                if (this.$.speechInput.value.toLowerCase().trim() == words[i].toLowerCase().trim()) {
                    this.$.speechMic.stop();
                    console.log("La palabra coincidio con: " + words[i]);
                    this.$.check_icon.style.color = "green";
                    this.fire("success");
                }
                else {
                    console.log("no coincide " + words[i].toLowerCase() + " con " + transcript.toLowerCase());
                    this.$.check_icon.style.color = "red";
                }
            }
        },

        speak: function () {
            this.$.voice.speak();
        },

        listen: function () {
            this.$.speechMic.toggleRecognition();
        },
    });
})();
