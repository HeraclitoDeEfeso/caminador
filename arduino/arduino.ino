#include <stdio.h>
#include <string.h>
#include "Fsm.h"

#define DEBUG             if(0)
#define motorPin          6
#define ledPin            12
#define hardStopPin       4
#define potePin           A0
#define MAX_STEPS         10
#define STEP_STRING_SIZE  8

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
  EVENT_COMPLETED,
  EVENT_HARD_STOP,
  EVENT_UNLOCK
};

struct Step {
  unsigned long seconds;
  int velocity;  
};

struct Step program[MAX_STEPS] = {0};

State state_idle      (&on_state_idle,      NULL, NULL);
State state_getset    (&on_state_getset,    NULL, NULL);
State state_config    (&on_state_config,    NULL, NULL);
State state_ready     (&on_state_ready,     NULL, NULL);
State state_run       (&on_state_run,       NULL, NULL);
State state_pause     (&on_state_pause,     NULL, NULL);
State state_hard_stop (&on_state_hard_stop, NULL, NULL);

Fsm fsm(&state_idle);

int velocidad = 0;
int pote = 0;
int current_step = 0;

unsigned long stop_time = 0;
unsigned long remain_time = 0;

volatile enum Events event = EVENT_NULL;

void setup() {

  pinMode(motorPin,     OUTPUT);
  pinMode(ledPin,       OUTPUT);
  pinMode(hardStopPin,  INPUT);
  
  Serial.begin(9600);
  while (!Serial);
  
  fsm.add_transition(&state_idle,       &state_getset,    EVENT_BEGIN_PROGRAM,  NULL);
  fsm.add_transition(&state_idle,       &state_config,    EVENT_BEGIN_CONFIG,   NULL);
  fsm.add_transition(&state_getset,     &state_idle,      EVENT_DISCARD,        NULL);
  fsm.add_transition(&state_getset,     &state_ready,     EVENT_END_PROGRAM,    NULL);
  fsm.add_transition(&state_ready,      &state_run,       EVENT_RUN,            NULL);
  fsm.add_transition(&state_ready,      &state_getset,    EVENT_BEGIN_PROGRAM,  NULL);
  fsm.add_transition(&state_ready,      &state_idle,      EVENT_DISCARD,        NULL);
  fsm.add_transition(&state_run,        &state_idle,      EVENT_COMPLETED,      NULL);
  fsm.add_transition(&state_run,        &state_idle,      EVENT_DISCARD,        NULL);
  fsm.add_transition(&state_run,        &state_pause,     EVENT_PAUSE,          NULL);
  fsm.add_transition(&state_run,        &state_run,       EVENT_NULL,           NULL);
  fsm.add_transition(&state_run,        &state_hard_stop, EVENT_HARD_STOP,      NULL);
  fsm.add_transition(&state_hard_stop,  &state_idle,      EVENT_UNLOCK,         NULL);
  fsm.add_transition(&state_pause,      &state_run,       EVENT_CONTINUE,       NULL);
  fsm.add_transition(&state_config,     &state_idle,      EVENT_END_CONFIG,     NULL);
  
  fsm.run_machine();

  DEBUG Serial.println("Setup ready.");
  DEBUG Serial.println("Entering main loop.");

}

