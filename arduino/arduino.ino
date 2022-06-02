#include <stdio.h>
#include "Fsm.h"

#define motorPin    9
#define ledPin      12
#define hardStopPin 2
#define potePin     A0
#define MAX_STEPS   10
#define STEP_STRING_SIZE 8

enum Events {
  EVENT_BEGIN_PROGRAM,
  EVENT_END_PROGRAM,
  EVENT_BEGIN_CONFIG,
  EVENT_END_CONFIG,
  EVENT_DISCARD,
  EVENT_RUN,
  EVENT_PAUSE,
  EVENT_CONTINUE,
  EVENT_ERROR,
  EVENT_NULL,
  EVENT_COMPLETED
};

struct Step {
  int seconds;
  int velocity;  
};

struct Step program[MAX_STEPS] = {0};
State state_idle(&on_state_idle, NULL, NULL);
State state_getset(&on_state_getset, NULL, NULL);
State state_config(&on_state_config, NULL, NULL);
State state_ready(&on_state_ready, NULL, NULL);
State state_run(&on_state_run, NULL, NULL);
State state_pause(&on_state_pause, NULL, NULL);
Fsm fsm(&state_idle);

int velocidad = 0;
int pote = 0;
int current_step = 0;
unsigned long stop_time = 0;
unsigned long remain_time = 0;
enum Events event = EVENT_NULL;

void setup() {
  pinMode(motorPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(hardStopPin, INPUT);
  Serial.begin(9600);
  while (!Serial);
  fsm.add_transition(&state_idle, &state_getset, EVENT_BEGIN_PROGRAM, NULL);
  fsm.add_transition(&state_idle, &state_config, EVENT_BEGIN_CONFIG, NULL);
  fsm.add_transition(&state_getset, &state_idle, EVENT_DISCARD, NULL);
  fsm.add_transition(&state_getset, &state_ready, EVENT_END_PROGRAM, NULL);
  fsm.add_transition(&state_ready, &state_run, EVENT_RUN, NULL);
  fsm.add_transition(&state_ready, &state_getset, EVENT_BEGIN_PROGRAM, NULL);
  fsm.add_transition(&state_run, &state_ready, EVENT_COMPLETED, NULL);
  fsm.add_transition(&state_run, &state_pause, EVENT_PAUSE, NULL);
  fsm.add_transition(&state_pause, &state_run, EVENT_CONTINUE, NULL);
  fsm.add_transition(&state_config, &state_idle, EVENT_END_CONFIG, NULL);
  Serial.println("Setup ready.");
}

void loop() {
  
  // int hardStop = digitalRead(hardStopPin);
  // if (hardStop == LOW) {
  //   getPote();
  //   if (Serial.available()) {
  //     int velocidadSerial = Serial.parseInt();
  //     setVelocidad(velocidadSerial);
  //     setLeds();
  //   }
  // } else {
  //   // HARD STOP
  //   setVelocidad(0);
  //   blinkLeds();
  // }
  // printData();
  // delay(1);
  Serial.println("Main loop.");
  char command;
  if(event == EVENT_NULL){
    if(Serial.available()){
      command = Serial.read();
      switch (command) {
        case 'a':
          event = EVENT_BEGIN_PROGRAM;
          break;
        case 'b':
          event = EVENT_END_PROGRAM;
          break;
        case 'c':
          event = EVENT_BEGIN_CONFIG;
          break;
        case 'd':
          event = EVENT_END_CONFIG;
          break;
        case 'e':
          event = EVENT_DISCARD;
          break;
        case 'f':
          event = EVENT_RUN;
          break;
        case 'g':
          event = EVENT_PAUSE;
          break;
        case 'h':
          event = EVENT_CONTINUE;
          break;
        default:
          event = EVENT_ERROR;
          break;
      };
    };
  };
  fsm.trigger(event);
}

void on_state_idle(){
  Serial.println("State_idle.");
  event = EVENT_NULL;
  setVelocidad(0);
  setLeds();
}

void on_state_getset(){
  char buffer[STEP_STRING_SIZE + 1] = {0};
  int steps = 0;
  int min = 0;
  int sec = 0;
  int vel = 0;
  int i;
  Serial.println("State_getset.");
  event = EVENT_NULL;
  for(i = 0; i < MAX_STEPS; i++){
    program[i].seconds = 0;
    program[i].velocity = 0; 
  }
  while(steps < MAX_STEPS){
    if(Serial.available()){
      if(Serial.readBytesUntil('\n', buffer, STEP_STRING_SIZE) 
        && sscanf(buffer, "%d:%d#%d", &min, &sec, &vel) == 3){
          program[steps].seconds = min * 60 + sec;
          program[steps].velocity = vel; 
          steps++;
          Serial.println("ACK");
      } else {
        break;
      }
    }
  };
  if(steps){
    event = EVENT_END_PROGRAM;
  } else {
    event = EVENT_DISCARD;
  };
}

void on_state_config(){
  Serial.println("State_config.");
  int prev_pote = pote;
  event = EVENT_NULL;
  while(!Serial.available()){
    getPote();
    if(pote != prev_pote){
      Serial.println(pote);
      prev_pote = pote;
    }
  }
}

void on_state_ready(){
  Serial.println("State_ready.");
  event = EVENT_NULL;
  current_step = 0;
  remain_time = 0;
  on_state_config();
}

void on_state_run(){
  Serial.println("State_run.");
  event = EVENT_NULL;
  while(true){
    if(current_step < MAX_STEPS && program[current_step].seconds != 0){
      if(remain_time){
        stop_time = millis() + remain_time;
        remain_time = 0;
      } else {
        stop_time = millis() + program[current_step].seconds * 1000;
      };
      setVelocidad(program[current_step].velocity);
      while(!Serial.available() && millis() < stop_time);
      if(Serial.available()){
        break;
      } else {
        current_step++;
      }
    } else {
      event = EVENT_COMPLETED;
    }
  }
}

void on_state_pause(){
  Serial.println("State_pause.");
  unsigned long current_time = millis();
  event = EVENT_NULL;
  setVelocidad(0);
  if(current_time < stop_time){
    remain_time = stop_time - current_time;
  } else {
    current_step++;
  };
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
