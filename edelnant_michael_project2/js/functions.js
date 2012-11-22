


window.addEventListener("DOMContentLoaded", function(){
	
	//Basic jSON pre-populated recipes
	var recipeJSON = {
		"62833302" : {
		        "rTitle" : 			["Title:" , "Sho'nuff Sweet Potatoe Casserole"],
		        "rDescription" : 	["Description:", "It's the bomb yo! Can't not have this at the dinner table!"],
		        "rLevel" : 			["Level:", "Medium"],
		        "rCategory" : 		["Category:", "Other"],
		        "rDate" : 			["Date:", "2012-11-21"],
		        "rFlavor" : 		["Flavor:", "50"],
		        "rIngredients" : 	["Ingredients:", "Yams\nMarshmallows\nCinammon\nSugar"],
		        "rDirections" : 	["Directions:", "Look up another recipe!"]

		} ,
		"89174667" : {
		        "rTitle" : 			["Title:" , "Worlds Best Pumpkin Pie"],
		        "rDescription" : 	["Description:", "You've never tasted anything better!"],
		        "rLevel" : 			["Level:", "Easy"],
		        "rCategory" : 		["Category:", "Dessert"],
		        "rDate" : 			["Date:", "2012-11-21"],
		        "rFlavor" : 		["Flavor:", "85"],
		        "rIngredients" : 	["Ingredients:", "Pumpkin\nPie Crust\nWhipped Cream\nLove"],
		        "rDirections" : 	["Directions:", "Mix it and bake it!"]  
		}
	};
	
	//Get Element By ID Function
	function $(x){	
		var e = document.getElementById(x);
		return e;
	};


	//Save Data Function	
	function saveData(){
		
		//Random Key
		var key = Math.floor(Math.random()*100000001);

		var recipe 					= {};
			recipe.rTitle 			= ["Title:", $("recipeTitle").value];
			recipe.rDescription		= ["Description:", $("recipeSummary").value];
			recipe.rLevel 			= ["Level:", $("userLevel").value];
			recipe.rCategory 		= ["Category:", getRadioValue('recipeCat')];
			recipe.rDate 			= ["Date:", $("chooseDate").value];
			recipe.rFlavor 			= ["Flavor:", $("flavorRange").value];
			recipe.rIngredients 	= ["Ingredients:", $("ingredients").value];
			recipe.rDirections 		= ["Directions:", $("directions").value];
			recipe.rLanguage		= ["Language:", $("language").value];	
		
		//Write recipe to local storage	
		console.log(recipe);
		localStorage.setItem(key, JSON.stringify(recipe));
		
		//Clear Form
		resetForm();
		
		alert("Your recipe is saved! Keep em coming!");
	};
	
	function getRadioValue(radioName) {
		var radioGroup = document.getElementsByName(radioName);
		var radioValue;
		for (var i=0; i < radioGroup.length; i++){
   			console.log(radioGroup[i].value);
   			if (radioGroup[i].checked) {
      			radioValue = radioGroup[i].value;
      		};
   		};
   		return radioValue;
	};

	function clearRadioValue(radioName) {
		var radioGroup = document.getElementsByName(radioName);
		var radioValue;
		for (var i=0; i < radioGroup.length; i++){
   			console.log(radioGroup[i].value);
   			if (radioGroup[i].checked) {
 				radioGroup[i].checked = false;
      		};
   		};
   		return radioValue;
	};

	function toggleDisplay(argBool) {
	    console.log("Hello");

	    switch(argBool){
		    case 'dataDisplay':
		    	//Hide Form
		    	$('addRecipeForm').style.display = 'none';
		    	
		    	//Change label of btn
		    	$('displayData').innerHTML = 'Add Recipe';
		
		    	//Change Button Behavior
		    	setTimeout(function(){
		    		$('displayData').href = 'addItem.html'								// Change href
		    		$('displayData').removeEventListener('click', displayData)},10);	// Remove function binding
		    	break;
	    	case 'dataEntry':
	    		
	    		//Show Form
	    		$('addRecipeForm').style.display = 'block';
	    		
	    		//Change href back to "#"
	    		$('displayData').href = '#';

		    	break;
	    	case 'updateEntry':
	    		
	    		//Show Form
	    		$('addRecipeForm').style.display = 'block';
	    		
	    		//Change href back to "#"
	    		$('displayData').href = '#';

		    	break;		    	
	    	default:
            
            return false;
		};

	};

	function displayData() {
		
		//If no data, pre-populate with JSON
		if (!localStorage.length) {
			alert("There are no recipes saved so i'm going to populate the list for you")
			prePopList(recipeJSON);			
		};

		//Define contentArea
		var pageContainer = $('mainContent');
		

		//Define unordered list
		var list = document.createElement('ul');
		list.setAttribute('id', 'dataList');
		
		pageContainer.appendChild(list);	

		for(var i = 0, j=localStorage.length; i<j; i++ ){
			
			//Define key per loopIndex
			var storageKey = localStorage.key(i);

			//Convert item back to object
			var storageObject = JSON.parse(localStorage[storageKey]);

			//Define listItem
			var listItem = document.createElement('li');
			var listItemTitle = document.createElement('h3');
			var listItemDescription = document.createElement('span');
			
			var listSubList = document.createElement('ul');

			for(var key in storageObject) {
				if(key === 'rTitle') {
					listItemTitle.innerHTML = storageObject[key][1];
				} else if (key === 'rDescription') {
					listItemDescription.innerHTML = storageObject[key][1];
				} else {
					var subListItem = document.createElement('li');
					var subListItemTitle = document.createElement('strong');
					var subListItemValue = document.createElement('span');

					//Print strings to corresponding elements
					subListItemTitle.innerHTML = storageObject[key][0] + "&nbsp;";
					subListItemValue.innerHTML = storageObject[key][1];

					//Add elements to parent list item
					subListItem.appendChild(subListItemTitle);
					subListItem.appendChild(subListItemValue);					
					
					//Add subListItem to subList
					listSubList.appendChild(subListItem);
				};
			};
			
			//Build Main List Item by adding individual elements
			listItem.appendChild(listItemTitle);
			listItem.appendChild(listItemDescription);
			listItem.appendChild(listSubList);

			//Append Each List Item
			list.appendChild(listItem);
		}; 	

		/*Toggle Screen & Buttons*/
		toggleDisplay('dataDisplay');

	};

	function prePopList(data) {
		//Loop through JSON data and store in local storage
	    for ( var key in data) {
	    	console.log("Object " + key);
	        localStorage.setItem(key, JSON.stringify(data[key]));
	    };		
	};

	function clearLocalData(){
		if(!localStorage.length){
			alert("Sorry, there are no recipes to clear.");	
		} else {
			//Offer the user a confirmationBox
            var confirmListDelete = confirm("Are you sure you want to clear all of the recipe data?");
            
            //If Confirmed, follow through.
            if(confirmListDelete === true) {
            	localStorage.clear();
            	$('dataList').innerHTML = "";
            	alert("All recipes have been deleted!");
        	}

		};
	};
    

	function resetForm() {
		// Zero out all values for new recipe entry 
		$("recipeTitle").value = ""
		$("recipeSummary").value = ""
		$("userLevel").value = ""
		$("chooseDate").value = ""
		$("flavorRange").value = ""
		$("ingredients").value = ""
		$("directions").value = ""
		clearRadioValue('recipeCat');
	};


	//Defaults
		var saveRecipe = $('submitForm');
		var displayDataBtn = $('displayData');
		var clearLocalDataBtn = $('clearData');

		//Bind Functions
		saveRecipe.addEventListener('click', saveData);
		displayDataBtn.addEventListener('click', displayData);
		clearLocalDataBtn.addEventListener('click', clearLocalData);
	
});




