if(!document.querySelector('#galiOrb')){
    let
        div = document.body.appendChild(document.createElement('div')),
        canvasA = document.body.appendChild(document.createElement('canvas')),
        canvasB = document.body.appendChild(document.createElement('canvas'))
    div.id = "galiOrb"
    div.style.position = 'relative'
    canvasA.id = "galiOrbA"
    canvasA.style.position = 'absolute'
    canvasB.id = "galiOrbB"
    canvasB.style.position = 'absolute'
}
if (window.animation)
    cancelAnimationFrame(window.animation)

let
    currentCanvas, currentContext,
    previousCanvas, previousContext,
    canvasA, contextA,
    canvasB, contextB,
    div,

    parts, l,
    initialPoints;

let animationFrame = () => {
    let
        e, first,

        point1,
        point2,

        c,
        d,
        h,
        m,

        points, //array de arrays
        cos2,
        cos1,
        sin2,
        sin1,
        X, Y, Z,
        Y1, Z1;

    if (currentCanvas == canvasA) {
        currentCanvas = canvasB
        currentContext = contextB
        previousCanvas = canvasA
        previousContext = contextA
    } else {
        currentCanvas = canvasA
        currentContext = contextA
        previousCanvas = canvasB
        previousContext = contextB
    } for (
        currentContext.globalCompositeOperation = "source-over",
        currentContext.globalAlpha = .97,
        currentContext.drawImage(previousCanvas, 0, 0),
        previousContext.clearRect(0, 0, previousCanvas.width, previousCanvas.height),
        currentContext.globalCompositeOperation = "lighter",
        currentContext.globalAlpha = 1,
        m = l,
        d = 0;

        d < 2;

        d++ //0 e 1
    ) {
        for (
            m *= 1.7,
            h = 1 - d / 3, //1 e 2/3
            cos1 = Math.cos(e = m / 59),
            sin1 = Math.sin(e),
            cos2 = Math.cos(e = m / 30),
            sin2 = Math.sin(e),
            points = [],
            e = 0;
            e < initialPoints.length;
            e++
        ) {
            // (a,b) = a(1,0) + b(0,1) =>
            // a(cos(α),-sin(α)) + b( sin(α),cos(α)) = (cos(α)a + sin(α)b, -sin(α)a + cos(α)b)
            // a(cos(α), sin(α)) + b(-sin(α),cos(α)) = (cos(α)a - sin(α)b,  sin(α)a + cos(α)b)
            X = initialPoints[e][0];
            Y1 = (Y = initialPoints[e][1]) * cos1 + (Z = initialPoints[e][2]) * sin1;
            X =
                (X * cos2 - (Z1 = - Y * sin1 + Z * cos1) * sin2) *
                (Z1 = 2 ** ((Z = X * sin2 + Z1 * cos2) * h));
            Y = Y1 * Z1;
            points.push([X, Y, Z]);
        }
        // currentContext.strokeStyle = "rgba(100,162,255,0.30)";
        currentContext.strokeStyle = "rgba(49, 71, 165, 0.3)";
        for (
            h *= 120, //120 e 80
            c = parts * 3 - 1;

            c > -1;

            c -= parts
        ) {
            first = c - parts + 1
            for (e = first; e < c; e++) {
                point1 = points[e];
                point2 = points[e + 1];

                currentContext.beginPath();
                currentContext.lineWidth = 6 ** point1[2];                      //_|_     onde o
                currentContext.lineTo(point1[0] * h + 200, point1[1] * h + 200);//_|_>=> desenho
                currentContext.lineTo(point2[0] * h + 200, point2[1] * h + 200);//_|     ocorre
                currentContext.stroke()
            }
            point1 = points[e];
            point2 = points[first];

            currentContext.beginPath();
            currentContext.lineWidth = 6 ** point1[2];
            currentContext.lineTo(point1[0] * h + 200, point1[1] * h + 200);
            currentContext.lineTo(point2[0] * h + 200, point2[1] * h + 200);
            currentContext.stroke()
        }
    }
    l += .2;
    window.animation = requestAnimationFrame(animationFrame)
};


contextA = (canvasA = document.getElementById("galiOrbA")).getContext("2d");
contextB = (canvasB = document.getElementById("galiOrbB")).getContext("2d");
div = document.getElementById("galiOrb")

div.style.width = div.style.height = (
    canvasA.width = canvasA.height = canvasB.width = canvasB.height = 400
) + 'px';
contextA.clearRect(0, 0, canvasA.width, canvasA.height);
contextB.clearRect(0, 0, canvasB.width, canvasB.height);


parts = 200; // o quanto divide a circuferencia
l = 60;
initialPoints = []; // circuferência em 3 dimensões

let r = 0;
for (let e = 0; e < parts; e++)
    initialPoints.push([Math.cos(r), Math.sin(r), 0]),
        r += 2 * Math.PI / parts;
for (let e = 0; e < parts; e++)
    initialPoints.push([0, initialPoints[e][0], initialPoints[e][1]]);
for (let e = 0; e < parts; e++)
    initialPoints.push([initialPoints[e][1], 0, initialPoints[e][0]]);

window.animation = requestAnimationFrame(animationFrame)
