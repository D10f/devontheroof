/*
  - https://davidwalsh.name/detect-supported-video-formats-javascript
  - https://redstapler.co/detect-mobile-device-with-javascript/
*/

class VideoLoader {
  constructor() {
    this.template = document.getElementById('img-replacement');
    this.section  = document.querySelector('.section__scripting .container');
    this.cards    = this.section.querySelectorAll('.card');

    this.createObserver();
    this.replaceImages();
    this.videos   = this.section.querySelectorAll('.card__video');
  }

  replaceImages() {
    const src = ['resizer', 'passwords']; // names of the video files

    this.cards.forEach((card, idx) => {
      const cloned = this.template.content.cloneNode(true);
      const video = cloned.querySelector('video');

      video.src = video.canPlayType('video/webm; codecs="vp8, vorbis"')
        ? `https://developersojourn.site/videos/${src[idx]}.webm`
        : `https://developersojourn.site/videos/${src[idx]}.mp4`

      card.lastElementChild.remove(); // removes the image
      card.appendChild(video);
    });
  }

  createObserver() {

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.0
    };

    const callback = ([entry]) => {
      const moveIntoView = entry.intersectionRatio > 0;
      this.videos.forEach(video => moveIntoView ? video.play() : video.pause());
    };

    new IntersectionObserver(callback, options).observe(this.section);

  };
}

export default VideoLoader;
