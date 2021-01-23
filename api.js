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

    data.results.forEach((it) => {
        content.innerHTML += `<div class="col-md-4">
                                    <div class="card">
                                        <div class="card-body">
                                            ${it.question}
                                        </div>
                                    </div>
                                </div>`
    });
}

function printCategories(data) {
    let content = document.getElementById('control');

    data.forEach((category) => {
        content.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    })
}

getCategories();

