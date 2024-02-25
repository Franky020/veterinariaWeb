//librerias usadas
#include "BluetoothSerial.h"

//#define USE_PIN // Uncomment this to use PIN during pairing. The pin is specified on the line below
const char *pin = "1234"; // Change this to more secure PIN.

String device_name = "alimentador";

#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif

#if !defined(CONFIG_BT_SPP_ENABLED)
#error Serial Bluetooth not available or not enabled. It is only available for the ESP32 chip.
#endif

//declaracion de sensores y actuadores
const int led = 4,
          motor = 18,
          sensorIR = 5;

BluetoothSerial SerialBT;

void setup() {
  Serial.begin(115200);
  pinMode(motor, OUTPUT);
  pinMode(led, OUTPUT);
  SerialBT.begin(device_name); //Bluetooth device name
  Serial.printf("Se a iniciado el \"%s\" \nAhora se puede conectar el dispositivo maestro\n", device_name.c_str());
  //Serial.printf("The device with name \"%s\" and MAC address %s is started.\nNow you can pair it with Bluetooth!\n", device_name.c_str(), SerialBT.getMacString()); // Use this after the MAC method is implemented
  #ifdef USE_PIN
    SerialBT.setPin(pin);
    Serial.println("Using PIN");
  #endif
}

void loop() {
  int value = 0;
  if (Serial.available()) {
      SerialBT.write(SerialBT.read());
  }
  if (SerialBT.available()) {
      SerialBT.write(SerialBT.read());
      char message = SerialBT.read(); 
      value = digitalRead(sensorIR);

      if (message == '1') {
        Serial.println("Encender alimentador");
        digitalWrite(motor, HIGH);
        digitalWrite(led, HIGH);
        if(sensorIR == 1){
          digitalWrite(motor, LOW);
          digitalWrite(led, LOW);
        }
      }
      else{
        digitalWrite(motor, LOW);
        digitalWrite(led, LOW);
      }
      delay(200);
    }
    
}
