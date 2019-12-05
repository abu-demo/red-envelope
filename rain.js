var c = document.getElementById("myCanvas");
// 全屏覆盖
c.width = window.innerWidth;
c.height = window.innerHeight;

var ctx = c.getContext("2d");
// 图片存储对象
var img = new Image();
// 对象存储数组
var arr = [];
// 创建新对象的计时变量
var controlAdd = 0;

// 生成对象的方法
function add() {
    controlAdd = 0;
    // 生成随机数量的红包 1-4
    let number = Math.floor(Math.random() * 4) + 3;
    // 生成相对应数量的红包
    for (let i = 0; i < number; i++) {
        const red = {
            x: Math.floor(Math.random() * (c.width - 60)),
            y: Math.floor(Math.random() * 60),
            width: 20,
            height: 20,
            vx: Math.floor(Math.random() * 3),
            vy: Math.floor(Math.random() * 3) + 1,
            src: `./snowflake.png`
        }
        arr.push(red);
    }
}

// 下落函数
function fall() {
    // 清空画布
    ctx.clearRect(0, 0, c.width, c.height);
    // 按照参数绘制新的图像
    for (index in arr) {
        // 获取对象
        red = arr[index];
        // 越出边界删除
        if (red.y >= c.height + 100) {
            arr.splice(index, 1);
        }
        // 加速度
        red.y += red.vy;
        red.x += red.vx;
        img.src = red.src;
        ctx.drawImage(img, red.x, red.y, red.width, red.height);
    }
};

function start() {
    // 下降
    fall();
    // 新增
    controlAdd > 16 ? add() : controlAdd++;
    // 每帧刷新
    window.requestAnimationFrame(start);
}

// 启动
start();