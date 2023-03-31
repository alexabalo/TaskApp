document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const task = {
        title,
        description,
    };

    //para poder almacenar datos en el navegador, sin necesidad de un server primero se utiliza el localstorage, despues se debe usar el metodo setItem, que es para que que almacenemos el dato pero necesitamos darle dos parametros, el primero el nombre de como vamos a utilizar esos datos, y el valor de esos datos es decir lo que voy a almacenar, por otro lado para convertir un dato en string, hay que poner (json.stringify, y el nombre de la tarea)
    //localStorage.setItem('tasks', JSON.stringify(task));

    //para obtener el nombre del dato que queremos obtener se usa getitem y solo se pone un solo parametro que es el nombre del parametro que se quiere obtener
    //localStorage.getItem()

    //para obtener el dato del localstorage en forma de objeto y no de string hay que utlizar el metodo json.parse
    //console.log(JSON.parse(localStorage.getItem('tasks')))
    
    //si no existe ninguna tarea quiero que me la agregue con el metodo push
    if(localStorage.getItem('tasks') === null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        //para actualizar tareas o eliminarlas se utiliza el metodo parse para obtener la informacion del objeto y el metodo push para poder agregarlas o modificarlas
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

    }

    getTasks();
    
    //lo que hace esto es resetear el formulario
    form.reset();

    e.preventDefault();


}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += `<div class="card">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')" >Delete</a>
            </div>
        </div>`
    }
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title == title) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks(); 

}
getTasks();

