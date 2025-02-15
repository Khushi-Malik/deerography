async function fetchData() {
    let response = await fetch("/api/data");
    let data = await response.json();
    let list = document.getElementById("data-list");
    list.innerHTML = "";
    data.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ${item.email}`;
        list.appendChild(li);
    });
}

function loginPage() {
    window.location.href = "login.html";
}
