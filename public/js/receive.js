var zip = new JSZip();
function SaveAsFile(t, f, m) {
    try {
        var b = new Blob([t], { type: m });
        saveAs(b, f);
    } catch (e) {
        window.open("data:" + m + "," + encodeURIComponent(t), "_blank", "");
    }
}

const list = document.querySelector("#file-list");
const socket = io("https://turboshare.herokuapp.com/");
document.querySelector("#frm").addEventListener("submit", e => {
    e.preventDefault();
    let room = document.querySelector("#room").value;
    socket.emit("join-rec", room);
});

socket.on("joined", room => {
    if (room === "Connection not available")
        document.querySelector("#code").innerHTML = `${room}`;
    else document.querySelector("#code").innerHTML = `Joined ${room}`;
});

socket.on("receive", data => {
    const fileElement = document.querySelector("#file-list");
    data.map(file => {
        zip.file(file.name, file.buffer, { binary: true });
        const node = document.createElement("h3");
        const link = document.createElement("button");
        link.innerHTML = "Download";
        node.innerHTML = file.name;
        fileElement.appendChild(node);
        fileElement.appendChild(link);
        link.onclick = function() {
            SaveAsFile(file.buffer, file.name);
        };
    });
});

const dwnall = document.querySelector("#dwnall");
dwnall.addEventListener("click", () => {
    zip.generateAsync({ type: "blob" }).then(function(content) {
        saveAs(content, "Archive.zip");
    });
});
