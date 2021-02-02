let getColourGradientBlock = () => document.querySelector(".colour-gradient-block");

let colourSynthesisRange = [
  { from: [255, 0, 0], to: [255, 255, 0] },
  { from: [255, 255, 0], to: [0, 255, 0] },
  { from: [0, 255, 0], to: [0, 255, 255] },
  { from: [0, 255, 255], to: [0, 0, 255] },
  { from: [0, 0, 255], to: [255, 0, 255] },
  { from: [255, 0, 255], to: [255, 0, 0] }
];

let findColourValue = (from, to, leftRatio) => {
  return Math.round(from + (to - from) * leftRatio);
};

let findRgbFromMousePosition = (event) => {
  let wrapper = getColourGradientBlock();
  let { clientX } = event;
  let { left, width } = wrapper.getBoundingClientRect();
  let leftDistance = Math.min(Math.max(clientX - left, 0), width - 1);
  let totalRanges = colourSynthesisRange.length;
  let rangeWidth = width / totalRanges;
  let includedRange = Math.floor(leftDistance / rangeWidth);
  let leftRatio = ((leftDistance % rangeWidth) / rangeWidth).toFixed(2);
  let { from, to } = colourSynthesisRange[includedRange];
  return {
    r: findColourValue(from[0], to[0], leftRatio),
    g: findColourValue(from[1], to[1], leftRatio),
    b: findColourValue(from[2], to[2], leftRatio)
  };
};

let rgbToHex = (r, g, b) => {
  let toHex = (rgb) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = `0${hex}`;
    }
    return hex;
  };
  const red = toHex(r);
  const green = toHex(g);
  const blue = toHex(b);
  return `#${red}${green}${blue}`;
};

getColourGradientBlock().addEventListener("mousemove", (e) => {
  let { r, g, b } = findRgbFromMousePosition(e);
  let hexValue = rgbToHex(r, g, b);
  document.querySelector(".colour-red").innerText = r;
  document.querySelector(".colour-green").innerText = g;
  document.querySelector(".colour-blue").innerText = b;
  document.querySelector(".hex-code").innerText = hexValue;
});
