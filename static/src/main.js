/**
 * 요구사항
 *
 * (버그)
 * - 키보드로만 입력하면 문제가 없으나, 클릭을 하고 난 뒤에 키보드로 Enter를 입력하게 되면 마지막에 클릭했던 문자가 계속 입력됨..
 *
 * (선택) 키보드 클릭으로도 입력 - 가능하게는 했지만 버그 존재..
 *
 * 해결
 * (선택) 키보드에도 동일하게 표시
 * (추가) 상단에 게임 시간 표시하기
 * 5글자 단어 (존재하는 단어가 아니여도 됨)
 * 6번의 시도 가능
 * 존재하면 노락색, 위치가 맞으면 초록색으로 표시
 * 게임 종료 판단
 */

import handleTimer from './timer.js'

const timer = document.querySelector('.timer')

const TIME = 300

let index = 0
let attempts = 0

const appStart = () => {
  handleTimer(timer, TIME)

  const nextLine = () => {
    if (attempts === 6) return gameOver()
    attempts = attempts + 1
    index = 0
  }

  const displayGameOver = () => {
    const div = document.createElement('div')
    div.classList.add('display-gameover')
    div.innerText = '게임이 종료되었습니다.'
    document.body.appendChild(div)
  }

  const gameOver = () => {
    window.removeEventListener('keydown', handleKeydown)
    displayGameOver()
  }

  const handleSelectKey = (key) => {
    const selectKey = document.querySelector(`.key[data-key="${key}"]`)

    if (!selectKey) return

    selectKey.classList.add('active')
    document.addEventListener('keyup', (e) => {
      if (e.key.toUpperCase() === key) {
        selectKey.classList.remove('active')
      }
    })
  }

  const handleSelectClick = () => {
    document.addEventListener('click', (e) => {
      const selectClick = e.target
      let clickKey = e.target.getAttribute('data-key')
      const clickKeyCode = clickKey && clickKey.charCodeAt(0)

      selectClick.classList.add('active')
      setTimeout(() => {
        selectClick.classList.remove('active')
      }, 200)

      if (clickKey === 'BACKSPACE') handleBackspace()

      if (clickKey === 'ENTER') {
        if (index >= 5) {
          handleEnter()
        }
      } else {
        if (clickKeyCode >= 65 && clickKeyCode <= 90) {
          const thisBlock = document.querySelector(
            `.stage-column[data-index="${attempts}${index}"]`
          )
          if (index >= 5) {
            return
          }
          thisBlock.innerText = clickKey
          index = index + 1
        }
      }
    })
  }

  handleSelectClick()

  const handleEnter = async () => {
    let answerCount = 0
    const response = await fetch('/answer')
    const CORRECT_ANSWER = await response.json()

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.stage-column[data-index="${attempts}${i}"]`
      )
      if (CORRECT_ANSWER[i] === block.innerText) {
        answerCount = answerCount + 1
        block.style.background = '#6AAA64'

        const keyBoard = document.querySelectorAll('.key')
        const keyBoardArr = [...keyBoard].map((item) => {
          if (CORRECT_ANSWER[i] === item.dataset.key) {
            item.style.background = '#6AAA64'
          }
        })
      } else if (CORRECT_ANSWER.includes(block.innerText)) {
        block.style.background = '#C9B458'
      } else {
        block.style.background = '#787C7E'
      }
    }

    if (answerCount === 5) gameOver()
    else nextLine()
  }

  const handleBackspace = () => {
    if (index > 0) {
      const prevBlock = document.querySelector(
        `.stage-column[data-index="${attempts}${index - 1}"]`
      )
      prevBlock.innerText = ''

      index = index - 1
    }
  }

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase()
    const keyCode = e.keyCode

    if (e.key === 'Backspace') handleBackspace()
    else if (index === 5) {
      if (e.key === 'Enter') {
        handleEnter()
      }
      return
    } else if (keyCode >= 65 && keyCode <= 90) {
      const thisBlock = document.querySelector(
        `.stage-column[data-index="${attempts}${index}"]`
      )
      thisBlock.innerText = key
      index = index + 1
    }
    handleSelectKey(key)
  }

  document.addEventListener('keydown', handleKeydown)
}

appStart()
