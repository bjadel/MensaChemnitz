/**
 * This model holds the canteen menu of specific date.
 */
var FoodModel = ({
	initialize: function()  {
		this.lastClicked = 0;
    	this.foodList = [];
    	this.rotateCounter = 0;
	},
	addFood: function(category, description, rating, feeStudent, feeEmployee, feeGuest, isPictureAvailable, pictureKey, pig, cow, alc, veg) {
		this.foodList.push({
			category:category, 
			description:description,
			rating:rating,
			feeStudent:feeStudent, 
			feeEmployee:feeEmployee, 
			feeGuest:feeGuest,
			isPictureAvailable:isPictureAvailable,
			pictureKey:pictureKey,
			pig:pig,
			cow:cow,
			alc:alc,
			veg:veg
		});
	},
	getLastClickedFood: function() {
		return this.foodList[this.lastClicked];
	},
	getFoodByIndex: function(index, isRotate) {
		if (isRotate) {
			this.rotateCounter = index;
		}
		return this.foodList[index];
	},
	getSize: function() {
		if (this.foodList === undefined) {
			return 0;
		} else {
			return this.foodList.length;
		}
	},
	getNextFood: function() {
		this.rotateCounter++;
		if (this.rotateCounter >= this.getSize()) {
			this.rotateCounter = 0;
		}
		return this.getFoodByIndex(this.rotateCounter, false);
	},
	getPreviousFood: function() {
		this.rotateCounter--;
		if (this.rotateCounter < 0) {
			this.rotateCounter = this.getSize() - 1;
		}
		return this.getFoodByIndex(this.rotateCounter, false);
	}
});