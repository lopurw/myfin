const openModal = (element) => {
  const modal = document.getElementById("myModal");
  const modalCard = document.getElementById("modalCard");
  const row = element.closest("tr");
  const [creditName, creditRate, creditTerm] = Array.from(row.cells).map(cell => cell.innerText);

  modalCard.innerHTML = `
    <h3>${creditName}</h3>
    <p><strong>Ставка (%):</strong> ${creditRate}</p>
    <p><strong>Срок (лет):</strong> ${creditTerm}</p>
  `;

  modal.setAttribute("data-credit-name", creditName);

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  modal.style.display = "block";
};

const closeModal = () => {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
};

document.getElementById("contactForm").addEventListener("submit", (event) => {
  const form = event.target;

  if (!form.checkValidity()) {
    event.preventDefault();
    return;
  }

  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const creditName = document.getElementById("myModal").getAttribute("data-credit-name");

  fetch("http://localhost/myfin/apply.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name: name,
      email: email,
      creditName: creditName
    })
  })
  .then(response => response.text())
  .then(responseText => {
    alert(responseText);
    closeModal();
  })
  .catch(error => console.error("Error:", error));
});

window.addEventListener("click", (event) => {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
  }
});
