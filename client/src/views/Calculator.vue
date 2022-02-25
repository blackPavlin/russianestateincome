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

        <div class="text-left">
          <div
            class="mt-5 text-xl font-medium text-gray-900 flex justify-between"
          >
            <span>Всего интвестированно: </span>
            <span class="font-bold">{{ totalInvestment.toFixed(0) }}</span>
          </div>

          <div
            class="mt-2 text-xl font-medium text-gray-900 flex justify-between"
          >
            Итоговая сумма:
            <span class="font-bold">{{ balance.toFixed(0) }}</span>
          </div>

          <div
            class="mt-2 text-xl font-medium text-gray-900 flex justify-between"
          >
            Доход: <span class="font-bold">{{ profit.toFixed(0) }}</span>
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
      amount: 50000,
      years: 1,
    });

    // Всего инвестированно
    const totalInvestment = computed(() => form.amount * form.years * 12);

    // Всего на балансе
    const balance = computed(() => {
      const incomePerQuarters: number[] = [];

      for (let i = 0; i < (form.years * 12) / 4; i += 1) {
        const investments =
          form.amount * 4 +
          incomePerQuarters.reduce((prev, curr) => prev + curr * 0.43, 0);

        incomePerQuarters.push(investments);
      }

      return incomePerQuarters.reduce((prev, curr) => prev + curr, 0);
    });

    // Доход за период
    const profit = computed(() => balance.value - totalInvestment.value);

    return {
      form,
      totalInvestment,
      balance,
      profit,
    };
  },
});
</script>
