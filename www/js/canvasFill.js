/**
 *  Copyright (c) 2017-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */

(() => {
  let canvas;
  let ctx;
  let frameCount = 0;
  
  let rectState = [0,0,10];
  let rectStateVector = [1,1,1];

  function onFrame() {
    window.requestAnimationFrame(onFrame);
    frameCount ++;
    
    let date = new Date();
    
    // Rotate hue every hour
    let hue = Math.floor(((date.getTime() % (60 * 60 * 1000)) / (60 * 60 * 1000)) * 360);
    
    // Rotate saturation every 5 seconds
    let sat = Math.floor((date.getTime() % 5000)/5000 * 100);
    
    // Rotate luminance every 20 seconds
    let lum = Math.floor((date.getTime() % 20000)/20000 * 100);
    
    // Rotate angle every minute
    let angle = (((date.getTime() % (60 * 1000)) / (60 * 1000)) * 360) * Math.PI / 180;
    
    
    ctx.resetTransform();
    
    ctx.filter = 'blur(1px)';
    ctx.drawImage(canvas, 0.5, 0, canvas.width -1, canvas.height -0.5);
    ctx.filter = 'none';
    ctx.globalAlpha = 1;
    
    
    ctx.fillText(date.toISOString() + '  Frame: ' + frameCount.toLocaleString(), canvas.width/2, canvas.height/2);
    ctx.strokeStyle='#000';
    ctx.strokeText(date.toISOString() + '  Frame: ' + frameCount.toLocaleString(), canvas.width/2, canvas.height/2);
    
    ctx.translate(rectState[0], rectState[1]);
    ctx.rotate(angle);
    ctx.strokeStyle = 'hsl(' + hue + ', ' + sat + '%, ' + lum + '%)';
    ctx.strokeRect(-rectState[2]/2, -rectState[2]/2, rectState[2], rectState[2]);
    if (rectState[0] >= canvas.width) {
      rectStateVector[0] = -1;
    }
    if (rectState[0] <= 0) {
      rectStateVector[0] = 1;
    }
    if (rectState[1] >= canvas.height) {
      rectStateVector[1] = -1;
    }
    if (rectState[1] <=0) {
      rectStateVector[1] = 1;
    }
    if (rectState[2] >= 200) {
      rectStateVector[2] = -1;
    }
    if (rectState[2] <=5) {
      rectStateVector[2] = 1;
    }
    for (let i = 0; i<rectState.length; i++) {
      rectState[i] += rectStateVector[i] * 1;
    }
  }

  document.addEventListener('DOMContentLoaded', (e) => {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onFrame();
  });  
})();
