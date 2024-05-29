<script setup>
import {onMounted, ref, watch, computed} from "vue";
import Modal from "@/components/ModalComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import TableHead from "@/components/TableHead.vue";

const items = ref([
  {
    id: 1,
    subTitle: "АО",
    title: "\"Вектор\"",
    phone: "+7 000 123 45 67",
    chefName: "Иванов И.И."
  },
  {
    id: 2,
    subTitle: "ООО",
    title: "\"ЮВЕЛИТ\"",
    phone: "+7 915 856 12 50",
    chefName: "Кнутов T.И."
  },
  {
    id: 3,
    subTitle: "ООО",
    title: "\"ДОРМОСТРОЙ\"",
    phone: "+7 960 015 07 17",
    chefName: "Зерцалов Ю.В."
  }, {
    id: 4,
    subTitle: "ООО",
    title: "\"МИР ХОЛОДА\"",
    phone: "+7 123 015 02 67",
    chefName: "Мусинов Д.И."
  },
  {
    id: 5,
    subTitle: "ООО",
    title: "\"СИНТЕК\"",
    phone: "+7 915 856 12 50",
    chefName: "Кнутов T.И."
  },
  {
    id: 6,
    subTitle: "ООО",
    title: "\"ЭЛИТА\"",
    phone: "+7 87 015 07 17",
    chefName: "Снегова О.А."
  },
  {
    id: 7,
    subTitle: "ООО",
    title: "\"СУДИСЛАВСКИЙ ЗАВОД СВАРОЧНЫХ МАТЕРИАЛОВ\"",
    phone: "+7 15 58 26 17",
    chefName: "Кукушкин А.А."
  },
  {
    id: 8,
    subTitle: "ООО",
    title: "\"ППО\"ОРБИТА\"",
    phone: "+7 100 02 65 22",
    chefName: "Чекшезеров Е.В."
  },
  {
    id: 9,
    subTitle: "ООО",
    title: "\"МЕГАМАРТ\"",
    phone: "+7 950 120 02 16",
    chefName: "Пучков Д.А."
  },
  {
    id: 10,
    subTitle: "ООО",
    title: "\"ВОЛЖАНКА\"",
    phone: "+7 159 858 02 03",
    chefName: "Курман Д.В."
  },
  {
    id: 11,
    subTitle: "ООО",
    title: "\"ЮВЕЛИРНЫЙ ЗАВОД \"АКВАМАРИН\"",
    phone: "+7 917 057 16 10",
    chefName: "Новиков С.М."
  }])

const searchItems = ref([])

const pageNumber = ref(0)
const size = ref(5)

const showModal = ref(false)

const searchQuery = ref('')

const sortByTitle = ref(false)
const sortByName = ref(false)

const onClickAdd = () => {
  showModal.value = true
}

const clearItem = (item) => {
  item.title = '';
  item.phone = '';
  item.chefName = '';
}

const onClickCancel = (item) => {
  showModal.value = false
  clearItem(item)
}

const addItem = (item) => {

  let lastId;

  if (!items.value.length) {
    lastId = 1
  } else {
    lastId = items.value[items.value.length - 1].id + 1
  }

  const newItem = {
    id: lastId,
    title: item.title,
    phone: item.phone,
    chefName: item.chefName
  }

  items.value.push(newItem)
  searchItems.value = [...items.value]
  showModal.value = false;

  clearItem(item);
}

const removeItem = (item) => {
  items.value = items.value.filter((obj) => obj.id !== item.id)
  searchItems.value = searchItems.value.filter((obj) => obj.id !== item.id)


  console.log(items.value)
  console.log(searchItems.value)
}

const onChangeSearch = (value) => {
  searchQuery.value = value
  items.value = searchItems.value.filter((obj) => obj.chefName.toLowerCase().includes(searchQuery.value.toLowerCase()))
}

const sortFunction = (param, value) => {
  if (value) {
    PaginateItems.value.sort((item1, item2) => item1[param]?.localeCompare(item2[param]))
  } else {
    PaginateItems.value.sort((item1, item2) => item2[param]?.localeCompare(item1[param]))
  }
}

const sortTitle = () => {
  sortFunction('title', sortByTitle.value)
  sortByTitle.value = !sortByTitle.value
}

const sortName = () => {
  sortFunction('chefName', sortByName.value)
  sortByName.value = !sortByName.value
}

watch(searchQuery, onChangeSearch)

onMounted(() => {
  searchItems.value = items.value
})

const nextPage = () => {
  pageNumber.value++;
}
const prevPage = () => {
  pageNumber.value--;
}

const pageCount = computed(() => {
  let l = items.value.length;
  let s = size.value;
  return Math.ceil(l / s);
})

const PaginateItems = computed(() => {
  const start = pageNumber.value * size.value;
  const end = start + size.value;

  return items.value.slice(start, end);
})

</script>

<template>

  <Modal :show-modal="showModal" @on-click-cancel="onClickCancel" @add-item="addItem"/>

  <div class="flex flex-col mt-20 mx-auto max-w-screen-lg ">

    <h1 class="text-lg mb-5">Справочник организаций</h1>

    <Header @on-click-add="onClickAdd" @on-change-search="onChangeSearch"/>

    <main class="h-80 flex flex-col justify-between">

      <table class="w-full">

        <TableHead :sortByTitle="sortByTitle" :sortByName="sortByName" @sort-title="sortTitle" @sort-name="sortName"/>

        <tbody>
        <tr class="text-center border-b grid grid-cols-td items-center"
            v-for="item in PaginateItems" :key="item.id">
          <td class="py-2">{{ item.subTitle }} {{ item.title }}</td>
          <td class="py-2">{{ item.chefName }}</td>
          <td class="py-2">{{ item.phone }}</td>
          <td class="w-8 py-2 cursor-pointer" @click="removeItem(item)">
            <img class="w-5 hover:scale-125 transition" src="./assets/img/cross.svg" alt="cross icon">
          </td>
        </tr>
        </tbody>
      </table>

      <div class="flex justify-between w-40 self-end">
        <button
            :disabled="pageNumber === 0"
            @click="prevPage">
          <img class="w-5 active:scale-125 transition rotate-270" src="./assets/img/arrow.svg" alt="arrow icon">
        </button>
        <div>Страница {{ pageNumber + 1 }}</div>
        <button
            :disabled="pageNumber >= pageCount -1"
            @click="nextPage">
          <img class="w-5 active:scale-125 transition rotate-90" src="./assets/img/arrow.svg" alt="arrow icon">
        </button>
      </div>

    </main>

  </div>
</template>

