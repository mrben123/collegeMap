let image = new Image();
image.crossOrigin = 'anonymous'

let copy = document.getElementsByTagName('canvas')[0]
let dataUrl = copy.toDataURL("image/png");
console.log(dataUrl)

image.src = dataUrl;

image.currentTime = 1
image.onload = function (){
    console.log('123')
    let subApp = document.getElementById('sub_canvas');
    let ctx = subApp.getContext('2d')
    ctx.drawImage(document.getElementsByTagName('canvas')[0],0,0,1000,800)
}