
var TuringMachine = (function(){
"use strict";

const NOOP = 0;
const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;
const FLIP = 5;
const ERROR = 0;
const ACTION_MASK = 7;

const JUMPPART_SHIFT = 3;

const BLOCK_SIZE = 4



class TuringMachine {
    
    
    constructor(){
        this.code = [];
        this.state = BLOCK_SIZE;
    }
    
    setCode(machineCode){
        this.code = new Uint8Array(machineCode);
    }
        
    
    place(grid, x, y){
        this.grid = grid;
        this.x = x;
        this.y = y;
    }
    
    step(){
        if (this.state == ERROR){
            console.error("ERROR STATE");
            return;
        }
        var v = this.grid.get(this.x, this.y);
        if (v != 0 && v != 1){
            this.error();
        }
        var command = this.code[2*(this.state)+v];
        var action = command & ACTION_MASK;
        switch (action){
            case NOOP:
                break;
            case FLIP:
                this.grid.set(this.x, this.y, +!v);
                break;
            case UP:
                this.y--;
                break;
            case DOWN:
                this.y++;
                break;
            case LEFT:
                this.x--;
                break;
            case RIGHT:
                this.x++;
                break;
        }
        
//         if (command & RELATIVE_BIT){
//             this.state += jump < 8 ? jump : jump - 16;
        var jump = command >> JUMPPART_SHIFT;
        if (jump >= 24){
            this.state += jump - 27
        } else {
            this.state = jump*BLOCK_SIZE;
        }
    }
    
    error(){
        this.state = ERROR;
        console.error("ERROR");
    }
}

return TuringMachine;
})();
        
