#define motorPin 9
#define ledPin 12
#define hardStopPin 2
#define potePin A0
int velocidad = 0;
int pote = 0;

void setup() {
  pinMode(motorPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(hardStopPin, INPUT);
  Serial.begin(9600);
  while (!Serial);
  Serial.println("Velocidad 0 a 10");
}

void setVelocidad(int velocidadSerial) {
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

void getPote() {
  pote = analogRead(potePin);
}

void printData() {
  Serial.print("Velocidad: ");
  Serial.print(velocidad);
  Serial.print(" - ");
  Serial.print("Peso: ");
  Serial.println(pote);
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
  printData();
  delay(1);
}
