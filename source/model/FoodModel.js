/**
 * This model holds the canteen menu of specific date.
 */
var FoodModel = ({
	initialize: function()  {
		this.lastClicked = 0;
    	this.foodList = [];
	},
	addFood: function(category, description, feeStudent, feeEmployee, feeGuest, isPictureAvailable, pictureKey) {
		this.foodList.push({
			category:category, 
			description:description, 
			feeStudent:feeStudent, 
			feeEmployee:feeEmployee, 
			feeGuest:feeGuest,
			isPictureAvailable:isPictureAvailable,
			pictureKey:pictureKey
		});
	},
	getLastClickedFood: function() {
		return this.foodList[this.lastClicked];
	},
	getFoodByIndex: function(index) {
		return this.foodList[index];
	},
	getSize: function() {
		return this.foodList.length;
	}
});