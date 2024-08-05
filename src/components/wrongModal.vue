<template>
  <!-- Modal -->
  <div v-if="visible" class="fixed top-0 left-0 w-full h-full 
    bg-pink-500 bg-opacity-50 flex justify-center py-5">
    <div class="bg-rose-500 w-[900px] bg-opacity-90 my-auto p-6 
      rounded-[40px] text-center">
      <h2 class="text-white text-[120px] mb-4">OOOOPS!</h2>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>
