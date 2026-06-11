    const timerDisplay = document.getElementById('timer');
    const congrats = document.getElementById('congrats');
    const tryAgainBtn = document.getElementById('tryAgain');
    const audio = document.getElementById('focusAudio');
    const muteToggle = document.getElementById('muteToggle');
    const intro = document.getElementById('intro');
    const content = document.getElementById('challengeContent');
    const victoryShare = document.getElementById('victoryShare');

    let time = 30; // 30 seconds challenge
    let countdown;
    let muted = false;
    let challengeComplete = false;

    function showIntroMessages() {
      const messages = [
        "Welcome to the 30-Second Challenge",
        "Your goal: remain completely still for 30 seconds",
        "Any movement or scrolling will reset the timer",
        "Let's begin"
      ];
      let index = 0;
      function nextMessage() {
        if (index < messages.length) {
          intro.textContent = messages[index];
          intro.style.display = 'block';
          intro.style.animation = 'fade 2s ease-in-out';
          setTimeout(() => {
            intro.style.display = 'none';
            index++;
            nextMessage();
          }, 2500);
        } else {
          content.style.display = 'block';
          startTimer();
        }
      }
      nextMessage();
    }

    function startTimer() {
      clearInterval(countdown);
      countdown = setInterval(() => {
        if (time > 0) {
          time--;
          let minutes = Math.floor(time / 60);
          let seconds = time % 60;
          timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          clearInterval(countdown);
          challengeComplete = true;
          congrats.style.display = 'block';
          tryAgainBtn.style.display = 'inline-block';
          victoryShare.style.display = 'block';
        }
      }, 1000);
    }

    function resetTimer() {
      if (!challengeComplete) {
        time = 30; // Reset to 30 seconds
        timerDisplay.textContent = '00:30';
        congrats.style.display = 'none';
        tryAgainBtn.style.display = 'none';
        victoryShare.style.display = 'none';
        startTimer();
      }
    }

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('touchstart', resetTimer);
    document.addEventListener('scroll', resetTimer);

    muteToggle.addEventListener('click', () => {
      audio.muted = !audio.muted;
      muteToggle.innerHTML = audio.muted ? '<i class="bi bi-volume-mute"></i>' : '<i class="bi bi-volume-up"></i>';
    });

    showIntroMessages();
