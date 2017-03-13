---
title: My First Custom Alexa Skill, Powered by Home Assistant
summary: >
  Using Home Assistant's built-in Alexa integration, I can ask Alexa about my 3D
  printer or for a better weather report.
tags: [home automation, conversational interfaces, 3d printing]
---

On a scale of 1 to 10, I currently rate my "Alexa Skill" skills at a whopping
"learning to put legos together." My home automation setup is built using
[Home Assistant](HASS) (my [configuration on GitHub](HC)). One of the many
[components it integrates with](HASSAE) is the Amazon Echo.

It offers two styles: integration via the Home Skills API for switching my
lights and powering custom commands via the Skills API. I've set up both as
documented on the [component page](HASSAE).

For my first foray into custom commands, I wanted Alexa to be able to tell me
about the status of 3D printing jobs. Seemed simple enough. Let's walk through
it:

### Part 1: Home Assistant Components

For this, I'll need the following from Home Assistant:

- Monitoring the [OctoPrint][OP] instance that runs my printer
- Alexa Skills Integration

**Setting up Hass's OctoPrinti sensors is easy, and is done in three parts:**

First, set up the ["OctoPrint Hub" component](HASSOP1), which just provides the
API access. ([My config][HCPI])

```
# In the root of the configuration file:
octoprint:
  host: 192.168.1.49
  api_key: !secret octoprint_api
```

Second, set up the "[OctoPrint Binary Sensor](HASSOP2)," which gives simple
"yes/no" answers about status, which makes crafting the status message easier.
([My config](HCBN))

```
binary_sensor:
  - platform: octoprint
    monitored_conditions:
      - Printing
      - Printing Error
```

Finally, setting up the "[OctoPrint Sensor](HASSOP3)," which gives more detailed
information as numbers and strings. ([My config](HCS))

```
sensor:
  - platform: octoprint
    name: OctoPrint
    monitored_conditions:
      - Current State
      - Temperatures
      - Job Percentage
```

_Bonus: setting up the camera feed so the Home Assistant window can show you the
print surface is also pretty simple. ([My config](HCCAM))_

```
camera:
  - platform: mjpeg
    name: Printer Camera
    mjpeg_url: http://192.168.1.49/webcam/?action=stream
    still_image_url: http://192.168.1.49/webcam/?action=snapshot
```



[HASS]: https://home-assistant.io/
[HASSC]: https://github.com/tsmith512/home-assistant-config
[HASSAE]: https://home-assistant.io/components/alexa/
[OP]: https://octopi.octoprint.org/
[HASSOP1]: https://home-assistant.io/components/octoprint/
[HCPI]: https://github.com/tsmith512/home-assistant-config/blob/master/configuration.yaml#L85-L87
[HASSOP2]: https://home-assistant.io/components/binary_sensor.octoprint/
[HCBN]: https://github.com/tsmith512/home-assistant-config/blob/master/configuration.yaml#L62-L66
[HASSOP3]: https://home-assistant.io/components/sensor.octoprint/
[HCS]: https://github.com/tsmith512/home-assistant-config/blob/master/sensor.yaml#L30-L35
[HCCAM]: https://github.com/tsmith512/home-assistant-config/blob/master/configuration.yaml#L68-L72
