"use strict";

const width = 64;
const height = 64;

function main(){
    var grid = new Grid(width, height);
    var ant = new TuringMachine();
    var field = new Field(grid, ant, 8, 8)
}

window.addEventListener("load", main)
