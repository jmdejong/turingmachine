"use strict";

const width = 64;
const height = 64;

function main(){
    var grid = new Grid(width, height);
    var ant = new TuringMachine();//"xj1; ^j2,vj6;   xj3; >j4,<j0;   xj5; vj6,^j2;   xj7; <j0,>j4;");
    var field = new Field(grid, ant, 8, 8, 2)
//     ant.start();
}

window.addEventListener("load", main)
