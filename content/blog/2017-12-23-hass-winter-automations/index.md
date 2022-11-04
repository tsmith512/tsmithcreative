---
title: Winterizing my Home Assistant Config
summary: >
  There's no sun in the morning or at night, so let's make some artificial
  sunlight with Home Assistant and scripts that use data and service templates.
tags: [side projects, home automation]
---

"Days are so terribly short in winter!" sounds better than "I'm a night owl who
can't get out of bed in the morning like a responsible adult." Either way, I'm
trying new home automation routines in an attempt to instill better habits.

My home automation system is built with [Home Assistant][HASS] to control lights
and [other stuff][HASSPI] in my apartment. I've added three new sets of
configuration which are all "winter lights" related as an exercise in
learning how Hass's templating works.

1. Simulated sunrise in the morning
   _(uses a simple script plus automation)._
2. Evening and night lights in my office and living space
   _(same, with a data template in the script)._
3. Christmas lights that turn on at dusk and turn off at 1am
   _(uses a service template in the automation)._

# 1: Waking Up in the Morning

**Simulate a sunrise starting at 7am** using the pair of
[LIFX White 800][LIFX] bulbs.

First, I wrote a script that steps through three very slow up-fades. It starts
with a warm color temperature at low intensity and "cools up" to a brighter
daylight-white. This is a script instead of an automation so that I can start it
manually, ask Alexa to start it, or rope it into other schedules in the future.

``` yaml
# In scripts.yaml

upstairs_sunrise:
  alias: Upstairs Sunrise
  sequence:

    # Turn the lights to low brightness at a very warm temperature
    - service: light.turn_on
      data:
        entity_id: group.lights_bedroom
        transition: 60
        brightness: 51
        kelvin: 2700

    # Wait 5 seconds
    - delay: 00:00:05

    # Over ten minutes, turn the lights a little brighter and to a
    # cooler-than-soft-white color.
    - service: light.turn_on
      data:
        entity_id: group.lights_bedroom
        transition: 600
        brightness: 63
        kelvin: 3600

    # Wait again
    - delay: 00:00:05

    # Finally, over fifteen minutes, shift the lights to a cool white at 90%.
    - service: light.turn_on
      data:
        entity_id: group.lights_bedroom
        transition: 900
        brightness: 230
        kelvin: 4200
```

The "looks" are hardcoded into the script instead of re-using scenes because of
the extended transitions.

With the script ready to go, start it automatically by specifying an automation
triggered at 7am on weekdays:

``` yaml
# In automation.yaml

- alias: Sunrise
  trigger:

  # Trigger every morning at 7
  - platform: time
    at: "07:00:00"

  # Condition: must be a weekday. This is more concise than setting 5 triggers.
  condition:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri

  # Action is simple here, just trigger the script, which is a service.
  action:
  - service: script.upstairs_sunrise
```

The script and automation will both appear in Home Assistant's UI:

{{< media type="image" size="" src="sunrise-ui.png" alt="Script and Automation in Hass UI"  >}}

Turning on the _script_ will start the sunrise routine immediately.

Turning on/off the _automation_ will either trigger the sunrise at 7am in the
workweek or not, so I turn this off when I'm leaving town or there's a holiday.

---

# 2: Evening and Night-lights Downstairs

**Next, a few fades through the late afternoon and evening** using the LIFX
bulbs in the ceiling fixtures and Zwave switches on the lamps in my
office/living room/kitchen.

From 8am, these sit at a middle 3500K: shy of daylight-white but cooler than a
"soft white" bulb. They step down in brightness and shift warmer three times:
5pm, 7pm, and 9pm.

Unlike the Sunrise, these are all [scenes][SCN] that I can reuse because the
scene transition time is fine. But like the Sunrise, I still separated the
action into a script so I can also use it to turn the lights on to the
"appropriate" setting at any time.

``` yaml
{% raw %}# In scripts.yaml

downstairs_lights_on:
  alias: Downstairs Lights On
  sequence:
    # Turn on a scene
    - service: scene.turn_on
      # Use a data_template
      data_template:
        entity_id: >
          scene.downstairs_
          {%-  if now().hour < 7 %}night
          {% elif now().hour < 17 %}daylight
          {% elif now().hour < 19 %}evening
          {% elif now().hour >= 21 %}night
          {% endif %}{% endraw %}
```

