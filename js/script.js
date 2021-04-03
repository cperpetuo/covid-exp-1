// Cria o cabeçalho e descrição da pergunta
function createQuestion(count, key, value) {
  var question = document.createElement("div");
  question.className = 'question';
  
  if(value.title) {
    var title = document.createElement("p");
    title.className = 'title';
    title.innerHTML = value.title;
    
    $(question).append(title);
    count = 1;
  }

  // Inclui a imagem na pergunta
  if(value.image){
    var image = document.createElement('img');
    image.src = value.image;
    $(question).append(image);
  }

  var description = document.createElement("p");
  description.className = 'description';
  description.innerHTML = count + ') ' + value.description;
  $(question).append(description);

  return question;
}

// Opcoes de resposta
function createOptions(question, key, value) {

  if(value.options == '1-7')
    var options = createOptions1_7(question, key, value);
  else if(value.options == 'yes_no')
    var options = createOptionsYN(question, key, value);
  else if(value.options == 'list')
    var options = createOptionsList(question, key, value);
  else if(value.options == 'check-list')
    var options = createOptionsCheckList(question, key, value);
  else if(value.options == 'open')
    var options = createOptionsOpen(question, key, value);
}

// Cria opcoes de resposta do tipo (discordo) 1 - 7 (concordo)
function createOptions1_7(question, key, value) {

  var options = document.createElement("div");
  options.className = 'options';
  
  var span1 = document.createElement("span");
   span1.className = 'left';
   span1.innerHTML = 'Discordo totalmente';
    
   var span2 = document.createElement("span");
   span2.className = 'right';
   span2.innerHTML = 'Concordo totalmente';

   $(options).append(span1);
   $(options).append(span2);

   for(i=1; i<=7; i++) {     
    var input = document.createElement("input");
    
    var att = document.createAttribute("category");   // Create a "category" attribute
    att.value = value.category;                       // Set the value of the category attribute
    input.setAttributeNode(att);                      // Add the category attribute to input

    input.id = value.id + "_" + i;
    input.name = 'pergunta_' + value.id;
    input.value = i;
    input.type = 'radio';
    var label = document.createElement("label");
    label.for = input.id;
    label.className = 'label-1-7';
    label.innerHTML = input.value;
    $(options).append(input);
    $(options).append(label);
  }
  $(question).append(options);
}

// Cria opcoes de resposta do tipo SIM / NÃO
function createOptionsYN(question, key, value) {

  var div = document.createElement("div");
  div.className = 'center options';

  // Sim
  var input = document.createElement("input");
    
  var att = document.createAttribute("category");   // Create a "category" attribute
  att.value = value.category;                       // Set the value of the category attribute
  input.setAttributeNode(att);                      // Add the category attribute to input

  input.id = value.id + "_" + i;
  input.name = 'pergunta_' + value.id;
  input.value = 'Sim';
  input.type = 'radio';
  var label = document.createElement("label");
  label.for = input.id;
  label.className = 'label-1-7';
  label.innerHTML = input.value;
  $(div).append(input);
  $(div).append(label);

  // Nao
  var input = document.createElement("input");
    
  var att = document.createAttribute("category");   // Create a "category" attribute
  att.value = value.category;                       // Set the value of the category attribute
  input.setAttributeNode(att);                      // Add the category attribute to input

  input.id = value.id + "_" + i;
  input.name = 'pergunta_' + value.id;
  input.value = 'Não';
  input.type = 'radio';
  var label = document.createElement("label");
  label.for = input.id;
  label.className = 'label-1-7';
  label.innerHTML = input.value;
  $(div).append(input);
  $(div).append(label);

  $(question).append(div);
}

// Cria input para resposta aberta
function createOptionsOpen(question, key, value) {

  var div = document.createElement("div");
  div.className = 'options';

  // Sim
  var input = document.createElement("input");
    
  var att = document.createAttribute("category");   // Create a "category" attribute
  att.value = value.category;                       // Set the value of the category attribute
  input.setAttributeNode(att);                      // Add the category attribute to input

  input.id = value.id;
  input.name = 'pergunta_' + value.id;
  input.className = 'open';
  input.value = '';
  input.placeholder = 'Escreva aqui a resposta (somente números)';
  input.type = 'text';
  $(div).append(input);
  
  setInputFilter(input, function(value) {
    return /^\d*,?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
  });

  $(question).append(div);
}

// Cria opcoes de resposta do tipo lista
function createOptionsList(question, key, value) {
  
  var options = document.createElement("div");
  //options.className = 'options';
  
  var list = value.list;
  for(i=0; i<list.length; i++) {
    var br = document.createElement("br");
    var input = document.createElement("input");
    
    var att = document.createAttribute("category");   // Create a "category" attribute
    att.value = value.category;                       // Set the value of the category attribute
    input.setAttributeNode(att);                      // Add the category attribute to input

    input.id = value.id + "_" + i;
    input.name = 'pergunta_' + value.id;
    input.value = list[i];
    input.type = 'radio';
    var label = document.createElement("label");
    label.for = input.id;
    label.className = 'lable-list';
    label.innerHTML = list[i];
    $(options).append(input);
    $(options).append(label);
    $(options).append(br);
  }
  $(question).append(options);

}

// Cria opcoes de resposta do tipo check lista
function createOptionsCheckList(question, key, value) {
  
  var options = document.createElement("div");
  //options.className = 'options';
  
  var list = value.list;
  for(i=0; i<list.length; i++) {
    var br = document.createElement("br");
    var input = document.createElement("input");
    
    var att = document.createAttribute("category");   // Create a "category" attribute
    att.value = value.category;                       // Set the value of the category attribute
    input.setAttributeNode(att);                      // Add the category attribute to input

    input.id = value.id + "_" + i;
    input.name = 'pergunta_' + value.id;
    input.value = list[i];
    input.type = 'checkbox';
    var label = document.createElement("label");
    label.for = input.id;
    label.className = 'lable-list';
    label.innerHTML = list[i];
    $(options).append(input);
    $(options).append(label);
    $(options).append(br);
  }
  $(question).append(options);
}

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}