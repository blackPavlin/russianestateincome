<template>
  <div
    class="form relative w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-md w-full space-y-8 p-5 bg-white rounded-xl z-10"
      v-if="showMessage"
    >
      <div class="text-center font-medium text-gray-900">
        Мы приняли Вашу заявку к рассмотрению! Наш менеджер свяжется с Вами в
        ближайшее время.
      </div>
    </div>

    <div
      class="max-w-md w-full space-y-8 p-5 bg-white rounded-xl z-10"
      v-if="!showMessage"
    >
      <div class="text-center">
        <div class="mt-5 text-3xl font-bold text-gray-900">Анкета</div>
        <div class="mt-1 font-medium text-gray-900">
          Прежде чем Вы присоединитесь к команде, нам нужно проверить Вашу
          заявку. Для этого Вам необходимо ответить на следующие вопросы:
        </div>
      </div>

      <form @submit.prevent>
        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700"
            >Ваше ФИО</label
          >
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Фамилия Имя Отчество"
              v-model="form.name"
            />
          </div>

          <p class="text-red-500 text-xs italic" v-if="v.name.$error">
            Пожалуйста заполните ФИО
          </p>
        </div>

        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700"
            >Желаемая сумма для инвестирования</label
          >
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              min="0"
              v-model="form.amount"
            />
          </div>

          <p class="text-red-500 text-xs italic" v-if="v.amount.$error">
            Пожалуйста заполните сумму для инвестиций
          </p>
        </div>

        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700"
            >Телеграм</label
          >
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              type="tel"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Номер телефона / никнейм"
              v-model="form.phone"
            />
          </div>

          <p class="text-red-500 text-xs italic" v-if="v.phone.$error">
            Пожалуйста укажите Телеграм
          </p>
        </div>

        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700"
            >Пару слов о себе</label
          >
          <div class="mt-1 relative rounded-md shadow-sm">
            <textarea
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="В свободной форме расскажите, чем занимаетесь, почему и зачем хотите попасть в инвестиционную команду и зачем Вам инвестиции в целом?"
              v-model="form.text"
            ></textarea>
          </div>
        </div>

        <div class="mb-5">
          <button
            class="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300"
            @click="submitForm"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import client from "@/plugins/axios";

export default defineComponent({
  name: "Home",
  setup() {
    const showMessage = ref(true);

    const form = reactive({
      name: "",
      amount: 0,
      phone: "",
      text: "",
    });

    const rules = {
      name: { required },
      amount: { required },
      phone: { required },
    };

    const v = useVuelidate(rules, form);

    const submitForm = async () => {
      v.value.$touch();
      if (v.value.$invalid) {
        return;
      }

      await client.post("/form", form);

      showMessage.value = true;
    };

    return {
      showMessage,
      form,
      submitForm,
      v,
    };
  },
});
</script>
