<template>
  <!-- Modal -->
  <div v-if="visible" class="fixed top-0 left-0 w-full h-full 
    bg-pink-500 bg-opacity-50 flex justify-center py-5">
    <div class="bg-white w-[900px] bg-opacity-90 my-auto p-6 
      rounded-[40px] text-center">
      <h2 class="text-pink-500 text-[120px] mb-4">YOU WIN!!</h2>
      <button @click="StartGame"
        class="bg-pink-500 hover:bg-green-700 text-white font-bold py-2 px-4 text-[90px] rounded-[40px]">
        Play Again!
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    StartGame: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
});
</script>
