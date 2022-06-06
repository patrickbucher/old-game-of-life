"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const world = document.getElementById("world");
    const rows = Number.parseInt(world.getAttribute("data-rows"));
    const cols = Number.parseInt(world.getAttribute("data-cols"));

    const intervalControl = document.getElementById("interval");
    const startStopButton = document.getElementById("start-stop");
    const clearButton = document.getElementById("clear");

    drawEmptyWorld(world, rows, cols);
    let field = addGlider(initField(rows, cols));
    updateWorld(field);

    let interval = undefined;

    const animate = () => {
        field = computeNextGeneration(field);
        updateWorld(field);
    };

    const stopAnimation = () => {
        clearInterval(interval);
        interval = undefined;
        startStopButton.textContent = "Start";
    };

    startStopButton.addEventListener("click", () => {
        if (interval) {
            stopAnimation();
        } else {
            interval = setInterval(animate, intervalControl.value);
            startStopButton.textContent = "Stop";
        }
    });

    clearButton.addEventListener("click", () => {
        field = initField(rows, cols);
        updateWorld(world, field);
        stopAnimation();
    });

    world.childNodes.forEach(n => {
        n.addEventListener("click", (e) => {
            const cell = e.target;
            const alive = cell.classList.toggle("alive");
            const id = cell.getAttribute("id");
            const [row, col] = getRowColFromID(id);
            field[row][col] = alive;
        });
    });
});

function drawEmptyWorld(world, rows, cols) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.setAttribute("id", `cell-${r}-${c}`);
            if (c > 0) {
                cell.setAttribute("class", "cell");
            } else {
                cell.setAttribute("class", "cell break");
            }
            world.appendChild(cell);
        }
    }
}

function initField(rows, cols) {
    const field = [];
    for (let r = 0; r < rows; r++) {
        const newRow = [];
        for (let c = 0; c < cols; c++) {
            newRow.push(false);
        }
        field.push(newRow);
    }
    return field;
}

function addGlider(field) {
    const glider = [];
    for (let r = 0; r < field.length; r++) {
        const newRow = [];
        for (let c = 0; c < field[r].length; c++) {
            const alive =
                r == 1 && c == 2 ||
                r == 2 && c == 3 ||
                r == 3 && c == 3 ||
                r == 3 && c == 1 ||
                r == 3 && c == 2;
            newRow.push(alive);
        }
        glider.push(newRow);
    }
    return glider;
}

function updateWorld(field) {
    for (let r = 0; r < field.length; r++) {
        for (let c = 0; c < field[r].length; c++) {
            const id = `cell-${r}-${c}`;
            const cell = document.getElementById(id);
            if (field[r][c]) {
                cell.classList.add("alive");
            } else {
                cell.classList.remove("alive");
            }
        }
    }
}

function countLivingNeighbours(field, row, col) {
    let livingNeighbours = 0;
    const neighbours = [
        [-1, +0], // north
        [-1, +1], // north-east
        [+0, +1], // east
        [+1, +1], // south-east
        [+1, +0], // south
        [+1, -1], // south-west
        [+0, -1], // west
        [-1, -1]  // north-west
    ];
    const nRows = field.length;
    const nCols = field[0].length;
    const clipNeighbour = (i, max) => (i < 0 ? max + i : i) % max;
    for (const [rowShift, colShift] of neighbours.values()) {
        const r = clipNeighbour(row + rowShift, nRows);
        const c = clipNeighbour(col + colShift, nCols);
        livingNeighbours += field[r][c];
    }
    return livingNeighbours;
}

function computeNextGeneration(oldField) {
    const newField = [];
    for (let r = 0; r < oldField.length; r++) {
        const newRow = [];
        for (let c = 0; c < oldField[r].length; c++) {
            const cell = oldField[r][c];
            const neighboursAlive = countLivingNeighbours(oldField, r, c);
            if (cell && (neighboursAlive == 2 || neighboursAlive == 3)) {
                newRow.push(true);
            } else if (!cell && neighboursAlive == 3) {
                newRow.push(true);
            } else {
                newRow.push(false);
            }
        }
        newField.push(newRow);
    }
    return newField;
}

function getRowColFromID(id) {
    const pattern = /^cell-(\d+)-(\d+)$/;
    const match = id.match(pattern);
    if (match) {
        return [Number(match[1]), Number(match[2])];
    } else {
        throw `malformed id "${id}"`
    }
}
