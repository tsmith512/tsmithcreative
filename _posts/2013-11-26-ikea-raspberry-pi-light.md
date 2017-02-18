---
title: Node.js + RPi + IKEA = Trophy Lighting
layout: post
tags: [development, home automation]
---

Combining my love for lighting and IKEA furniture with a need to find a new way to tinker with a Raspberry Pi, built a remote-controllable shelf light.

What I used:

* [EXPEDIT](http://www.ikea.com/us/en/catalog/products/60255588/#/10103088) shelving
* [DIODER](http://www.ikea.com/us/en/catalog/products/20119418) LED light strips (4-pack)
* [FIXA](http://www.ikea.com/us/en/catalog/products/60169251/), a 114-piece cable managment
* [Raspberry Pi](http://www.adafruit.com/products/998) Series B
* [PowerTail Switch II](https://www.adafruit.com/products/268), a 120V opto-isolated relay accepting anything from 3V to 12V for a simple control input to activate the switch.
* I also have a breadboard, jumpers, and the GPIO cobber/cable kit which came with the Adafruit [Raspberry Pi Starter Pack](http://www.adafruit.com/products/1014), but aren't necessary if you've got another way to connect GPIO pins to an external component.

### Assembly

![IKEA][IKEA]

IKEA, as always, provided delightful
[instructions](http://www.ikea.com/us/en/assembly_instructions/expedit-shelving-unit__AA-573046-2_pub.pdf)
for EXPEDIT. But seriously, this shelving is actually a very easy IKEA build,
and it looks great; I highly recommend it. After the build, I started by
mounting one DIODER strip in each of the four shelves in the top row:

![DIODER mounted in EXPEDIT][DIODER]

Using the FIXA pieces and a little obsessive cable management, I pulled each
lead straight to the back of the shelf and ran along the bottom edge of the
shelving.

![Cable management][Cable management]

All of that terminated in a bit of a mess of excess cable which I just folded in
a bundle and ziptied to the back of the unit.

![Cable tangle][Cable tangle]

Then I connected that up to the PowerSwitch and the RPi to get started on the
Node fun.

![RPi and PowerSwitch Tail][RPiPST]

### Node.js control of RPi GPIO pins

Controlling the PowerSwitch Tail is really easy. All it needs is 3-12VDC applied
to the control terminal:

![PowerTail Switch][PowerTail Switch]

We can do that with the Raspberry Pi's GPIO, by attaching a GPIO pin to `+` and
then connecting `-` to a grounding pin. Controlling this in Python is really
easy:

``` python
#!/usr/bin/env python

import RPi.GPIO as io
io.setmode(io.BCM)

power_pin = 18

io.setup(power_pin, io.OUT)
io.output(power_pin, True)
```

But my experience is in [Node.js](http://nodejs.org) and I wanted a fun way to
make it controllable via a browser or other URL call. In short, I wanted:

* `/` -- A very simple static site with on and off link buttons. We'll use [Express](http://expressjs.com/) to host those assets.
* `/on` -- Turn the light on (GPIO pin "on")
* `/off` -- Turn the light off (GPIO pin "off")

Full control of RPi GPIO using Node.js is currently a little lacking. There are
two primary npm modules, but neither seems actively maintained and both appear
to be on track for being replaced. Luckily, our needs are quite simple. I used
[pi-gpio](https://npmjs.org/package/pi-gpio) because at the time, I couldn't get
[gpio](https://npmjs.org/package/gpio) to work (although it has been updated
since I last looked).

Remember that the GPIO pins can either be addressed as they are printed on the
board or in actual pin order. The `pi-gpio` library uses the physical pinout,
not the printed numbers.

![RPi Pinout][RPi Pinout]

_[Image from Hobby Electronics](http://www.hobbytronics.co.uk/raspberry-pi-gpio-pinout) illustrating the printed GPIO numbers compared to the physical pinout for the Raspberry Pi B._

We load up the two necessary libraries and also note the pin as 16
_(which is labeled on the board as GPIO 23)_.

``` js
var gpio = require('pi-gpio');
var pin = 16;

var express = require('express');
var app = express();
```

A simple function to open the pin for writing, write `x` (a boolean to turn on
or off the pin), and close the pin for output after half a second.

``` js
var lightSwitch = function(x){
  gpio.open(pin, "output", function(err) {
    gpio.write(pin, x, function() {
      setTimeout(function(){gpio.close(pin)}, 500);
    });
  });
}
```

Now our utility URLs `/on` and `/off`

``` js
app.get('/on', function(req, res){
  lightSwitch(1);

  var body = 'Lights On';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.get('/off', function(req, res){
  lightSwitch(0);

  var body = 'Lights Off';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});
```

Lastly, we set up the Express server to listen for HTTP requests on 8080, and,
for any path that hasn't already been declared, serve assets out of the
project's `/public` directory which contains a standard `index.html` and
assorted CSS and JS assets.

``` js
app.listen(8080);
app.use(express.static(__dirname + '/public'));
console.log('Listening on port 8080');
```

![The litesite][The litesite]

### Interaction outside the browser

I use
[Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en)
on my phone. Essentially, it waits for contexts and takes actions. For example,
when I plug my phone in at night, Tasker silences text and email notifications.
Now that my lights are web-controlled, I have added a step in that profile to
also fire a request to `/off` to turn of the lights.

In the future, I'd also like to set up similar actions on my computer (either
with a taskbar/dock icon or automated actions) to turn the lights on when I
start using my computer. Also, I have a second PowerSwitch Tail, so it would be
trivial to add a second "circuit" to my system. Guess I'll have to go buy more
light fixtures!

### Question

I'd love to find a better way of interacting with the GPIO pins, especially if I
ever do anything more complicated. Are there any more mature GPIO libraries for
Node.js? Join in the comments.


[DIODER]: /assets/ikea-rpi/dsc_1332.jpg
[Cable management]: /assets/ikea-rpi/dsc_1346.jpg
[Cable tangle]: /assets/ikea-rpi/dsc_1349.jpg
[RPiPST]: /assets/ikea-rpi/dsc_1352.jpg
[PowerTail Switch]: /assets/ikea-rpi/dsc_1353.jpg
[RPi Pinout]: /assets/ikea-rpi/gpio-pinout-rev2.jpg
[The litesite]: /assets/ikea-rpi/lightsite.png
[IKEA]: /assets/ikea-rpi/ikea.png
