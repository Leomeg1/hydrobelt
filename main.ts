input.onButtonPressed(Button.A, function () {
    if (state == STATE_WAITING) {
        amountDrunk += DRINK_EACH_TIMES[userType]
        if (amountDrunk >= DRINK_GOAL_AMOUNTS[userType]) {
            state = STATE_SHOW_GOAL_ACHIEVED
        } else {
            state = STATE_SHOW_AMOUNT_DRINK
        }
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (state == STATE_WAITING) {
        userType += 1
        if (userType == USER_TYPE_ELDERLY) {
            userType = USER_TYPE_CHILD
        }
        state = STATE_SHOW_USER_TYPE
    }
})
input.onButtonPressed(Button.B, function () {
    if (state == STATE_WAITING) {
        amountDrunk += 0 - DRINK_EACH_TIMES[userType]
        if (amountDrunk < 0) {
            amountDrunk = 0
        }
        state = STATE_SHOW_AMOUNT_DRINK
    }
})
let state = 0
let STATE_SHOW_GOAL_ACHIEVED = 0
let STATE_WAITING = 0
let STATE_SHOW_AMOUNT_DRINK = 0
let STATE_SHOW_USER_TYPE = 0
let USER_TYPE_CHILD = 0
let userType = 0
let DRINK_EACH_TIMES: number[] = []
let DRINK_GOAL_AMOUNTS: number[] = []
let USER_TYPE_ELDERLY = 0
let amountDrunk = 0
let USER_TYPE_ADULT = 1
USER_TYPE_ELDERLY = 2
let USER_TYPE_STRS = ["Child.", "Adult.", "Elderly."]
DRINK_GOAL_AMOUNTS = [2000, 1500, 2000]
DRINK_EACH_TIMES = [200, 250, 200]
let DRINK_PERIODS = [3600, 2700, 2700]
userType = USER_TYPE_CHILD
let nextRemindtime
let nowTime = input.runningTime()
let tmp
STATE_SHOW_USER_TYPE = 1
STATE_SHOW_AMOUNT_DRINK = 2
STATE_WAITING = 3
STATE_SHOW_GOAL_ACHIEVED = 4
basic.forever(function () {
    let STATE_GREET = 0
    if (state == STATE_GREET) {
        basic.showString("HydroBelt!")
        state = STATE_SHOW_USER_TYPE
    } else if (state == STATE_SHOW_USER_TYPE) {
        basic.showString("" + (USER_TYPE_STRS[userType]))
        state = STATE_SHOW_AMOUNT_DRINK
    } else if (state == STATE_SHOW_AMOUNT_DRINK) {
        basic.showString("" + amountDrunk.toString() + "ml")
        state = STATE_WAITING
    } else if (state == STATE_SHOW_GOAL_ACHIEVED) {
        basic.showString("Goal!" + amountDrunk.toString() + "ml")
    }
})
