#define potePin A0
int pote = 0;

void setup() {
  Serial.begin(9600);
  while (!Serial);
}

void loop() {
  int pote_read = analogRead(potePin);
  if (pote != pote_read) {
    pote = pote_read;
    Serial.println(pote);
  }
  delay(1);
}
