var users = {};

function evaluateAnswers(reference, element, array) {
  	
  var ref = firebase.database().ref(reference);

  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
	
	$.each( snapshot.val(), function( user, answers ) {
	  var acertou = 0;
	  var lermaisfake = 0;
	  var lermaisreal = 0;
	  var size = array.length;
	  $.each( answers.respostas, function( key, value ) {
		var resposta = value.resposta;
		var category = value.category;
		if(category == 'ignore')
		  return;
		if(category == 'lermaisfake') {
			reference = category;
			if(resposta == "Sim")
			  lermaisfake++;
		}
		else if(category == 'lermaisreal') {
			reference = category;
			if(resposta == "Sim")
			  lermaisreal++;
		}
		else if(category == resposta) {
		  acertou++;
		}
        grades = users[user];
	    if(!grades)
		  grades = {};
	  
	    if(reference.indexOf("vies_confirmacao_fake") > -1)
		  reference = "fake";	  
	  
	    else if(reference.indexOf("vies_confirmacao_real") > -1)
		  reference = "real";	  
	  
	    if(grades[reference]) {
		  if(reference == 'lermaisfake')
		    grades[reference] += lermaisfake;
		  else if(reference == 'lermaisreal')
		    grades[reference] += lermaisreal;
		  else
		    grades[reference] += acertou;
	    }
	    else {
		  if(reference == 'lermaisfake')
		    grades[reference] = lermaisfake;
		  else if(reference == 'lermaisreal')
		    grades[reference] = lermaisreal;
		  else
		    grades[reference] = acertou;
	    }
	    users[user] = grades;
	  });	 
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
	    <th>Fake (acertos)</th>\
	    <th>Real (acertos)</th>\
	    <th>Fake (ler mais)</th>\
	    <th>Real (ler mais)</th>\
	  <tr>	\
	</table>";
	
	$.each( users, function( key, value ) {
	  var tr = document.createElement("tr");
	  var td1 = document.createElement("td");
	  var td2 = document.createElement("td");
	  var td3 = document.createElement("td");
	  var td4 = document.createElement("td");
	  var td5 = document.createElement("td");
	  table.appendChild(tr);
	  tr.appendChild(td1);
	  tr.appendChild(td2);
	  tr.appendChild(td3);
	  tr.appendChild(td4);
	  tr.appendChild(td5);
	  td1.appendChild(document.createTextNode(key));
	  td2.appendChild(document.createTextNode(value["fake"]));
	  td3.appendChild(document.createTextNode(value["real"]));
	  td4.appendChild(document.createTextNode(value["lermaisfake"]));
	  td5.appendChild(document.createTextNode(value["lermaisreal"]));
	});
}

function getValue(val) {
	if(!val)
		return "--";
	return val;
}
