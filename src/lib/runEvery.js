export default function start(callback, delay) {
  let animationFrameIDRef = {
    value: null
  }
  let stopped = false
  let start
  let previousTimestamp
  

  function step(timestamp) {
    if (start === undefined) {
      start = timestamp
    }
    const elapsed = timestamp - start

    if (previousTimestamp !== timestamp && elapsed >= delay) {
        start = timestamp
        callback()
    }

    if (!stopped) {
      previousTimestamp = timestamp
      animationFrameIDRef.value = window.requestAnimationFrame(step)
    }
  }
  animationFrameIDRef.value = window.requestAnimationFrame(step)
  return () => {
    stopped = true
    window.cancelAnimationFrame(animationFrameIDRef.value)
  }
}
