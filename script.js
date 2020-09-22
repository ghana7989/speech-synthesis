const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

// Create Speech Box
const createBox = (item) => {
  const box = document.createElement("div");
  const { image, text } = item
  box.classList.add("box");
  box.innerHTML = `
    <img src=${image} alt=${text.length + (Math.random() * 458).toFixed(5)}/>
    <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add Active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 700)

  })

  // Todo speak event
  main.appendChild(box)
};
data.forEach(createBox);

// Init speechSynthesis 
const Message = new SpeechSynthesisUtterance()

// Store Voices 
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement("option")
    option.value = voice.name
    option.innerText = `${voice.name} ${voice.lang}`

    voicesSelect.appendChild(option)
  })
}
// Set Vocals

function setVocal(e) {
  Message.voice = voices.find(voice => voice.name === e.target.value)
}

// Set text
function setTextMessage(text) {
  Message.text = text;
}
// Speak Text
function speakText() {
  speechSynthesis.speak(Message)
}


// Voices Changed
speechSynthesis.addEventListener("voiceschanged", getVoices)


// Toggle Text Button
toggleBtn.addEventListener("click", () => {
  const imgAndp = document.querySelectorAll("img, p,.box");
  imgAndp.forEach(item => {
    item.classList.toggle("hide")
  })
  document.getElementById("text-box").classList.toggle("show")
  main.classList.toggle("hide")
})
closeBtn.addEventListener("click", () => {
  const imgAndp = document.querySelectorAll("img, p,.box");
  imgAndp.forEach(item => {
    item.classList.toggle("hide")
  })
  document.getElementById("text-box").classList.toggle("show")
  main.classList.toggle("hide")
})

voicesSelect.addEventListener("change", setVocal)
textarea.value="Hey This Is Ghana Hope You Loved My Project"
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value)
  speakText()
})

getVoices()