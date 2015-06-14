(function () {
    Polymer("speech-element", {
        //metodos
        eventFlag : true,
        ready: function () {
            this.text = JSON.parse(this.text);
            this.$.speechMic.style.display = 'none';
            this.$.check_icon.style.color = "black";
        },
        resultEvent: function (e) {
            var transcript = e.detail.transcript;
            var words = this.text.english.split('/');
            //Iter sobre el listado de palabras buscando la palabra reconocida
            for (var i in words) {

                if (transcript.toLowerCase().trim().search(words[i].toLowerCase().trim()) != -1) {
                    this.$.speechMic.stop();
                    console.log("La palabra coincidio con: " + words[i]);
                    this.$.check_icon.style.color = "green";
                    if (this.eventFlag) {
                        this.fire("success");
                        this.eventFlag = false;
                    };
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
