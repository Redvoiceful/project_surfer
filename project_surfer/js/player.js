
const play = document.getElementById('play')
const pause = document.getElementById('pause')

function letPlay () {
    play.style.visibility = 'hidden';
    pause.style.visibility = 'visible';
    player.playVideo();
}

function isStopped() {
    play.style.visibility = 'visible';
    pause.style.visibility = 'hidden';
    player.pauseVideo();
}


play.addEventListener('click', (elem) => {
    console.log('click')
    letPlay();
});

pause.addEventListener('click',(elem) =>{
    console.log('click')
    isStopped();
});

const onPlayerReady = () => {
    const durationSec = player.getDuration();
    $(".player__duration-all").text(formatTime(durationSec));
    if (typeof interval !== "undefined") {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();

        $(".player__duration-current").text(formatTime(completedSec));
    }, 1000);
};

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
};


interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__path-active").css({
        left: `${completedPercent}%`
    });

    $(".player__duration-completed").text(formatTime(completedSec));
}, 1000);


$(".player__path").click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;

    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec =
        (player.getDuration() / 100) * newButtonPositionPercent;

    $(".player__path-active").css({
        left: `${newButtonPositionPercent}%`
    });

    player.seekTo(newPlaybackPositionSec);
});



    let player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            height: '396',
            width: '666',
            videoId: 'oIIDZq4nZpo',
            events: {
                'onReady': onPlayerReady,
                // 'onStateChange': onPlayerStateChange
            },
            playerVars: {
                controls: 0,
                disablekb: 1,
                showinfo: 0,
                rel: 0,
                autoplay: 0,
                modestbranding: 0,
            },

        })
    }

// eventsInit();

