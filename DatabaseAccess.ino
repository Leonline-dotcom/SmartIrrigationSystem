#include <WiFi.h>
#include <WebServer.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <esp_wpa2.h>
#include <WiFiClient.h>

int ledPin = 22;
int buttonPin = 23;
bool ledState = false;

const char* ssid = "The Standard";
const char* password = "Ak10121012!";

WebServer server(80);

void sendHTTPRequest() {
    if(WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    const int httpPort = 5001;
    if (!client.connect("10.2.242.252", httpPort)) {
      Serial.println("Connection failed");
      return;
    }
    
    // This will send the request to the server
    client.print(String("GET ") + "/updateButtonPress" + " HTTP/1.1\r\n" +
                 "Host: " + "10.2.242.252" + "\r\n" + 
                 "Connection: close\r\n\r\n");
                     // Wait for the response and print it
    while(client.connected()){
      if(client.available()){
        String line = client.readStringUntil('\r');
        Serial.print(line);
      }
    }

    Serial.println();
    Serial.println("closing connection");
  }
          
}


void handleRoot() {
  String html = "<html><body><h1>ESP32 LED Control</h1>";
  html += "<p>LED is " + String(ledState ? "ON" : "OFF") + "</p>";
  html += "<button onclick=\"location.href='/toggleLED'\">Toggle LED</button>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void handleToggleLED() {
  ledState = !ledState;
  digitalWrite(ledPin, ledState);
  Serial.print("Toggling LED, new state: ");
  Serial.println(ledState ? "On" : "Off");
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  server.on("/", handleRoot);
  server.on("/toggleLED", handleToggleLED);
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected. Attempting to reconnect...");
    WiFi.reconnect();
  }
  if (digitalRead(buttonPin) == HIGH) {
    Serial.println("Button pressed!");
    ledState = !ledState;
    digitalWrite(ledPin, ledState);
    sendHTTPRequest(); // Send HTTP request on button press
    delay(300); // Debouncing delay
  }
  delay(50);
}