The **data template** is evaluated by Home Assistant when the script is called.
It will return `scene.downstairs_night` between 9pm and 7am,
`scene.downstairs_daylight` from 7am until 5pm, and so on.

Notice the `{{ "{%-" }}` at the opening of the `if` tag: that is a Jinja2
whitespace control directive which removes the newline after `downstairs_`.

For simplicity, the automation runs every hour, but only if the lights are on:

``` yaml
# In automation.yaml

- alias: Downstairs Sunlight

  # Run hourly
  trigger:
    - platform: time
      minutes: 00
      seconds: 00

  # Only do this if the lights are on.
  # Test two lights, in case one is offline (which happens with LIFX sometimes)
  condition:
    condition: or
    conditions:
      - condition: state
        entity_id: 'light.workstation'
        state: 'on'
      - condition: state
        entity_id: 'light.kitchen'
        state: 'on'

  # Call the script to handle the rest
  action:
    - service: script.downstairs_lights_on
```

**Work-in-Progress:** As is, if I set the lights manually to something else,
they'll revert back to the value from the script at the top of the hour. I'm
considering options that will suspend the automation for the rest of the day if
I do that. An idea: creating a binary sensor triggered by a state change, or
something that will look for overrides and pause the automation.

---

# 3: Add Christmas Lights

**'Tis the season to automate Christmas lights with a Zwave switch.** This one
is simple and can be written a few different ways. I combined it into a single
automation using a service template to give that a shot.

``` yaml
{% raw %}# In automation.yaml

- alias: Christmas Lights Auto
  trigger:

  # Trigger at 1am
  - platform: time
    at: "01:00:00"

  # Trigger 30 minutes before sunset
  - platform: sun
    event: sunset
    offset: '-00:30:00'

  # Turn off or turn on?
  action:
    service_template: >
      switch.turn_{% if states('sun.sun') == "above_horizon" %}on{% else %}off{% endif %}
    entity_id: switch.switch_6_0{% endraw %}
```

The _data template_ in the earlier example passed a scene name to a hardcoded
service (`scene.turn_on`). Here, a **service template** picks the service name
instead and passes it a hardcoded `entity_id` (the switch).

Because this is triggered either before sunset (so, the sun is up) or at 1am
(when the sun is down), the service template returns `switch.turn_on` or
`switch.turn_off` based on the `state` of the `sun.sun` entity.

The first version I wrote had two automations instead: one to turn the lights on
at sunset -30m and one to turn them off again in the middle of the night, but
consolidating them into a single automation set seemed cleaner.

# Tricky Bits

- I can't tell whether `entity_id` is supposed to be part of service `data` or
  not:
  ```
  # So is it:
    service: light.turn_on
    entity_id: light.ceiling

  # Or is it:
    service: light.turn_on
    data:
      entity_id: group.bedroom
  ```
  These are the first two examples on [Script Syntax documentation][SSD],
  showing it both ways. And it appears to matter _sometimes._ But when selecting
  `entity_id` dynamically with a template, that value must a child of the
  `data_template` list.
- In a template, remember to use `states('entity')` instead of the `states`
  object to get the text value of a state name. In the above example, that's
  `states('sun.sun')` as opposed to `states.sun.sun` to get `above_horizon`.
- File under "stupid user error:" I couldn't figure out why my script wasn't
  turning on the Christmas lights. Because I was thinking about "lights" not
  "switches," I wrote the service `light.turn_on` instead of `switch.turn_on`.
  There is no error logged when you use a service on an incompatible entity,
  but once I switched that out, it was fine.

---

It's only recently that writing Home Assistant actions has started feeling
easier. There are several acceptable syntax options, and I found service and
data templates powerful but hard to approach at first, so there was some
tinkering to get this working. But now I'm starting to get all kinds of ideas
with the explosion of new Hass components lately.

Happy New Year to all!

[HASS]: https://home-assistant.io/
[HASSPI]: {% post_url 2017-03-16-alexa-octoprint-home-assistant %}
[LIFX]: https://www.lifx.com
[SCN]: https://github.com/tsmith512/home-assistant-config/blob/master/scene.yaml
[SSD]: https://home-assistant.io/docs/scripts/
