<template>
  <div class="FireTodo">
    <div class="title has-text-centered">
      FireTodo
    </div>

    <form @submit.prevent="addTodo">
  
      <div class="field has-addons mb-5 pl-6 pt-5">
        <div class="control">
          <input
          v-model="newTodoContent" 
          class="input" type="text" placeholder="Add a todo">
        </div>
        <div class="control">
          <button
          :disabled="!newTodoContent" 
          class="button is-info">
            Add
          </button>
        </div>
      </div>
    </form>
      <div
      v-for="todo in todos" 
      class="card mb-5">
        <div class="card-content">
          <div class="content">

            <div class="columns is-mobile is-vcentered">
              <div class="column">
                {{ todo.content }}
              </div>
              <div class="column is-5 has-text-right">
                <button class="button is-light">
                  &check;
                </button>
                <button
                @click="deleteTodo(todo.id)" 
                class="button is-danger ml-2">
                  &cross;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    
  </div>

</template>

<script setup>
//Imports
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

//Todos

const todos = ref([
  // {
  //   id: 'id1',
  //   content: 'Todo1',
  //   done: false
  // },

  // {
  //   id: 'id2',
  //   content: 'Todo2',
  //   done: false
  // }
])

//add todo

const newTodoContent = ref('');

const addTodo = () => {
  const newTodo = {
    id: uuidv4(),
    content: newTodoContent.value,
    done: false
  }
  
  todos.value.unshift(newTodo)
  newTodoContent.value = ''
}

const deleteTodo = id => {

  //This means filtering out the ID you don't want
  //todos.value = todos.value.filter(todo => todo.id !== id)

  //This means deleting the chosen todo
  const removeTodo = todos.value.find(todo => todo.id == id)
  todos.value = todos.value.filter(todo => todo !== removeTodo)
}

</script>

<style>
@import 'bulma/css/bulma.css';

.FireTodo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>