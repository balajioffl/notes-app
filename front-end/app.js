let api = "http://localhost:3000/notes";
let editId = null;

  $("#add-note").click(function () {
    if (editId) {
      updateNote();
    } else {
      addNote();
    }
  });
  getNotes();

function getNotes() {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      $("#notes-container").empty();
      data.forEach((note) => display(note));
    })
    .catch((error) => console.error("Error:", error));
}

function addNote() {
  let title = $("#title").val().trim();
  let description = $("#description").val().trim();
  let timestamp = new Date().toLocaleString();

  if (title === "" || description === "") {
    alert("Please enter both title and description");
    return;
  }

  let newNote = { title, description, timestamp };

  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote),
  })
    .then((response) => response.json())
    .then((data) => {
      display(data);
      $("#title, #description").val("");
    })
    .catch((error) => console.error("Error:", error));
}

function display(note) {
  let noteDiv = $('<div class="note"></div>');

  let title = $("<h3></h3>").text(note.title);
  let desc = $("<p></p>").text(note.description);
  let timestamp = $("<small></small>").text(`Added on: ${note.timestamp}`);

  let edit = $('<button class="edit-btn">Edit</button>').click(function () {
    editNote(note);
  });

  let del = $("<button>Delete</button>").click(function () {
    deleteNote(note.id, noteDiv);
  });

  noteDiv.append(title, desc, timestamp, edit, del);
  $("#notes-container").append(noteDiv);
}

function deleteNote(id, noteDiv) {
  fetch(`${api}/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      noteDiv.remove();
    })
    .catch((error) => console.error("Error:", error));
}

function editNote(note) {
  $("#title").val(note.title);
  $("#description").val(note.description);
  editId = note.id;
}

function updateNote() {
  let title = $("#title").val().trim();
  let description = $("#description").val().trim();
  let timestamp = new Date().toLocaleString();

  if (title === "" || description === "") {
    alert("Please enter both title and description");
    return;
  }

  let updatedNote = { title, description, timestamp };

  fetch(`${api}/${editId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedNote),
  })
    .then((response) => response.json())
    .then(() => {
      getNotes();
      $("#title, #description").val("");
      editId = null;
    })
    .catch((error) => console.error("Error:", error));
}

// let api = "http://localhost:3000/notes";

// document.querySelector("#add-note").addEventListener("click", function() {
//     addNote();
// });

// function getNotes() {
//     fetch(api)
//         .then(response => response.json())
//         .then((data) => {
//             console.log(data);
//             data.forEach(note => display(note));
//         })
//         .catch(error => console.error('Error:', error));
// }

// function addNote() {
//     let title = document.querySelector("#title").value.trim();
//     let description = document.querySelector("#description").value.trim();

//     if (title === "" || description === "") {
//         alert("Please enter both title and description");
//         return;
//     }

//     let newNote = {
//         title: title,
//         description: description
//     };

//     fetch(api, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newNote)
//     })
//     .then(response => response.json())
//     .then(data => {
//         display(data);
//         document.querySelector("#title").value = "";
//         document.querySelector("#description").value = "";
//     })
//     .catch(error => console.error('Error:', error));
// }

// function display(note) {
//     let form = document.querySelector('#form-detail');

//     let newNotes = document.createElement('div');
//     newNotes.classList.add('new-notes');

//     let title = document.createElement('h3');
//     title.style.textTransform = "uppercase";
//     title.textContent = note.title;

//     let desc = document.createElement('p');
//     desc.textContent = note.description;

//     let edit = document.createElement('button');
//     edit.classList.add('button');
//     edit.innerText = "Edit";

//     let del = document.createElement('button');
//     del.classList.add('button');
//     del.innerText = "Delete";
//     del.addEventListener("click", function() {
//         deleteNote(note.id, newNotes);
//     });

//     newNotes.appendChild(title);
//     newNotes.appendChild(desc);
//     newNotes.appendChild(edit);
//     newNotes.appendChild(del);

//     form.append(newNotes);
// }

// function deleteNote(id, del) {
//     fetch(`${api}/${id}`,
//     {
//         method: "DELETE"
//     })
//     .then(() => {
//         del.remove();
//     })
//     .catch(error => console.error('Error:', error));
// }
// getNotes();
