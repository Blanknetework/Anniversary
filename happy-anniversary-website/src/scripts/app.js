(function() {
    function $(id) {
      return document.getElementById(id);
    }
  
    var card = $('card'),
        openB = $('open'),
        closeB = $('close'),
        timer = null;
    console.log('wat', card);
    openB.addEventListener('click', function () {
      card.setAttribute('class', 'open-half');
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        card.setAttribute('class', 'open-fully');
        timer = null;
      }, 1000);
    });
  
    closeB.addEventListener('click', function () {
      card.setAttribute('class', 'close-half');
      if (timer) clearTimerout(timer);
      timer = setTimeout(function () {
        card.setAttribute('class', '');
        timer = null;
      }, 1000);
    });
  
    document.addEventListener('DOMContentLoaded', function() {
        const music = document.getElementById('backgroundMusic');
        const musicControl = document.getElementById('musicControl');
        let isPlaying = false;

        // Function to play music
        function playMusic() {
            // Set volume to 0.5 (50%)
            music.volume = 0.5;
            
            // Try to play immediately
            let playPromise = music.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    musicControl.classList.remove('muted');
                }).catch(err => {
                    // Auto-play was prevented
                    // Show a "Click to play" overlay
                    createPlayOverlay();
                });
            }
        }

        // Create a temporary overlay to get user interaction
        function createPlayOverlay() {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                cursor: pointer;
            `;

            const button = document.createElement('button');
            button.style.cssText = `
                padding: 20px 40px;
                font-size: 24px;
                background: #ff6b6b;
                color: white;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                animation: pulse 1.5s infinite;
            `;
            button.textContent = 'Click to Start ♪';

            overlay.appendChild(button);
            document.body.appendChild(overlay);

            // Add click event to start music and remove overlay
            overlay.addEventListener('click', function() {
                playMusic();
                overlay.remove();
            }, { once: true });
        }

        // Function to toggle music
        function toggleMusic() {
            if (isPlaying) {
                music.pause();
                musicControl.classList.add('muted');
            } else {
                music.play();
                musicControl.classList.remove('muted');
            }
            isPlaying = !isPlaying;
        }

        // Try to play immediately when page loads
        playMusic();

        // Music control button click handler
        musicControl.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMusic();
        });

        // Pause music when page is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && isPlaying) {
                music.pause();
            } else if (!document.hidden && isPlaying) {
                music.play();
            }
        });

        // Add this to your existing CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    });
  }());
  