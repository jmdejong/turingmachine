# Turing machine

https://troido.nl/turingmachine/

The field is the 2d tape for the turing machine.

Each line in the code box is a state. The lines are 1-indexed (0 is the error state).

For each state there are 2 transitions to another state: one if the bit below the machine is 0 and one for if it's 1.
These transitions are comma separated in the code.
If there's only one, this transition will be executed in both cases.

Each transition consists of an action and a jump.

Actions can be any of "^", "v", ">", "<", "x", "_" which mean UP, DOWN, RIGHT, LEFT, FLIP and NOOP respectively.
The directions are to move the machine in that direction (absolute axes: LEFT always means `x = x - 1`)
FLIP means to flip the bit below the machine.
NOOP means to do nothing.

There's 3 types of syntax for jumps:  
 - `j12` means jump to state 12 (you can only jump to multiples of 4, and the maximum is 92)
 - `+3` means jump 3 states ahead (maximum: 4)
 - `-1` means jump 1 state backwards (maximum: 3)

Spaces are ignored, and everything from '#' to the end of the line is ignored as well.

`jE` means jump to the error state (which is 0).  
`E` as a transition is short for `_jE`.  
If a state is an empty line, it is assumed to be `E` as well.
