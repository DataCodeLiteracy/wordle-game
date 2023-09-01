/**
 * 요구사항
 *
 * 5글자 단어 (존재하는 단어가 아니여도 됨)
 * 6번의 시도 가능
 * 존재하면 노락색, 위치가 맞으면 초록색으로 표시
 * 게임 종료 판단
 *
 * (선택) 키보드에도 동일하게 표시
 * (선택) 키보드 클릭으로도 입력
 *
 * 해결
 * (추가) 상단에 게임 시간 표시하기
 */

import handleTimer from './timer'

const timer = document.querySelector('.timer')

let time = 300

handleTimer(timer, time)
