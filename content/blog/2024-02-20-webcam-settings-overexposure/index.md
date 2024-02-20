---
title: "Fix Webcam Exposure issues on Windows with FFMPEG"
summary: >
  I sit in front of a window. If I dont't stay exactly in front of it, my webcam
  darkens the image, turning me into a backlit Bond villain.
tags: [video]
format: quicktip
---

The windows behind me were making me regret my new home office layout. It was
hard to find a way to change webcam autoexposure settings --- but it's possible!
You can do this with OBS but only _while broadcasting with OBS._ Surprisingly,
using FFPMEG, these changes persist for several hours affecting all applications.


``` powershell
# Set your "Device name" --- for me, that's "Brio 101"
ffmpeg -f dshow -show_video_device_dialog true -i video="Device name"
```

<!-- more -->

In the "Camera Control" tab, uncheck "Auto" for exposure and increase its value.
If I set it any higher than -5, the framerate starts to drop (presumably for
long exposure reasons).

_Source: "[How to access advanced settings for the integrated webcam on Windows 10](https://www.addictivetips.com/windows-tips/access-advanced-settings-for-the-integrated-webcam-on-windows-10/)" Fatima Wahab on AddictiveTips._
