
    var tasks = [];

    function addTask() {
      var taskInput = document.getElementById("taskInput").value.trim();
      var dueDate = document.getElementById("dueDate").value;

      if (taskInput !== "" && dueDate !== "") {
        var newTask = {
          description: taskInput,
          dueDate: dueDate,
          completed: false
        };
        tasks.push(newTask);
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        displayTasks();
        document.getElementById("taskInput").value = "";
        document.getElementById("dueDate").value = "";
      } else {
        alert("Please enter a task and due date.");
      }
    }

    function toggleCompletion(index) {
      tasks[index].completed = !tasks[index].completed;
      displayTasks();
    }

    function editTask(index) {
      var newDescription = prompt("Edit task description:", tasks[index].description);
      if (newDescription !== null) {
        tasks[index].description = newDescription;
        displayTasks();
      }
    }

    function deleteTask(index) {
      var confirmation = confirm("Are you sure you want to delete this task?");
      if (confirmation) {
        tasks.splice(index, 1);
        displayTasks();
      }
    }

    function showPendingTasks() {
      var pendingTasks = tasks.filter(task => !task.completed);
      displayFilteredTasks(pendingTasks);
    }

    function showCompletedTasks() {
      var completedTasks = tasks.filter(task => task.completed);
      displayFilteredTasks(completedTasks);
    }

    function displayFilteredTasks(filteredTasks) {
      var taskList = document.getElementById("taskList");
      taskList.innerHTML = "";

      filteredTasks.forEach((task, index) => {
        var newRow = taskList.insertRow();
        var cell1 = newRow.insertCell(0);
        cell1.textContent = task.description;
        var cell2 = newRow.insertCell(1);
        cell2.textContent = task.dueDate;
        var cell3 = newRow.insertCell(2);
        cell3.textContent = task.completed ? "Completed" : "Pending";
        var cell4 = newRow.insertCell(3);
        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
          editTask(tasks.indexOf(task));
        };
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
          deleteTask(tasks.indexOf(task));
        };
        var statusButton = document.createElement("button");
        statusButton.textContent = task.completed ? "Pending" : "Complete";
        statusButton.onclick = function() {
          toggleCompletion(tasks.indexOf(task));
        };
        cell4.appendChild(editButton);
        cell4.appendChild(deleteButton);
        cell4.appendChild(statusButton);
      });
    }

    function displayTasks() {
      displayFilteredTasks(tasks);
    }
  