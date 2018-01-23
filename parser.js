
var parseAsm = (function(){
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

const STATE_MAX = 95;

const actions = {
    "_": NOOP,
    "^": UP,
    "v": DOWN,
    "<": LEFT,
    ">": RIGHT,
    "x": FLIP,
    "E": ERROR
}

function parseAsm(code){
    code = code.replace(/ /g, ""); // remove spaces
    var commands = code.split("\n").map(l => l.split("#")[0]); // split lines and remove comments
    while (commands.length && !commands[commands.length-1]){
        // remove trailing empty lines
        commands.pop();
    }
    var b = new ArrayBuffer((commands.length + 1) * 2);
    var m = new Uint8Array(b, 2);
    for (let i in commands){
        let parts = commands[i].split(",");
        if (parts.length == 1){
            parts = [parts[0], parts[0]];
        }
        let line = (i|0)+1;
        if (parts.length != 2){
            throw "Parsing Error on line "+line+": A command should have 1 or 2 parts";
        }
        let fByte = parsePart(parts[0], line);
        let tByte = parsePart(parts[1], line);
        m[i*2] = fByte;
        m[i*2 + 1] = tByte;
    }
    return b;
}

function parsePart(part, line){
    if (!part || part == "E"){
        return NOOP | (ERROR << 3)
    }
    var actionText = part[0];
    var action = actions[actionText];
    if (action == undefined){ // conveniently also compare for null
        throw "Parse error on line "+line+" '"+part+"': invalid action "+actionText;
    }
    var jumpType = part[1];
    var jumpText = part.substr(2); // is there a difference between substr, substring and slice when only one argument is given?
    var jump;
    if (jumpText == "E"){
        jump = 0;
    } else {
        jump = Number.parseInt(jumpText);
    }
    if (isNaN(jump) || jump < 0 || jump > STATE_MAX){
        throw "Parse error on line "+line+" '"+part+"': invalid jump "+jumpText;
    }
    
    var relBit;
    if (jumpType == "j"){
        relBit = 0;
        if (jump % BLOCK_SIZE){
            throw "error on line "+line+" '"+part+"': absolute jump must be a multiple of "+BLOCK_SIZE;
        }
        jump = jump / BLOCK_SIZE;
    } else if (jumpType == "+"){
        if (jump > 4){
            throw "error on line "+line+" '"+part+"': relative jump must be at most 4";
        }
        jump = 27 + jump;
    } else if (jumpType == "-"){
        if (jump > 3){
            throw "error on line "+line+" '"+part+"': relative jump must not exceed -3";
        }
        jump = 27 - jump;
    } else {
        throw "error on line "+line+" '"+part+"': invalid jump type"
    }
    
    return action | (jump << JUMPPART_SHIFT);
}

return parseAsm;
})();


