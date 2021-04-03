// Your web app's Firebase configuration
function firebaseConfiguration() {
  var firebaseConfig = {
    apiKey: "AIzaSyCDoF7uuat1KKsxidYXieg1r_B5ql9yLx4",
    authDomain: "covid-survey-7a0c6.firebaseapp.com",
    databaseURL: "https://covid-survey-7a0c6.firebaseio.com",
    projectId: "covid-survey-7a0c6",
    storageBucket: "covid-survey-7a0c6.appspot.com",
    messagingSenderId: "216921647928",
    appId: "1:216921647928:web:a2ef9d08c002050379efcd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

// Insere todas as respostas na base de dados
function saveAnswers(formName, questions, conditional) {

/* *************************
****************************
  var code = $('#code').val();
  if(code == 'generate')
    code = getCode();
  
  window.location.href = $("#next").val() + "?code=" + code;
  return;
/* *************************
**************************** */

  // Obtem as respostas selecionadas
  var fields = document.getElementsByTagName('input');

  var answers = new Array();
  var perguntas = new Array();

  for(i=0; i< fields.length; i++) {
    if(((fields[i].type == 'radio' || fields[i].type == 'checkbox') && fields[i].checked) || (fields[i].type == 'text' && fields[i].value != '')) {
	  var value = "";
	  var name = fields[i].name.split('_')[1];
	  if(perguntas.includes(name)) 
		continue;
      perguntas.push(name)
	  if(fields[i].type == 'checkbox') {
		var checkboxes = document.getElementsByName(fields[i].name);
		var checkboxesChecked = [];
		value = "";
		for (var j=0; j<checkboxes.length; j++) {
          if (checkboxes[j].checked) {
            value += checkboxes[j].value + ",";
          }
        }
	  }
	  else {
        value = fields[i].value;
	  }
      var category = fields[i].getAttribute("category");
      var answer = {
        pergunta : name,
        resposta : value,
        category : category || 'default'
      };
      answers.push(answer);
    }
  }

  for(i=0; i<answers.length; i++) {    
    
    var a = answers[i];
    //console.log(a.pergunta + ',' + a.resposta + ',' + a.category);
    
  }

  // Valida se todas as perguntas foram respondidas
  if(answers.length < questions.length) {
    alert("Todas as perguntas precisam ser respondidas.");
    return;
  }

  // Cria o objeto com as respostas
  var answerObject = {
    respostas: answers
  };  

  var code = $('#code').val();
  if(code == '' || code == null) {
    alert("Você precisa informar o código gerado no passo anterior.");
    return false;
  }
 
  // Envia para a base de dados
  if(code == 'generate') {
    code = getCode();
    firebase.database().ref(formName + '/' + code).set(answerObject)
      .then(function(snapshot) {
        //alert("Dados inseridos com sucesso.");
		if(conditional) {
		  getUserGrade(code, $("#next1").val(), $("#next").val());
		}
	    else {
          window.location.href = $("#next").val() + "?code=" + code;
		}
     }, function(error) {
      alert(error);
    });
  } else {
    firebase.database().ref(formName + '/' + code).update(answerObject)
    .then(function(snapshot) {
      //alert("Dados atualizados com sucesso.");
	  if(conditional) {
		getUserGrade(code, $("#next1").val(), $("#next").val());
	  }
	  else {
        window.location.href = $("#next").val() + "?code=" + code;
	  }
    }, function(error) {
    alert(error);
  });
 }

}

// Gera codigo para o usuario resgatar o premio
function getCode() {
  var LETTERS = ["A","E","K","L","D","F"];
  var time = (new Date()). getTime() + "";
  var code = "";
  for(i=0; i<time.length; i++) {
    if(i < LETTERS.length)
      code += LETTERS[i];
    else
      code += time[i];
  }
  return code;
}


function getUserGrade(code, url1, url2) {
	
  var ref = firebase.database().ref('questions');
  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
	
	$.each( snapshot.val(), function( user, answers ) {
	  if(user == code) {
	    var total = 0;
	    $.each( answers.respostas, function( key, value ) {
		  var resposta = value.resposta;
		  var category = value.category;
		  if(category == 'positive')
		    total += parseInt(resposta);
		  else if(category == 'negative')
		    total += (8 - parseInt(resposta));
	    });	  
	    grade = total / questions.length;
		if(grade < 5)
	      window.location.href = url1 + "?code=" + code;
		else
	      window.location.href = url2 + "?code=" + code;
	  }
	});
	  
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}