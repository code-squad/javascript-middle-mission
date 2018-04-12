# 자판기 설계
## 요구사항
- insertCoin(1000);
> 최종출력문: </br> 
> 사용가능한 음료수 목록 =>  콜라(1000), 사이다(1000), 포도쥬스(700), 딸기우유(500), 미에로화이바(900), 물(500), 파워에이드(재고없음)
- selectItem("미에로화이바")  //만약, 파워에이드를 선택하면 선택할수 없다는 메시지 노출. 
> 최종출력문: </br> 
> 미에로화이바가 나왔습니다.   현재잔돈 : 100원,  사용가능한 음료수 : 없음
- returnMoney();
> 최종출력문: </br> 
> 잔돈 1000원이 반환됐습니다.
----------------------------------------------------------
## 기능 흐름

### 1. 돈을 넣는다 
**1-1. 돈(숫자형)이 맞는가?**
> 맞으면 다음단계

**1-2. 돈이 아닌가(그외)** 
> 숫자를 입력하십시요. 

### 2. 구매할수 있는 물품을 보여준다 `돈 >= 물품가격`
**2-1. 구매할 수 있는 가격의 물품인가?**
> 탐색된 데이터를 저장 => [물품명 값], [물품수량 값]
> 탐색된 데이터를 출력
> 탐색된 데이터를 반환

**2-2. 구매할 수 없는 가격의 물품인가?(그외)**
> 잔액이 부족합니다 문구 출력.


### 3. 선택한다 
**3-1. 선택한 물픔의 가격 - 해당된 물품의 가격을 빼기**
> 넣은 돈과 물품의 가격에서 뺀 나머지 가격을 저장

**3-2. 선택한 물품명의 개수와 탐색한 물품의 개수을 비교**
>**3-2-1. 비교된 물품이 재고가 있다면**
>> 물품 객체에 선택한 물품의 재고를 -1 하고 저장 한다.
>> 나머지 돈을 물품가격과 비교해 구매가능한 물품 탐색 저장
>> 더이상 구매가 불가능하면 없음으로 저장

>**3-2-2. 비교된 뭂품이 재고가 없다면**
>> 현재 재고가 없다는 문구를 출력

**3-3. 나머지 가격을 반환**

### 4. 선택물품이 나왔다는 안내문 + 나머지금액 + 구매 가능 여부를 출력 
> `3.선택한다` 에서 탐색하고 나온 결과값(나머지가격, 추가구매가능 물품들) 을 출력한다.

### 5. 나머지 금액 출력
**5-1. 더이상 구매할 수 없는 나머지 가격이 있는가?**
> **5-1-1. 있다면?**
>> 해당 숫자 금액 + 잔액이 남았습니다 출력

> **5-1-2. 없다면?**
>> 반환할 금액이 없습니다. 
</br>

----------------------------------------------------------

### 변수명 
- itemList: 전체 물품 데이터 객체 (item: 물품명, price: 물품가격, stock: 물품수량)
- noticeWord: 안내 문구 객체
- coin2, coin3: 투입 금액
- notCoin: 문자형(테스트)
- shoppintItem: 구매가능한 물건의 탐색 값들

### 함수 기능
- getSellingItem 함수 (투입금액)
돈을 넣었을때 그 돈만큼 살수 있는 물건 탐색 / 저장 
> 반환값: 탐색한 물건들 객체안 []로 전달

- getChooseItem 함수 (원하는물품명, 탐색물건의 배열)
구매할 수 있는 목록 중 재고의 유무를 탐색 해주는 기능 
> 반환값: 재고가 있는 제품이라면 제품의 가격 / 없다면 재고가 없다는 걸 출력

- getRestMoney 함수 (재고있는 물품명, 투입금액)
현재 투입한 돈에서 제고가 있는 구매 할 수 있는 제품의 가격값을 뺀 나머지 값 반환 
> 반환값: 나머지 가격 

- getReSellingItem 함수 (나머지 금액, 추가로 구매하고싶은 제품명)
구매하고 싶은 제품명이 있다면 나머지 값에 다시 구매할 수 있는 제품이 있는지 탐색
> 반환값: 제품명이 있다면 다시 제품목록을 출력 / 없다면 돈을 반환해 준다.