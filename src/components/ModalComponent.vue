<script setup>
import {reactive, computed} from "vue";

const props = defineProps({
  showModal: Boolean
})

const emit = defineEmits(['onClickCancel', 'addItem'])

const obj = reactive({
  title: '',
  phone: '',
  chefName: ''
})

const isDisabled = computed(() => {
  return !obj.title || !obj.phone || !obj.chefName
})


</script>

<template>
  <div class="absolute left-0 top-0  w-full h-full bg-neutral-950/60 flex justify-center items-center"
       v-if="props.showModal">
    <div class="bg-white p-8 rounded-xl w-96">
      <h2 class="text-xl mb-4">Добавить организацию</h2>
      <div class="flex flex-col gap-2 mb-5">
        <input class="px-6 py-3 border rounded-md outline-none focus:border-zinc-300" type="text"
               placeholder="Название" v-model="obj.title">
        <input class="px-6 py-3 border rounded-md outline-none focus:border-zinc-300" type="text"
               placeholder="Номер телефона" v-model="obj.phone">
        <input class="px-6 py-3 border rounded-md outline-none focus:border-zinc-300" type="text"
               placeholder="ФИО директора" v-model="obj.chefName">
      </div>
      <div class="flex justify-between">

        <button class="border px-3.5 py-1.5 rounded-md hover:bg-zinc-100 active:bg-gray-200"
        @click="emit('onClickCancel', obj)">Отмена</button>

        <button class="border px-3.5 py-1.5 rounded-md enabled:hover:bg-zinc-100 enabled:active:bg-gray-200"
                v-bind:disabled="isDisabled"
                @click="emit('addItem', obj)">OK
        </button>
      </div>
    </div>
  </div>
</template>