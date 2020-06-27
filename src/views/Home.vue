<template>
<div class="todo-list-container">
    <div class="container">
        <!-- Header Img -->
        <div class="header-img">
            <img src="../assets/logo.png" alt="">
        </div>
        <!-- Todo Input Component -->
        <todo-input @addTodo="add_todo" />
        <!-- / Todo Input Component -->

        <!-- Todo List Component -->

        <draggable v-model="filtered_todos" class="todo-list-wpr" draggable=".to_item" @end="todo_drag">
            <div v-for="todo in filtered_todos" :key="todo.id"  :class="{ to_item: !todo.completed }">
                <todo-item :todo="todo" @edit_todo="updateTodo" @partTodos="partTodos()" />
            </div>
        </draggable>
        <!-- / Todo List Component -->

        <!-- Todo Actions -->
        <div class="todo-actions">
            <todo-actions />
        </div>
        <!-- / Todo Actions -->

        <!-- Todo Filter -->
        <div class="todo-filters">
            <todo-filters @filtered_todos="filteredTodos" @completed_todos_filter="completedTodos" @active_todos_filter="activeTodos" :todo_items="this.todo_items" />
        </div>

        <!-- / Todo Filter -->

    </div>
</div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
import TodoInput from '@/components/TodoInput.vue';
import TodoActions from '@/components/TodoActions.vue';
import TodoFilters from '@/components/TodoFilters.vue';
import draggable from "vuedraggable";

import store from '@/store';
export default {
    name: 'Home',
    components: {
        TodoItem,
        TodoInput,
        TodoActions,
        TodoFilters,
        draggable
    },
    data() {
        return {
            todo_items: [],
            filtered_todos: [],
        }
    },
    created() {
        this.todo_items = store.state.todos;
        this.filtered_todos = this.todo_items;

        this.filtered_todos = this.filtered_todos.sort((x, y) => {
            return Number(x.completed) - Number(y.completed);
        });
    },
    methods: {
        // Add Todo
        add_todo(todo_input_val) {
            let index = this.todo_items[this.todo_items.length - 1].id;
            if (todo_input_val !== '') {
                this.$store.commit('addTodo', {
                    id: index + 1,
                    title: todo_input_val,
                    completed: false,
                    editable: false
                });
            }
        },
        todo_drag(){
            let todos = this.filtered_todos;
            console.log(todos);
            this.$store.commit('dragTodos', todos);
            this.todo_items = store.state.todos;
        },
        //  Edit todo
        updateTodo(todo) {
            this.$store.commit('updateTodo', todo);
        },

        partTodos(){
            this.filtered_todos = this.filtered_todos.sort((x, y) => {
                return Number(x.completed) - Number(y.completed);
            });
        },

        // Filter Todos
        filteredTodos() {
            this.filtered_todos = this.todo_items;
        },
        activeTodos() {
            // this.filtered_todos = todos;
            this.filtered_todos = this.filtered_todos.filter((todo) => {
                return todo.completed == false;
            });
        },
        completedTodos() {
            // this.filtered_todos = todos;
            this.filtered_todos = this.filtered_todos.filter((todo) => {
                return todo.completed == true;
            });
        }
    }
}
</script>
