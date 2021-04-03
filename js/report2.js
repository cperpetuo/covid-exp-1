var users = {};

function evaluateAnswers(reference, element, array) {
  	
  var ref = firebase.database().ref(reference);

  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
	
	$.each( snapshot.val(), function( user, answers ) {
	  //if(user == 'AEKLDF6584035') return;
	  var refaux = reference;
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
			refaux = category;
			if(resposta == "Sim")
			  lermaisfake++;
		}
		else if(category == 'lermaisreal') {
			refaux = category;
			if(resposta == "Sim")
			  lermaisreal++;
		}
		else if(category == resposta) {
		  acertou++;
		}
        grades = users[user];
	    if(!grades)
		  grades = {};
	  
	    if(refaux.indexOf("vies_confirmacao_fake") > -1)
		  refaux = "fake";	  
	  
	    else if(refaux.indexOf("vies_confirmacao_real") > -1)
		  refaux = "real";	  
	  
	    if(grades[refaux]) {
		  if(refaux == 'lermaisfake')
		    grades[refaux] += lermaisfake;
		  else if(refaux == 'lermaisreal')
		    grades[refaux] += lermaisreal;
		  else
		    grades[refaux] += acertou;
	    }
	    else {
		  if(refaux == 'lermaisfake')
		    grades[refaux] = lermaisfake;
		  else if(refaux == 'lermaisreal')
		    grades[refaux] = lermaisreal;
		  else
		    grades[refaux] = acertou;
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
