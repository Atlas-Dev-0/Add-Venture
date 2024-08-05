<template>

  <!-- BACKGROUND MUSIC -->
  <audio ref="audioPlayer" loop hidden>
    <source src="../assets/sfx/theme.mp3" type="audio/mp3">
    Your browser does not support the audio element.
  </audio>
  <!-- Sound effects -->
  <audio ref="winSound" hidden>
    <source src="../assets/sfx/win.wav" type="audio/wav">
    Your browser does not support the audio element.
  </audio>
  <audio ref="hoverSound" hidden>
    <source src="../assets/sfx/hover.wav" type="audio/wav">
    Your browser does not support the audio element.
  </audio>
  <audio ref="clickSound" hidden>
    <source src="../assets/sfx/clicked.wav" type="audio/wav">
    Your browser does not support the audio element.
  </audio>
  <audio ref="failSound" hidden>
    <source src="../assets/sfx/fail.wav" type="audio/wav">
    Your browser does not support the audio element.
  </audio>

  <!-- ----- -->

  <div id="game" class="container ">
    <h1 class="text-zinc-50 big text-center">Guess The Number</h1>
    <div class="container  flex ">
      <div class="container content-center  justify-self-center bg-white ml-[100px] rounded-3xl box-number">
        <h1 class="text-center big">
          {{ addends_x }}
        </h1>
      </div>
      <div class="content-center  justify-self-center mx-[80px]">
        <h1 class="text-white text-center big">
          +
        </h1>
      </div>
      <div class="container content-center  bg-white mr-[100px] rounded-3xl box-number">
        <h1 class="text-center big">
          {{ addends_y }}
        </h1>
      </div>
    </div>
    <div class="justify-center container  flex wrap mt-10">
      <button @mouseover="playHoverSound()" @click="CheckCorrectAns(answer_1)"
        class="text-white big place-content-center text-center align-center box-answer mx-10 rounded-lg">{{
          answer_1
        }}</button>
      <button @mouseover="playHoverSound()" @click="CheckCorrectAns(answer_2)"
        class="text-white big place-content-center text-center align-center box-answer mx-10 rounded-lg">{{
          answer_2
        }}</button>
      <button @mouseover="playHoverSound()" @click="CheckCorrectAns(answer_3)"
        class="text-white big place-content-center text-center align-center box-answer mx-10 rounded-lg">{{
          answer_3
        }}</button>
    </div>
    <div class=" text-white text-[50px] my-auto">
      <h1>Score: {{ score }}</h1>
    </div>

    <StartModal :visible="showModal" :StartGame="StartGame" />
    <WrongModal :visible="showWrongMessage" />
    <RightModal :visible="showRightMessage" />
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue';
import { Game } from './GameMechs.ts';
import StartModal from '../components/dialog.vue';
import WrongModal from '../components/wrongModal.vue';
import RightModal from '../components/RightModal.vue';

export default defineComponent({
  components: {
    StartModal,
    WrongModal,
    RightModal,
  },
  setup() {

    const audioPlayer = ref<HTMLAudioElement | null>(null);
    function MainFx() {
      if (audioPlayer.value) {
        audioPlayer.value.volume = 1;
        audioPlayer.value.play().catch((error) => {
          console.log("Audio Play Error", error);
        });
      }
    }
    const hoverSound = ref<HTMLAudioElement | null>(null);
    const clickSound = ref<HTMLAudioElement | null>(null);
    const winSound = ref<HTMLAudioElement | null>(null);
    const failSound = ref<HTMLAudioElement | null>(null);

    function playWinSound() {
      if (winSound.value) {
        winSound.value.play().catch(error => {
          console.log('Win sound play error:', error);
        });
      }
    }

    function playClickedSound() {
      if (clickSound.value) {
        winSound.value.play().catch(error => {
          console.log('Win sound play error:', error);
        });
      }
    }

    function playHoverSound() {
      if (hoverSound.value) {
        hoverSound.value.volume = 0.8;
        hoverSound.value.play().catch(error => {
          console.error('Hover sound play error:', error);
        });
      }
    }

    function playFailSound() {
      if (failSound.value) {
        audioPlayer.value.pause();
        failSound.value.volume = 0.8;
        failSound.value.play().catch(error => {
          console.error('Hover sound play error:', error);
        });
        audioPlayer.value.play();
      }
    }

    const showModal = ref(true);
    const showWrongMessage = ref(false);
    const showRightMessage = ref(false);

    const game = new Game();

    var places_available: number[] = [];
    var addends_x = ref();
    var addends_y = ref();

    var answer_1 = ref();
    var answer_2 = ref();
    var answer_3 = ref();
    var message = ref();
    var score: number = ref(0);

    function getAnswer(): number {
      let placement = getPlacement();
      if (placement === 2) {
        return game.GetRightAnswer();
      } else if (placement !== 2) {
        let randAns: number;
        do {
          randAns = game.GetRandAnswer();
        } while (randAns === game.GetRightAnswer());
        return randAns;
      }
    }

    function getPlacement(): number {
      console.log("current array", places_available);
      console.log("array length", places_available.length);
      var x = game.GenerateInts(places_available.length);
      console.log("x number ", x);

      var y = places_available[x];
      console.log("y number ", y);

      places_available = places_available.filter(element => element !== places_available[x]);
      console.log("returned number ", y);
      console.log("after array", places_available);
      return y;
    }


    function CheckCorrectAns(ans: number): boolean {
      let right_ans = game.GetRightAnswer();
      console.log("Correct Answer: ", right_ans);
      console.log("Guessed Answer: ", ans);
      let reply: boolean;
      if (ans === right_ans) {
        score.value++;
        playClickedSound();
        playWinSound();

        showRightMessage.value = true;
        setTimeout(() => {
          showRightMessage.value = false;
        }, 1000);

        console.log("yey");
        console.log("score: ", score.value);
        message = "CONGRATULATIONS!!";
        reply = true;
        StartGame();
      } else {
        score.value--;
        playFailSound();
        showWrongMessage.value = true;
        setTimeout(() => {
          showWrongMessage.value = false;
        }, 1000);
        console.log("boo");
        message = "ooops!!";
        reply = true;
      }
      return reply;
    }

    function GenerateProblem() {
      places_available = [1, 2, 3];
      game.GenerateProblem();
      addends_x.value = game.problem.addends_x;
      addends_y.value = game.problem.addends_y;
      answer_1.value = getAnswer();
      answer_2.value = getAnswer();
      answer_3.value = getAnswer();
    }

    function StartGame() {
      MainFx();
      GenerateProblem();
      showModal.value = false;
    }



    return {
      clickSound,
      failSound,
      playClickedSound,
      playHoverSound,
      hoverSound,
      winSound,
      showModal,
      StartGame,
      showWrongMessage,
      showRightMessage,
      GenerateProblem,
      CheckCorrectAns,
      answer_1,
      answer_2,
      answer_3,
      addends_x,
      addends_y,
      message,
      score,
      audioPlayer,
    };
  }
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input {
  margin: 10px;
}

button {
  margin-top: 10px;
}
</style>
