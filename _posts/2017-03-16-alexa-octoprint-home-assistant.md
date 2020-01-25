---
title: My First Custom Alexa Skill, Powered by Home Assistant
summary: >
  Using Home Assistant's built-in Alexa integration, I can ask Alexa about my 3D
  printer or for a better weather report.
tags: [home automation, conversational interfaces, 3d printing]
---

On a scale of 1 to 10, I currently rate my "Alexa Skill" skills at a whopping
"learning to put legos together." My home automation setup is built using
[Home Assistant][HASS] (my [configuration on GitHub][HC]). One of the many
[components it integrates with][HASSAE] is the Amazon Echo.

It offers two styles: integration via the Home Skills API for switching my
lights and powering custom commands via the Skills API. I've set up both as
documented on the [component page][HASSAE].

For my first foray into custom commands, I wanted Alexa to be able to tell me
about the status of 3D printing jobs. Seemed simple enough. Let's walk through
it.

Part 1 deals with the 3D printer integration, but Parts 2 through 4 pair up the
two services and can be used for any information or command. My code samples
include a custom weather report, too.

### Part 1: Home Assistant's OctoPrint Component

For this, I'll need Hass to monitor the [OctoPrint][OP] instance that runs my
printer. This part is easy, and done in three parts:

{% picture /blog/alexa-hass-octoprint/home-assistant.png --alt My Home Assistant %}

1. Set up the ["OctoPrint Hub" component][HASSOP1], which just provides the API
   access and authentication.
2. Set up the "[OctoPrint Binary Sensor][HASSOP2]," which gives simple "yes/no"
   answers about status, which makes crafting the status message easier.
3. Set up the "[OctoPrint Sensor][HASSOP3]," which gives more detailed
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

# Bonus, if you have a webcam on your OctoPi
camera:
  - platform: mjpeg
    name: Printer Camera
    mjpeg_url: http://192.168.1.49/webcam/?action=stream
    still_image_url: http://192.168.1.49/webcam/?action=snapshot
```

Links to relevant parts of my configuration:
[OctoPrint Hub][HCPI], [the binary senors][HCBN], [regular sensors][HCS], and [webcam][HCCAM].

Now that Home Assistant knows the metrics we want to use, it needs to be
reachable from the Internet.

---

### Part 2: Allowing Connections from AWS to Home Assistant

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

Next, I generated a self-signed certificate with this command. You can provide a
cert file to AWS to skip SSL validation, so self-signed certs for personal-use
skills are sufficient.

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 3650 -nodes
```

Finally, open and forward your router's external port 443 to your Hass server on
the port that it actually runs on. **Note:** understand the possible
ramifications of this before you do it. Do not expose internal resources to
external traffic unless you understand these risks.

Restart Home Assistant for the new OctoPrint integration and SSL configuration.
Remember, using a self-signed certificate will cause you to have an SSL warning
in your browser.

---

### Part 3: The Home Assistant Skill Configuration

Home Assistant has an Alexa Skills API component out of the box, all we need to
do is configure the Hass side of the skill we're building. In this example,
we'll use the newly configured OctoPrint sensors to announce the 3D printer
status.

```{% raw %}
alexa:
  intents:
  # OCTOPRINT STATUS
  PrinterStatusIntent:
    speech:
      type: plaintext
      text: >
        The printer is {{ states("sensor.octoprint_current_state") | lower }}
        {% if is_state("binary_sensor.octoprint_printing", "on") %}
          and the job is {{ states("sensor.octoprint_job_percentage") | round }} percent complete
        {% else %}
          and not currently printing
        {% endif %}.
{% endraw %}```

This sets up a simple response to the `PrinterStatusIntent` intent using Home
Assistant's [templating][HASST] engine. Remember that intent name, we'll use it
again on the Amazon configuration. The response reads something like:

> The printer is **printing** and the job is **80%** complete.

Or, if the printer isn't printing but Home Assistant and OctoPrint are connected:

> The printer is **operational** and not currently printing.

[My Alexa configuration file][HCALX].

Once this is saved, restart Home Assistant and you'll have the Alexa skill
response ready to test from Amazon. The skill will not appear in the Hass UI.

---

### Part 4: Alexa Skills Configuration

Home Assistant's [Alexa Component documentation][HASSAE] outlines the steps
required. It's pretty straightforward, though slightly outdated. Here's a
picture guide as of March 2017. (Amazon changes this frequently, I gather.)

- Login to or sign up for the [Amazon Developer Console][ADC]

{% picture /blog/alexa-hass-octoprint/aws-dev-console-login.png --alt AWS Dev Console %}

- Click "Alexa" in the top navigation bar, then "Get Started" under "Alexa
  Skills Kit"

{% picture /blog/alexa-hass-octoprint/skills-list.png --alt AWS Skills List %}

- Click "Add a new skill" in the top right

Next, we'll set up the skill basics:

{% picture /blog/alexa-hass-octoprint/new-skill.png --alt Create a New Skill %}

