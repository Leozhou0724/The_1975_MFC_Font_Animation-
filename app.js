const canvas = document.querySelector(".cvs");
const ctx = canvas.getContext("2d");
const input = document.querySelector(".input");
const form = document.querySelector(".input-form");
let text = "MFC";
drawsample([50, 75, 95], text);
input.addEventListener("input", (e) => {
    text = e.target.value.toUpperCase();
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    drawsample([50, 75, 95], text);
    //GIF
    var gif = new GIF({
        workers: 2,
        quality: 10,
    });

    let i;
    for (i = 0; i < 38; i++) {
        //addoneframe([37 + 2 * i, 74 - i, 111 - i]);
        let frame = draw([37 + 2 * i, 74 - i, 111 - i], text);
        gif.addFrame(frame, { delay: 50 });
    }
    const gifpic = document.querySelector(".gifpic");
    gif.on("finished", function (blob) {
        let url = URL.createObjectURL(blob);
        gifpic.setAttribute("src", url);
    });
    gif.render();
});
// function addoneframe(cut) {
//     let frame = draw(cut, text);
//     gif.addFrame(frame, { delay: 50 });
// }
function drawoneword(text, pos, cuttop, cutbot, width) {
    ctx.beginPath();
    ctx.font = `500 150px Roboto`;
    let height = 150 * 0.71;
    height = 107;
    ctx.fillText(text, 50, pos);
    ctx.clearRect(50, pos - height - 1, width, cuttop);
    ctx.clearRect(50, pos - cutbot + 1, width, cutbot);
}

function drawsample(cut, text) {
    ctx.font = `500 150px Roboto`;
    var measuretext = ctx.measureText(text);
    let width = measuretext.width;
    canvas.setAttribute("width", `${100 + width}`);

    let topp = [0, 0, 0];
    let bott = cut;
    let mid = 300;
    let height = 107;
    let gap = 5;
    //3-layer
    drawoneword(
        text,
        mid - height * 3 - gap * 3 + bott[0] + bott[1] + bott[2],
        topp[2],
        bott[2],
        width
    );
    drawoneword(
        text,
        mid + height * 3 + gap * 3 - bott[0] - bott[1] - bott[2],
        bott[2],
        topp[2],
        width
    );
    //2-layer
    drawoneword(
        text,
        mid - height * 2 - gap * 2 + bott[0] + bott[1],
        topp[1],
        bott[1],
        width
    );
    drawoneword(
        text,
        mid + height * 2 + gap * 2 - bott[0] - bott[1],
        bott[1],
        topp[1],
        width
    );
    //1-layer
    drawoneword(text, mid - height - gap + bott[0], topp[0], bott[0], width);
    drawoneword(text, mid + height + gap - bott[0], bott[0], topp[0], width);
    //mid
    drawoneword(text, mid, 0, 0, width);
}

//GIF
function drawone(text, pos, cuttop, cutbot, width, ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.font = `500 150px Roboto`;
    let height = 150 * 0.71;
    height = 107;
    ctx.fillText(text, 50, pos);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(50, pos - height - 1, width, cuttop);
    ctx.fillRect(50, pos - cutbot + 1, width, cutbot);
    //ctx.clearRect(50, pos - height - 1, width, cuttop);
    //ctx.clearRect(50, pos - cutbot + 1, width, cutbot);
}

function draw(cut, text) {
    let canvas = document.createElement("canvas");
    canvas.classList.add("pic");
    let ctx = canvas.getContext("2d");
    ctx.font = `500 150px Roboto`;
    var measuretext = ctx.measureText(text);
    let width = measuretext.width;
    canvas.setAttribute("width", `${100 + width}`);
    canvas.setAttribute("height", "500");
    let topp = [0, 0, 0];
    let bott = cut;
    let mid = 300;
    let height = 107;
    let gap = 5;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width + 100, 500);
    //3-layer
    drawone(
        text,
        mid - height * 3 - gap * 3 + bott[0] + bott[1] + bott[2],
        topp[2],
        bott[2],
        width,
        ctx
    );
    drawone(
        text,
        mid + height * 3 + gap * 3 - bott[0] - bott[1] - bott[2],
        bott[2],
        topp[2],
        width,
        ctx
    );
    //2-layer
    drawone(
        text,
        mid - height * 2 - gap * 2 + bott[0] + bott[1],
        topp[1],
        bott[1],
        width,
        ctx
    );
    drawone(
        text,
        mid + height * 2 + gap * 2 - bott[0] - bott[1],
        bott[1],
        topp[1],
        width,
        ctx
    );
    //1-layer
    drawone(text, mid - height - gap + bott[0], topp[0], bott[0], width, ctx);
    drawone(text, mid + height + gap - bott[0], bott[0], topp[0], width, ctx);
    //mid
    drawone(text, mid, 0, 0, width, ctx);

    return canvas;
}
