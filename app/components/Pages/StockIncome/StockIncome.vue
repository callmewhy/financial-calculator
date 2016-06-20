<!-- 保本卖出价 -->
<template>
  <div class="mdl-shadow--2dp">
    <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
      <div class="mdl-tabs__tab-bar">
        <a href="#content-panel" v-on:click.prevent="clickTab(0)" class="mdl-tabs__tab is-active">沪市 A 股</a>
        <a href="#content-panel" v-on:click.prevent="clickTab(1)" class="mdl-tabs__tab">沪市 B 股</a>
        <a href="#content-panel" v-on:click.prevent="clickTab(2)" class="mdl-tabs__tab">深市 A 股</a>
        <a href="#content-panel" v-on:click.prevent="clickTab(3)" class="mdl-tabs__tab">深市 B 股</a>
      </div>
      <div class="mdl-tabs__panel is-active" id="content-panel">
        <div v-for="item of currentTabItem">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input type="text" class="mdl-textfield__input" id="{{ item.id }}"
                   pattern="-?[0-9]*(\.[0-9]+)?" v-model="item.model"/>
            <label class="mdl-textfield__label" for="{{ item.id }}">{{ item.label }}</label>
            <span class="suffix-text">{{ item.suffix }}</span>
          </div>
        </div>
        <div id="result-panel" class="mdl-color-text--primary">
          {{ result }}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import calculator from './calculator'

  function buildItem(tab) {
    const inputs = {
      0: ['股票买入价', 0, ['元/股', '美元/股', '元/股', '港元/股']],
      1: ['股票买入数量', 100, '股'],
      2: ['券商佣金比例', 0.1, [
        '%（不足5元按5元收取）',
        '%（不足1美元按1美元收取）',
        '%（不足5元按5元收取）',
        '%（不足5港元按5港元收取）']],
      3: ['印花税税率', 0.1, '%（卖出时收取）'],
      4: ['过户费费率', 1, '元/千股（最低收取1元）'],
      5: ['结算费费率', 0.05, '%（最高收取500港元）'],
    }
    const allKeys = [
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 5],
      [0, 1, 2, 3],
      [0, 1, 2, 3, 5],
    ]
    return allKeys[tab].map((key) => {
      const input = inputs[key]
      const suffix = Array.isArray(input[2]) ? input[2][tab] : input[2]
      return {
        id: `${tab}_${key}`,
        label: input[0],
        model: input[1],
        suffix: suffix,
      }
    })
  }

  const items = [buildItem(0), buildItem(1), buildItem(2), buildItem(3)]

  export default{
    ready: function () {
      componentHandler.upgradeDom()
    },
    methods: {
      clickTab: function (index) {
        this.currentTab = index
        this.$nextTick(() => {
          componentHandler.upgradeDom()
        })
      },
    },
    data: function () {
      return {
        currentTab: 0,
        items: items,
      }
    },
    computed: {
      result: function () {
        const i = this.currentTab
        const values = this.items[i].map((item) => {
          return parseFloat(item.model)
        })
        const part1 = ['保本卖出价：', '保本卖出价：', '保本卖出价：', '保本卖出价：'][i]
        const result = calculator.breakevenPrice(values, i)
        if (isNaN(result)) {
          return `${part1}0_0`
        }
        const part2 = (result === null) ? '必定亏损' : `${result}${['元', '美元', '元', '港元'][i]}`
        return `${part1}${part2}`
      },
      currentTabItem: function () {
        return items[this.currentTab]
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import 'material-design-lite/src/_variables';

  .mdl-grid {
    justify-content: center;
  }

  .suffix-text {
    position: absolute;
    color: $input-text-label-color;
    top: ($input-text-padding+ $input-text-vertical-spacing);
    right: 0;
  }

  #content-panel {
    width: 90%;
    margin: 2rem 5%;
  }

  .mdl-textfield {
    width: 100%;
  }

  #result-panel {
    padding-bottom: $input-text-vertical-spacing;
    font-weight: bold;
  }
</style>
