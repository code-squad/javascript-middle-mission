## 비트연산자 보수이해하기
### 10을 2진표현으로 변경하려면 어떤 순서로 계산해야 하는지 설명하기.
  - 

## hoisting 에 대해서 설명하기
  - 변수나 함수가 어디서 선언되든지 해당 스코프 최상단에 위치되어 동일 스코프 어디서든 참조할 수 있는 것을 말한다.</br> 
    호이스팅시 선언은 되지만 할당은 되지 않으며 참조도 불가능하다.

## !! 은 무엇을 의미하는가? 어떻게 활용할 수 있을까?
  - !!

## 3개이상의 switch 문을 어떻게 3항연산자로 대체할 수 있을까? 코드로 예시를 들라.
```

```

## ==와 ===의 차이는 정확히 무엇인가?
  - 
  
## const value = a || b; 코드의 의미는 무엇인가?
  - a와 b의 값 중에 true인 값을 변수 value에 담는다.[a가 true면 a를 value에 b가 true면 b를 value에 담는다.]

## eval 은 무엇인가?
  - 

## 변수값을 출력할때 null, undefined, is not defined으로 출력되는 차이점은 무엇인가?
  - 

## Function.prototype.bind 에 대해서 설명하기
  - 

## this가 가리키는 건 언제 결정되는가?
  - 

## call과 apply의 차이점은?
  - 
  
## add(10)(2) //12 가 되도록 구현해보기
```
function add(a){
  return function(b){
    return a+b;
  }
}
```
## 함수의 인자갯수와 파라미터가 일치하지 않으면 어떤일이 생기는가 설명하기
  - 인자 갯수가 많으면
  > 인자갯수가 많아도 arguments에 들어간다. 별도로 에러가 나오지도 않아서 원치 않을시 불필요한 해당 값이 들어와 메모리 낭비가 될 요인이 있다고 생각이 든다.. 
  ```
  function name(params1, params2) {
    console.log(params1, params2, arguments);
  }
  name("what", "is", "this?!"); 
  // 출력값: what is { '0': 'what', '1': 'is', '2': 'this?!' }
  ```

  - 인자 갯수가 적으면
  > 매개변수 설정된 개수(3개)와 다르게 인자의 개수(2개)가 적으면 undifined로 들어온다.
  ```
  function name2(params1, params2, params3) {
    console.log(params1, params2, params3, arguments);
  }
  name2("action1", "action2");
  // 출력값: action1 action2 undefined { '0': 'action1', '1': 'action3' }

  ```

## 함수의 반환값이 없을때 어떻게 되는가?
> `undifined`가 출력된다.
```
function test(params) {
  var result = [];
  result = params+params;
  // return result; // return을 넣었다면 params+params의 값이 반환되어 할당 되겠지만
}

console.log(test(2)); // 'undifined'가 출력된다 반환되지 않아서
```

## 익명함수는 무엇인가?
  - 이름없는 함수를 말한다.</br> 
    선언적 함수는 `function name()`에 예시처럼 함수이름에 `name`을 넣지만, </br>
    익명함수는 이름이 없는 상태로 `var name = function ()` 처럼 된다. </br>
    익명 함수의 경우 한 줄, 한 줄 실행되면서 익명 함수가 정의된 부분을 만날 때 정의된다. 
