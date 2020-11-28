/* Creating a loop going throuh pad */

class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
    }

    activePad () {
        this.classList.toggle('active');
    }

    /* loop through each */
    repeat() { /*Method */
        let step = this.index % 8;
        const activeBar = document.querySelectorAll(`.b${step}`) /*Selects all three b's from HTML */
        this.index++; 
        /* Loop over the pads with animation*/
        activeBar.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`; /* 2 allows to return to previous position, smooth */
            /* Check if pads active */
            if (bar.classList.contains("active")) {
                /* Check each sound */
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0; /* Allows to play pads after each other */
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0; /* Allows to play pads after each other */
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0; /* Allows to play pads after each other */
                    this.hihatAudio.play();
                }
            }
        })
    }
    start() { /*Another method invoking repeat multiple times*/
        const interval = (60 / this.bpm) * 1000; 
        setInterval(() => {
            this.repeat();
        }, interval);
         /*Arrow function allows to refer to repeat method's keyword, not window object. 1000 ads time ms*, interval controls the looping
          speed */ 
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => { /*Add a class active, .this does not matter in this case */
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function() { /*Stops animation for pads and allows them to start again */
        this.style.animation = '';
    });
});

drumKit.playBtn.addEventListener("click", function () { /* Function allows to refer to inside object this, runs callback */
    drumKit.start();
});