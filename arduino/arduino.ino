#include <stdio.h>
#include <string.h>
#include "Fsm.h"

#define motorPin    6
#define ledPin      12
#define hardStopPin 4
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
  unsigned long seconds;
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
enum Events event_prev = EVENT_NULL;

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
  fsm.add_transition(&state_run, &state_run, EVENT_NULL, NULL);
  fsm.add_transition(&state_pause, &state_run, EVENT_CONTINUE, NULL);
  fsm.add_transition(&state_config, &state_idle, EVENT_END_CONFIG, NULL);
  //Serial.println("Setup ready.");
  fsm.run_machine();
  //Serial.println("Entering main loop.");
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
  // TODO: unificar recebir comandos y pasos en el loop
  char command[STEP_STRING_SIZE + 1] = {0};
  if(event == EVENT_NULL){
    if(Serial.available()){
      Serial.readBytesUntil('\n', command, STEP_STRING_SIZE);
      //Serial.print("Recived command:");
      //Serial.println(command);
      switch (command[0]) {
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
  event_prev = event;
  fsm.trigger(event);
  if(event != EVENT_NULL && event == event_prev){
    //Serial.println("Command unattended.");
    while(Serial.available()){Serial.read();};
    event = EVENT_NULL;
  }
}

void on_state_idle(){
  //Serial.println("State_idle.");
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
  //Serial.println("State_getset.");
  event = EVENT_NULL;
  memset(program, 0, sizeof(program));
  //Serial.print("Enter step:");
  //Serial.println(steps);
  while(steps < MAX_STEPS){
    if(Serial.available()){
      memset(buffer, '\0', sizeof(buffer));
      Serial.readBytesUntil('\n', buffer, STEP_STRING_SIZE);
      if(sscanf(buffer, "%d:%d#%d", &min, &sec, &vel) == 3){
        program[steps].seconds = min * 60 + sec;
        program[steps].velocity = vel; 
        steps++;
        //Serial.println("ACK");
        //Serial.print("Reading ");
        //Serial.println(buffer);
        //Serial.print("Min: ");
        //Serial.println(min);
        //Serial.print("Sec: ");
        //Serial.println(sec);
        //Serial.print("Vel: ");
        //Serial.println(vel);
        //Serial.print("Enter step:");
        //Serial.println(steps);
      } else {
        //Serial.print("Done reading after:");
        //Serial.println(buffer);
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
  //Serial.println("State_config.");
  sendPote();
}

void on_state_ready(){
  //Serial.println("State_ready.");
  event = EVENT_NULL;
  current_step = 0;
  remain_time = 0;
  stop_time = 0;
  sendPote();
}

void on_state_run(){
  if(event != EVENT_NULL){
    //Serial.println("State_run.");
    event = EVENT_NULL;
  }
  while(true){
    if(current_step < MAX_STEPS && program[current_step].seconds != 0){
      if(remain_time != 0){
        //Serial.print("Continue step:");
        //Serial.println(current_step);
        //Serial.print("Remain time (ms):");
        //Serial.println(remain_time);
        //Serial.print("Velocity:");
        //Serial.println(program[current_step].velocity);
        stop_time = millis() + remain_time;
        remain_time = 0;
      } else if(stop_time == 0){
        //Serial.print("Start step:");
        //Serial.println(current_step);
        //Serial.print("Duration (s):");
        //Serial.println(program[current_step].seconds);
        //Serial.print("Velocity:");
        //Serial.println(program[current_step].velocity);
        stop_time = millis() + program[current_step].seconds * 1000;
      };
      setVelocidad(program[current_step].velocity);
      while(!Serial.available() && millis() < stop_time);
      if(Serial.available()){
        //Serial.println("Command was sent.");
        break;
      } else {
        //Serial.println("Step completed.");
        current_step++;
      }
    } else {
      //Serial.println("Program completed.");
      event = EVENT_COMPLETED;
      setVelocidad(0);
      break;
    }
  }
}

void on_state_pause(){
  //Serial.println("State_pause.");
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

void sendPote() {
  int prev_pote = pote;
  event = EVENT_NULL;
  while(!Serial.available()){
    getPote();
    if(pote != prev_pote){
      Serial.println(pote);
      prev_pote = pote;
      delay(500);
    }
  }
}

void printData() {
  //Serial.print("Velocidad: ");
  //Serial.print(velocidad);
  //Serial.print(" - ");
  //Serial.print("Peso: ");
  //Serial.println(pote);
}
