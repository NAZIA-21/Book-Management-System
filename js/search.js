const API_URL = "http://localhost:8081/book";

document.addEventListener("DOMContentLoaded", () => {
  // 🔵 1. Apply saved theme from localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  const body = document.getElementById("body");
  const icon = document.getElementById("themeIcon");
  const tooltip = document.getElementById("themeToggle");

  body.classList.toggle("dark-theme", savedTheme === "dark");
  body.classList.toggle("light-theme", savedTheme === "light");

  if (savedTheme === "dark") {
    icon?.classList.replace("bi-moon", "bi-sun");
    tooltip?.setAttribute("title", "Switch to Light Mode");
  } else {
    icon?.classList.replace("bi-sun", "bi-moon");
    tooltip?.setAttribute("title", "Switch to Dark Mode");
  }

  // 🔵 2. Enable Bootstrap tooltip
  tooltip && new bootstrap.Tooltip(tooltip);
});


function toggleTheme() {
  const body = document.getElementById("body");
  const icon = document.getElementById("themeIcon");
  const tooltip = document.getElementById("themeToggle");

  const isDark = body.classList.contains("dark-theme");

  body.classList.toggle("dark-theme", !isDark);
  body.classList.toggle("light-theme", isDark);

  if (!isDark) {
    icon.classList.replace("bi-moon", "bi-sun");
    tooltip.setAttribute("title", "Switch to Light Mode");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.replace("bi-sun", "bi-moon");
    tooltip.setAttribute("title", "Switch to Dark Mode");
    localStorage.setItem("theme", "light");
  }

  bootstrap.Tooltip.getInstance(tooltip)?.dispose();
  new bootstrap.Tooltip(tooltip);
}

function searchById() {
  const id = document.getElementById("searchId").value;
  if (!id) {
    alert("Please enter a book ID.");
    return;
  }

  fetch(`${API_URL}/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Book not found.");
      return res.json();
    })
    .then(book => displayBooks([book]))
    .catch(err => displayError(err.message));
}

function searchByGenre() {
  const genre = document.getElementById("searchGenre").value;
  if (!genre) {
    alert("Please enter a genre.");
    return;
  }

  fetch(`${API_URL}/genre?genre=${genre}`)
    .then(res => {
      if (!res.ok) throw new Error("No books found.");
      return res.json();
    })
    .then(books => displayBooks(books))
    .catch(err => displayError(err.message));
}

function displayBooks(books) {
  const result = document.getElementById("result");
  result.innerHTML = "";

  if (books.length === 0) {
    result.innerHTML = "<p class='text-danger'>No books found.</p>";
    return;
  }

  books.forEach(book => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${book.title} <span class="badge bg-secondary">ID: ${book.bookId}</span></h5>
          <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
          <p class="card-text">
            Year: ${book.publicationYear}<br>
            Genre: ${book.genre}<br>
            Available: ${book.available ? "Yes" : "No"}
          </p>
        </div>
      </div>
    `;
    result.appendChild(col);
  });
}

function displayError(message) {
  const result = document.getElementById("result");
  result.innerHTML = `<p class="text-danger">${message}</p>`;
}
