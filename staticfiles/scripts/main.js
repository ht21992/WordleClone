  document.addEventListener("DOMContentLoaded", () => {
  drawSquares();
  
  var words = ['house','hotel','squad','sport','leafy','wreck','bronx','plant','brown','gnome']
  let word = words[Math.floor(words.length * Math.random())];
  
  let guessed_words = [[]];
  let available_space = 1;


  let guessed_word_count = 0;

  const keys = document.querySelectorAll(".keyboard-row button");

  
  function getcurrent_word_arrayay() {
    const number_of_guessed_words = guessed_words.length;
    return guessed_words[number_of_guessed_words - 1];
  }

  function updateguessed_words(letter) {
    const current_word_array = getcurrent_word_arrayay();

    if (current_word_array && current_word_array.length < 5) {
      current_word_array.push(letter);

      const available_spaceEl = document.getElementById(String(available_space));

      available_space = available_space + 1;
      available_spaceEl.textContent = letter;
    }
  }

  function get_square_color(letter, index) {
    const is_correct_letter = word.includes(letter);

    if (!is_correct_letter) {
      btn = document.querySelector(`[data-key="${letter}"]`)
      btn.style.backgroundColor = "gray";
      return "gray";
    }

    const letter_in_this_position = word.charAt(index);
    const is_correct_position = letter === letter_in_this_position;

    if (is_correct_position) {
      //const letter = target.getAttribute("data-key");

      btn = document.querySelector(`[data-key="${letter}"]`)
      btn.style.backgroundColor = "green";
      return "green";
    }

    return "rgb(181, 159, 59)";
  }

  function handle_submit_word() {
    const current_word_array = getcurrent_word_arrayay();
    if (current_word_array.length !== 5) {
      window.alert("Word must be 5 letters");
      return;
    }


    const current_word = current_word_array.join("");
    const id_of_first_letter = guessed_word_count * 5 + 1;

    const interval = 200;
    current_word_array.forEach((letter, index) => {
          setTimeout(() => {
            const tile_color = get_square_color(letter, index);
            const letter_id = id_of_first_letter + index;
            const letter_element = document.getElementById(letter_id);
            letter_element.classList.add("animate__flipInX");
            letter_element.style = `background-color:${tile_color};border-color:${tile_color}`;
          }, interval * index);

    })




    guessed_word_count += 1;
    if (current_word === word) {

          document.getElementById("keyboard-container").innerHTML = `<h3 style="text-align: center;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande'">Congratulations the word is ${word}</h3>`;


        }

        else if (guessed_words.length === 6) {
          document.getElementById("keyboard-container").innerHTML = `<h3 style="text-align: center;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande'">Sorry, you have no more guesses! The word is ${word}.</h3>`;
        }
    guessed_words.push([]);

  }

  function drawSquares() {
    const Board = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      Board.appendChild(square);
    }
  }

  function handleDeleteLetter() {


    const current_word_array = getcurrent_word_arrayay();
    if (current_word_array == ""){
    return ;
    }
    const removedLetter = current_word_array.pop();

    guessed_words[guessed_words.length - 1] = current_word_array;

    const lastletter_element = document.getElementById(String(available_space - 1));

    lastletter_element.textContent = "";
    available_space = available_space - 1;

  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      if (letter === "enter") {
        handle_submit_word();
        return;
      }

      if (letter === "del") {
        handleDeleteLetter();
        return;
      }

      updateguessed_words(letter);
    };
  }
  
  document.addEventListener('keydown', (event) => {

  if (event.which >= 65 && event.which <=90){
   const letter = event.key;
  updateguessed_words(letter);

  }
  else if (event.which == 8){
    handleDeleteLetter();
  }
  else if (event.which == 13){
    handle_submit_word();
  }

}, false);


});




         $('#modal-btn').click(function(){
$('.ui.modal')
  .modal('show')
;
 });



	



