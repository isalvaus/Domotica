//serial.redirectToUSB()
bluetooth.startUartService()

//Periodo del PWM
pins.analogSetPeriod(AnalogPin.P0, 2000)
let command: String
let temp: Number
let brillo:number


loops.everyInterval(500, function() {
    if (temp < input.temperature() && !pins.P6.digitalRead()) {
        pins.P6.digitalWrite(true)
    } else if (temp >= input.temperature() && pins.P6.digitalRead()) {
        pins.P6.digitalWrite(false)
    }
})


//Leemos los comandos del puerto serie y los ejeccutamos
bluetooth.onUartDataReceived(serial.NEW_LINE, () => {
    let command = bluetooth.uartReadUntil(bluetooth.NEW_LINE).split(" ")
    let cmd = command.shift().toUpperCase()
    
    try{
        switch (cmd) {
            case "LUZ":
                let brightness = command.shift()
                let brillo = parseInt(brightness)
                    
                    if (brillo <= 10){
                        pins.P0.digitalWrite(true)
                    }else if (brillo >= 90  && brillo < 100){
                        pins.P0.digitalWrite(false)
                    }else{
                        pins.P0.analogWrite((100 - brillo) * 1023 / 100)
                    }

                    serial.writeLine(brillo.toString())
                    break

                case "LOCK":
                    let position = command.shift().toUpperCase()
                    switch (position) {
                        case
                            "ON":
                            pins.P5.digitalWrite(true)
                            break
                        case
                            "OFF":
                            pins.P5.digitalWrite(false)
                            break
                    }

                    break

                case "TEMP":
                    temp = parseInt(command.shift())
                    break

                default:
                    serial.writeLine("Commando erroneo")

        }
    }
    catch(error){
        serial.writeLine(error)
    }

})