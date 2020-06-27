<template>
    <div class="todo-input">
        <form @submit.prevent="add_todo">
            <div class="form-group">
                <input type="text" v-model="todo_input" placeholder="Please Enter Todo...">
            </div>
        </form>
    </div>
</template>

<script>
export default{
    name: 'todo-input',
    data(){
        return {
            todo_input: ''
        }
    },
    methods: {
        add_todo(){
            this.$emit('addTodo', this.todo_input);
            this.todo_input = '';
        }
    }
}
</script>
