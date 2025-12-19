let boxes = document.querySelectorAll(".upper div , .lower div");
let levelText = document.querySelector("h3");

let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;

function flash(box)
{
    box.classList.add("white");

    setTimeout(() => {
        box.classList.remove("white");
    }, 200);
}

document.addEventListener(("keydown") , () => {
    if (!started)
    {
        started = true;
        nextLevel();
    }
})

function nextLevel() {
    userSequence = [];
    level++;

    levelText.innerText = "Level " + level;

    let randomIndex = Math.floor(Math.random() * boxes.length);
    let box = boxes[randomIndex];
    let color = box.classList[0];

    gameSequence.push(color);

    flash(box);
}

for (let box of boxes)
{
    box.addEventListener(("click") , () => {
        if (!started) return;

        let color = box.classList[0];
        userSequence.push(color);

        flash(box);
        checkAnswer(userSequence.length - 1);
    })
}

function checkAnswer(index)
{
    if (userSequence[index] !== gameSequence[index])
    {
        levelText.innerHTML = `Game Over 😵 , Your Score Was <b> ${level} <b> <br> Press any key to restart`;
        resetGame()
        return;
    }

    if (userSequence.length === gameSequence.length)
    {
        setTimeout(nextLevel , 1000);
    }
}

function resetGame() {
    userSequence = [];
    gameSequence = [];
    level = 0;
    started = false;
}
