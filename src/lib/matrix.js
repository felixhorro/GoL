const status = {
  DIED: "died",
  ALIVE: "alive"
}

export function generateMatrix({ rows, columns }) {
  return Array(rows).fill(1).map(r => Array(columns).fill(status.DIED)) 
}
function updateCell(value, matrix, {x, y} = position) {
  return matrix.map((currentRow, currentX) => {
    if (currentX !== x) {
      return currentRow
    }
    return currentRow.map((currentValue, currentY) => {
      return currentY === y ? value : currentValue
    })
  })
}
export function kill(...args) {
  return updateCell(status.DIED, ...args)
}
export function resurrect(...args) {
  return updateCell(status.ALIVE, ...args)
}
export function toggle(matrix, {x, y}) {
  if (matrix[x][y] === status.ALIVE) {
    return kill(matrix, { x, y })
  }
  return resurrect(matrix, { x, y })
}

function countAliveNeightbours(matrix, {x, y}) {
  let aliveNeightbours = 0
  if (x > 0) {
    // NW
    if (y > 0 && matrix[x - 1][y - 1] === status.ALIVE) {
      aliveNeightbours = aliveNeightbours + 1
    }
    // W 
    if (matrix[x - 1][y] === status.ALIVE) {
      aliveNeightbours = aliveNeightbours + 1
    }
    // SW
    if (y < matrix[x].length - 1 && matrix[x - 1][y + 1] === status.ALIVE) {
      aliveNeightbours = aliveNeightbours + 1
    }
  }
  // S
  if (y < matrix[x].length - 1 && matrix[x][y + 1] === status.ALIVE) {
    aliveNeightbours = aliveNeightbours + 1
  }
  if (x < matrix.length - 1) {
    // SE
    if (y < matrix[x].length - 1 && matrix[x + 1][y + 1] === status.ALIVE) {
      aliveNeightbours = aliveNeightbours + 1
    }
    // E
    if (matrix[x + 1][y] === status.ALIVE) {
      aliveNeightbours = aliveNeightbours + 1
    }
    // NE
    if (y > 0 && matrix[x + 1][y - 1] === status.ALIVE) {
      aliveNeightbours = aliveNeightbours + 1
    }
  }
  // N
  if (y > 0 && matrix[x][y - 1] === status.ALIVE) {
    aliveNeightbours = aliveNeightbours + 1
  }

  return aliveNeightbours
}

function shouldDie(aliveNeightbours) {
  // underpopulation (< 2)
  return aliveNeightbours < 2 ||
    // overpopulation (> 3)
    aliveNeightbours > 3
}

function shouldResurrect(aliveNeightbours) {
  // reproduction (3)
  return aliveNeightbours === 3
}

export function tick(matrix) {
  return matrix.map((currentRow, x) =>
    currentRow.map((value, y) => {
      const aliveNeightbours = countAliveNeightbours(matrix, {x, y})
      if (shouldDie(aliveNeightbours)) {
        return status.DIED;
      }
      if (shouldResurrect(aliveNeightbours)) {
        return status.ALIVE;
      }
      return value;
    })
  )
}
