const socket = io("http://localhost:5000/");
var cod;
socket.on("code", code => {
    document.querySelector("#code").innerHTML = `Connect Code: &nbsp; ${code}`;
    cod = code;
    socket.emit("join", code);
});

const inputElement = document.getElementById("file-input");
const formElement = document.getElementById("frm");
var fileList = [],
    fileNameList = [];
const fileElement = document.querySelector("#filelist");

function removeElement(elementId) {
    for (let t = 0; t < 2; ++t) {
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }
}

inputElement.addEventListener("change", e => {
    fileList = [];
    for (var t = 0; t < inputElement.files.length; ++t) {
        fileList.push(inputElement.files[t]);
        fileNameList.push(inputElement.files[t].name);

        const btn = document.createElement("button");
        btn.id = t;
        btn.innerHTML = "Remove";
        btn.addEventListener("click", e => {
            removeElement(e.target.id);
            fileList = fileList.filter((list, id) => id != e.target.id);
            fileNameList = fileNameList.filter((list, id) => id != e.target.id);
        });

        const name = document.createElement("h2");
        name.id = t;
        name.innerHTML = inputElement.files[t].name;
        fileElement.appendChild(name);
        fileElement.appendChild(btn);
    }
});

formElement.addEventListener("submit", e => {
    e.preventDefault();
    socket.emit("handle-files", { fileList, cod, fileNameList });
});
