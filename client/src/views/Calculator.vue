<template>
  <div
    class="form relative w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 p-5 bg-white rounded-xl z-10">
      <div class="text-center">
        <div class="mt-5 text-3xl font-bold text-gray-900">
          Калькулятор вложений
        </div>
      </div>

      <form @submit.prevent>
        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700">Сумма</label>

          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              min="0"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="form.amount"
            />
          </div>
        </div>

        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700">Года</label>

          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              min="1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="form.years"
            />
          </div>
        </div>

        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700"
            >ROI в годовых</label
          >

          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              value="95 %"
              class="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled
            />
          </div>
        </div>

        <div class="text-center">
          <div class="mt-5 text-xl font-bold text-gray-900">
            Итоговая сумма: {{ summ.toFixed() }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "Calculator",
  setup() {
    const form = reactive({
      amount: 100000,
      years: 1,
    });

    const summ = computed(() => form.amount * Math.pow(0.95 + 1, form.years));

    return {
      form,
      summ,
    };
  },
});
</script>
