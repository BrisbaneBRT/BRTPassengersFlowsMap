  
How to view the map in browser:

1. Make sure your browser support WebGL(check out at https://get.webgl.org/)

2. Use Command Prompt to start server.js
Go to the dictonary of "server.js" in cmd and use "node server.js" command to run. ( ...\...(dictionary of "server.js" in your computer)>node server.js)
It will return "Cesium development server running publicly. Connect to http://localhost:8888/"

3. Use your browser to visit http://localhost:8888/test/test.html

 *The format of trip trajectories file to be visualized is EsriJson, saved as resultT.json(...\test\resultT.json).
 The initial map of this example is Inbound flows of Brisbane BRT passengers(Open system).
 if you want to visualize another EsriJson file of trip trajectories (the field name for the value of passenger volume must be set as 'MAX_SUM_CO' ,see examples in the folder of “test”, "Inbound_	Closed""Outbound_Open""Outbound_Closed"), change your file name to 'resultT.json' and then replace the original one with it.