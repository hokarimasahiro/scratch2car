function joinBools (ledLeft: number, ledRight: number, patrolLeft: number, patrolRight: number) {
    slot3Value = ledLeft * 8 + ledRight * 4 + patrolLeft * 2 + patrolRight
}
ScratchMore.startService(function () {
	
})
function splitToBools (value: number) {
    ledLeft = logic.bittestN(value, 3)
    ledRight = logic.bittestN(value, 2)
    patrolLeft = logic.bittestN(value, 1)
    patrolRight = logic.bittestN(value, 1)
}
let patrolRight = 0
let patrolLeft = 0
let ledRight = 0
let ledLeft = 0
let slot3Value = 0
pins.digitalWritePin(DigitalPin.P0, 0)
let carType2 = carcotrol.getCarType()
if (carType2 == carcotrol.car(carType.Tinybit)) {
    basic.showString("T")
} else {
    basic.showString("M")
}
carcotrol.setNeoBrightness(50)
basic.forever(function () {
    carcotrol.CarCtrl2(ScratchMore.getSlot(Slot.SLOT0), ScratchMore.getSlot(Slot.SLOT1))
    ScratchMore.setSlot(Slot.SLOT2, carcotrol.getDistance())
    slot3Value = ScratchMore.getSlot(Slot.SLOT3)
    splitToBools(slot3Value)
    if (ledLeft == 1) {
        carcotrol.setLED(Position.Left, carcotrol.colors(RGBColors.White))
        if (carType2 == carcotrol.car(carType.Tinybit)) {
            carcotrol.setNeoPixelColor(0, carcotrol.colors(RGBColors.Orange))
        } else {
            carcotrol.setNeoPixelColor(0, carcotrol.colors(RGBColors.Orange))
            carcotrol.setNeoPixelColor(1, carcotrol.colors(RGBColors.Green))
        }
    } else {
        carcotrol.setLED(Position.Left, carcotrol.colors(RGBColors.Black))
        if (carType2 == carcotrol.car(carType.Tinybit)) {
            carcotrol.setNeoPixelColor(0, carcotrol.colors(RGBColors.Black))
        } else {
            carcotrol.setNeoPixelColor(0, carcotrol.colors(RGBColors.Black))
            carcotrol.setNeoPixelColor(1, carcotrol.colors(RGBColors.Black))
        }
    }
    if (ledRight == 1) {
        carcotrol.setLED(Position.Right, carcotrol.colors(RGBColors.White))
        if (carType2 == carcotrol.car(carType.Tinybit)) {
            carcotrol.setNeoPixelColor(1, carcotrol.colors(RGBColors.Orange))
        } else {
            carcotrol.setNeoPixelColor(3, carcotrol.colors(RGBColors.Orange))
            carcotrol.setNeoPixelColor(2, carcotrol.colors(RGBColors.Green))
        }
    } else {
        carcotrol.setLED(Position.Right, carcotrol.colors(RGBColors.Black))
        if (carType2 == carcotrol.car(carType.Tinybit)) {
            carcotrol.setNeoPixelColor(1, carcotrol.colors(RGBColors.Black))
        } else {
            carcotrol.setNeoPixelColor(3, carcotrol.colors(RGBColors.Black))
            carcotrol.setNeoPixelColor(2, carcotrol.colors(RGBColors.Black))
        }
    }
    patrolLeft = carcotrol.Line_Sensor(Position.Left)
    patrolRight = carcotrol.Line_Sensor(Position.Right)
    joinBools(ledLeft, ledRight, patrolLeft, patrolRight)
    ScratchMore.setSlot(Slot.SLOT3, slot3Value)
})
