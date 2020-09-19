function joinBools (ledLeft: number, ledRight: number, patrolLeft: number, patrolRight: number) {
    slot3Value = ledLeft * 8 + ledRight * 4 + patrolLeft * 2 + patrolRight
}
ScratchMore.startService(function () {
	
})
function splitToBools (value: number) {
    ledLeft = Math.floor(value / 8)
    ledRight = Math.floor((value - ledLeft * 8) / 4)
    patrolLeft = Math.floor((value - ledLeft * 8 - ledRight * 4) / 2)
    patrolRight = value - ledLeft * 8 - ledRight * 4 - patrolLeft * 2
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
        carcotrol.setLED(Position.Left, carcotrol.colors(RGBColors.Red))
        carcotrol.setNeoPixelColor(0, carcotrol.colors(RGBColors.Orange))
    } else {
        carcotrol.setLED(Position.Left, carcotrol.colors(RGBColors.Black))
        carcotrol.setNeoPixelColor(0, carcotrol.colors(RGBColors.Black))
    }
    if (ledRight == 1) {
        carcotrol.setLED(Position.Right, carcotrol.colors(RGBColors.Red))
        carcotrol.setNeoPixelColor(1, carcotrol.colors(RGBColors.Orange))
    } else {
        carcotrol.setLED(Position.Right, carcotrol.colors(RGBColors.Black))
        carcotrol.setNeoPixelColor(1, carcotrol.colors(RGBColors.Black))
    }
    patrolLeft = carcotrol.Line_Sensor(Position.Left)
    patrolRight = carcotrol.Line_Sensor(Position.Right)
    joinBools(ledLeft, ledRight, patrolLeft, patrolRight)
    ScratchMore.setSlot(Slot.SLOT3, slot3Value)
})
