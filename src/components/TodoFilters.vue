<template>
    <div class="fitler-buttons">
        <button type="button"
            v-for="button in filter_buttons"
            :key="button.id"
            :class="{ active: button.active}"
            @click="filter_todos(button)"
        >
            {{ button.title }}
        </button>
    </div>
</template>

<script>
export default{
    name: 'todo-filters',
    props:{
        todo_items: {}
    },
    data() {
        return {
            filter_buttons: [
                { id: 1, title: 'all', active: true },
                { id: 2, title: 'active', active: false },
                { id: 3, title: 'completed', active: false }
            ]
        }
    },
    computed:{
        current_filter() {
            return this.filter_buttons.filter(filtered => filtered.active)
        },
    },
    methods: {
        // Filter Todos
        filter_todos(filter){
            this.filter_buttons.forEach(value => {
                value.active = false;
            });
            this.filter_buttons[filter.id - 1].active = true

            if(this.current_filter[0].title == 'active'){
                this.active_todos();
            } else if(this.current_filter[0].title == 'completed'){
                this.completed_todos();
            } else {
                this.$emit('filtered_todos', '')
            }
        },
        active_todos(){
            // let todos = this.todo_items.filter((todo) => {
            //     return todo.completed == false;
            // });
            this.$emit('active_todos_filter')
        },
        completed_todos(){
            // let todos = this.todo_items.filter((todo) => {
            //     return todo.completed == true;
            // });
            this.$emit('completed_todos_filter')

        }
    }
}
</script>
