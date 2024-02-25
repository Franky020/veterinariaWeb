#include "BluetoothSerial.h"

#define USE_NAME // Comment this to use MAC address instead of a slaveName
const char *pin = "1234"; // Change this to reflect the pin expected by the real slave BT device

#if !defined(CONFIG_BT_SPP_ENABLED)
#error Serial Bluetooth not available or not enabled. It is only available for the ESP32 chip.
#endif

BluetoothSerial SerialBT;

#ifdef USE_NAME
  String slaveName = "alimentador"; // Change this to reflect the real name of your slave BT device
#else
  String MACadd = "AA:BB:CC:11:22:33"; // This only for printing
  uint8_t address[6]  = {0xAA, 0xBB, 0xCC, 0x11, 0x22, 0x33}; // Change this to reflect real MAC address of your slave BT device
#endif

String myName = "Servidor";

//configuracion de sensor
const int led = 4;  


void setup() {
  bool connected;
  Serial.begin(115200);

  pinMode(led,OUTPUT);  

  SerialBT.begin(myName, true);
  Serial.printf("El\"%s\" a iniciado, Asegurate que el alimentador este encendido!\n", myName.c_str());

  #ifndef USE_NAME
    SerialBT.setPin(pin);
    Serial.println("Using PIN");
  #endif

  #ifdef USE_NAME
    connected = SerialBT.connect(slaveName);
    Serial.printf("Conectado al \"%s\"\n", slaveName.c_str());
  #else
    connected = SerialBT.connect(address);
    Serial.print("Conectando al alimentador con la MAC "); Serial.println(MACadd);
  #endif

  if(connected) {
    Serial.println("Conección realizada!");
  } else {
    while(!SerialBT.connected(10000)) {
      Serial.println("Fallo al conectar");
    }
  }
  // Disconnect() may take up to 10 secs max
  if (SerialBT.disconnect()) {
    Serial.println("Desconeccion completa!");
  }
  // This would reconnect to the slaveName(will use address, if resolved) or address used with connect(slaveName/address).
  SerialBT.connect();
  if(connected) {
    Serial.println("Reconección completa!");
  } else {
    while(!SerialBT.connected(10000)) {
      Serial.println("Failed to reconnect. Make sure remote device is available and in range, then restart app.");
    }
  }
}

void loop() {
    if (Serial.available()) {
    SerialBT.write(SerialBT.read());
  }
  if (SerialBT.available()) {
    SerialBT.write(SerialBT.read());
  }
  delay(1000);
}

