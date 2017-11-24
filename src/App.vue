<template>
  <div id="app">
    <v-ons-button @click="executeButtonClick()">実行</v-ons-button>
    結果: {{ montecarloResult }}
    </br >
    誤差: {{ montecarloError }}
    <br />
    点の数: {{ totalCount }}
    <br />
    円の中にある点の数: {{ inCount }}
    <br />
    <canvas ref="renderCanvas"></canvas>
  </div>
</template>

<style lang="scss">
</style>

<script>
import seedrandom from 'seedrandom';
import {} from 'pixi.js';
const RADIUS = 320;
const LOOP_NUM = 5000;

export default {
  name: 'app',
  data () {
    return {
      pixiApp: null,
      graphics: null,
      montecarloResult: '',
      montecarloError: '',
      seedRandom: '',
      rng: null,
      renderTexture: null,
      renderTexture2: null,
      inCount: 0,
      totalCount: 0,
    }
  },
  methods: {
    executeButtonClick: function() {
      // 乱数種
      if(this.totalCount <= 0) {
        this.rng = seedrandom(this.seedRandom);
      }

      // 描画していく
      let _container = new PIXI.Container();
      let _graphics =  new PIXI.Graphics();
      _graphics.beginFill(0x00ffff, 0.1);
      for(let i = 0; i < LOOP_NUM; i++) {
        let _pos = {x: this.getRandomArbitary(0, RADIUS), y: this.getRandomArbitary(0, RADIUS)};

        _graphics.drawCircle(_pos.x, _pos.y, 1);

        if(Math.pow(_pos.x, 2) + Math.pow(_pos.y, 2) <= Math.pow(RADIUS, 2)) {
          this.inCount++;
        }
        this.totalCount++;
      }
      _graphics.endFill();

      _container.addChild(_graphics);
      this.pixiApp.renderer.render(_container, this.renderTexture, false);

      this.montecarloResult = (this.inCount * 4) / this.totalCount;
      this.montecarloError = this.montecarloResult * 100 / Math.PI;
    },
    // min から max までの乱数を返す関数
    getRandomArbitary: function(min, max) {
      return this.rng() * (max - min) + min;
    },
  },
  mounted: function() {
    this.pixiApp =  new PIXI.Application(RADIUS, RADIUS, {
      view: this.$refs.renderCanvas,
      backgroundColor: 0x000000,
    });
    let _graphics = new PIXI.Graphics();
    _graphics.beginFill(0xff0000, 1.0);
    _graphics.drawCircle(0, 0, RADIUS);
    _graphics.endFill();
    this.pixiApp.stage.addChild(_graphics);

    let _brt = new PIXI.BaseRenderTexture(RADIUS, RADIUS);
    this.renderTexture = new PIXI.RenderTexture(_brt);
    let _brt2 = new PIXI.BaseRenderTexture(RADIUS, RADIUS);
    this.renderTexture2 = new PIXI.RenderTexture(_brt2);

    let _sprite = new PIXI.Sprite(this.renderTexture);
    this.pixiApp.stage.addChild(_sprite);
  },
}
</script>

