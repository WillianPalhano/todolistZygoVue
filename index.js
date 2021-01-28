$(document).ready(function(){
    var app = new Vue({ 
        el: '#app',
        data: {
            message: 'Hello Vue!',
            newTask: "",
            editLabel: "",
            edit: false,
            allTasks: []
        },
        methods : {
            addTask(){
                this.allTasks.push({
                    complete: false,
                    order: this.allTasks.length,
                    title: this.newTask,
                    url: ""
                })
                this.newTask = ""
                localStorage.setItem('allTasks', JSON.stringify(this.allTasks))
            },
            checkTask(task){
                var index = this.allTasks.indexOf(task);
                this.allTasks[index].complete = !this.allTasks[index].complete
                localStorage.setItem('allTasks', JSON.stringify(this.allTasks))
            },
            deleteTask(task){
                var index = this.allTasks.indexOf(task);
                this.allTasks.splice(index, 1)
                localStorage.setItem('allTasks', JSON.stringify(this.allTasks))
            },
            editTask(task){
                // var index = this.allTasks.indexOf(task);
                // this.allTasks[index].title = this.editLabel
                this.edit = false
                this.newLabel = ""
                localStorage.setItem('allTasks', JSON.stringify(this.allTasks))
            },
            getTasks () {
                axios
                .get('https://todo-backend-express.herokuapp.com/')
                .then(response => {
                    console.log(response);
                    this.allTasks = response
                })
            }
        },
        
    });
    app.methods.getTasks();
});