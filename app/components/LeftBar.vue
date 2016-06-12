<template>
  <span class="mdl-layout-title">股票</span>
  <nav class="mdl-navigation menus">
    <a class="mdl-navigation__link is-active mdl-shadow--2dp" v-link="{ path: '/breakeven' }" v-on:click="linkTaped">保本卖出价</a>
  </nav>
</template>

<script type="text/babel">
  export default {
    methods: {
      linkTaped: (e) => {
        const hClass = 'is-active'
        const sClass = 'mdl-shadow--2dp'
        $('.mdl-navigation__link').removeClass(hClass)
        $('.mdl-navigation__link').removeClass(sClass)
        $(e.target).addClass(hClass)
        $(e.target).addClass(sClass)
      },
    },
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import 'material-design-lite/src/_variables';
  @import 'material-design-lite/src/_mixins';

  .menus .mdl-navigation__link {
    &:hover {
      background-color: transparent;
    }
  }

  .mdl-navigation__link.is-active {
    background-color: unquote("rgb(#{$color-primary})");
    &:hover {
      background-color: unquote("rgb(#{$color-primary})");
    }
  }

</style>
