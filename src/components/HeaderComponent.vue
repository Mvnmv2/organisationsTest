<script setup>

const emit = defineEmits(['onClickAdd', 'onChangeSearch'])

</script>

<template>
  <header class="mb-5">
    <div class="flex justify-between w-full">
      <input type="text"
             class="border border-zinc-300 rounded-xl py-2.5 px-4 focus:border-zinc-400 transition outline-none"
             placeholder="Найти по ФИО"
             @input="emit('onChangeSearch', $event.target.value)"/>


      <button class="border border-zinc-300 rounded-xl py-2.5 px-4 hover:bg-zinc-100 active:bg-gray-200 transition"
              @click="() => emit('onClickAdd')"
      >
        Добавить
      </button>
    </div>
  </header>
</template>