---
title: Making a Mute Hotkey for Zoom Meetings with AutoHotKey
summary: >
  Leading meetings involves a lot of typing on screen shares. Zoom lacks a
  global hotkey for mute that is accessible while the meeting window is not in
  focus, but I found a way to add one.
tags: [working remotely, tools]
---

{{< update "2020-03" >}}
**With the recent WFH surge following COVID-19,** this old post has seen a lot
of traffic. Thankfully, Zoom has added this option natively since I wrote this.
Visit the Zoom applications's Preferences/Settings &rarr; Keyboard Shortcuts.
From there, check the "Enable Global Shortcut" box and edit the assignment
for "Mute/Unmute My Audio."

Thanks to the comment from Tony for pointing this out to me.

Best wishes to you, your families, and your team.
{{< /update >}}

We love [Zoom](https://zoom.us) for videoconferencing, but it lacks a hotkey to
mute _when Zoom isn't in focus._ Which is anytime you're sharing your screen or
taking meeting notes, so... always. A hardware mute isn't as good because
allowing other participants to see when you're muted is useful for facilitation.
Having been recently reintroduced to the joy of mechanical keyboards, my
colleagues have pressed me to be better with muting while typing.

[Zoom's hotkey list](https://support.zoom.us/hc/en-us/articles/205683899-Hot-Keys-and-Keyboard-for-Zoom)
offers `CTRL-ALT-Shift` to focus the meeting toolbar, then `ALT-a` to mute. Then
presumably `ALT-Tab` back to where you were, but I don't like playing `ALT-Tab`
roulette on screenshare. Using [AutoHotKeys](https://autohotkey.com/) for
Windows, I made a global mute toggle regardless of the focused window by
pressing `F9`, though this assignment could be easily changed.

- Download and install [AutoHotKeys](https://autohotkey.com/)
- [Create an AHK script](https://autohotkey.com/docs/Tutorial.htm#s12)
- Paste the following, and edit it to your liking:

```
; A system-wide mute toggle for Zoom Meetings.

$F9::
   ; Zoom appears not to accept ControlSend when in the background, so
   ; we isolate the Zoom and current windows, switch over to Zoom, send
   ; its own mute-toggle hotkey, and then switch back.
   ;
   ; Get the current window
   WinGet, active_window, ID, A
   ;
   ; First check if we're sharing our screen and capture the toolbar:
   zoom_window := WinExist("ahk_class ZPFloatToolbarClass")
   ;
   ; If we aren't sharing our screen, pull the Zoom window:
   if (zoom_window = "0x0") {
      zoom_window := WinExist("ahk_class ZPContentViewWndClass")
   }
   ;
   ; Do we know we have a zoom_window? If not, bail.
   if (zoom_window = "0x0") {
      Send {F9}
      return
   }
   ;
   ; Whichever we have, switch over to it:
   WinActivate, ahk_id %zoom_window%
   ;
   ; Toggle Mute
   Send !a
   ;
   ; Go back
   WinActivate ahk_id %active_window%
Return
```

- Save it and double-click it on run the script. Spin up a meeting to test it.
- If all's well, "Copy" the script in Explorer, then navigate to
  `C:\Users\[username]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`
  and "Paste Shortcut" to have the script auto-start with Windows.
