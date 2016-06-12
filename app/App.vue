<template>
  <div id="app">
    <router-view keep-alive></router-view>
  </div>
</template>

<script type="text/babel">
  import 'material-design-lite'
  import Main from './components/Main.vue'
  export default {
    routes: {
      '/': {
        component: Main,
        subRoutes: Main.routes,
      },
    },
    redirects: {
      '*': '/',
    },
  }
</script>


<style lang="scss" rel="stylesheet/scss">
  /* ICON FONT */
  $md-icon-path: 'node_modules/material-design-icons/iconfont/';
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url("#{$md-icon-path}MaterialIcons-Regular.woff2") format('woff2');
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  /* OVERRIDE VARIABLES */
  @import 'material-design-lite/src/_variables.scss';
  /* LAYOUT */
  // 触发响应式布局的临界值
  $layout-screen-size-threshold: 0px;
  /* Drawer */
  // 侧边栏的背景颜色
  $layout-drawer-bg-color: unquote("rgb(#{$color-primary-dark})");
  // 侧边栏的文字颜色
  $layout-text-color: unquote("rgb(#{$palette-grey-100})");
  // 导航栏文字颜色
  $layout-drawer-navigation-color: unquote("rgb(#{$palette-grey-200})");
  // $layout-drawer-navigation-link-active-background: unquote("rgb(#{$color-dark-contrast})");
  //$layout-drawer-navigation-link-active-color: unquote("rgb(#{$color-primary})");
  /* IMPORT MDL */
  @import 'material-design-lite/src/material-design-lite.scss';

  /* CUSTOM */
  body {
    background-color: unquote("rgb(#{$palette-grey-50})");
  }

</style>
