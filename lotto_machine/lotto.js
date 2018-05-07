/*
  로또 생성기 설계
  조건 
- 1장당 가격은 1000원
- 원하는 금액을 투입시 원하는 만큼 구매
- 구매가능한 로또별 번호 생성 각 6개(1~45까지의 수)

  동작 방식
1. 돈을 넣으면 로또가 구매된다
2. 구매한 로또만큼 로또 번호가 생성이 된다.[번호는 중복되어서는 안된다.]
3. 로또에 맞는 번호를 넣고 생성된 로또 번호와 비교를 한다.
4. 비교되어 맞는 로또 번호의 개수(1~6까지)에 따라 당첨 금액 출력

>
당첨 통계
-- -- -- -- -
3 개 일치(5000 원) - 1 개[구매한 로또에서 당첨된 장수]
4 개 일치(50000 원) - 0 개
5 개 일치(1500000 원) - 0 개
6 개 일치(2000000000 원) - 0 개
나의 수익률은 OO % 입니다.
*/

let winLottos = {
  '0' : 0,
  '1' : 0,
  '2' : 0,
  '3' : 0,
  '4' : 0,
  '5' : 0,
  '6' : 0
};

const noticeMSG = {
  shortMoney: "구매 금액이 부족합니다.",
  noneMatch: "맞는 번호가 없습니다 다음 기회에... ",
  onlyThousand: "천원 단위로 넣어주십시오.",
  giveLotto: "개를 발행했습니다.",
  matchNumThree: "3개 일치(5,000 원)",
  matchNumFour: "4개 일치(50,000 원)",
  matchNumFive: "5개 일치(1,500,000 원)",
  matchNumSix: "6개 일치(2,000,000,000 원)"
};


// 로또 구매 함수
function buyLotto(money, setMyNumber) {
  if (money < 1000) return noticeMSG.shortMoney;
  if (money % 1000 !== 0) return noticeMSG.onlyThousand;

  let lottoTickets = [];
  let ticket = money / 1000;

  for (let i = 0; i < ticket; i++) {
    let createLottoNumber = createLottoNum();
    lottoTickets.push(createLottoNumber);
  }
  console.log("로또 " + ticket + noticeMSG.giveLotto);
  checkLuckyNum(setMyNumber, lottoTickets);
}

// 로또 번호 생성 함수
function createLottoNum() {
  let lottoNumber = [];
  while (lottoNumber.length !== 6) {
    let createNum = Math.floor(Math.random() * 45) + 1;
    if (lottoNumber.indexOf(createNum) < 0) lottoNumber.push(createNum);
  }
  return lottoNumber;
}

// 생성된 로또함수와 내가 입력한 로또함수 비교 함수
function checkLuckyNum(myLuckyNum, lottoTickets) {
  let count = 0;
  let winLottos = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0
  };
  
  lottoTickets.forEach(numberArr => {
    console.log(numberArr);
    count = 0; // 6개(1장) 마다 확인을 하고 count를 넣어야 하는 기능을 어떻게 구현할 것인가?  => (count '0' 으로 초기화) [깨닫는데 오래걸렸다.....]
    for (let i = 0; i < myLuckyNum.length; i++) {
      if (numberArr[i] === myLuckyNum[i]) {
        count++;
      }
    }
    winLottos[count] += 1;
  });
  calculateYield(count, lottoTickets, winLottos);
}

// 투자금, 이익금, 수익률 계산 함수
function calculateYield(count, lottoTickets, winLottos){
  let investment = lottoTickets.length * 1000;
  let benefits = 0;
  benefits += winLottos[3] * 5000;
  benefits += winLottos[4] * 50000;
  benefits += winLottos[5] * 1500000;
  benefits += winLottos[6] * 2000000000;
  let margin = Math.floor((benefits / investment) * 100);
  showWinningLotto(winLottos, margin, investment, benefits);
}

// 비교된 숫자 개수에 따라 당첨 사항 출력 함수
function showWinningLotto(winLottoTickets, margin, investment, benefits) {
  console.log(noticeMSG.matchNumThree + winLottoTickets[3] + "개");
  console.log(noticeMSG.matchNumFour + winLottoTickets[4] + "개");
  console.log(noticeMSG.matchNumFive + winLottoTickets[5] + "개");
  console.log(noticeMSG.matchNumSix + winLottoTickets[6] + "개");

  console.log("나의 투자금액은 " + investment + "이고 이익금은 " + benefits + "입니다.");
  console.log("나의 수익률은 " + margin +"% 입니다.");
}


// console.log(buyLotto(900)); // 구매 금액이 부족합니다.
// console.log(buyLotto(1100)); // 천원 단위로 넣어주십시오.
let setMyNumber = [5, 3, 2, 1, 6, 4];
buyLotto(15000, setMyNumber);