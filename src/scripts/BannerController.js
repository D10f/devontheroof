import { throttle, debounce } from './utils';

class BannerController {
  constructor() {
    this.banner = document.getElementById('banner');
    this.sectionCoords = [];
    this.sectionTitles = [
      'About',
      'Webapps',
      'Games & Graphics',
      'Scripting',
      'System Administration',
      'Blog'
    ];

    this.sections = [
      document.getElementById('about'),
      document.getElementById('webapps'),
      document.getElementById('gamesgraphics'),
      document.getElementById('scripts'),
      document.getElementById('sysadmin')
    ];

    this.windowHeight = window.innerHeight;
    this.threshold = 100;
    this.timer;
    this._updateBanner = throttle(this.updateBanner.bind(this), 100);
    this._getSectionCoords = debounce(this.getSectionCoords.bind(this), 1000);
    this._getSectionCoords();
    this.listen();
  }

  listen() {
    window.addEventListener('resize', this._getSectionCoords);
    window.addEventListener('scroll', this._updateBanner);
  }

  getSectionCoords() {
    this.sections.forEach((section, idx) => {
      this.sectionCoords[idx] = section.offsetTop;
    });
    this.updateBanner();
  }

  updateBanner() {
    const scrolledFromTop = this.windowHeight + window.scrollY;
    for (let i = this.sectionCoords.length; i >= 0; i--) {
      if (scrolledFromTop > this.sectionCoords[i] + this.threshold) {
        this.banner.textContent = this.sectionTitles[i];
        break;
      }
    }
  }
}

export default BannerController;
