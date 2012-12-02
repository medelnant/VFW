// Author: Michael S. Edelnant
// School: Full Sail University
// Course: VFW 1212
// Instructor: Chad Gibson
// --------------------------------------------------------------------------- /
// Project 2 | Main.js
// --------------------------------------------------------------------------- /


window.addEventListener("DOMContentLoaded", function (){

	//Get Element By ID Function
	function $(x){	
		var e = document.getElementById(x);
		return e;
	};

	//Build Difficulty Select
	function buildSelect(argLocation,argLabel,argArray) {
		
		//Build Label
		var difficultyLabel = document.createElement('label');
		difficultyLabel.innerHTML = argLabel + ":";
		

		//Build Select
		var selectElement = document.createElement('select');
		selectElement.setAttribute('id', 'userDifficulty');
		for(var i=0; i< argArray.length; i++) {
			var optionElement = document.createElement('option');
			optionElement.setAttribute('value', argArray[i]);
			optionElement.innerHTML = argArray[i];
			selectElement.appendChild(optionElement);
		};

		//Append to specified element
		$(argLocation).appendChild(difficultyLabel); 
		$(argLocation).appendChild(selectElement);
	};

	//Save Data Function	
	function saveData(){
		//Random Key
		var key = Math.floor(Math.random()*100000001);

		var recipe 					= {};
			recipe.rTitle 			= ["Title:", $("recipeTitle").value];
			recipe.rDescription		= ["Description:", $("recipeSummary").value];
			recipe.rDifficulty 		= ["Difficulty:", $("userDifficulty").value];
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
   			//console.log(radioGroup[i].value);
   			if (radioGroup[i].checked) {
      			radioValue = radioGroup[i].value;
      		};
   		};
   		return radioValue;
	};

	function setRadioValue(radioName, radioValue) {
		var radioGroup = document.getElementsByName(radioName);
		for (var i=0; i < radioGroup.length; i++){
   			//console.log(radioGroup[i].value);
   			if (radioGroup[i].value === radioValue) {
      			radioGroup[i].setAttribute('checked','checked');
      		};
   		};
	};

	function clearRadioValue(radioName) {
		var radioGroup = document.getElementsByName(radioName);
		var radioValue;
		for (var i=0; i < radioGroup.length; i++){
   			//console.log(radioGroup[i].value);
   			if (radioGroup[i].checked) {
 				radioGroup[i].checked = false;
      		};
   		};
   		return radioValue;
	};

	function toggleDisplay(argBool) {
	    switch(argBool){
		    case 'dataDisplay':
		    	//Hide Form
		    	$('addRecipeForm').style.display = 'none';
		    	
		    	//Change label of btn
		    	$('displayData').innerHTML = 'Add Recipe';
		
		    	//Change Button Behavior
		    	setTimeout(function(){
		    		$('displayData').href = 'addItem.html'								// Change href
		    		$('displayData').removeEventListener('click', buildDataList)},10);	// Remove function binding
		    		btnListener = false;
		    	break;
	    	case 'dataEntry':
	    		var pageContainer = $('mainContent');
	    		var dataList = $('dataList');
	  			resetForm();
	    		//If dataList element exists, destroy it.
	  			if(dataList) {
	  				mainContent.removeChild(dataList);
	  			};
	  			
	  			//If the listener has been removed by the dataDisplay state
	  			//Add listener back & change href back to "#"
	  			if(btnListener == false) {
	    			$('displayData').href = '#';
	    			$('displayData').innerHTML = 'Display Data';
	  				$('displayData').addEventListener('click', buildDataList);
	  			};	  			

	    		//Show Form
	    		$('addRecipeForm').style.display = 'block';

		    	break;
	    	case 'updateEntry':
	    		var pageContainer = $('mainContent');
	    		var dataList = $('dataList');

	    		//If dataList element exists, destroy it.
	  			if(dataList) {
	  				mainContent.removeChild(dataList);
	  			};

	  			//If the listener has been removed by the dataDisplay state
	  			//Add listener back and change verbage on button to say:
	  			//Change href back to "#"
	  			if(btnListener == false) {
	  				$('displayData').href = '#';
	  				$('displayData').innerHTML = 'Back to List';
	  				$('displayData').addEventListener('click', buildDataList);
	  			};
	    		//Show Form
	    		$('addRecipeForm').style.display = 'block';

		    	break;		    	
	    	default:
            
            return false;
		};

	};

	function buildDataList() {
		
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
		list.className = 'fade';
		
		//Add list to container
		pageContainer.appendChild(list);	

		//Loop through all localstorage items
		for(var i = 0, j=localStorage.length; i<j; i++ ){
			
			//Define key per loopIndex
			var storageKey = localStorage.key(i);

			//Convert localStorage item back to object
			var storageObject = JSON.parse(localStorage.getItem(storageKey));

			//Define listItem
			var listItem 				= document.createElement('li');
			var listItemTitleWrapper 	= document.createElement('div');
			var listItemTitle 			= document.createElement('h3');
			var listItemDescription 	= document.createElement('span');
		
			var listSubList 			= document.createElement('ul');

			//Loop through each storage object. Key pair values.
			for(var key in storageObject) {
				if(key === 'rTitle') {
					listItemTitle.innerHTML = storageObject[key][1];
				} else if (key === 'rDescription') {
					listItemDescription.innerHTML = storageObject[key][1];
				} else {
					var subListItem 		= document.createElement('li');
					var subListItemTitle 	= document.createElement('strong');
					var subListItemValue 	= document.createElement('span');

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
			listItemTitleWrapper.appendChild(listItemTitle);
			listItemTitleWrapper.appendChild(listItemDescription);
			listItem.appendChild(listItemTitleWrapper);
			listItem.appendChild(listSubList);

			//Add Links
			buildListItemLinks(storageKey, listItem);


			//Append Each List Item
			list.appendChild(listItem);
		}; 	

		/*Toggle Screen & Buttons*/
		toggleDisplay('dataDisplay');
		setTimeout(function() {
    		list.className = 'fade fadeIn';
		}, 50);

	};

	//Nothing has been saved by user. Pre-populate the list with 
	//fake data.
	function prePopList(data) {
		//Loop through JSON data and store in local storage
	    for ( var key in data) {
	    	console.log("Object " + key);
	        localStorage.setItem(key, JSON.stringify(data[key]));
	    };		
	};

	//Create Edit and Delete Buttons
	function buildListItemLinks(itemKey, targetListItem) {
		var linkContainer	= document.createElement('p');
		var editBtn 		= document.createElement('a');
		var deleteBtn 		= document.createElement('a');

		
		//Build Edit Btn
		editBtn.setAttribute('class','gBtn gEdit');
		editBtn.key 		= itemKey;
		editBtn.href 		= '#';
		editBtn.innerHTML 	= 'Edit';
		editBtn.addEventListener('click', editListItem);

		//Build Delete Btn
		deleteBtn.setAttribute('class','gBtn gDelete');
		deleteBtn.key 		= itemKey;
		deleteBtn.href 		= '#';
		deleteBtn.innerHTML = 'Delete';
		deleteBtn.addEventListener('click', deleteListItem);

		//Add newly created elements to dom
		linkContainer.appendChild(editBtn);
		linkContainer.appendChild(deleteBtn);
		targetListItem.appendChild(linkContainer);

	};	

	function editListItem() {
		//Get data from localstorage
		var value = localStorage.getItem(this.key);
		var recipe = JSON.parse(value);

		//Show form
		toggleDisplay('updateEntry');

		//populate
		$("recipeTitle").value 		= recipe.rTitle[1];
		$("recipeSummary").value 	= recipe.rDescription[1];
		$("userDifficulty").value 	= recipe.rDifficulty[1];
		$("chooseDate").value 		= recipe.rDate[1];
		$("flavorRange").value 		= recipe.rFlavor[1];
		$("ingredients").value 		= recipe.rIngredients[1];
		$("directions").value 		= recipe.rDirections[1];

		setRadioValue('recipeCat', recipe.rCategory[1])

		//Remove existing listener on save btn
		saveRecipe.removeEventListener('click', saveData);
		
		//Store Btn within new variable
		var updateRecipe = $('submitForm');
		
		//Moduft attributes and bind validateRecipe function w/ new EventListener.
		updateRecipe.value = 'Update Recipe';
		updateRecipe.addEventListener('click', validateRecipe);
		updateRecipe.key = this.key;
	};
	

	function deleteListItem(){

	};

	function validateRecipe() {
		alert("Boom!");
	}

	//User Initiated Delete Local Storage. Using confirmBox.
	function clearLocalData(){
		if(!localStorage.length){
			alert("Sorry, there are no recipes to clear.");	
		} else {
			//Offer the user a confirmationBox
            var confirmListDelete = confirm("Are you sure you want to clear all of the recipe data?");
            
            //If Confirmed, follow through.
            if(confirmListDelete === true) {
            	localStorage.clear();
				toggleDisplay('dataEntry');        	
            	alert("All recipes have been deleted!");
        	}

		};
	};
    

	//Clear form after submit. Eventually will only be called 
	//if validation is succesful
	function resetForm() {
		// Zero out all values for new recipe entry 
		clearRadioValue('recipeCat');

		$("recipeTitle").value 		= ""
		$("recipeSummary").value 	= ""
		$("userDifficulty").value 	= ""
		$("chooseDate").value 		= ""
		$("flavorRange").value 		= ""
		$("ingredients").value 		= ""
		$("directions").value 		= ""
		$('submitForm').value 		='Save Recipe';
	};


	//Defaults
		var saveRecipe 			= $('submitForm');
		var displayDataBtn 		= $('displayData');
		var clearLocalDataBtn 	= $('clearData');
		var btnListener 		= true;	
		
	//Define array for select
	var difficultyArray = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];


	//Bind Functions
	saveRecipe.addEventListener('click', saveData);
	displayDataBtn.addEventListener('click', buildDataList);
	clearLocalDataBtn.addEventListener('click', clearLocalData);

	//Create Select Element Dropdown.
	buildSelect('chooseDifficulty', 'Difficulty', difficultyArray);
	
});




