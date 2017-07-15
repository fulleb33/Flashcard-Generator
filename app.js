var inquirer = require("inquirer");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var deck = [];
var counter = 0;
var number = 0;

inquirer.prompt([
	{
		name: 'number',
		message: 'How many cards would you like to make?'
	}
]).then(function(answer) {
	number = parseInt(answer.number);
		function doIt() {
		if (counter < number) {
			inquirer.prompt([
				{
					name: 'list',
					type: 'list',
					message: 'Make a BasicCard or ClozeCard',
					choices: ['BasicCard', 'ClozeCard', 'End']
				}
			]).then(function(answers) {
				if (answers.list === 'BasicCard') {
					inquirer.prompt([
						{
							name: 'frontCard',
							message: 'Type a question for the front of the card.'
						}, {
							name: 'backCard',
							message: 'Type the answer for the back of the card.'
						}
					]).then(function(answers) {
						var newCard = new BasicCard(answers.frontCard, answers.backCard);
						deck.push(newCard);
						console.log(newCard.front);
						console.log(newCard.back);
						doIt();
					})
				}
				if (answers.list === 'ClozeCard') {
					inquirer.prompt([
						{
							name: 'fullText',
							message: 'Type a sentence for the card.'
						}, {
							name: 'cloze',
							message: 'Type the portion to be deleted.'
						}
					]).then(function(answers) {
						var newCard = new ClozeCard(answers.fullText, answers.cloze);
						deck.push(newCard);
						console.log(newCard.cloze);
						console.log(newCard.partial);
						console.log(newCard.fullText);
						doIt();
					})
				}
				if (answers.list === 'End') {
					return;
				}
			})
			counter++;	
		} else {
			inquirer.prompt([
				{
					name: 'view',
					type: 'confirm',
					message: 'Would you like to view your cards?'
				}
			]).then(function(answer) {
				if (answer.view) {
					var count = 0;
					function doStuff() {
						if (count < deck.length) {
							if (deck[count].type === 'basic') {
								inquirer.prompt([
									{
										name: 'question',
										message: 'Card ' + (count+1) + ': ' + deck[count].front
									}
								]).then(function(answer) {
									if (answer.question === deck[count-1].back) {
										console.log('Correct!')
									} else {
										console.log('Incorrect! ' + deck[count-1].back);
									}
									doStuff();
								})
							}
							if (deck[count].type === 'cloze') {
								inquirer.prompt([
									{
										name: 'question',
										message: "Card " + (count+1) + ': ' + deck[count].partial
									}
								]).then(function(answer) {
									if(answer.question === deck[count-1].cloze) {
										console.log('Correct!');
									} else {
										console.log('Incorrect! ' + deck[count-1].fullText);
									}
									doStuff();
								})
							}
							count++;
						} else {
							inquirer.prompt([
								{
									name: 'again',
									type: 'confirm',
									message: 'Would you like to view again?'
								}
							]).then(function(answer) {
								count = 0;
								if (answer.again) {
									doStuff();
								} else {return;}
							})
						}
					}
					doStuff();
				} else {return;}
			})

		}
	}	
	doIt();
})

