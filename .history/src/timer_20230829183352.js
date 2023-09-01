const handleTimer = () => {
  const intervalId = setInterval(() => {
    let min = parseInt(time / 60)
    let sec = time % 60

    min = min < 10 ? `0${min}` : min
    sec = sec < 10 ? `0${sec}` : sec

    const formatTimer = `${min}:${sec}`

    if (timer) {
      timer.textContent = formatTimer
    }

    time = time - 1

    if (time < 0) {
      clearInterval(intervalId)
      timer.textContent = '시간초과'
    }
  }, 1000)
}

export default handleTimer
