// 对 better-scroll 进一步封装
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: {},
    };
  },
  mounted() {
    setTimeout(this.__initScroll, 20);
  },
  methods: {
    __initScroll() {
      if (!this.$refs.wrapper) return;
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad,
      });

      this.scroll.on("scroll", (pos) => {
        this.$emit("scroll", pos);
      });

      // 上拉加载事件
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
  },
  watch: {
    data() {
      setTimeout(this.refresh, 20);
    },
  },
};
</script>

<style scoped></style>
