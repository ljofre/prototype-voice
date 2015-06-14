(function () {
    Polymer("speech-element", {
        //metodos
        ready: function () {
            this.data = JSON.parse(this.data);
            this.$.speechMic.style.display = 'none';
            this.$.check_icon.style.color = "black";
            this.$.spanish.style.display = "none";
        },
        resultEvent: function (e) {
            var transcript = e.detail.transcript;
            var words = this.data.choices[this.data.correct].split('/');
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
            var voiceElement = this.shadowRoot.querySelector('.' + e.srcElement.id);
            voiceElement.speak();
        },
        listen: function () {
            this.$.speechMic.toggleRecognition();
        }
    });
})();
