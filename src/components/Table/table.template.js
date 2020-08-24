const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function toCell(state, row) {
  return function(_, col) {
    return `
   <div 
    class="cell" 
    contenteditable 
    data-col="${col}" 
    data-row="${row}"
    data-type="cell"
    data-id="${row}:${col}"
    style="width: ${getWidth(state.colState, col)}">
   </div> `
  }
}

function toColumn({col, index, width}) {
  return `
  <div 
    class="column" 
    data-type="resizable" 
    data-col="${index}" 
    style="width: ${width}"
    >
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(index, content, height) {
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div 
    class="row" 
    data-row="${index}" 
    data-type="resizable"
    style="height: ${height}">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
    <div class="row-data">${content}</div>
    </div>  
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(state, index) {
  if (!state) {
    return DEFAULT_WIDTH + 'px'
  }
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  if (!state) {
    return DEFAULT_HEIGHT + 'px'
  }
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')

    // eslint-disable-next-line no-debugger
    debugger
    rows.push(createRow(row + 1, cells, getHeight(state.rowState, row + 1)))
  }

  return rows.join('')
}