- For **Skill Type** keep "Custom Interaction Model" selected.
- The **Name** is the skill name as shown in the Alexa app and the Developer
  Console; it's an administrative title.
- The **Invocation Name** is the skill you request verbally, e.g. "Alexa, ask
  _Hathi_ for...". _(All my computers are named for [Jungle Book characters][JB];
  Colonel Hathi is the elephant leader.)_

Then click next to configure the **intents**, or the things Home Assistant can
do. Each intent has a name, and `slots` for variables to pass to the skill.

{% picture /blog/alexa-hass-octoprint/intents.png --alt Intents %}

Remember the Intent name we used above? Repeat that here to link this up to the
Home Assistant configuration: `PrinterStatusIntent`

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
"Alexa, ask _Invocation Name_." This becomes "Alexa, ask Hathi for the printer
status," or "Alexa, ask Hathi about the printer."

```
PrinterStatusIntent printer status
PrinterStatusIntent about the printer
```

Then click next to work through the endpoint configuration:

{% picture /blog/alexa-hass-octoprint/configuration.png --alt Intents %}

- For **Endpoint**, I selected "HTTPS." It's easy to hook up an AWS Lambda
  resource, but since Home Assistant has an Alexa API built-in, it was easier to
  have AWS connect directly.
  - _Note_ if you're unable to get HTTPS going on Home Assistant, or you can't
    forward port 443, there is a [Lambda Proxy function in the Hass forums][LPX].
- Select the sensible region for your endpoint.
- Enter your endpoint URL in the displayed field: `https://YOUR_HOST/api/alexa?api_password=YOUR_API_PASSWORD`
- Do not enable **Account Linking**. That's if AWS would need account-specific
  data, like Spotify or YNAB skills. Home Assistant doesn't have user accounts.

Next up is SSL configuration:

{% picture /blog/alexa-hass-octoprint/ssl.png --alt SSL %}

If you created an SSL certificate in Part 1 above, copy the whole text of the
`.pem` file into this text field:

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

{% picture /blog/alexa-hass-octoprint/test.png --alt Testing On %}

On this page, you can send a test request and see the full exchange between Home
Assistant and Amazon:

{% picture /blog/alexa-hass-octoprint/test-results.png --alt Testing On %}

If everything goes according to plan, you'll see and hear one of the responses
explained above.

Save the project and follow the instructions to enable the skill on your own
account and give it a shot:

<p class="media">
  <video src="/assets/blog/alexa-hass-octoprint/alexa-hass-octopi-final.mp4" poster="/assets/blog/alexa-hass-octoprint/alexa-hass-octopi-final.jpg" width="854" height="480" preload="none" controls>
  Video couldn't be embedded, but you can <a href="/assets/blog/alexa-hass-octoprint/alexa-hass-octopi-final.mp4">download it</a> instead.
  </video>
</p>

_I once won an Oscar for my cell phone steady-cam skills..._

---

All in, this took me less than two hours to set up because documentation on both
sides is extensive, though having experience with AWS is helpful. Having this
framework to extend means I could get Alexa to tell me anything from Home
Assistant or execute commands not compatible with Home Skills. Check out my Hass
Alexa config [for another example that pulls a weather report][HCW].

From a user experience perspective, I think saying the "invocation name" is a
hindrance. Except for built-in skills, everything you ask Alexa to do must
include "ask/tell _Service Name_..." I don't know the solution to this problem,
but ultimately it _feels_ like similar UX issues of [discoverability][NNGFD]
that emerge in hidden navigation and [gesture-heavy interfaces][NNGSW]: you have
to already know how to use it. No guest could walk into my place and intuit how
to get info from Home Assistant.

There's promise though, the Home Skills API doesn't need a separate invocation
name for its services (though you should pick obvious names for devices), and
Amazon has noticed this issue. In late 2016, they announced an initiative to
create [a new built-in library][ADI] of intents and slots and easier ways to
trigger them. [A preview][ADIP] of this library has already been released for US
developers.

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
[HASST]: https://home-assistant.io/docs/configuration/templating/
[HCALX]: https://github.com/tsmith512/home-assistant-config/blob/master/alexa.yaml
[ADC]: https://developer.amazon.com
[JB]: https://en.wikipedia.org/wiki/The_Jungle_Book_(1967_film)#Cast
[LPX]: https://community.home-assistant.io/t/aws-lambda-proxy-custom-alexa-skill-when-you-dont-have-https/5230
[HCW]: https://github.com/tsmith512/home-assistant-config/blob/master/alexa.yaml#L25-L37
[NNGSW]: https://www.nngroup.com/articles/contextual-swipe/
[NNGFD]: https://www.nngroup.com/articles/navigation-ia-tests/
[ADI]: https://developer.amazon.com/blogs/post/Tx3PW7BACQVE53B/Introducing-the-Alexa-Skills-Kit-Built-in-Library-Offering-Developers-Hundreds-o
[ADIP]: https://developer.amazon.com/blogs/post/Tx2EWC85F6H422/Introducing-the-ASK-Built-in-Library-Developer-Preview-Pre-Built-Models-for-Hund
