/* RGB LED strip with arduino and Android App bluetooth connection
    http://www.electronoobs.com

  ARDUINO       RGB
  3          RED
  5          GREEN
  9          BLUE
*/

//define the RGB pind
int red = 3;
int green = 5;
int blue = 9;

int c_red = 255;
int c_green = 255;
int c_blue = 255;
// Load Wi-Fi library
#include <ESP8266WiFi.h>

// Replace with your network credentials
const char *ssid = "REPLACE_WITH_YOUR_SSID";
const char *password = "REPLACE_WITH_YOUR_PASSWORD";

// Set web server port number to 80
WiFiServer server(80);

// Variable to store the HTTP request
String header;

// Current time
unsigned long currentTime = millis();
// Previous time
unsigned long previousTime = 0;
// Define timeout time in milliseconds (example: 2000ms = 2s)
const long timeoutTime = 2000;

void outputColor(int r, int g, int b)
{
  analogWrite(red, r);
  analogWrite(green, g);
  analogWrite(blue, b);
}

void setup()
{
  Serial.begin(9600);     //Start the serial comunication for the bluetooth module
  pinMode(red, OUTPUT);   //Red color pwm pin defined as output
  pinMode(green, OUTPUT); //Green color pwm pin defined as output
  pinMode(blue, OUTPUT);  //Blue color pwm pin defined as output

  //Give first value of the PWM 0, we start with the RGB LEDs off
  outputColor(c_red, c_green, c_blue);

  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  server.begin();
}

void loop()
{

  WiFiClient client = server.available(); // Listen for incoming clients
  if (client)
  {
    currentTime = millis();
    previousTime = currentTime;
    while (client.connected() && currentTime - previousTime <= timeoutTime)
    {
      currentTime = millis();

      if (client.available())
      {
        char c = client.read();
        header += c;
        if (c == '\n')
        {
          client.println("HTTP/1.1 200 OK");
          client.println("Content-type:text/html");
          client.println("Connection: close");
          client.println();
          if (header.indexOf("GET /on") >= 0)
          {
            if (header.indexOf("GET /on/") >= 0)
            {
              int f_index = header.indexOf("GET /on/");
              c_red = header.substring(f_index + 8, f_index + 11).toInt();
              c_green = header.substring(f_index + 11, f_index + 14).toInt();
              c_blue = header.substring(f_index + 14, f_index + 17).toInt();
            }
            outputColor(c_red, c_green, c_blue);
          }
        }
      }
    }
  }
}
