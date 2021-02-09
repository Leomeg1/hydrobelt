input.onButtonPressed(Button.A, function () {
    basic.showString("Hello!")
    basic.pause(1000)
    nowTime = input.runningTime()
})
let nowTime = 0
let nextRemindtime = 0
let USER_TYPE_CHILD = 1
let USER_TYPE_ADULT = 2
let USER_TYPE_ELDERLY = 3
let DRINK_PERIOD_CHILD = 2700
let DRINK_PERIOD_ADULT = 3600
let DRINK_PERIOD_ELDERY = 2700
// in ml
let DRINK_EACH_TIME_CHILD = 200
// in ml
let DRINK_EACH_TIME_ADULT = 250
// in ml
let DRINK_EACH_TIME_ELDERY = 200
// in ml
let DRINK_AMOUNT_CHILD = 1500
// in ml
let DRINK_AMOUNT_ADULT = 2000
// in ml
let DRINK_AMOUNT_ELDERY = 2000
nowTime = input.runningTime()
let userType = USER_TYPE_CHILD
