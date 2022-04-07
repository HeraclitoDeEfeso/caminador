## Listado de requerimientos

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Requerimientos funcionales
1. El profesional médico accederá a las estadísticas de uso del centro médico según máquina y paciente.
1. Se registrarán los ejercicios de todos los usuarios. (Pregunta: ejercicio vs. entrenamiento ¿sólo las secuencias?)
1. La tara de la galga será configurable al inicio del entrenamiento.
1. Todo ejercicio posee un tiempo de duración y una velocidad del motor.
1. La máquina será operable en modo "sin plan" indicándose los parámetros de un ejercicio.
1. La máquina será operable en modo "con plan" indicándose una secuencia de ejercicios asociados.
1. El peso del paciente ejercido sobre la galga antes del inicio del ejercicio se podrá monitoriar para posicionar al paciente de la mejor forma.
1. El peso del paciente ejercido sobre la galga al inicio del ejercicio será conservado. (Pregunta: ejercicio vs. entrenamiento ¿sólo las secuencias?)
1. Deberá ser posible detener un ejercicio en cualquier momento, siendo dicho evento conservado.
1. Un ejercicio detenido podrá continuarse.
1. El tiempo de cada ejercicio variará de entre 5 a 120 minutos. (Pregunta: ejercicio vs. entrenamiento ¿por ejercicio o por secuencia?)
1. El motor se utilizará con diez (10) velocidades distintas.
1. Los planes de entrenamiento deben poder conservarse.
1. Las estadísticas deberán poder enviarse por correo electrónico.
1. Las estadísticas deberán almacenarse en un servidor con acceso a Internet.
    #### Requerimientos no funcionales
1. El diseño será guiado por el principio de máxima agilidad en el manejo del sistema.
    #### Restricciones técnicas
1. La aplicación del dispositivo móvil que actúe como controlador de la máquina deberá desarrollarse mediante "MIT App Inventor" (http://ai2.appinventor.mit.edu/).
1. El dispositivo móvil que actúe como controlador de la máquina deberá conectarse de forma inhalámbrica mediante Bluetooth o WiFi.
1. La velocidad del motor resultante de su control por el dispositivo SINAMICS G110 será configurada a su vez por su interfaz analógica. (Pregunta: ¿es PWM?)
    #### Requerimientos de integración
1. La unidad de procesamiento controlará el motor a través del dispositivo SINAMICS G110 de la empresa Siemens.
