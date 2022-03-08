const startAnimation = () => {
  let c: any = document.getElementById("canvasForBg");
  let ctx = c.getContext("2d");
  //making the canvas full screen
  c.height = window.outerHeight;
  c.width = window.innerWidth;

  //chinese characters - taken from the unicode charset
  let chinese: string | string[] = "DTAC 11011001 DTAC";
  //converting the string into an array of single characters
  chinese = chinese.split("");

  let font_size = 14;
  let columns = c.width / font_size; //number of columns for the rain
  //an array of drops - one per column
  let drops: any[] = [];
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for (let x = 0; x < columns; x++) drops[x] = 1;

  //drawing the characters
  function draw() {
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#123B24"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for (let i = 0; i < drops.length; i++) {
      //a random chinese character to print
      let text = chinese[Math.floor(Math.random() * chinese.length)];
      //x = i*font_size, y = value of drops[i]*font_size
      ctx.fillText(text, i * font_size, drops[i] * font_size);

      //sending the drop back to the top randomly after it has crossed the screen
      //adding a randomness to the reset to make the drops scattered on the Y axis
      if (drops[i] * font_size > c.height && Math.random() > 0.975)
        drops[i] = 0;

      //incrementing Y coordinate
      drops[i]++;
    }
  }

  (window as any).animationInterval = setInterval(draw, 33);
};

const stopAnimation = () => {
  let initialCanvas: any = document.getElementById("canvasForBg");

  const newCanvas = document.createElement("canvas");
  newCanvas.id = "canvasForBg";

  clearInterval((window as any).animationInterval);

  initialCanvas.parentNode.replaceChild(newCanvas, initialCanvas);
};

export { startAnimation, stopAnimation };
