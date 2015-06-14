(function () {
    var procesando = false;
    Polymer("speech-element", {
        //metodos
        ready: function () {
            this.text = JSON.parse(this.text);
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
            var words = this.text.english.split('/');
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
                    console.log("no coincide " + words[i].toLowerCase() + " con " + transcript.toLowerCase());
                    this.$.check_icon.style.color = "red";
                }
            }
            procesando = false;
        },

        speak: function () {
            this.$.voice.speak();
        },

        listen: function () {
            this.$.speechMic.toggleRecognition();
        },
    });
})();
