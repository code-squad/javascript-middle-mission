var readline = require("./config/readline")();

function VendingMachine() {
	this.drinks = new Drinks();
	VendingMachine.prototype.stateList = { "WAIT_MONEY": 1, "WAIT_CHOOSE_DRINK": 3, "WAIT_CHOOSE_REFUND": 4, "FINISHED": 5 }
	this.state = this.stateList.WAIT_MONEY;
	this.fund = 0;

	VendingMachine.prototype.getBuyableDrinkList = function (price) {
		var drinkList = [];
		this.drinks.drinkList.forEach(function (drink) {
			if (drink.price <= price) {
				drinkList.push(drink);
			}
		});
		return drinkList;
	}
	VendingMachine.prototype.getNamedDrink = function (drinkName) {
		var NamedDrink = '';
		this.drinks.drinkList.forEach(function (drink) {
			if (drink.name === drinkName) {
				NamedDrink = drink;
			}
		});
		return NamedDrink;
	}
	VendingMachine.prototype.buyDrink = function (name) {
		var price = this.drinks.getDrinkPrice(name);
		this.fund -= price;
		this.drinks.takeOutDrink(name);
	}
	VendingMachine.prototype.addDrink = function (name, price, amount) {
		this.drinks.addDrink(name, price, amount);
	}
	VendingMachine.prototype.deposit = function (fund) {
		this.fund += fund;
	}
	VendingMachine.prototype.refund = function () {
		tmp = this.fund;
		this.fund = 0;
		return tmp;
	}
}

function Drinks() {
	this.drinkList = [];
	Drinks.prototype.addDrink = function (name, price, amount) {
		var drink = new Drink(name, price, amount);
		this.drinkList.push(drink);
	}
	Drinks.prototype.getDrinkPrice = function (drinkName) {
		var price = 0;
		this.drinkList.forEach(function (drink) {
			if (drink.name === drinkName)
				price = drink.price;
		});
		return price;
	}
	Drinks.prototype.takeOutDrink = function (drinkName) {
		this.drinkList.forEach(function (drink) {
			if (drink.name === drinkName)
				drink.amount--;
		});
	}
}

function Drink(name, price, amount) {
	this.name = name;
	this.price = price;
	this.amount = amount;
}

var display = {
	insertCoin: function () {
		console.log("동전을 넣으세요.");
	},
	fund: function (machine) {
		console.log("잔액: " + machine.fund + "원");
	},
	nothingCanBuy: function (machine) {
		console.log("아무것도 못 삽니다.");
	},
	machineOffed: function (machine) {
		console.log('자판기가 꺼져 있습니다.');
	},
	pleaseChoose: function (machine) {
		var list = machine.getBuyableDrinkList(machine.fund);
		if (!isEmpty(list))
			console.log('선택하세요.');
	},
	itsNothing: function (machine) {
		console.log('그런 건 없습니다.');
		display.buyableDrinks(machine);
	},
	itsRanOut: function (machine) {
		console.log('그거 다 떨어졌어요.');
		display.buyableDrinks(machine);
	},
	notEnoughMoney: function (machine) {
		console.log('잔액이 부족합니다.');
		display.buyableDrinks(machine);
	},
	drinkCome: function (drink) {
		console.log(drink.name + '가 나왔습니다.');
	},
	buyOrRefund: function (machine) {
		console.log('다른걸 구매할까요? 반환할까요?');
	},
	getChange: function (machine) {
		console.log('잔액은 ' + machine.fund + '원입니다.');
	},
	buyableDrinks: function (machine) {
		var list = machine.getBuyableDrinkList(machine.fund);
		if (isEmpty(list)) {
			console.log("사용 가능한 음료수 : 없음");
		} else {
			display.drinks(list);
			display.pleaseChoose(machine);
		}
	},
	drinks: function (drinks) {
		var drinksText = [];
		drinks.forEach(function (drink) {
			if (drinksText !== "") {
				drinksText += ", ";
			}
			if (drink.amount === 0) {
				drinksText += drink.name + "(재고없음)";
			} else {
				drinksText += drink.name + "(" + drink.price + ")";
			}
		});
		var showText = "사용 가능한 음료수 : " + drinksText;
		console.log(showText);
	}
}



