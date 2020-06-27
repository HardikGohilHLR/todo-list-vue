<template>
    <div class="todo-item" :class="{ completed: todo.completed }">
        <!-- Drag -->
        <div class="drag-todo">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="todo-checked">
            <div class="checkbox-group">
                <input type="checkbox" :id="'todo'+todo.id" @change="completed_todo(todo)" :checked="todo.completed">
                <label :for="'todo'+todo.id"></label>
            </div>
        </div>
        <div class="todo-desc" :class="{ editing: todo.editable }">
            <h3 @dblclick="editable_todo(todo)">{{ todo.title }}</h3>
            <div class="edit-todo">
                <input type="text" v-model="todo.title" @keyup.esc="cancel_edit(todo)" @blur="todo_blur(todo)" @keyup.enter="edit_todo(todo)" v-focus>
            </div>
            <button type="button" @click="delete_todo(todo.id)">&times;</button>
        </div>
    </div>
</template>

<script>
export default{
    name: 'todo-item',
    props: {
        todo: {},
    },
    data(){
        return{
            todo_title: '',
        }
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },
    methods:{
        // Delete Todo
        delete_todo(id) {
            this.$store.commit('deleteTodo', id);
        },

        //  Edit todo
        edit_todo(todo){
            todo.editable = false;
            this.$emit('updateTodo', todo);
        },

        // On Edit
        editable_todo(todo){
            todo.editable = true;
            this.todo_title = todo.title;
        },

        // On Escape
        cancel_edit(todo){
            todo.title = this.todo_title;
            todo.editable = false;
        },
        todo_blur(todo){
            todo.editable = false;
        },
        completed_todo(todo){
            todo.completed = !todo.completed;

            this.$emit('partTodos');
        },
    }
}
</script>
