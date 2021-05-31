class BannerController {
  constructor(isMobileDevice) {
    this.banner = document.getElementById('banner');

    this.sectionCoords = [];

    this.sectionTitles = [
      'About',
      'Websites',
      'Games & Graphics',
      'Scripting',
      'System Administration',
      'Blog'
    ];

    this.sections = [
      document.getElementById('about'),
      document.getElementById('websites'),
      document.getElementById('gamesgraphics'),
      document.getElementById('scripts'),
      document.getElementById('sysadmin')
    ];

    this.windowHeight = window.innerHeight;
    this.threshold = 100;
    this.timer;
    this.getSectionCoords();
    this.listen();
  }

  listen() {
    window.addEventListener('resize', () => this.getSectionCoords());
    window.addEventListener('scroll', () => this.updateBanner());
  }

  getSectionCoords() {

    clearTimeout(this.timer);
    this.timer = setTimeout(_getSectionCoords.bind(this), 50);

    // Recalculate every time because window size and display orientation can change
    function _getSectionCoords() {
      this.sections.forEach((section, idx) => {
        this.sectionCoords[idx] = section.offsetTop;
      });

      this.updateBanner();
    }
  }

  updateBanner() {
    clearTimeout(this.timer);
    this.timer = setTimeout(_updateBanner.bind(this), 100);

    function _updateBanner() {
      const scrolledFromTop = this.windowHeight + window.scrollY;

      for (let i = this.sectionCoords.length; i >= 0; i--) {
        if (scrolledFromTop > this.sectionCoords[i] + this.threshold) {
          this.banner.textContent = this.sectionTitles[i];
          break;
        }
      }
    }
  }
}

export default BannerController;
