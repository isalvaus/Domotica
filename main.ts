serial.redirectToUSB()

//Periodo del PWM
pins.analogSetPeriod(AnalogPin.P0, 2000)
let command: String
let temp: Number

basic.forever(()=>{
    if (temp < input.temperature() && !pins.P6.digitalRead()  ) {
        pins.P6.digitalWrite(true)
    } else if (temp >= input.temperature() && pins.P6.digitalRead()) {
        pins.P6.digitalWrite(false)
    }
    
})

serial.onDataReceived(serial.NEW_LINE, () => {
    let command = serial.readLine().split(" ")
    let cmd = command.shift().toUpperCase()
    
    try{
        switch (cmd) {
            case "LUZ":
                let brightness = command.shift()
                    pins.P0.analogWrite(parseInt(brightness) * 1023 / 100)
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