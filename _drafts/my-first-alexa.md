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
- Let Amazon connect to Home Assistant

**Setting up Hass's OctoPrinti sensors is easy, and is done in three parts:**

![My Home Assistant](/assets/blog/alexa-hass-octoprint/home-assistant.png)

1. Set up the ["OctoPrint Hub" component](HASSOP1), which just provides the API
   access.
2. Set up the "[OctoPrint Binary Sensor](HASSOP2)," which gives simple "yes/no"
   answers about status, which makes crafting the status message easier.
3. Set up the "[OctoPrint Sensor](HASSOP3)," which gives more detailed
   information as numbers and strings.
4. _Bonus:_ setting up the camera feed so the Home Assistant window can show you
   the print surface is also pretty simple.

Replace `192.168.1.49` with the IP address or hostname of your OctoPrint server.

```
# Step 1:
octoprint:
  host: 192.168.1.49
  api_key: !secret octoprint_api

# Step 2:
binary_sensor:
  - platform: octoprint
    monitored_conditions:
      - Printing
      - Printing Error

# Step 3:
sensor:
  - platform: octoprint
    name: OctoPrint
    monitored_conditions:
      - Current State
      - Temperatures
      - Job Percentage

# Bonus:
camera:
  - platform: mjpeg
    name: Printer Camera
    mjpeg_url: http://192.168.1.49/webcam/?action=stream
    still_image_url: http://192.168.1.49/webcam/?action=snapshot
```
Links to relevant parts of my configuration:
[OP Hub](HCPI), [OP Binary](HCBN), [OP Sensor](HCS), [OP Camera](HCCAM).

Now that Home Assistant knows the metrics we want to use, it needs to be
reachable from the internet.

**Allowing connections from AWS to Home Assistant is a little less straightforward.**

_Set an HTTP API password._ Repeat after me: _set an API password._

Also, the Alexa Skills API will only connect to HTTPS endpoints.

```
# In the root of configuration.yaml
http:
  api_password: !secret http_password
  ssl_certificate: /home/hass/.homeassistant/cert.pem
  ssl_key: /home/hass/.homeassistant/key.pem

# In secrets.yaml
http_password: NowIKnowMyABCs
```

Next, I generated self-signed certificates with these commands. You can provide
a cert file to AWS to skip SSL validation, so self-signed certs for personal-use
skills are sufficient.

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 3650 -nodes
```

Finally, open and forward your router's external port 443 to your Hass server on
the port that Home Assistant actually runs on. **Note:** understand the possible
ramifications of this before you do it. Do not expose internal resources to
external traffic unless you understand the risks.

---

### Part 2: Alexa Skills Configuration

Home Assistant's [Alexa Component documentation](HASSAE) outlines the steps
required and it's pretty straightforward, though slightly outdated:

![AWS Dev Console](/assets/blog/alexa-hass-octoprint/aws-dev-console-login.jpg)

- Log in to [Amazon developer console](ADC)
- Click "Alexa" in the top navigation bar, then "Get Started" under "Alexa
  Skills Kit"

![AWS Dev Console](/assets/blog/alexa-hass-octoprint/skills-list.jpg)

- Click "Add a new skill" in the top right

![Create a New Skill](/assets/blog/alexa-hass-octoprint/new-skill.jpg)

- For **Skill Type** keep "Custom Interaction Model" selected.
- The **Name** is the skill name as shown in the Alexa app and the Developer
  Console; it's an administrative title.
- The **Invocation Name** is the skill you request verbally, e.g. "Alexa, ask
  _Hathi_ for...". _(All my computers are named for [Jungle Book characters](JB);
  Colonel Hathi is the elephant leader.)

Then click next to configure the **intents**, or the things Home Assistant can
do. Each intent has a name, and `slots` for variables to pass to the skill.

![Intents](/assets/blog/alexa-hass-octoprint/intents.jpg)

In our first example, we'll set up a skill to get the status of the 3D printer.
There are no variable slots for this skill:

``` js
{
  "intents": [
    {
      "intent": "PrinterStatusIntent"
    }
  ]
}
```

The "utterances" are the things a user can say to trigger the intent, after the
"Alexa, as _Invocation Name_." This becomes "Alexa, ask Hathi about the
printer."

```
PrinterStatusIntent printer status
PrinterStatusIntent about the printer
```

Then click next to work through the endpoint configuration:

![Intents](/assets/blog/alexa-hass-octoprint/intents.jpg)

- For **Endpoint**, I selected "HTTPS." It's easy to hook up an AWS Lambda
  resource, but since Home Assistant has an Alexa API built-in, it was easier to
  have AWS connect directly.
  - _Note_ if you're unable to get HTTPS going on Home Assistant, or you can't
    forward port 443, there is a [Lambda Proxy function in the Hass forums](LPX).
- Select the sensible region for your endpoint.
- Enter your endpoint URL in the displayed field: `https://YOUR_HOST/api/alexa?api_password=YOUR_API_PASSWORD`
- Do not enable **Account Linking**. That's if AWS would need account-specific
  data, like the Spotify skill. Home Assistant doesn't have user accounts.

Next up is SSL configuration:

![SSL](/assets/blog/alexa-hass-octoprint/intents.jpg)

If you created an SSL certificate in Part 1 above, copy the whole text of the
`.crt` file into this text field:

```
-----BEGIN CERTIFICATE-----
MIIFizCCA3OgAwIBAgIJAPT2pfywHi0gMA0GCSqGSIb3DQEBCwUAMFwxCzAJBgNV
ZXhhczEPMA0GA1UEBwwGQXVzdGluMRUwEwYDVQQKDAxUYXlsb3IgU21pdGgxFTAT
3iIdre51O1o4KT0TIuvPT5qcn67icq7TC8wvzKpduavgMZta2OoiWtZuXrGXQCQ9
[[ ... A dozen or two more lines like this ... ]]
-----END CERTIFICATE-----
```

Click next for the testing options, the final step required to make this skill
run for personal use.

![Testing On](/assets/blog/alexa-hass-octoprint/test.jpg)

On this page, you can send a test request and see the full exchange between Home
Assistant and Amazon:

![Testing On](/assets/blog/alexa-hass-octoprint/test-results.jpg)



[HASS]: https://home-assistant.io/
[HC]: https://github.com/tsmith512/home-assistant-config
[HASSAE]: https://home-assistant.io/components/alexa/
[OP]: https://octopi.octoprint.org/
[HASSOP1]: https://home-assistant.io/components/octoprint/
[HCPI]: https://github.com/tsmith512/home-assistant-config/blob/master/configuration.yaml#L85-L87
[HASSOP2]: https://home-assistant.io/components/binary_sensor.octoprint/
[HCBN]: https://github.com/tsmith512/home-assistant-config/blob/master/configuration.yaml#L62-L66
[HASSOP3]: https://home-assistant.io/components/sensor.octoprint/
[HCS]: https://github.com/tsmith512/home-assistant-config/blob/master/sensor.yaml#L30-L35
[HCCAM]: https://github.com/tsmith512/home-assistant-config/blob/master/configuration.yaml#L68-L72
[ADC]: https://developer.amazon.com
[JB]: https://en.wikipedia.org/wiki/The_Jungle_Book_(1967_film)#Cast
[LPX]: https://community.home-assistant.io/t/aws-lambda-proxy-custom-alexa-skill-when-you-dont-have-https/5230
