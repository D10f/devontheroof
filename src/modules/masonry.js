function debounce(fn, timeInMs) {
  let timeFrame;
  return function () {
    clearTimeout(timeFrame);
    timeFrame = setTimeout(fn, timeInMs);
  };
}

export class Masonry {
  constructor(selector) {
    this._grid = document.querySelector(selector);
    this._listeners();
    setTimeout(this._buildLayout.bind(this), 100);
  }

  get _columns() {
    return getComputedStyle(this._grid).gridTemplateColumns.split(" ");
  }

  get _rows() {
    return getComputedStyle(this._grid).gridTemplateRows.split(" ");
  }

  _listeners() {
    window.addEventListener(
      "resize",
      debounce(this._buildLayout.bind(this), 50)
    );
  }

  _getAboveRowHeight(cellIdx) {
    const rowIdx =
      Math.floor((cellIdx / this._columns.length) % this._rows.length) - 1;
    return parseFloat(this._rows[rowIdx].replace("px", ""));
  }

  _calculateMarginTop(cells, cellIdx) {
    const aboveCell = cells[cellIdx - this._columns.length];

    if (!aboveCell) {
      return null;
    }

    const aboveRowHeight = this._getAboveRowHeight(cellIdx);
    const aboveCellHeight = aboveCell.clientHeight;
    const aboveCellYTranslate = this._getTranslateYValues(aboveCell);

    return aboveRowHeight - aboveCellHeight - aboveCellYTranslate;
  }

  _getTranslateYValues(cell) {
    const yPos = /translateY\((.*)px\)/i;
    const translateAmount = cell.style.transform.match(yPos) || 0;
    return parseInt(translateAmount[1]);
  }

  _getBelowCellsInColumn(cells, cellIdx) {
    const subGrid = cells.slice(cellIdx);
    return subGrid.filter((_, idx) => idx % this._columns.length === 0);
  }

  _applyStyles(cell, availableMargin) {
    const yPos = /translateY\((.*)px\)/i;
    cell.style.transform = cell.style.transform.replace(
      yPos,
      (_, $2) => `translateY(${$2 - availableMargin}px)`
    );
  }

  _buildLayout() {
    const cells = Array.from(this._grid.children);
    cells.forEach((cell, idx) => {
      /** Force cell to be as height as the content it wraps around */
      cell.style.height = "max-content";

      /** Reset any previous style updates */
      cell.style.transform = "translateY(0px)";

      const availableMargin = this._calculateMarginTop(cells, idx);

      if (!availableMargin) {
        return;
      }

      const cellsToUpdate = this._getBelowCellsInColumn(cells, idx);

      cellsToUpdate.forEach((_cell) => {
        this._applyStyles(_cell, availableMargin);
      });
    });
  }
}
