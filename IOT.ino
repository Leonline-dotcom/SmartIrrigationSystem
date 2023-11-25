#include <WiFi.h>
#include <WebServer.h>
#include <SPI.h>

int ledPin = 22;
int buttonPin = 23;
bool ledState = false;

const char* ssid = "utexas-iot";
const char* password = "76906237978097172978"; 
// PSK: 76906237978097172978
WebServer server(80);


void handleRoot() {
  String html = "<html><body><h1>ESP32 LED Control</h1>";
  
  html += "<p>LED is " + String(ledState ? "ON" : "OFF") + "</p>";
  html += "<button onclick=\"location.href='/toggleLED'\">Toggle LED</button>";
  html += "</body></html>";
  
  server.send(200, "text/html", html);
}


void handleToggleLED() {
  ledState = !ledState;        // Toggle the state of the LED
  digitalWrite(ledPin, ledState);  // Set the LED to the new state
  
  // Debugging output
  Serial.print("Toggling LED, new state: ");
  Serial.println(ledState ? "On" : "Off");

//  String html = "<html><body><h1>ESP32 LED Control</h1>";
//  html += "<p>LED is now " + String(ledState ? "ON" : "OFF") + "</p>";
//  html += "<button onclick=\"location.href='/'\">Go Back</button>";
//  html += "</body></html>";
//  server.send(200, "text/html", html); // Send the response with the current state
  server.sendHeader("Location", "/");
  server.send(303);
}


void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);

  Serial.begin(9600);
  Serial.print("MAC Address: ");
  Serial.println(WiFi.macAddress());
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Set up web server routes
  server.on("/", handleRoot);
  server.on("/toggleLED", handleToggleLED);
  
  server.begin();
  Serial.println("HTTP server started");
}

bool buttonPressed = false;
void loop() {
    server.handleClient(); // Handle any incoming web requests
  
  
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected. Attempting to reconnect...");
    WiFi.reconnect();
  }

  //Physical button check
  if (digitalRead(buttonPin) == HIGH) {
    ledState = !ledState;
    digitalWrite(ledPin, ledState);
    delay(300); // Debouncing delay
  }


  delay(50);

}
