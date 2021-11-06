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

function countAliveNeighbours(matrix, {x, y}) {
	function checkNeighbour(offsetX, offsetY) {
		const xNeighbour = (x + matrix.length + offsetX) % matrix.length
		const yNeighbour = (y + matrix[x].length + offsetY) % matrix[x].length
		return matrix[xNeighbour][yNeighbour] === status.ALIVE ? 1 : 0
	}
	return (
		// NW
		checkNeighbour(-1, -1) +
		// N
		checkNeighbour(0, -1) +
		// NE
		checkNeighbour(1, -1) +
		// E
		checkNeighbour(1, 0) +
		// SE
		checkNeighbour(1, 1) +
		// S
		checkNeighbour(0, 1) +
		// SW
		checkNeighbour(-1, 1) +
		// W
		checkNeighbour(-1, 0)
	)
}

function shouldDie(aliveNeighbours) {
  // underpopulation (< 2)
  return aliveNeighbours < 2 ||
    // overpopulation (> 3)
    aliveNeighbours > 3
}

function shouldResurrect(aliveNeighbours) {
  // reproduction (3)
  return aliveNeighbours === 3
}

export function tick(matrix) {
  return matrix.map((currentRow, x) =>
    currentRow.map((value, y) => {
      const aliveNeighbours = countAliveNeighbours(matrix, {x, y})
      if (shouldDie(aliveNeighbours)) {
        return status.DIED;
      }
      if (shouldResurrect(aliveNeighbours)) {
        return status.ALIVE;
      }
      return value;
    })
  )
}
