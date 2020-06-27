<template>
    <div class="check-all-todos">
        <div class="checkbox-group">
            <input type="checkbox" id="checkAll" name="check" @change="check_all_todos()" :checked="remaining == 0">
            <label for="checkAll">Check All</label>
        </div>
        <div class="todo-left">
            <p>{{ remaining }} Todo{{remaining > 1 ? 's' : ''}} Remaining </p>
        </div>
    </div>
</template>


<script>
import store from '@/store';
export default{
    name: 'todo-actions',
    computed:{
        remaining() {
            return store.state.todos.filter(todo => !todo.completed).length
        },
    },
    methods: {
        check_all_todos(){
            this.$store.commit('checkAllTodos');
        },
    }
}
</script>
