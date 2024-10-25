const howToPlayModal = document.getElementById('modal-howtoplay');
const howToPlayBtn = document.getElementById('howToPlayBtn');
const playOptionsModal = document.getElementById('modal-playoptions');
const playBtn = document.getElementById('playBtn');
const closeButtons = document.querySelectorAll('.close');


howToPlayBtn.onclick = function() {
    howToPlayModal.style.display = 'block';
};


playBtn.onclick = function() {
    playOptionsModal.style.display = 'block';
};


closeButtons.forEach(btn => {
    btn.onclick = function() {
        howToPlayModal.style.display = 'none';
        playOptionsModal.style.display = 'none';
    };
});

window.onclick = function(event) {
    if (event.target === howToPlayModal || event.target === playOptionsModal) {
        howToPlayModal.style.display = 'none';
        playOptionsModal.style.display = 'none';
    }
};

document.getElementById('playComputer').onclick = function() {
    window.location.href = 'game_computer.html'; 
};

document.getElementById('playFriend').onclick = function() {
    window.location.href = 'game_friend.html'; 
};
