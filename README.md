# overflow-ellipsis
> 一个自定义超出宽高部分省略符号的组件, 可自行复制 src/component/overflow-ellipsis.vue灵活使用

## 基础用法
```html
<template>
    <overflow-ellipsis :list="arr" :width="80" :class-name="'customClass'" @get-folded-info="getFoldedInfo">
        <template #content="{ data }">
            <div class="component">{{data}}</div>
        </template>
        <template #ellipsis="{ foldedInfo, handleClick }">
            <div class="custom" @click="handleClick">...</div>
        </template>
    </overflow-ellipsis>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: '',
    setup() {
        const arr = ['github.com', 'simple', 'Enniu', 'south', 'green', 'javascript', 'computer', 'science'];
        const getFoldedInfo = ({ foldedNum, foldedList }) => {
            console.log(foldedNum, foldedList);
        };
        return {
            arr,
            getFoldedInfo
        }
    }
});
</script>
</template>
```
> 当传入的 width 为80的时候, 组件会自动收缩到如下状态展示【自定义省略号】

<img src="https://cdn.nlark.com/yuque/0/2022/png/8414423/1655614259798-cb88f671-94b9-4452-b176-e151030dc086.png">

> 同时支持传入高度和垂直隐藏属性来达到【高度收缩的状态】

```html
<overflow-ellipsis :list="arr" :height="80" :vertical="true">
</overflow-ellipsis>
```
<img src="https://cdn.nlark.com/yuque/0/2022/png/8414423/1655614862105-fb0d5c96-3a27-4565-a98c-4dbf09feb3b2.png">

## 注意事项
自定义省略号的宽(高)不能超过包裹块的宽(高)或传递进来的 width、height
## 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值
| :-----| ----: | :----: | :----: | :----: |
| list | 渲染数组 | Array | - | - |
| width | 包裹块宽度 | number | - | 100 |
| height | 包裹块高度 | number | - | 100 |
| vertical | 是否在垂直方向收缩 | boolean | true/false | false |
| className | 包裹块类名, 决定列表的排列方式 | string | - | - |
# 插槽
### content
用于渲染列表项

```html
<template #content="{ data }">
    <div>{{data}}</div>
</template>
```
### ellipsis

用于渲染自定义省略号

---

| 插槽属性 | 说明 | 类型 | 可选值 | 默认值
| :-----| ----: | :----: | :----: | :----: |
| foldedInfo | 返回的折叠信息 | Object | - | - |
| handleClick | 省略号的默认处理事件 | Function | - | - |

> handleClick在收缩的时候是【展开列表】, 在展开的时候是【收缩列表】

```html
<template #ellipsis="{ foldedInfo, handleClick }">
    <div @click="handleClick">...</div>
</template>
```

# 测试方法
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
