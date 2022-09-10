import { throttle } from './utils';

export class FloatingMenuController {

  private readonly _menu: HTMLElement;
  private _prevPos: number;

  constructor(selector = '.floating-menu') {
    this._menu = document.querySelector(selector) as HTMLElement;
    this._prevPos = window.scrollY;
    this.listeners();
  }

  listeners() {
    document.addEventListener('scroll', throttle(this._hideOnScroll.bind(this), 100));
  }

  _hideOnScroll() {
    const currentPos = window.scrollY;

    if (currentPos > this._prevPos) {
      this._menu.classList.add('hide');
    } else {
      this._menu.classList.remove('hide');
    }

    this._prevPos = currentPos;
  }
}
