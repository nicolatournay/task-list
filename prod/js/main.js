// faire un array vide de tâches
var myTasks = [];

// faire une fonction pour afficher les tâches

function taskDisplay(tasks) {
    // vider le display
    document.getElementById("pending").innerHTML = "";
    document.getElementById("done").innerHTML = "";
    // itérer à travers l'array de tâches pour les afficher
    tasks.forEach(task => {
        var template = `
            <details data-index=${tasks.indexOf(task)}>
                <summary>${task.name} <i class="fa-solid fa-trash-can"></i></summary>
                <p>Date d'échéance : <time datetime="${task.dateline}">${task.dateline}</time></p>
                <p>${task.description}</p>
                <input type="checkbox" id="taskDone" name="taskDone" value="done">
                <label for="taskDone"> Tâche exécutée</label>
            </details>
        `;
        if (task.done) {
            document.getElementById("done").innerHTML += template;
        } else {
            document.getElementById("pending").innerHTML += template;
        }
    });
}

// un nodelist de toutes les tâches
var taskList = document.querySelectorAll('details');

// fonction pour itérer à travers la nodelist pour supprimer des tâches

function removeTask(tasks) {
    tasks.forEach(task => {
        task.querySelector("i").addEventListener('click', () => {
            // supprimer la tâche de l'array
            myTasks.splice(task.dataset.index, 1);
            // supprimer la tâche de la nodelist
            task.remove();
        });
    });
}

// appeler la fonction une première fois pour les exemples

removeTask(taskList);

// fonction pour itérer à travers la nodelist pour checker les tâches exécutée

function checkTask(tasks) {
    tasks.forEach(task => {
        task.querySelector("input").addEventListener('click', () => {
            myTasks[task.dataset.index].done = true;
            taskDisplay(myTasks);
            var taskList = document.querySelectorAll('details');
            checkTask(taskList);
            removeTask(taskList);
        });
    });
}

// appeler la fonction une première fois pour les exemples

checkTask(taskList);

// fonction pour créer un objet task et le mettre dans l'array à submit
function createTask() {
   taskName = document.getElementById("taskName").value;
   taskDate = document.getElementById("taskDate").value;
   taskDesc = document.getElementById("taskDesc").value;
   task = {
        name: taskName,
        dateline: taskDate,
        description: taskDesc,
        done: false
    }
    myTasks.push(task);
}

// appeler les fonctions sur le formulaire

var button = document.querySelector('button');

button.addEventListener("click", function() {
    // créer une tâche
    createTask();
    // empêcher le reload de la page
    event.preventDefault();
    // afficher les tâches
    taskDisplay(myTasks);
    // refaire une nodelist des tâches et y ajouter l'option de suppression et de check
    var taskList = document.querySelectorAll('details');
    removeTask(taskList);
    checkTask(taskList);
});

// fonction pour trier les objets par dates
function sortTask(tasks) {
    tasks.sort((firsttask, secondTask) => firsttask.dateline - secondTask.dateline);
    // pour les dates : https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript
}


