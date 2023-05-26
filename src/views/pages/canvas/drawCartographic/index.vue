<!-- 绘制弧形背景和弧形文字 -->
<template>
  <div>
    <canvas id="canvas" width="1500" height="1000"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const deg2Car = (deg: number) => {
  return (Math.PI / 180) * deg;
};

const init = () => {
  var canvas = document.getElementById('canvas')! as HTMLCanvasElement;
  var context = canvas.getContext('2d')!;

  let granient = context.createLinearGradient(0, 0, 1500, 0);
  granient.addColorStop(0.2, 'rgba(27,84,180,0)');
  granient.addColorStop(0.5, 'rgba(27,84,180,0.8)');
  granient.addColorStop(0.9, 'rgba(27,84,180,0)');

  var TEXT_STROKE_STYLE = granient;
  var TEXT_SIZE = 64;
  let circle = {
    x: canvas.width * 0.55,
    y: canvas.height * 2.4,
    radius: 2200
  };

  //   绘画弧形背景
  {
    context.strokeStyle = TEXT_STROKE_STYLE;
    context.save();
    context.beginPath();
    context.lineWidth = 140;
    context.arc(
      circle.x,
      canvas.height * 3.2,
      3000,
      deg2Car(-80),
      deg2Car(260),
      true
    );
    context.stroke();
    context.restore();
  }

  //   弧型文字
  context.font = TEXT_SIZE + 'px Lucida Sans';

  function drawCircularText(
    string: string,
    startAngle: number,
    endAngle: number
  ) {
    var radius = circle.radius; //圆的半径
    var angleDecrement = (startAngle - endAngle) / (string.length - 1); //每个字母占的弧度
    var angle = startAngle; //

    var index = 0;
    var character: string;
    context.fillStyle = '#ffffff87';
    context.font = TEXT_SIZE + 'px Lucida Sans';

    context.save();

    while (index < string.length) {
      character = string.charAt(index);
      context.save();
      context.beginPath();
      context.translate(
        circle.x + Math.cos((Math.PI / 180) * angle) * radius,
        circle.y - Math.sin((Math.PI / 180) * angle) * radius
      );
      context.rotate(Math.PI / 2 - (Math.PI / 180) * angle); //Math.PI/2为旋转90度  Math.PI/180*X为旋转多少度
      context.fillText(character, 0, 0);
      //   context.strokeText(character, 0, 0);
      angle -= angleDecrement;
      index++;
      context.restore();
    }
    context.restore();
  }
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  drawCircularText('洪峰值:502.24m3/s', 100, 80); //第三个参数表示文字首位是否相接 差了多少弧度

  //   绘制底部黑色区域
  {
    let granient = context.createLinearGradient(0, 0, 1500, 0);
    granient.addColorStop(0.2, 'rgba(75,85,92,0)');
    granient.addColorStop(0.5, 'rgba(75,85,92,0.6)');
    granient.addColorStop(0.9, 'rgba(75,85,92,0)');

    context.fillStyle = 'rgba(0,0,0,1)';
    context.strokeStyle = granient;
    context.font = TEXT_SIZE + 'px Lucida Sans';
    TEXT_SIZE = 32;

    circle = {
      x: canvas.width * 0.55,
      y: canvas.height * 2.51,
      radius: 2200
    };

    context.save();
    context.beginPath();
    context.lineWidth = 90;
    context.arc(
      circle.x,
      canvas.height * 3.195,
      2880,
      deg2Car(-80),
      deg2Car(260),
      true
    );
    context.stroke();
    context.restore();

    drawCircularText('时间:2020/06/0910 28753', 100, 80); //第三个参数表示文字首位是否相接 差了多少弧度
  }
};

onMounted(() => {
  init();
});
</script>

<style scoped>
.circle-chart {
  width: 70px;
  height: 70px;
}
</style>
