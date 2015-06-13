
(function () {
    Polymer({
        result: "",
        // metodos
        ready: function () {
            var speechInput = this.$.speechInput;
            var speechMic = this.$.speechMic;
            var check_icon = this.$.check_icon;
            speechInput.style.display = 'none';
            speechMic.style.display = 'none';
            //Separamos las palabras que son suseptibles de reconocer
            check_icon.style.color = "black";
        },
        resultEvent: function (e) {
            this.$.speechInput.value = e.detail.transcript;
            var words = this.$.speechPhrase.innerText.split('/');
            //Iteramos sobre el listado de palabras buscando la palabra reconocida
            for (var i in words) {

                if (this.$.speechInput.value.toLowerCase().trim() == words[i].toLowerCase().trim()) {

                    this.$.speechMic.stop();
                    console.log("La palabra coincidio con: " + words[i]);
                    this.$.check_icon.style.color = "green";
                    this.fire("success");
                }
                else {
                    console.log("no coincide " + words[i].toLowerCase() + " con " + this.$.speechInput.value.toLowerCase());
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