void loop() {
  
  enum Events event_prev = EVENT_NULL;
  int command = 0;

  if(event == EVENT_NULL){

    if(Serial.available()){

      command = Serial.read();

      DEBUG Serial.print("Recived command:");
      DEBUG Serial.println(char(command));

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

  event_prev = event;
  fsm.trigger(event);
  
  if(event != EVENT_NULL && event == event_prev){

    DEBUG Serial.println("Command unattended.");
    
    while(Serial.available()) Serial.read();
    
    event = EVENT_NULL;

  }
}

void on_state_hard_stop(){

  DEBUG Serial.println("State_hard_stop.");

  setVelocidad(0);
  Serial.print("STOP");
  DEBUG Serial.println(" event fired.");
  delay(250); // Bouncing

  while(digitalRead(hardStopPin) == HIGH){
  
    digitalWrite(ledPin, !digitalRead(ledPin));
    delay(100);
  
  }  

  event = EVENT_UNLOCK;

  Serial.print("INIT");
  DEBUG Serial.println(" event fired.");

}

void on_state_idle(){

  DEBUG Serial.println("State_idle.");
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

  event = EVENT_NULL;
  
  memset(program, 0, sizeof(program));
  
  DEBUG Serial.println("State_getset.");
  
  while(steps < MAX_STEPS){

    DEBUG Serial.print("Enter step:");
    DEBUG Serial.println(steps);
  
    while(Serial.available() < STEP_STRING_SIZE);
  
    memset(buffer, '\0', sizeof(buffer));
    Serial.readBytes(buffer, STEP_STRING_SIZE);

    if(sscanf(buffer, "%d:%d#%d", &min, &sec, &vel) == 3){

      if(min == 0 && sec == 0 && vel == 0) {
        DEBUG Serial.println("Endding program step recived.");
        break;
      }

      program[steps].seconds = min * 60 + sec;
      program[steps].velocity = vel; 
      steps++;

      DEBUG Serial.println("ACK");
      DEBUG Serial.print("Reading ");
      DEBUG Serial.println(buffer);
      DEBUG Serial.print("Min: ");
      DEBUG Serial.println(min);
      DEBUG Serial.print("Sec: ");
      DEBUG Serial.println(sec);
      DEBUG Serial.print("Vel: ");
      DEBUG Serial.println(vel);

    } else {

      DEBUG Serial.print("Error reading:");
      DEBUG Serial.println(buffer);

      event = EVENT_ERROR;
      break;

    };
  };
}

void on_state_config(){

  DEBUG Serial.println("State_config.");
  sendPote();

}

void on_state_ready(){

  DEBUG Serial.println("State_ready.");
  event = EVENT_NULL;
  current_step = 0;
  remain_time = 0;
  stop_time = 0;
  sendPote();

}

void on_state_run(){

  if(event != EVENT_NULL){

    DEBUG Serial.println("State_run.");
    event = EVENT_NULL;
    digitalWrite(ledPin, HIGH);

  }

  while(true){

    if(current_step < MAX_STEPS && program[current_step].seconds != 0){

      if(remain_time != 0){

        DEBUG Serial.print("Continue step:");
        DEBUG Serial.println(current_step);
        DEBUG Serial.print("Remain time (ms):");
        DEBUG Serial.println(remain_time);
        DEBUG Serial.print("Velocity:");
        DEBUG Serial.println(program[current_step].velocity);

        stop_time = millis() + remain_time;
        remain_time = 0;

      } else if(stop_time == 0){

        DEBUG Serial.print("Start step:");
        DEBUG Serial.println(current_step);
        DEBUG Serial.print("Duration (s):");
        DEBUG Serial.println(program[current_step].seconds);
        DEBUG Serial.print("Velocity:");
        DEBUG Serial.println(program[current_step].velocity);
        
        stop_time = millis() + program[current_step].seconds * 1000;

      };

      setVelocidad(program[current_step].velocity);
      setLeds();
      
      while(digitalRead(hardStopPin) != HIGH && !Serial.available() && millis() < stop_time);
      
      if(digitalRead(hardStopPin) == HIGH){

        setVelocidad(0);
        event = EVENT_HARD_STOP;
        break;

      } else if(Serial.available()){

        DEBUG Serial.println("Command was sent.");
        break;

      } else {

        Serial.print("STEP");
        DEBUG Serial.println(" completed.");
        current_step++;
        remain_time = 0;
        stop_time = 0;

      }

    } else {

      setVelocidad(0);
      event = EVENT_COMPLETED;
      DEBUG Serial.println("Program completed.");
      digitalWrite(ledPin, LOW);
      break;

    }
  }
}

void on_state_pause(){

  unsigned long current_time = millis();
  event = EVENT_NULL;

  DEBUG Serial.println("State_pause.");

  setVelocidad(0);
  
  if(current_time < stop_time)
    remain_time = stop_time - current_time;
  else 
    remain_time = 1;

}

void setVelocidad(int velocidadSerial) {

  if (velocidadSerial >= 0 && velocidadSerial <= 10) {
    velocidad = velocidadSerial;
    int velocidad_out = 255 * (float(velocidad) / 10);
    analogWrite(motorPin, velocidad_out);
  }

}

void setLeds() {

  digitalWrite(ledPin, (velocidad)? HIGH : LOW);

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
      digitalWrite(ledPin, !digitalRead(ledPin));
      delay(500);

    }
  
  }

  digitalWrite(ledPin, LOW);

}

void printData() {

  DEBUG Serial.print("Velocidad: ");
  DEBUG Serial.print(velocidad);
  DEBUG Serial.print(" - ");
  DEBUG Serial.print("Peso: ");
  DEBUG Serial.println(pote);

}
