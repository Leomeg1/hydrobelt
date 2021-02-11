input.onButtonPressed(Button.A, function () {
    if (state == STATE_WAITING) {
        amountDrunk += DRINK_EACH_TIMES[userType]
        if (amountDrunk >= DRINK_GOAL_AMOUNTS[userType]) {
            state = STATE_SHOW_GOAL_ACHIEVED
        } else {
            state = STATE_SHOW_AMOUNT_DRINK
        }
    } else if (state == STATE_SHOW_GOAL_ACHIEVED_WAITING) {
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
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (state == STATE_WAITING) {
        userType += 1
        if (userType > USER_TYPE_ELDERLY) {
            userType = USER_TYPE_CHILD
        }
        state = STATE_SHOW_USER_TYPE
    }
})
let nextShowGoalAchievedTime = 0
let nextWaitingTime = 0
let nextRemindTime = 0
let nextScreenSaveTime = 0
let STATE_GREET = 0
let state = 0
let amountDrunk = 0
let userType = 0
let DRINK_EACH_TIMES: number[] = []
let DRINK_GOAL_AMOUNTS: number[] = []
let USER_TYPE_ELDERLY = 0
let USER_TYPE_CHILD = 0
let STATE_SHOW_GOAL_ACHIEVED_WAITING = 0
let STATE_SHOW_GOAL_ACHIEVED = 0
let STATE_WAITING = 0
let STATE_SHOW_AMOUNT_DRINK = 0
let STATE_SHOW_USER_TYPE = 0
STATE_SHOW_USER_TYPE = 1
STATE_SHOW_AMOUNT_DRINK = 2
STATE_WAITING = 3
let STATE_SHOW_SCREEN_SAVER = 4
let STATE_REMIND_DRINK = 5
STATE_SHOW_GOAL_ACHIEVED = 6
STATE_SHOW_GOAL_ACHIEVED_WAITING = 7
USER_TYPE_CHILD = 0
let USER_TYPE_ADULT = 1
USER_TYPE_ELDERLY = 2
let USER_TYPE_STRS = ["Child", "Adult", "Elderly"]
DRINK_GOAL_AMOUNTS = [1600, 2000, 2000]
DRINK_EACH_TIMES = [200, 250, 200]
// let DRINK_PERIODS = [2700, 3600, 2700] // in seconds
// in seconds
let DRINK_PERIODS = [2700, 3600, 2700]
// in seconds
let SCREEN_SAVER_PERIOD = 5
let SCREEN_SAVER_SHOW_TIME = 1000
let SCREEN_SAVER_NUM_ICONS = 40
userType = USER_TYPE_CHILD
let screenSaverIdx = 0
amountDrunk = 0
state = STATE_GREET
basic.forever(function () {
    if (state == STATE_GREET) {
        basic.showString("HydroBelt!", 100)
state = STATE_SHOW_USER_TYPE
    } else if (state == STATE_SHOW_USER_TYPE) {
        amountDrunk = 0
        basic.clearScreen()
        basic.showString(USER_TYPE_STRS[userType], 100)
state = STATE_SHOW_AMOUNT_DRINK
    } else if (state == STATE_SHOW_AMOUNT_DRINK) {
        basic.showString(amountDrunk.toString() + "ml", 100)
nextScreenSaveTime = input.runningTime() + SCREEN_SAVER_PERIOD * 1000
        nextRemindTime = input.runningTime() + DRINK_PERIODS[userType] * 1000
        state = STATE_WAITING
    } else if (state == STATE_WAITING) {
        if (input.runningTime() > nextScreenSaveTime) {
            nextScreenSaveTime += SCREEN_SAVER_PERIOD * 1000
            nextWaitingTime = input.runningTime() + SCREEN_SAVER_SHOW_TIME
            basic.showIcon(screenSaverIdx)
screenSaverIdx += 1
            if (screenSaverIdx >= SCREEN_SAVER_NUM_ICONS) {
                screenSaverIdx = 0
            }
            state = STATE_SHOW_SCREEN_SAVER
        } else if (input.runningTime() > nextRemindTime) {
            state = STATE_REMIND_DRINK
        }
    } else if (state == STATE_REMIND_DRINK) {
        music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
        nextRemindTime += DRINK_PERIODS[userType] * 1000
        state = STATE_WAITING
    } else if (state == STATE_SHOW_SCREEN_SAVER) {
        if (input.runningTime() > nextWaitingTime) {
            basic.clearScreen()
            state = STATE_WAITING
        }
    } else if (state == STATE_SHOW_GOAL_ACHIEVED) {
        basic.clearScreen()
        basic.showString("Goal!"+amountDrunk.toString() + "ml", 100)
basic.showIcon(IconNames.Happy)
        nextShowGoalAchievedTime = input.runningTime() + 2000
        state = STATE_SHOW_GOAL_ACHIEVED_WAITING
    } else if (state == STATE_SHOW_GOAL_ACHIEVED_WAITING) {
        if (input.runningTime() >= nextShowGoalAchievedTime) {
            state = STATE_SHOW_GOAL_ACHIEVED
        }
    }
})
