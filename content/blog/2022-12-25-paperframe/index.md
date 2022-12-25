---
title: Building an e-Paper Digital Photo Frame
summary: >
  A side project to build a small fleet of synced photo frames using a Raspberry
  Pi Zero, Waveshare e-Paper display, and Cloudflare Workers as Christmas gifts.
tags: [engineering, side proejcts, photography]
---

Digital photo frames offer some fun nostalgia, but I don't particularly love
illuminated displays all over the place. Recently, I saw a couple writeups about
building a photo frame with an e-paper panel (of Amazon Kindle fame, but popping
up in lots of embedded devices).

- [How to build a DIY e-paper photo frame from scratch](https://www.viget.com/articles/making-an-email-powered-e-paper-picture-frame/) by David Eisinger of Viget
- [I crammed an e-ink screen into an IKEA picture frame](https://www.reddit.com/r/RTLSDR/comments/jd172o/i_crammed_an_eink_screen_into_an_ikea_picture/) by Reddit user `ThePhotoChemist`

That's a fascinating match --- and a cool aesthetic. After letting the idea age
in "too many browser tabs" purgatory, I finally took the plunge into
side-project madness to make a couple for my family for the holidays. Here's how
I made it work.

## Supplies

- [Raspberry Pi Zero with Headers](https://www.amazon.com/Raspberry-Pi-Zero-WH-Pre-Soldered/dp/B07W3GJTM1/)
-  [Waveshare's 7.5" e-Paper with built-in HAT](https://www.waveshare.com/product/displays/e-paper/epaper-1/7.5inch-e-paper-hat.htm)
- Cloudflare [Pages](https://developers.cloudflare.com/pages/), [Workers](https://developers.cloudflare.com/workers/), [KV](https://developers.cloudflare.com/workers/learning/how-kv-works/), and [R2](https://developers.cloudflare.com/r2)
- Knives, tape, and super glue
- Custom cut mattes from Austin's own [Jerry's Artarama](https://www.jerrysartarama.com/)
  and table frames from [Michael's](https://www.michaels.com/) (oh how I miss
  Aaron's Brothers).

## The Build

### Part One: Software and Images

I wanted to keep one for myself and give a few away --- but for them to all be
in sync. So I decided to make this a cloud service. That also meant I could
build the backend using familiar tools.

- **Frontend web application** for managing the "carousel"
- **Backend API** for storing and serving the images
- And the **client software** running on the actual device.

{{< media type="image" src="architecture.png" noshadow="noshadow" alt="Architecture" >}}


For the frontend, I built a small webapp with [Next.js](https://nextjs.org/)
that shows the images in the system and a simple about page. It also lets me log
in to set a different current image, change the order, or upload something new.

{{< media type="image" src="paperframes_net.png" alt="Webapp frontend" >}}


The backend API is a Worker with a few simple API endpoints:

- Get the image currently on display
- Put a different image on display
- Upload a new image
- Delete an old image
- Get the list of all images and the order
- Change the order

The final piece of the Worker is a scheduled task that updates what image is on
display every hour.

And in another act of "stealing the office supplies\*," images are stored and
served from Cloudflare's R2 storage, the "database" and metadata are JSON
strings saved in WorkersKV.

#### Authentication

This was a fun little puzzle because it could be simple. I used HTTP Basic
Authentication _on the API endpoints_ (_not_ the interface). React can fetch a
test at `/api/auth/check`; the Worker will respond with a 204 success code if
the browser included the correct credentials --- or a 400 otherwise --- to set
the state of the frontend accordingly.

That way, the login button can simply be a _link_ to the Worker's login
endpoint, which will issue a `WWW-Authenticate` basic challenge header. It will
issue a redirect back to the app when correct credentials are provided.

Similarly, the logout button is _also_ a link, which returns a 401 _without_ a
`WWW-Authenticate` header --- causing the browser to drop the session
credentials --- before throwing a client-side redirect.

Restricting the management endpoints only, but not the interface, allows anyone
to see what's in the queue and what's currently on display.

#### Image Prep

The display I picked does not do greyscale, nor is it particularly high
resolution. But with heavy-handed edits, I really like the resulting aesthetic.

![](https://paperframes.net/api/image/18)

Images must be exactly 800x480 as a black or white bitmap.

![](https://paperframes.net/api/image/32)

These restrictions also help unify the look of these very different photos.

![](https://paperframes.net/api/image/20)

I think it's a cool effect.

![](https://paperframes.net/api/image/19)

So while I waited on the mail, I played in Photoshop.

![](https://paperframes.net/api/image/31)

### Part Two: Hardware

{{< media type="image" src="pieces.jpeg" alt="Raspberry Pi Zero and Waveshare panel" >}}

Once I received the Pi Zero and the display panel, I put the pieces together and
carefully taped the whole mess to a clipboard for testing.

#### Paperframe in Go

Like one of my reference tutorials, I opted to write the on-device software in
_Go_ for a few reasons:

- Ship a single binary to the device
- No runtime package dependencies
- Fairly simple code with a focus on early-and-often error handling
- At Cloudflare, a lot of my team's backend services are written in Go, so
  learning a little may be useful
- Selfishly, I also hoped to reuse a lot of the code from the tutorial, at least
  for the hardware interface.

Turns out, his display and mine differ in enough ways that I spent the better
part of a day just getting an image onto the panel. After any update, my screen
would get stuck in an endless loop of static.

<div style="position: relative; padding-top: 56.25%;"><iframe src="https://customer-igynxd2rwhmuoxw8.cloudflarestream.com/95420d626fe65692db7a9bc9d9c79141/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-igynxd2rwhmuoxw8.cloudflarestream.com%2F95420d626fe65692db7a9bc9d9c79141%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>

<br />

Ultimately, [most of that boiled down](https://github.com/tsmith512/paperframe-client/commit/05ca501649fdaaec7d5629c77d8e6464a3060bea)
to sending payloads of the wrong size; command mappings that had changed; or
inconsistencies between the formal documentation, reference code from the
manufacturer, and open source code from other folks.

{{< media type="image" src="wild-horses.jpeg" alt="Panel showing the wild horses of Rock Springs, Wyoming" >}}

I will say, Go's pattern of writing `if err != nil` after just about _every
line_ of code is _tedious._ Also, the double-negative and the two-value return
pattern did trip me up a few times. But it also made me appreciate the value of
error handling early and often. I won't have physical access to these devices
after I give them away. (Well, I can always suggest the folks invite me over for
dinner and troubleshooting, but I'll feel bad if their Christmas present
crashes. Maybe I can fix the printer as an apology.)

<div style="position: relative; padding-top: 56.25%;"><iframe src="https://customer-igynxd2rwhmuoxw8.cloudflarestream.com/f7396f8edbd3881868b0cc57582093e5/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-igynxd2rwhmuoxw8.cloudflarestream.com%2Ff7396f8edbd3881868b0cc57582093e5%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>

<br />

Finally, I wrote a Systemd service unit to start and manage the client program.
Systemd can restart the program if it fails, blank the screen on system
shutdown, and trigger the display to refresh when the system or networking
restart.

### Part Three: Enclosure and Frame

I modified the 3D models for [Adafruit's Raspberry Pi Zero Case](https://www.thingiverse.com/thing:1165227)  to make additional room for the e-paper HAT board and the ribbon cable out to the panel, and printed that at home:

{{< media size="mini" type="image" src="raspberrypi-and-case.jpeg" alt="3D printed case" >}}

There were once grand plans to take up carpentry on this project as well, and
potentially swing that into a reason to join a local makerspace, but holiday
crunch-time directed me toward the framing counter at a local art store instead.

{{< media size="mini" type="image" src="frame-and-matte.jpeg" alt="Framed" >}}

And in truth, that will look a little more at home on Smith family shelves.

{{< media type="image" src="dev-setup.jpeg" alt="Framed devices running" >}}

I may 3D print a mount for my own that shows off the electronics though; circuit-board-chic isn't too much of a stretch for my messy desk.


---

_Writeup still in progress..._

- Client software: [tsmith512/paperframe-client](https://github.com/tsmith512/paperframe-client)
- Backend worker: [tsmith512/paperframe-api](https://github.com/tsmith512/paperframe-api)
- Frontend webapp: [tsmith512/paperframe-admin](https://github.com/tsmith512/paperframe-admin)

---

_Disclaimer: I am a Cloudflare employee, so some of our products are made available to me for free --- although this project falls within the bounds of the Free Plan for its use of Pages, Workers, KV, and R2 completely. This is not product documentation or security guidance._
