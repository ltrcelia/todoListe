// Interface Utilisateur :

// Créez une interface avec un champ de texte pour entrer une nouvelle tâche et un bouton pour ajouter la tâche à la liste.

// Affichez une liste de tâches sous le champ de texte. Chaque tâche doit avoir une case à cocher pour marquer la tâche comme complète et un bouton pour supprimer la tâche.

// Les tâches complètes doivent être affichées différemment des tâches non complètes (par exemple, en utilisant une couleur différente ou une coche).

//

// Fonctionnalités :

// Ajouter une tâche : Lorsque l'utilisateur entre une tâche dans le champ de texte et clique sur le bouton "Ajouter" (ou appuie sur Entrée), la tâche doit être ajoutée à la liste et stockée localement dans le navigateur.

// Marquer comme complète : Lorsqu'une tâche est marquée comme complète, elle doit être affichée comme telle et la modification doit être sauvegardée dans le stockage local.

// Supprimer une tâche : L'utilisateur doit pouvoir supprimer une tâche de la liste, et cette suppression doit être reflétée dans le stockage local.

// Sauvegarde et Chargement : Les tâches doivent être sauvegardées dans le stockage local (localStorage) du navigateur afin que, lorsqu'une nouvelle visite ou un rechargement de la page se produit, la liste des tâches soit récupérée et affichée correctement.

//

// Stockage Local :

// Utilisez le stockage local (localStorage) pour sauvegarder les tâches. Lorsque l'application est chargée, récupérez les tâches stockées et affichez-les dans la liste.

// Lorsque l'utilisateur ajoute, marque ou supprime une tâche, mettez à jour le stockage local en conséquence.

//

// Bonus (optionnel) :

// Ajoutez une fonctionnalité pour éditer une tâche existante.

// Implémentez une option pour filtrer les tâches (par exemple, toutes les tâches, uniquement les tâches complètes, uniquement les tâches non complètes).
const form = document.querySelector(".form");
const todoText = document.getElementById("todo-text");
const todoUl = document.getElementById("todo-ul");
const filterAll = document.getElementById("all");
const filterCompleted = document.getElementById("completed");
const filterIncomplete = document.getElementById("incomplete");

function saveTasks() {
  const tasks = Array.from(todoUl.children).map((li) => ({
    text: li.querySelector("span").textContent,
    checked: li.querySelector('input[type="checkbox"]').checked,
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const todoListe = document.createElement("li");
    todoListe.innerHTML = `
      <input type="checkbox" class="todo-check" ${
        task.checked ? "checked" : ""
      }>
      <span class="${task.checked ? "completed" : ""}">${task.text}</span>
      <button class="btn-edit">Edit</button>
      <button class="btn-delete">X</button>`;
    todoUl.appendChild(todoListe);
  });
}

function filterTasks(filter) {
  Array.from(todoUl.children).forEach((li) => {
    const isChecked = li.querySelector('input[type="checkbox"]').checked;
    if (filter === "all") {
      li.classList.remove("hidden");
    } else if (filter === "completed" && !isChecked) {
      li.classList.add("hidden");
    } else if (filter === "incomplete" && isChecked) {
      li.classList.add("hidden");
    } else {
      li.classList.remove("hidden");
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (todoText.value.trim() === "") return; // Ne rien faire si le champ est vide

  const todoListe = document.createElement("li");
  todoListe.innerHTML = `
    <input type="checkbox" class="todo-check">
    <span>${todoText.value}</span>
    <button class="btn-edit">Edit</button>
    <button class="btn-delete">X</button>`;
  todoText.value = "";
  todoUl.appendChild(todoListe);
  saveTasks(); // Sauvegarder les tâches après ajout
});

todoUl.addEventListener("change", (e) => {
  if (e.target.classList.contains("todo-check")) {
    const span = e.target.nextElementSibling;
    if (e.target.checked) {
      span.classList.add("completed");
    } else {
      span.classList.remove("completed");
    }
    saveTasks(); // Mettre à jour localStorage après changement de statut
  }
});

todoUl.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    e.target.parentElement.remove();
    saveTasks(); // Mettre à jour localStorage après suppression
  } else if (e.target.classList.contains("btn-edit")) {
    const span = e.target.previousElementSibling;
    const newText = prompt("Edit your task:", span.textContent);
    if (newText !== null) {
      span.textContent = newText;
      saveTasks(); // Mettre à jour localStorage après édition
    }
  }
});

filterAll.addEventListener("click", () => filterTasks("all"));
filterCompleted.addEventListener("click", () => filterTasks("completed"));
filterIncomplete.addEventListener("click", () => filterTasks("incomplete"));

document.addEventListener("DOMContentLoaded", loadTasks);
