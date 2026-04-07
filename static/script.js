
let questions = [
    "Is this decision important for your future?",
    "Do you have enough information to make this decision?",
    "Will this decision benefit you in the long term?",
    "Are you making this decision under pressure or emotions?"
];

let shuffled = [];
let i = 0;
let answers = [];

function start(){
    let d = document.getElementById("decision").value;

    if(!d){
        alert("Enter decision");
        return;
    }

    // ✅ Proper shuffle (copy array first)
    shuffled = [...questions].sort(() => Math.random() - 0.5);

    i = 0;
    answers = [];

    document.getElementById("questionBox").style.display = "block";
    document.getElementById("result").innerText = ""; // clear old result

    show();
}

function show(){
    document.getElementById("question").innerText = shuffled[i];
}

function answer(val){
    answers.push(val);
    i++;

    if(i < 3){
        show();
    }else{
        result();
    }
}

function result(){
    let decision = document.getElementById("decision").value;

    let total = answers[0] + answers[1] + answers[2];
    let conf = (total / 15) * 100;

    let msg = "";

    if(conf < 40) msg = "Bad decision";
    else if(conf < 70) msg = "Think more";
    else msg = "Go ahead";

    // ✅ Hide questions after completion
    document.getElementById("questionBox").style.display = "none";

    document.getElementById("result").innerText =
        "Confidence: " + conf.toFixed(2) + "% - " + msg;

    fetch("/save",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({decision:decision,confidence:conf})
    });
}

// function openHistory(){
//     window.location.href="/history-page";
// }
function openHistory(){
    window.location.href="/history-page";
}
let examples = [
    "Should I start a project today?",
    "Should I study or watch IPL?",
    "Should I learn Python now?",
    "Should I eat junk food?",
    "Should I go for a trip?",
    "Should I start a project today?",
    "Should I go to gym today?"
];

let index = 0;

setInterval(() => {
    document.getElementById("decision").placeholder = examples[index];
    index = (index + 1) % examples.length;
}, 10000);