const mediaQuery = window.matchMedia("(max-width: 1091px)");

function showslidebar() {
    const sidebar = document.querySelector('.navbar');
        sidebar.style.right = '0';

}

function hideslidebar() {
    const sidebar = document.querySelector('.navbar');
    if(mediaQuery.matches) {
        sidebar.style.right = '-100%';
    }
    else {
        sidebar.style.right = '0';
    }
}

let words = document.querySelectorAll(".word");
words.forEach((word) => {
    let letter = word.textContent.split("");
    word.textContent = "";
    letter.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter"
        word.append(span);
    });
});

alert("You can run, but you cant hide !!!")
alert("I See You !!!")
alert("Just Kidding welcome to My Profile :))")

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";
let changeText =()=>{
    let currentWord = words[currentWordIndex]
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};
changeText();
setInterval(changeText, 3000);

let DarkMoonIcon = document.querySelector("#darkmode-icon");
DarkMoonIcon.onclick = () =>{
    DarkMoonIcon.classList.toggle("bx-sun");
    document.body.classList.toggle("dark-mode");
}

new Typed(".text1", {
    strings: ["Post 1: Introduction to AI\n" +
    "Artificial Intelligence (AI) is transforming the way we live and work. From self-driving cars to personalized recommendations, AI is at the forefront of innovation. Let’s explore what AI is all about!\n"+
    "Post 2: What is AI?\n" +
    "AI refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. This includes tasks like problem-solving, understanding language, and recognizing patterns\n"+
    "Post 3: Types of AI\n" +
    "AI can be categorized into Narrow AI, which is designed for specific tasks (like voice assistants), and General AI, which has the potential to understand, learn, and apply knowledge across a wide range of tasks.",
        "Post 4: Machine Learning\n" +
        "Machine Learning (ML) is a subset of AI where machines learn from data to improve their performance over time without being explicitly programmed. Common applications include image recognition and spam filtering.\n"+
        "Post 5: Deep Learning\n" +
        "Deep Learning, a subset of ML, uses neural networks with many layers (hence \"deep\") to analyze various factors of data. It powers advancements like voice assistants and autonomous vehicles\n"+
        "Post 6: Natural Language Processing\n" +
        "Natural Language Processing (NLP) is an AI field focused on the interaction between computers and humans through language. It’s behind chatbots, language translation, and sentiment analysis.\n"+
        "Post 7: Learning AI\n" +
        "Interested in learning more about AI? There are many resources available, including online courses, tutorials, and research papers. Start your AI journey today!"],
    typeSpeed: 50,
    backSpeed: 5,
    backDelay: 5000,
    loop: true
});