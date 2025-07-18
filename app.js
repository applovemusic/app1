document.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const trackTitle = document.querySelector('.track-title');
  const trackArtist = document.querySelector('.track-artist');
  const iframe = document.getElementById('player');

  // Lista simulada de músicas
  const playlist = [
    {
      title: 'A Thousand Years',
      artist: 'Christina Perri',
      videoId: 'rtOvBOTyX00'
    },
    {
      title: 'Perfect',
      artist: 'Ed Sheeran',
      videoId: '2Vv-BfVoq4g'
    },
    {
      title: 'All of Me',
      artist: 'John Legend',
      videoId: '450p7goxZqg'
    }
  ];

  let currentIndex = 0;
  let isPlaying = true;

  function loadTrack(index) {
    const track = playlist[index];
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    iframe.src = `https://www.youtube.com/embed/${track.videoId}?autoplay=1&controls=0&rel=0`;
    isPlaying = true;
    updatePlayButton();
  }

  function updatePlayButton() {
    const img = playBtn.querySelector('img');
    img.src = isPlaying ? './controls/pause.svg' : './controls/play.svg';
    img.alt = isPlaying ? 'Pausar' : 'Tocar';
  }

  playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    updatePlayButton();

    // Como não controlamos o player com API ainda, apenas recarregamos
    if (isPlaying) {
      loadTrack(currentIndex);
    } else {
      iframe.src = ''; // para o vídeo
    }
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadTrack(currentIndex);
  });

  // Inicializa o player
  loadTrack(currentIndex);
});
