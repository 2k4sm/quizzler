function displayEndScore() {
    let endScore = document.querySelector('.end-score');
    endScore.innerText = localStorage.getItem('score');
    localStorage.clear()
}
displayEndScore();