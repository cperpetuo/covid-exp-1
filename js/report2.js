var users = {};

function evaluateAnswers(reference, element, array) {
  	
  var ref = firebase.database().ref(reference);

  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
	
	$.each( snapshot.val(), function( user, answers ) {
	  var total = 0;
	  var size = array.length;
	  $.each( answers.respostas, function( key, value ) {
		var resposta = value.resposta;
		var category = value.category;
		if(category == 'ignore')
			return;
		if(category == resposta)
		  total++;
	  });	 
      grades = users[user];
	  if(!grades)
		  grades = {};
	  
	  if(reference.indexOf("vies_confirmacao_fake") > -1)
		  reference = "fake";	  
	  
	  else if(reference.indexOf("vies_confirmacao_real") > -1)
		  reference = "real";	  
	  
	  if(grades[reference]) {
		g = grades[reference];
		grades[reference] += total;
	  }
	  else
		grades[reference] = total;
	  
	  users[user] = grades;
	});
	
    updateTable(element, users);
  
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}


function updateTable(element, users) {
	var table = document.getElementById(element);
	
	table.innerHTML = "<table id='table'> \
	  <tr>\
	    <th>Código</th>\
	    <th>Fake</th>\
	    <th>Real</th>\
	  <tr>	\
	</table>";
	
	$.each( users, function( key, value ) {
	  var tr = document.createElement("tr");
	  var td1 = document.createElement("td");
	  var td2 = document.createElement("td");
	  var td3 = document.createElement("td");
	  table.appendChild(tr);
	  tr.appendChild(td1);
	  tr.appendChild(td2);
	  tr.appendChild(td3);
	  td1.appendChild(document.createTextNode(key));
	  td2.appendChild(document.createTextNode(value["fake"]));
	  td3.appendChild(document.createTextNode(value["real"]));
	});
}

function getValue(val) {
	if(!val)
		return "--";
	return val;
}
