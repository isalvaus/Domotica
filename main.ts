serial.redirectToUSB()

//Periodo del PWM
pins.analogSetPeriod(AnalogPin.P0, 2000)
pins.P0.analogWrite(50 * 10)
let command: String

serial.onDataReceived(serial.NEW_LINE, () => {
    let command = serial.readLine().split(" ")
    let cmd = command.shift().toUpperCase()
    
    try{
        switch (cmd) {
            case "LUZ":
                let nPWM = parseInt(command.shift())
                let brightness = command.shift()
                    pins.P0.analogWrite(parseInt(brightness) * 10)
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
                    let temp = parseInt(command.shift())
                    if (temp < input.temperature()){
                        pins.P6.digitalWrite(true)
                    }else{
                        pins.P6.digitalWrite(false)
                    }
                    
                    break

                default:
                    serial.writeLine("Commando erroneo")

        }
    }
    catch(error){
        serial.writeLine(error)
    }

})