## Listado de requerimientos

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Requerimientos funcionales
1. El profesional médico accederá a las estadísticas de uso del centro médico según máquina y paciente.
1. La tara de la galga será configurable al inicio del ejercicio.
1. La máquina será operable en modo "libre" indicándose el tiempo de uso y la velocidad de la cinta.
1. La máquina será operable en modo "programado" indicándose una secuencia de tiempos de uso y velocidades de la cinta.
1. Los datos personales del paciente, el peso del paciente ejercido sobre la galga al inicio del ejercicio y los parámetros del ejecicio serán conservados.
1. Deberá ser posible detener un ejercicio en cualquier momento, siendo dicho evento conservado.
    #### Requerimientos no funcionales
    #### Restricciones técnicas
1. La aplicación del dispositivo móvil que actúe como controlador de la máquina deberá desarrollarse mediante "MIT App Inventor" (http://ai2.appinventor.mit.edu/).
1. El dispositivo móvil que actúe como controlador de la máquina deberá conectarse de forma inhalámbrica mediante Bluetooth o WiFi.
1. Las estadísticas deberán poder enviarse en formato CSV a un correo electrónico.
    #### Requerimientos de integración
1. La unidad de procesamiento controlará el motor a través del dispositivo SINAMICS G110 de la empresa Siemens.
