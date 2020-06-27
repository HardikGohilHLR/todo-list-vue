import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [
            {
                id: 1,
                title: 'learn vue.js',
                completed: false,
                editable: false
            },
            {
                id: 2,
                title: 'learn javascript',
                completed: true,
                editable: false
            },
            {
                id: 3,
                title: 'take udemy course',
                completed: false,
                editable: false
            },
            {
                id: 4,
                title: 'Javascript course',
                completed: false,
                editable: false
            },
            {
                id: 5,
                title: 'jQuery course',
                completed: false,
                editable: false
            }
        ]
    },
    mutations: {
        // Add todo
        addTodo(state, todo){
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editable: false
            });
        },
        // Update todo
        updateTodo(state, todo){
            let index = state.todos.findIndex(item => {
                return item.id == todo.id;
            });

            state.todos.splice(index, 1, {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editable: false
            });
        },
        // Delete Todo
        deleteTodo(state, id){
            let index = state.todos.findIndex(todo => {
                return todo.id === id;
            });
            state.todos.splice(index, 1);
        },

        // Check All todos
        checkAllTodos(state){
            state.todos.forEach(todo => {
                todo.completed = event.target.checked;
            });
        },

        dragTodos(state, todos) {
            state.todos = todos;
        }


    },
    actions: {

    },
    modules: {

    }
})
