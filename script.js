const EVENT_DATE = new Date("2026-08-15T19:30:00-03:00");

const elements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  countdownMessage: document.getElementById("countdownMessage"),
  mainPhoto: document.getElementById("mainPhoto"),
  photoDate: document.getElementById("photoDate"),
  photoCaption: document.getElementById("photoCaption"),
  photoGallery: document.getElementById("photoGallery"),
  shareButton: document.getElementById("shareButton"),
  toast: document.getElementById("toast"),
  audioPlayer: document.getElementById("audioPlayer"),
  musicToggleButton: document.getElementById("musicToggleButton"),
  musicHeaderButton: document.getElementById("musicHeaderButton"),
  previousTrackButton: document.getElementById("previousTrackButton"),
  nextTrackButton: document.getElementById("nextTrackButton"),
  volumeControl: document.getElementById("volumeControl"),
  currentTrackTitle: document.getElementById("currentTrackTitle"),
  currentTrackDescription: document.getElementById("currentTrackDescription"),
  musicPlaylist: document.getElementById("musicPlaylist")
};

function padNumber(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const difference = EVENT_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    elements.days.textContent = "00";
    elements.hours.textContent = "00";
    elements.minutes.textContent = "00";
    elements.seconds.textContent = "00";
    elements.countdownMessage.textContent = "O grande dia chegou!";
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  elements.days.textContent = padNumber(days);
  elements.hours.textContent = padNumber(hours);
  elements.minutes.textContent = padNumber(minutes);
  elements.seconds.textContent = padNumber(seconds);
}

