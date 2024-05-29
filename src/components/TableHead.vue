<script setup>
defineProps({
  sortByTitle: Boolean,
  sortByName: Boolean,
})
const emit = defineEmits(['sortTitle', 'sortName'])
</script>


<template>
  <thead>
  <tr class="border-b-2 grid grid-cols-td">
    <th class="py-2 cursor-pointer font-medium"
        @click="emit('sortTitle')">Название
      <img class="w-4 ml-0.5 inline-block"
           :class="[sortByTitle ? 'imgSortAsc' : 'imgSortDesc']"
           src="../assets/img/arrow.svg"
           alt="arrow icon"/>
    </th>
    <th class="py-2 cursor-pointer font-medium"
        @click="emit('sortName')">ФИО директора
      <img class="w-4 ml-0.5 inline-block"
           :class="[sortByName ? 'imgSortAsc' : 'imgSortDesc']"
           src="../assets/img/arrow.svg" alt="arrow icon">
    </th>
    <th class="py-2 font-medium">Номер телефона</th>
    <th></th>
  </tr>
  </thead>

</template>

<style scoped>
.imgSortAsc {
  transform: rotate(0deg);
  transition: transform .2s;
}

.imgSortDesc {
  transform: rotate(180deg);
  transition: transform .2s;
}
</style>
