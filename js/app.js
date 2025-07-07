const API_URL = 'http://localhost:8081/book';

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

  // 🔵 2. Initialize tooltip (if it exists)
  tooltip && new bootstrap.Tooltip(tooltip);

  // 🔵 3. Load books (your original logic)
  loadBooks();
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


function loadBooks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const bookList = document.getElementById('bookList');
      bookList.innerHTML = '';

      // ✅ Wrap all book cards inside a row with gutter spacing
      const row = document.createElement('div');
      row.className = 'row g-4'; // g-4 = Bootstrap gutter spacing

      data.forEach(book => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
          <div class="card shadow-sm h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">
                ${book.title} <span class="badge bg-secondary">ID: ${book.bookId}</span>
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
              <p class="card-text mt-auto">
                Year: ${book.publicationYear}<br>
                Genre: ${book.genre}<br>
                Available: ${book.available ? 'Yes' : 'No'}
              </p>
              <button class="btn btn-danger w-100 mt-3" onclick="deleteBook(${book.bookId})">🗑️ Delete</button>
            </div>
          </div>
        `;
        row.appendChild(col);
      });

      bookList.appendChild(row); // ✅ Append row to bookList
    })
    .catch(error => console.error('Error loading books:', error));
}

// Save new book
function saveBook() {
  const book = collectBookForm();
  if (!book) return;

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  })
    .then(res => res.json())
    .then(data => {
      console.log("✅ Book saved:", data);
      resetForm();
      loadBooks();
    })
    .catch(err => console.error("❌ Save error:", err));
}

// Update existing book
function updateBook() {
  const bookId = document.getElementById('bookId').value;
  if (!bookId) {
    alert("Please enter Book ID to update.");
    return;
  }

  const book = collectBookForm();
  if (!book) return;

  fetch(`${API_URL}/${bookId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  })
    .then(res => res.json())
    .then(data => {
      console.log("✅ Book updated:", data);
      resetForm();
      loadBooks();
    })
    .catch(err => console.error("❌ Update error:", err));
}

// Delete book
function deleteBook(bookId) {
  fetch(`${API_URL}/${bookId}`, {
    method: 'DELETE'
  })
    .then(() => loadBooks())
    .catch(err => console.error("❌ Delete failed:", err));
}

// Collect form values
function collectBookForm() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const genre = document.getElementById('genre').value;
  const available = document.getElementById('available').value;

  if (!title || !author || !year || !genre || available === "") {
    alert("⚠️ Please fill all fields.");
    return null;
  }

  return {
    title,
    author,
    publicationYear: parseInt(year),
    genre,
    available: available === "true"
  };
}

function searchBookById(bookId) {
  fetch(`${API_URL}/${bookId}`)
    .then(res => res.json())
    .then(book => {
      alert(`Title: ${book.title}\nAuthor: ${book.author}\nGenre: ${book.genre}`);
    })
    .catch(() => alert("❌ Book not found!"));
}

function searchBooksByGenre(genre) {
  fetch(`${API_URL}/genre?genre=${encodeURIComponent(genre)}`)
    .then(res => res.json())
    .then(books => {
      console.log("Books in genre:", genre, books);
      // You could update UI here to display those books
    })
    .catch(() => alert("❌ No books found for this genre."));
}

// Reset form
function resetForm() {
  document.getElementById('bookForm').reset();
  document.getElementById('bookId').value = '';
}
