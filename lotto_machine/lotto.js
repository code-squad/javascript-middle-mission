/*
  로또 생성기 설계
  조건 
- 1장당 가격은 1000원
- 원하는 금액을 투입시 원하는 만큼 구매
- 구매가능한 로또별 번호 생성 각 6개(1~45까지의 수)
  
  동작 방식
1. 돈을 넣으면 로또가 구매된다.
2. 구매한 로또만큼 로또 번호가 생성이 된다.[번호는 중복되어서는 안된다.]
3. 로또에 맞는 번호를 넣고 생성된 로또 번호와 비교를 한다.
4. 비교되어 맞는 로또 번호의 개수(1~6까지)에 따라 당첨 금액 출력
*/

const noticeMSG = {
  shortMoney: "구매 금액이 부족합니다.",
  noneMatch: "맞는 번호가 없습니다 다음 기회에...",
  onlyThousand: "천원 단위로 넣어주십시오.",
  giveLotto: "개를 발행했습니다."
};

// 로또 구매 함수
function buyLotto(money) {
  if (money < 1000) return noticeMSG.shortMoney;
  if (money % 1000 !== 0) return noticeMSG.onlyThousand;

  let lottoTickets = [];
  let ticket = money / 1000;

  for (let i = 0; i < ticket; i++) {
    let createLottoNumber = createLottoNum();
    lottoTickets.push(createLottoNumber);
  }
  console.log("로또 " + ticket + noticeMSG.giveLotto);
  return lottoTickets;
}

// 로또 번호 생성 함수
function createLottoNum() {
  let lottoNumber = [];
  for (let i = 0; i < 6; i++) {
    let createNum = Math.floor(Math.random() * 6) + 1;
    lottoNumber.push(createNum);
  }
  return lottoNumber;
}

// 중복 여부 확인 함수
// function checkOverlapingNum(lottoNumbers) {
// }


// 생성된 로또함수와 내가 입력한 로또함수 비교 함수
// function setLuckyNum(myLuckyNum) {
// }

// 비교된 숫자 개수에 따라 당첨 사항 출력 함수
function winningLottoNum() {

}

// console.log(buyLotto(900)); // 구매 금액이 부족합니다.
// console.log(buyLotto(1100)); // 천원 단위로 넣어주십시오.

console.log(buyLotto(14000));

// console.log(setLuckyNum([1, 2, 3, 4, 5, 6,]));