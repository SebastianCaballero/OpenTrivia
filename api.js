function getData() {
    let totalQuestions = document.getElementById('questions').value;
    let category = document.getElementById('control').value;
    let difficult = document.getElementById('difficult').value;
    let typeQ = document.getElementById('typeQuestion').value;

    fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficult}&type=${typeQ}`)
    .then(response => response.json())
    .then(data => printData(data));
}

function getCategories() {
    const url = 'https://opentdb.com/api_category.php';

    fetch(url)
    .then(response => response.json())
    .then(data => printCategories(data.trivia_categories));
    
}


function printData(data) {
    let content = document.getElementById('questions-container');


    if (data.results[0]["type"] == "boolean") {
        count = 1;
        data.results.forEach((it) => {
            let correct = it.correct_answer;
            content.innerHTML += `<div class="card m-3" style="width: 18rem;">
                                        <div class="card-body">
                                            <h5 class="card-title">Question ${count}</h5>
                                            <p class="card-text">${it.question}</p>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">
                                                <input class="form-check-input" type="radio" name="Question${count}" id="TQuestion${count}" value="${correct == 'True' ? 'correct' : 'incorrect'}" required>
                                                <label class="form-check-label" for="TQuestion${count}">
                                                    True
                                                </label>
                                            </li>
                                            <li class="list-group-item">
                                                <input class="form-check-input" type="radio" name="Question${count}" id="FQuestion${count}" value="${correct == 'False' ? 'correct' : 'incorrect'}" required>
                                                <label class="form-check-label" for="FQuestion${count}">
                                                    False
                                                </label>
                                            </li>
                                        </ul>
                                    </div>`
            count += 1;
        });
        content.innerHTML += `<div class="d-flex justify-content-center mb-4"><input type="submit" class="btn btn-primary py-2 px-5" value="Submit Answers"></div>`;
    } else if (data.results[0]["type"] == "multiple") {
        count = 1;
        data.results.forEach((it) => {
            answers = Array.from(it.incorrect_answers);
            answers.push(it.correct_answer);
            answers = answers.sort(() => Math.random() - 0.5);
            let correct = answers.findIndex((elem) => elem ==it.correct_answer)
            content.innerHTML += `<div class="card m-3" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">Question ${count}</h5>
                                        <p class="card-text">${it.question}</p>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
                                            <input class="form-check-input" type="radio" name="Question${count}" id="aQuestion${count}" value="${correct == 0 ? 'correct' : 'incorrect'}" required>
                                            <label class="form-check-label" for="aQuestion${count}">
                                                ${answers[0]}
                                            </label>
                                        </li>
                                        <li class="list-group-item">
                                            <input class="form-check-input" type="radio" name="Question${count}" id="bQuestion${count}" value="${correct == 1 ? 'correct' : 'incorrect'}" required>
                                            <label class="form-check-label" for="bQuestion${count}">
                                                ${answers[1]}
                                            </label>
                                        </li>
                                        <li class="list-group-item">
                                            <input class="form-check-input" type="radio" name="Question${count}" id="cQuestion${count}" value="${correct == 2 ? 'correct' : 'incorrect'}" required>
                                            <label class="form-check-label" for="cQuestion${count}">
                                                ${answers[2]}
                                            </label>
                                        </li>
                                        <li class="list-group-item">
                                            <input class="form-check-input" type="radio" name="Question${count}" id="dQuestion${count}" value="${correct == 3 ? 'correct' : 'incorrect'}" required>
                                            <label class="form-check-label" for="dQuestion${count}">
                                                ${answers[3]}
                                            </label>
                                        </li>
                                    </ul>
                                </div>`
            count += 1;
        });
        content.innerHTML += `<div class="d-flex justify-content-center mb-4"><input type="submit" class="btn btn-primary py-2 px-5" value="Submit Answers"></div>`;
    }
    
}

function printCategories(data) {
    let content = document.getElementById('control');

    data.forEach((category) => {
        content.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    })
}

function disableButton(btn, noBtn){
    document.getElementById(btn).disabled = true;
    document.getElementById(noBtn).style.display = "inline-block";
}

function enableButton(btn, noBtn){
    document.getElementById(btn).disabled = false;
    document.getElementById(noBtn).style.display = "none";

    let content = document.getElementById('questions-container');
    content.innerHTML = '';
}

function validateAnswers() {
    let counter = 0;
    let length = document.getElementById('questions').value;
    
    for(let i = 1; i <= length; i++) {
        let rigthWrong = document.querySelector(`input[name="Question${i}"]:checked`).value;
        if(rigthWrong === "correct") {
            counter += 1;
        }
    }
    printScore(counter, length);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Receives counter and length from validatingAnswers(), adds the innerHTML for the score portion, it uses the counter to keep track of the right answers and length to know the number of questions being asked. 
function printScore(counter, length) {
    let content = document.getElementById('score-container');

    content.innerHTML = `<div class="card border-success mb-3 mt-4 mx-auto" style="max-width: 18rem;">
        <div class="card-body text-success text-center">
        <h5 class="card-title">Your Score: ${counter}/${length}</h5>
        <p class="card-text">Correct answers: ${counter} <br> Wrong answers: ${length - counter} <br> Total answers: ${length}</p>
        </div>
    </div>`
}

getCategories();






