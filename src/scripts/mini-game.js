const quizForm = document.getElementById('quiz-form');
const resultDiv = document.getElementById('result');
const correctAnswers = ['b', 'd', 'a', 'd'];

quizForm.addEventListener('submit' ,e=>{
    e.preventDefault()

    let score = 0;
    const userAnswers = [quizForm.q1.value,quizForm.q2.value,quizForm.q3.value,quizForm.q4.value,];
    userAnswers.forEach((answer,index) => {
        if(answer === correctAnswers[index]){
            score += 1;
        }
    });
    resultDiv.innerHTML = `Your score is ${score}/${correctAnswers.length}`;
});