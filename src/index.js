// 현재시간 표시
const h2 = document.querySelector("h2");
function nowTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    h2.innerText = `${hours}:${minutes}:${seconds}`;
}
nowTime();
setInterval(nowTime, 1000);



// 렌덤 색상변경
const colors = [
    "#ef5777",
    "#575fcf",
    "#4bcffa",
    "#34e7e4",
    "#0be881",
    "#f53b57",
    "#3c40c6",
    "#0fbcf9",
    "#00d8d6",
    "#05c46b",
    "#ffc048",
    "#ffdd59",
    "#ff5e57",
    "#d2dae2",
    "#485460",
    "#ffa801",
    "#ffd32a",
    "#ff3f34"
];
const btn = document.querySelector("#button");

function handleClick() {
const a = colors[Math.floor(Math.random() * colors.length)];
const b = colors[Math.floor(Math.random() * colors.length)];
if (a === b) {
    return handleClick();
}
document.body.style.background = `linear-gradient(to left, ${a}, ${b})`;
}

handleClick();
setInterval(handleClick, 10000);

// btn.addEventListener("click", handleClick);



//로그인 하고 아이디 로컬저장소에 저장
const loginForm = document.querySelector(".login");
const loginInput = document.querySelector("#login-form input");
const loginButton = document.querySelector("#login-form button");
const greeting = document.querySelector("#greeting");

function paintId() {
    console.log(greeting);
    greeting.innerText = "환영합니다 " + loginInput.value + "님";
    greeting.classList.remove("hidden");
    }

function loginSubmit(event){
    event.preventDefault();
    const value = loginInput.value;
    if (value === "") {
        alert("아이디를 입력해주세요.");
    } else if (value.length < 3) {
        alert("아이디는 3자 이상 입력해주세요.");
    } else {
        alert("로그인 되었습니다.");
    }
    localStorage.setItem("username", value);
    loginForm.classList.add("hidden");
    paintId();
}

loginButton.addEventListener("click", loginSubmit);





// 할일 목록 만들고 로컬저장소에 저장


let toDos = [];

const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-input");
const toDoList = document.querySelector("#todo-list");

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "x";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

TODOS_KEY = "todos";

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    console.dir(li);
    li.remove();    
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    console.log(toDos);
    saveToDos();
}

// 필터 참고 코드
// const todos = ["Buy a new car", "Sell the old car", "Go to the gym"];
// function sexyFilter() {
//     const sexy = todos.filter((todo) => todo.includes("car"));
//     console.log(sexy);
// }
// todos.filter(sexyFilter);


// 날씨 API
function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1a9df58f9164bd6be956d65f139f576a&units=metric`;
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        weather.innerText = `<${data.weather[0].main} / ${data.main.temp}>`;
        city.innerText = data.name;
    });
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);