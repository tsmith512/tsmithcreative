---
title: Leak Detector for Home Automation
summary: >
  Using an ESP32 and two leak sensors with ESPHome and Home Assistant to warn me
  if the air conditioner tries to flood the house again.
tags: [home automation]
galleries:
  test-results:
    - src: ha-notify.png
      alt: Notification and Logbook in Home Assistant
      caption: Notification and Logbook in Home Assistant
    - src: phone-notify.png
      alt: Phone notification drawer
      caption: Phone notification drawer
---

You know what's a scary sound? The unexpected splattering of falling water.
Indoors.

My A/C drain line clogged, which caused the drip pan to overflow into my bedroom
through the ceiling. Upon inspection, the floater switch that should have shut
off the A/C compressor _didn't_ because the pan is apparently not level.

I have fixed the drain line and I _think_ I have fixed the floater switch. But
it would also be useful to know, with earlier warning, when this happens again.
So I decided to build a **cheap two-tier leak sensor with an ESP32 to page me**
next time.

## Parts List

- [ESP32 Development Board](https://www.amazon.com/dp/B07WCG1PLV)
- [Breakout board with screw terminals](https://www.amazon.com/dp/B0BNQ85GF3)
  for wired connections
- [LevelSense Floor Sensor](https://www.amazon.com/dp/B079YB1T8J)
  for the bottom of the pan (little leak)
- [Water Probe Liquid Detector](https://www.amazon.com/dp/B07L94MMP7)
  for the higher edge of the pan (big leak)
- _Software:_ [ESPHome](https://esphome.io/) and [Home Assistant](https://home-assistant.io/)

## Testing the Leak Sensors

**"When the sensor is in water, does it close the circuit?"**

Both of those leak sensors are just metal contacts in a plastic housing. Think
of them as bare wires in water, which is
([generally](https://www.usgs.gov/special-topics/water-science-school/science/conductivity-electrical-conductance-and-water))
conductive.

{{< media size="default" type="image" src="conductivity-test.jpg" alt="Checking for conductivity and resistance" >}}

Yep, the circuit is closed. With ~600kΩ resistance across the leak sensor itself,
plus the 45kΩ internal resistor that the ESP32 will add.

_For the life of me,_ I cannot find "what's the highest resistance across an
input pin" (or "what's the minimum current to an input pin" because `I = V/R`)
and still get a reading. But without offering specifics, lots of tutorials
suggested this would be enough.

## Proof of Concept

**"When the sensor is in water, can the device _do_ something?"**

There's a blue LED on the development board on `GPIO2`. I added one of the leak
sensors as an input on another pin.

``` c
#define LED_PIN 2
#define LEAK_PIN 12
int isLeaking;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(LEAK_PIN, INPUT_PULLUP);
}

void loop() {
  isLeaking = ! digitalRead(LEAK_PIN);
  digitalWrite(LED_PIN, isLeaking);
  delay(500);
}
```

This code reads the state of the sensor ---
_inverted_ because `INTERNAL_PULLUP` defaults to _high_ --- and sends that out
to the LED pin to turn it on (or off). I wrote and flashed this in the
[Arduino IDE](https://www.arduino.cc/en/software).

{{< media size="small" type="mp4" src="https://customer-igynxd2rwhmuoxw8.cloudflarestream.com/4ca56e1559eedfad24080a514616cb64/downloads/default.mp4">}}

## Moving to ESPHome

**"Can I monitor it remotely with Home Assistant?"**

[ESPHome](https://esphome.io/) is a control center of sorts for ESP32 devices to
easily manage a small fleet of them on a home network without writing any more
C. Also, it integrates easily and automatically with Home Assistant.

{{< media size="small" type="frame" src="esphome-ui.png" alt="ESPHome UI" >}}

### An Aside: Installation

In the thick of "side project mania" --- during which _carefully reading_
documentation isn't my strong suit --- I did get stuck on three steps that
seemed harder to learn than I would have expected.

For "_how to use Docker or Docker Compose to install and run it_" follow
the "Installation" section of
_[Getting Started with the ESPHome Command Line](https://esphome.io/guides/getting_started_command_line#installation)._

For "_how to connect an ESP32 to a Windows computer_," I needed to install the
[Windows CP210x USB to UART Bridge driver](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
first ([ref](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/establish-serial-connection.html)).

For "_how to flash it the first time_," I used the
[web installer](https://web.esphome.io/) because I didn't yet have an SSL
certificate for my self-hosted instance.

After using the web installer to enter my wifi info, the rest of the setup
happened on my instance.

### The Configuration

ESPHome auto-discovered the device. Here's what I added to the default
configuration. This will get interpreted and compiled into new firmware for the
device which can be reflashed over wifi.

``` yaml
# Define that onboard LED as a controllable switch
switch:
  - platform: gpio
    id: onboard_led
    name: "Onboard LED"
    pin:
      number: GPIO2
      mode: OUTPUT
    restore_mode: ALWAYS_OFF

# Define both leak detectors as binary sensors
binary_sensor:
  # Minor: base of the pan
  - platform: gpio
    name: leak_sensor_minor
    pin:
      number: GPIO4
      mode: INPUT_PULLUP
      inverted: true
    on_press:
      then:
        - switch.turn_on: onboard_led
    on_release:
      then:
        - switch.turn_off: onboard_led
  # Major: edge of the pan
  - platform: gpio
    name: leak_sensor_major
    pin:
      number: GPIO12
      mode: INPUT_PULLUP
      inverted: true
```

The `on_press` and `on_release` events turn the LED on, replicating the initial
test with the new firmware.

{{< media size="small" type="mp4" src="https://customer-igynxd2rwhmuoxw8.cloudflarestream.com/cca53f468fa4a0d7a88258c55d6f25a7/downloads/default.mp4">}}


This device was also auto-discovered by Home Assistant:

{{< media size="small" type="frame" src="discovered.png" alt="Home Assistant device details page" >}}

And once here, it's easy to add to dashboards and automations. But first...

## Back to the Attic

The "minor leak" sensor is for the bottom of the pan, which will submerge
quickly. The "major leak" sensor is mounted on the edge, to trigger when the pan
is close to overflowing.

{{< media size="small" type="image" src="pan.jpg" alt="Sensors in the pan" >}}

This mess is just unceremoniously taped to the top of a post.

{{< media size="small" type="image" src="post.jpg" alt="Device mounted to a post" >}}

For kicks, I added a [DHT11](https://www.amazon.com/gp/product/B0BG4DX7GD)
temperature and humidity sensor, although being that close to the HVAC output,
it's likely inaccurate when the system is running.

## Automations

**Can I make these easy to see and get alerts about?**

These are easy to add to a dashboard, but my philosophy on smart home tomfoolery
is that I shouldn't have to look at this much.

{{< media size="mini" type="image" src="dashboard.png" alt="HVAC Dashboard in Home Assistant" >}}

For automations, these can be used as _triggers:_ do something when the sensor
changes --- or they can be used as _conditions:_ when doing something, only
proceed if the sensor is in a certain state. I don't want to miss an early
warning, so I'm using the two sensors differently:

**For the "minor leak" sensor:** every six hours or if it changes, confirm if the
sensor is submerged. If so, alert. In the heat of summer, it took about 2 days
to overflow from empty, so this is plenty of time.

{{< media size="mini" type="image" src="minor.png" alt="Minor leak automation" >}}

**For the "major leak" sensor:** if it trips, shut off the A/C immediately and
let me know:

{{< media size="mini" type="image" src="major.png" alt="Major leak automation" >}}

## Quick Test

{{< media size="small" type="mp4" src="https://customer-igynxd2rwhmuoxw8.cloudflarestream.com/2eb1792b205f759eb0177d5d9ea0f7e7/downloads/default.mp4">}}

This was enough to trigger the sensor (and the onboard LED) on the device, as
shown in its logs:

{{< media size="mini" type="frame" src="esphome-log.png" alt="ESPHome on-device log" >}}

That event was sent to Home Assistant, triggering the automation, which raised
alerts there and on my phone.

{{< gallery test-results >}}

## Now what?

Hopefully, never hear from it again? Although I assume
"[blog posts about my attic]({{< ref "2024-01-05-motion-activated-camera" >}})"
will end up being a trilogy&hellip;

I'm curious about what else I can use ESP32s and ESPHome to _do_ because it
seems like a powerful platform and was easier to get started with than I had
initially realized.
