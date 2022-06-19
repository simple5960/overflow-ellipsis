<template>
  <div class="overflow-ellipsis"
    :style="{ width: `${width}px`, height: `${height}px`}"
    :class="className"
  >
    <slot v-for="(v, i) in listData" :key="i" name="content" :data="v"></slot>
    <slot name="ellipsis" :foldedInfo="{ foldedNum, foldedList }" :handleClick="handleClick">{{ isFolded ? `+${foldedNum}` : `pack-up` }}</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue';
import { cloneDeep } from './utils';

export default defineComponent({
  name: 'overflow-ellipsis',
  props: {
    list: {
        type: Array,
        default: () => {[]}
    },
    width: {
      type: Number,
      deafault: 100
    },
    height: {
      type: Number,
      default: 100
    },
    vertical: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: () => {''}
    }
  },
  emits: ['getFoldedInfo'],
  setup(props, { emit }) {
    const listData = ref<any[]>(props.list);
    const copyData = cloneDeep(props.list);
    const isFolded = ref(true);
    const foldedNum = ref(0);
    const foldedList = ref<any[]>([]);

    const handleOverFlow = () => {
      const dom = document.querySelector('.overflow-ellipsis');
      if (dom) {
        const ellipsisLen = dom.lastElementChild?.clientWidth;
        const ellipsisHeight = dom.lastElementChild?.clientHeight;

        if ((ellipsisLen && (dom.scrollWidth < ellipsisLen )) || (ellipsisHeight &&  dom.scrollHeight < ellipsisHeight )) {
          // 防止自定义省略号长度超过 wrapper 本身长度而导致无限递归的问题
          throw new Error('自定义省略号宽(高)度超过 wrapper 本身, 请修改 props 或 调整其宽高');
        }

        const scroll = props.vertical ? dom.scrollHeight : dom.scrollWidth;
        const client = props.vertical ? dom.clientHeight : dom.clientWidth;

        if (scroll > client) {
          const item = listData.value.pop();
          foldedList.value?.push(item);
          foldedNum.value ++;
          nextTick(handleOverFlow)
        } else {
          emit('getFoldedInfo', { foldedNum: foldedNum.value, foldedList: cloneDeep(foldedList.value) });
          return;
        }
      }
      return;
    };

    onMounted(handleOverFlow);

    const handleExpand = () => {
      listData.value.length = 0;
      // 这里不用深拷贝, 下一次 handleExpand 的时候, copyData 会被上一次的 handleOverflow 清空
      listData.value = <any[]>cloneDeep(copyData);
    };

    const handleClick = () => {
      if (isFolded.value) {
        handleExpand();
        isFolded.value = false;
        foldedNum.value = 0; // 清空上一次折叠的数目
        foldedList.value.length = 0;
      } else {
        handleOverFlow();
        isFolded.value = true;
      }
    };

    return {
      isFolded,
      listData,
      foldedNum,
      foldedList,
      handleClick
    }
  }
});
</script>

<style scoped>
</style>