function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatPhotoDate(dateString) {
  return parseLocalDate(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function getSortedPhotos() {
  if (!Array.isArray(fotosWigor)) {
    return [];
  }

  return [...fotosWigor].sort(
    (photoA, photoB) =>
      parseLocalDate(photoB.data) - parseLocalDate(photoA.data)
  );
}

function selectCurrentPhoto(photos) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  return (
    photos.find((photo) => parseLocalDate(photo.data) <= today) ||
    photos[photos.length - 1] ||
    null
  );
}

function renderMainPhoto(photo) {
  if (!photo) {
    return;
  }

  elements.mainPhoto.src = photo.arquivo;
  elements.mainPhoto.alt = photo.legenda
    ? `Foto do Wigor: ${photo.legenda}`
    : "Foto do Wigor";
  elements.photoDate.textContent = formatPhotoDate(photo.data);
  elements.photoCaption.textContent = photo.legenda || "Foto do dia";
}

function renderGallery(photos) {
  elements.photoGallery.innerHTML = "";

  if (photos.length === 0) {
    elements.photoGallery.innerHTML = `
      <div class="empty-gallery">
        Nenhuma foto foi adicionada ainda.
      </div>
    `;
    return;
  }

  photos.forEach((photo) => {
    const article = document.createElement("article");
    article.className = "gallery-card";

    const image = document.createElement("img");
    image.src = photo.arquivo;
    image.alt = photo.legenda
      ? `Foto do Wigor: ${photo.legenda}`
      : "Foto do Wigor";
    image.loading = "lazy";

    const overlay = document.createElement("div");
    overlay.className = "gallery-card-overlay";

    const date = document.createElement("span");
    date.className = "gallery-card-date";
    date.textContent = formatPhotoDate(photo.data);

    const caption = document.createElement("p");
    caption.textContent = photo.legenda || "Registro da contagem regressiva";

    overlay.append(date, caption);
    article.append(image, overlay);
    elements.photoGallery.appendChild(article);
  });
}


let currentTrackIndex = 0;

function getPlaylist() {
  return Array.isArray(musicasWigor) ? musicasWigor : [];
}

function updateMusicButtons(isPlaying) {
  const mainText = isPlaying ? "⏸ Desativar música" : "▶ Ativar música";
  const headerText = isPlaying ? "⏸ Pausar música" : "▶ Música calma";

  elements.musicToggleButton.textContent = mainText;
  elements.musicHeaderButton.textContent = headerText;
}

function updatePlaylistHighlight() {
  const playlistButtons = elements.musicPlaylist.querySelectorAll(".playlist-item");

  playlistButtons.forEach((button, index) => {
    const isActive = index === currentTrackIndex;
    button.classList.toggle("active", isActive);

    const status = button.querySelector(".playlist-status");
    if (status) {
      status.textContent = isActive ? "Selecionada" : "Ouvir";
    }
  });
}

function loadTrack(index, shouldPlay = false) {
  const playlist = getPlaylist();

  if (playlist.length === 0) {
    elements.currentTrackTitle.textContent = "Nenhuma música adicionada";
    elements.currentTrackDescription.textContent =
      "Adicione uma música no arquivo musicas.js.";
    return;
  }

  currentTrackIndex = (index + playlist.length) % playlist.length;
  const track = playlist[currentTrackIndex];

  elements.audioPlayer.src = track.arquivo;
  elements.currentTrackTitle.textContent = track.titulo;
  elements.currentTrackDescription.textContent =
    track.descricao || "Música calma da playlist.";
  updatePlaylistHighlight();

  if (shouldPlay) {
    elements.audioPlayer.play().catch(() => {
      showToast("Clique novamente para iniciar a música.");
    });
  }
}

async function toggleMusic() {
  const playlist = getPlaylist();

  if (playlist.length === 0) {
    showToast("Nenhuma música foi adicionada ainda.");
    return;
  }

  try {
    if (elements.audioPlayer.paused) {
      await elements.audioPlayer.play();
    } else {
      elements.audioPlayer.pause();
    }
  } catch (error) {
    showToast("O navegador bloqueou a reprodução automática.");
  }
}

function renderMusicPlaylist() {
  const playlist = getPlaylist();
  elements.musicPlaylist.innerHTML = "";

  if (playlist.length === 0) {
    elements.musicPlaylist.innerHTML = `
      <div class="empty-gallery">
        Nenhuma música foi adicionada ainda.
      </div>
    `;
    return;
  }

  playlist.forEach((track, index) => {
    const button = document.createElement("button");
    button.className = "playlist-item";
    button.type = "button";

    const title = document.createElement("span");
    title.textContent = track.titulo;

    const status = document.createElement("span");
    status.className = "playlist-status";
    status.textContent = index === currentTrackIndex ? "Selecionada" : "Ouvir";

    button.append(title, status);
    button.addEventListener("click", () => loadTrack(index, true));
    elements.musicPlaylist.appendChild(button);
  });

  updatePlaylistHighlight();
}

function playPreviousTrack() {
  loadTrack(currentTrackIndex - 1, true);
}

function playNextTrack() {
  loadTrack(currentTrackIndex + 1, true);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 2600);
}

async function shareSite() {
  const shareData = {
    title: document.title,
    text: "Veja a contagem regressiva para o discurso público do Wigor!",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    showToast("Link copiado!");
  } catch (error) {
    if (error.name !== "AbortError") {
      showToast("Não foi possível compartilhar o link.");
    }
  }
}

const photos = getSortedPhotos();
const currentPhoto = selectCurrentPhoto(photos);

renderMainPhoto(currentPhoto);
renderGallery(photos.filter((photo) => photo !== currentPhoto));
renderMusicPlaylist();
loadTrack(0, true); // Tenta iniciar a música automaticamente
updateCountdown();

elements.audioPlayer.volume = Number(elements.volumeControl.value);

setInterval(updateCountdown, 1000);

elements.shareButton.addEventListener("click", shareSite);
elements.musicToggleButton.addEventListener("click", toggleMusic);
elements.musicHeaderButton.addEventListener("click", toggleMusic);
elements.previousTrackButton.addEventListener("click", playPreviousTrack);
elements.nextTrackButton.addEventListener("click", playNextTrack);

elements.volumeControl.addEventListener("input", (event) => {
  elements.audioPlayer.volume = Number(event.target.value);
});

elements.audioPlayer.addEventListener("play", () => {
  updateMusicButtons(true);
  updatePlaylistHighlight();
});

elements.audioPlayer.addEventListener("pause", () => {
  updateMusicButtons(false);
});

elements.audioPlayer.addEventListener("ended", playNextTrack);
