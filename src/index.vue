<template>
  <div class="hello">
    <overflow-ellipsis :list="arr" :width="180" :class-name="'test'" @get-folded-info="getFoldedInfo">
      <template #content="{ data }">
        <div class="component">{{data}}</div>
      </template>
      <!-- 这个不能无限大, 不能超过 wrapper 的宽度或者高度 -->
      <!-- 1. custom-ellipsis 的宽度超过了 wrapper 的宽度, 没有 pop 掉它, 会导致死循环 -->
      <template #ellipsis="{ foldedInfo, handleClick }">
        <test class="custom" @click="handleClick">{{foldedInfo.foldedNum}}</test>
      </template>
    </overflow-ellipsis>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import overflowEllipsis from './components/overflow-ellipsis.vue';
import test from './test.vue'
export default defineComponent({
  name: 'index',
  components: {
    overflowEllipsis,
    test
  },
  setup() {
    const arr = ['github.com', 'simple', 'Enniu', 'south', 'green', 'javascript', 'computer', 'science'];
    const getFoldedInfo = (num: Number) => {
      console.log(num);
    };
    return {
      arr,
      getFoldedInfo
    }
  }
});
</script>

<style scoped>
.hello {
  width: 300px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.component {
  background: #fe3666;
  padding: 10px;
  border-radius: 10px;
  width: 80px;
  margin-top: 4px;
  text-align: center;
}
.custom {
  padding: 10px;
  border-radius: 10px;
  color:antiquewhite;
  background: rgb(21, 21, 21);
  width: 80px;
  margin-top: 4px;
  text-align: center;
}
.test {
  display: flex;
  border: 1px solid #000;
  justify-content: center;
  align-items: center;
}
.test > div {
  margin-left: 4px;
}

</style>
