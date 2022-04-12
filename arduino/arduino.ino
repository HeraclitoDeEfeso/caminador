#define motorPin 9
#define ledPin 12
#define hardStopPin 2
#define potePin A0
int velocidad = 0;
int pote = 0;
bool shouldPrint = false;

void setup() {
  pinMode(motorPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(hardStopPin, INPUT);
  Serial.begin(9600);
  while (!Serial);
  Serial.println("Velocidad de 0 a 10");
}

void setVelocidad(int velocidadSerial) {
  shouldPrint = shouldPrint || velocidad != velocidadSerial;
  if (velocidadSerial >= 0 && velocidadSerial <= 10) {
    velocidad = velocidadSerial;
    int velocidad_out = 255 * (float(velocidad) / 10);
    analogWrite(motorPin, velocidad_out);
  }
}

void setLeds() {
  if (velocidad == 0) {
    digitalWrite(ledPin, LOW);
  } else {
    digitalWrite(ledPin, HIGH);
  }
}

void blinkLeds() {
  digitalWrite(ledPin, HIGH);
  delay(200);
  digitalWrite(ledPin, LOW);  
  delay(200);
}

int getPote() {
  int poteSerial = analogRead(potePin);
  shouldPrint = shouldPrint || pote != poteSerial;
  pote = poteSerial;
  return pote;
}

void printDataTerminal() {
  if(shouldPrint) {
    Serial.print("Velocidad: ");
    Serial.print(velocidad);
    Serial.print(" - ");
    Serial.print("Peso: ");
    Serial.println(pote);
  }
  shouldPrint = false;
}

void printDataBT() {
  if(shouldPrint) {
    Serial.println(velocidad);
    Serial.println(pote);
  }
  shouldPrint = false;
}

void loop() {
  int hardStop = digitalRead(hardStopPin);
  if (hardStop == LOW) {
    getPote();
    if (Serial.available()) {
      int velocidadSerial = Serial.parseInt();
      setVelocidad(velocidadSerial);
      setLeds();
    }
  } else {
    // HARD STOP
    setVelocidad(0);
    blinkLeds();
  }
  printDataTerminal();
  delay(1);
}
