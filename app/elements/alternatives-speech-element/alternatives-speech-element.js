(function () {
    var procesando = false;
    Polymer("alternatives-speech-element", {
        //metodos
        ready: function () {
            this.alternatives = JSON.parse(this.alternatives);
            this.$.speechMic.style.display = 'none';
            this.$.check_icon.style.color = "black";
            this.$.spanish.style.display = "none";
        },
        resultEvent: function (e) {
            console.log(procesando);
            if (procesando) {
                return;
            }
            procesando = true;
            var transcript = e.detail.transcript;
            var words = this.alternatives.choices[this.alternatives.correct].split('/');
            //Iter sobre el listado de palabras buscando la palabra reconocida
            for (var i in words) {
                if (transcript.toLowerCase().trim().search(words[i].toLowerCase().trim()) != -1) {
                    this.$.speechMic.stop();
                    console.log("La palabra coincidio con: " + words[i]);
                    this.$.check_icon.style.color = "green";
                    this.fire("success");
                    this.$.spanish.style.display = "block";
                }
                else {
                    console.log("no coincide " + words[i].toLowerCase() + " con " + transcript);
                    this.$.check_icon.style.color = "red";
                }
            }
        },
        speak: function (e) {
            var voiceElement = this.$.texts.querySelector('.' + e.srcElement.id);
            voiceElement.speak();
        },
        listen: function () {
            this.$.speechMic.toggleRecognition();
        }
    });
})();
