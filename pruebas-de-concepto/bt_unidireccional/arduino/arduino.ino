#define ledPin 12

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  while (!Serial);
}

void loop() {
  if (Serial.available()) {
    char caracter = Serial.read();
    if(caracter == 'a'){ digitalWrite(ledPin, HIGH);}
    if(caracter == 'b'){ digitalWrite(ledPin, LOW);} 
  }
  delay(1);
}
