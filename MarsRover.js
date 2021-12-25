class Direction {
    value;
    leftSide;
    rightSide;
    constructor(obj) {
        this.value = obj.value
        this.leftSide = obj.leftSide
        this.rightSide = obj.rightSide
    }
    turn(action) {
        return action == actions.RIGHT ? this.rightSide : this.leftSide
    }
}
const actions = {
    LEFT: 'L',
    RIGHT: 'R',
    MOVE_FORWARD: 'M'
}
const directions = {
    NORTH: new Direction({ value: 'N', leftSide: 'W', rightSide: 'E' }),
    SOUTH: new Direction({ value: 'S', leftSide: 'E', rightSide: 'W' }),
    EAST: new Direction({ value: 'E', leftSide: 'N', rightSide: 'S' }),
    WEST: new Direction({ value: 'W', leftSide: 'S', rightSide: 'N' }),
}
class Rover {
    x = 0;
    y = 0;
    facingDirection = "N";
    constructor(x, y, dir) {
        this.x = x
        this.y = y
        this.facingDirection = dir
    }
    doAction(action, platformLimits) {
        if (action == actions.MOVE_FORWARD) {
            switch (this.facingDirection) {
                case directions.NORTH.value:
                    this.y = (this.y + 1) <= platformLimits.y ? this.y + 1 : this.y
                    break;
                case directions.SOUTH.value:
                    this.y = (this.y - 1) >= 0 ? this.y - 1 : this.y
                    break;
                case directions.WEST.value:
                    this.x = (this.x - 1) >= 0 ? this.x - 1 : this.x
                    break;
                case directions.EAST.value:
                    this.x = (this.x + 1) <= platformLimits.x ? this.x + 1 : this.x
                    break;
                default:
                    break;
            }
        } else {
            this.facingDirection = directions[getEnumKeyByEnumValue(directions, this.facingDirection)].turn(action)
        }
        console.log("action:",action,platformLimits,this)
    }
}
function getEnumKeyByEnumValue(myEnum, enumValue) {
    let keys = Object.keys(myEnum).filter((x) => myEnum[x].value == enumValue);
    return keys.length > 0 ? keys[0] : '';
}

function roboticRoversLandingAction(inputStr) {
    let lines = inputStr.split("\n")
    let firstLine = lines[0].split(' ')
    let platformLimits = { x: parseInt(firstLine[0]), y: parseInt(firstLine[1]) }
    let outputs = ""
    for (let i = 1; i < lines.length; i = i + 2) {
        const roverInfoLine = lines[i].split(' ')
        const rover = new Rover(parseInt(roverInfoLine[0]), parseInt(roverInfoLine[1]), roverInfoLine[2])
        const roverActionLine = lines[i + 1].split('')
        console.log(rover)
        roverActionLine.forEach(action => {
            rover.doAction(action, platformLimits)
        });
        outputs += rover.x + " " + rover.y + " " + rover.facingDirection+"\n"
    }
    return outputs;
}
console.log(roboticRoversLandingAction("5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM"))