machine = makeMachine();
display.insertCoin(); //동전을 넣으세요
readline.prompt(); // >
waitCommand(machine);

function makeMachine() {
	machine = new VendingMachine();
	machine.addDrink("콜라", 1000, 1);
	machine.addDrink("사이다", 1000, 1);
	machine.addDrink("포도쥬스", 700, 1);
	machine.addDrink("딸기우유", 500, 1);
	machine.addDrink("미에로화이바", 900, 1);
	machine.addDrink("물", 500, 1);
	machine.addDrink("파워에이드", 1000, 0);
	return machine;
}

function waitCommand(machine) {
	readline.on("line", function (line) {

		try {
			commandToMachine(machine, line);
		}
		catch (error) {
			commandError(machine, error);
		}

		if (machine.state == machine.stateList.FINISHED) {
			readline.close();
		} else {
			readline.prompt();
		}
	});
}

function commandError(machine, error) {
	switch (error) {
		case "MACHINE_OFFED":
			display.machineOffed();
			break;
		case "ITS_NOT_COIN":
			display.insertCoin();
			break;
		case "NO_BUYABLE_DRINKS":
			display.nothingCanBuy();
			display.insertCoin();
			break;
		case "ITS_NOT_COIN":
			display.insertCoin();
			break;
		case "ITS_NOTHING":
			display.itsNothing(machine);
			break;
		case "ITS_RANOUT":
			display.itsRanOut(machine);
			break;
		case "NOT_ENOUGH_MONEY":
			display.notEnoughMoney(machine);
			break;
	}
}

function commandToMachine(machine, command) {
	switch (machine.state) {
		case machine.stateList.WAIT_MONEY:
			commandWaitMoney(machine, command);
			break;
		case machine.stateList.WAIT_CHOOSE_DRINK:
			commandChooseDrink(machine, command);
			break;
		case machine.stateList.WAIT_CHOOSE_REFUND:
			commandContinueOrRefund(machine, command);
			break;
		default:
			throw "MACHINE_OFFED";
			break;
	}
}

function commandWaitMoney(machine, command) {
	var coin = parseInt(command);
	if (typeof coin !== "number" || isNaN(coin)) {
		throw "ITS_NOT_COIN";
	}
	machine.deposit(coin);
	display.fund(machine);
	buyableDrinkList = machine.getBuyableDrinkList(machine.fund);
	if (isEmpty(buyableDrinkList))
		throw "NO_BUYABLE_DRINKS";
	display.buyableDrinks(machine);
	machine.state = machine.stateList.WAIT_CHOOSE_DRINK;
}

function commandChooseDrink(machine, command) {
	if (command === "반환") {
		display.getChange(machine);
		machine.state = machine.stateList.FINISHED;
		return;
	}

	var drinkName = command;
	drink = machine.getNamedDrink(drinkName);
	if (isEmpty(drink))
		throw "ITS_NOTHING";
	if (drink.amount === 0)
		throw "ITS_RANOUT";
	if (drink.price > machine.fund)
		throw "NOT_ENOUGH_MONEY";
	machine.buyDrink(drinkName);
	display.drinkCome(drink);
	display.fund(machine);
	display.buyableDrinks(machine);
	display.buyOrRefund();
	machine.state = machine.stateList.WAIT_CHOOSE_REFUND;
}

function commandContinueOrRefund(machine, command) {
	if (command === "반환") {
		display.getChange(machine);
		machine.state = machine.stateList.FINISHED;
		return;
	}

	var coin = parseInt(command);
	if (typeof coin === "number" && !isNaN(coin)) {
		machine.state = machine.stateList.WAIT_MONEY;
		commandWaitMoney(machine, command);
		return;
	}

	var drink = machine.getNamedDrink(command);
	if (!isEmpty(drink)) {
		commandChooseDrink(machine, command);
	}

	display.buyOrRefund();
}


// [], {} 도 빈값으로 처리
var isEmpty = function (value) {
	if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
		return true;
	} else {
		return false;
	}
};
