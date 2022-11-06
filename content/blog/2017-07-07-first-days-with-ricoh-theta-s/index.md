---
title: "Ricoh Theta S: Getting started with 360 photography"
summary: >
  My first impressions of the Ricoh Theta S and expanding my use of 360 photos,
  photospheres, and/or equirectangular photography, whichever term you prefer.
tags: [review]
---

<style>
  .iframe-container {
    position: relative;
    height: 0;
    padding-bottom: 75%;
    border: 4px solid white;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    margin: 1em auto;
  }

  @media (min-width: 976px) {
    .iframe-container {
      margin-left: -140px;
      margin-right: -140px;
    }
  }

  .iframe-container iframe {
    display: block;
    position: absolute;
    margin: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
</style>

This year, [Four Kitchens][4K] added VR and immersive content offerings to our
services, so 360 cameras are everywhere. And this May, my friend Evan brought
one on the [roadtrip][TQ2]. I'd always thought photospheres were a fun gimmick,
and I've taken some with my phone, but they go in the bin of vacation snapshots
that I don't share. Never really knew what to do with 'em.

Until Evan came back with images like this:

<div class="iframe-container"><iframe src="aframe-viewer.html#PANO_20170523_113149542.jpg" frameborder="0" allowfullscreen="yes" allowvr="yes"></iframe></div>

_Photo credit: Evan Mackay. LG 360 Cam R105._

Though I've captured similar images with my phone, spinning about on a mountain
trying to capture each angle without shifting or having anyone walk through the
scene, then waiting for the stitching process to finish and seeing all the
stitching errors kinda ruins the magic. And there are always disembodied feet.

<div class="iframe-container"><iframe src="aframe-viewer.html#PANO_20160422_122547.jpg" frameborder="0" allowfullscreen="yes" allowvr="yes"></iframe></div>

_Captured with a Nexus 5X. I slipped and fell into the river in the process._

**Being able to take these photos in a single exposure makes them faster to
capture, reduces stitching errors, and allows me to either be out of the
exposure or completely in it, no more ghost boots missing their owner.**

So I'm making room in the camera bag for a new a new [Ricoh Theta S][RTS]!

## Thoughts on the Ricoh Theta S

My frame of reference _(ba-dum-shh)_ is limited to four experiences:

- My new [Ricoh Theta S][RTS]. [$325*][RTSP]
- Evan's [LG 360 Cam R105][R105]. [$125*][R105P]
- Four Kitchens' [Samsung Gear 360][SG360] cameras (original version). [$145*][SG360P]
- Using my Nexus 5X and Google Pixel to capture them manually.

\* Prices pulled on 7/03/2017 on Amazon

Clearly, these aren't competing in the same price-range. This is my review of
the Theta based on my experience with these other units, not a recommendation on
which among these to purchase. The R105 is a low-cost entry level device. The
original Samsung Gear was $200 when I made my purchase, but has dropped in price
now that its successor has been released, which I haven't seen yet. Best Buy had
the Theta on sale when I grabbed it.

<div class="iframe-container"><iframe src="aframe-viewer.html#R0010060.JPG" frameborder="0" allowfullscreen="yes" allowvr="yes"></iframe></div>

### The Good

**The Theta works with any phone.** Using the Theta with your phone is only
needed once to set the clock. After that, power on and use it in automatic mode.
Or, power-on with wireless button pressed to start in self-timer mode. If you do
capture remotely with your phone, the GPS location is saved to the image and
additional options are available.

The R105 works with any iOS or Android phone. The Gear only works with Samsung
phones.

**The Theta offers rich exposure options in the app.**

- Full Auto, which offers:
  - Noise Reduction and HDR Rendering
  - DR Compensation: I could not find a good description of what this does.
    According to help docs on [Theta360][T360M], "Outdoors in places with much
    differences in brightness and darkness." Forums and my own experience say
    the effect is similar to HDR mode.
- EV Compensation
- Shutter Priority
- ISO Priority
- Full Manual (so, Shutter and ISO control; aperture is fixed f/2.8)
- WB Override (though auto has served me well).

![Manual Exposure Options][MEX]

The Samsung does not offer any manual shooting controls. The R105's offerings
are similar to the manual options in the Theta, without HDR and Noise Reduction.

**Image Stitching is very good.** The Theta's lenses are really close together,
so it doesn't have the perspective shift or as much of the "lines not matching
up" problems as other units.

![Stitching Comparison][STITCH]

_Left: R105. Center: Theta. Right: Samsung Gear 360._

The R105 has the same form factor, but sometimes close-in items disappear around
the edges. The Gear's lenses are further apart, so many of our company images
have noticeable seams if something was in that blindspot along the edges.
Stitching errors seem worse on things closer to the camera, but the Samsung even
had trouble with the convention hall ceiling. For this, I think Ricoh and LG
picked a stronger form factor by keeping the elements closer together.

**It hides itself exceptionally well.** Different cameras take different
approaches to this, but the Theta does a great job removing itself from
images if it is sitting on a surface in the image. Using a stand or tripod will
still show, so I 3D printed a tiny minimalistic pedestal for that.

![Exclusion Comparison][EXCLUDE]

_Left: R105. Right: Theta._

Both the Samsung and the Theta do better at removing themselves from images than
the R105 when not on a stand or tripod.

**It's pocketable.** The slim rectangle form factor of the Theta makes it
pocketable, so I'm more likely to bring it with me even without a camera bag.

The R105 is shorter and comes with a thin hard-case, so it's even more portable.
The Gear is a ball; it's a small addition to any bag but isn't easy to pocket.

![Size Comparison][POCKETABLE]

### The Bad: Theta's Fault

**Equirectanular conversion for stills is instantaneous.** This means there's a
3-4 second delay (or, if you have HDR or Noise Reduction modes activated, 10-12
seconds) before the camera is ready is take another still. In practice, this
bothered me more when I was testing the unit than when I was out using it.

Both the R105 and the Gear delay processing for stills until requested. All
three delay processing for _video_ until requested.

**Splitting functionality into three applications hurts the user experience.**
The Theta's management and capture app, "Theta S" doesn't do the photo editing
or video editing/conversion. For that, you'll need "Theta+" and "Theta+ Video,"
respectively, though I find I don't use them.

### The Bad: The State of 360 Photography

**Resolution is not high.** For cameras in a consumer price-range, none of these
offers a resolution for image viewing like I've become accustomed to with DSLRs
or even flagship smartphones. This feels like where smartphone cameras were a
few years ago. Sure, numbers like 12 to 18 megapixels sound impressive for these
cameras, but once the image is warped into a sphere, it is noticeably less sharp
and more pixelated.

This is where taking photospheres with a phone really wins. Because there are
many source images all taken at a higher resolution, the resulting stitched
image is larger. Photosphere output on a Google Pixel phone is _40_ megapixels.

<div class="iframe-container"><iframe src="aframe-viewer.html#R0010039.JPG" frameborder="0" allowfullscreen="yes" allowvr="yes"></iframe></div>

**Traditional photo editing tools aren't ready.** Photoshop or Lightroom can
open equirectangular JPEGs and the metadata stays in place, but Lightroom can't
show the sphere experience and [Photoshop doesn't make it easy][PS3D]. Neither
apply edits or manipulations with a guaranteed seamless edge. Outside the Adobe
ecosystem, I'm still not finding many tools for these images that aren't
provided with the cameras themselves.

Ricoh produces Theta+ for editing the photos which boils down to applying
Instagram-like filters, geometry to flatten the image, and special effects like
a "Mirror Ball" or "Little Planet" view:

![Mirror Ball][MIRROR]
![Little Planet][PLANET]

### The Ugly

**Nonremovable 8GB storage.** Terrible disappointment here. Tear-downs reveal an
8GB Transcend micro-SD card buried deep inside the unit that you can replace if
you feel handy with a screwdriver and careless with your warranty
([tutorial][STORAGE]; not recommended). _Why, Ricoh?_ And if it's going to be
non-expandable, and there's only one model, why not spend the extra pennies to
make it larger?! Especially for a device at this price-point.

Both the Samsung and R105 have micro-SD slots that are customer accessible
_because that's how it should be._

**HD Video is limited to 1080p.** I didn't think much of that, but viewing
equirectangular imagery requires zooming in on small segments of it: resolution
is more important than I realized. I don't do much video work, so this isn't a
deal-breaker for me. The Gear shoots in 4K, but it is also a year newer.

## The Verdict

<div class="iframe-container"><iframe src="aframe-viewer.html#R0010015.JPG" frameborder="0" allowfullscreen="yes" allowvr="yes"></iframe></div>

_Taken with the HDR Rendering mode enabled. It did very well with the harsh shadows, but any movement in the scene causes harsh artifacts like the cars driving on the road._

I really enjoy the Theta! It's portable, takes reasonably high-quality images,
and does better with stitching than other units I've used. I haven't hit the
storage limitation because I haven't done much with video, but that would be a
disappointment for videographers. Battery life hasn't been a problem. At this
point, I'm very pleased with the device, but it is at the top end of the price
range and there are newer devices that cost less. The lesson here seems to be
that this was a winning form factor for better stitching and portability, so
look for devices that follow this geometry. Also, look for devices that offer
compatibility.

<div class="iframe-container"><iframe src="aframe-viewer.html#R0010070.JPG" frameborder="0" allowfullscreen="yes" allowvr="yes"></iframe></div>

As far as the format goes, I haven't decided the best way to integrate these
alongside my other photography or even embed them in websites. The solution here
is _an_ option but it suffers from large, redundant downloads and horrible
performance. I'll investigate other display options and report back.

Cheers.

<div class="iframe-container"><iframe src="aframe-viewer.html#R0010054.JPG" frameborder="0" allowfullscreen="yes" allowvr="yes"></iframe></div>

_It does well in very low light ~~dive bars~~._

---

_Disclaimer: I selected the Ricoh Theta S with the recommendation of a coworker
at Four Kitchens, and the 4K Tech Stipend program paid for the device._

[RTS]: https://theta360.com/en/about/theta/s.html
[4K]: https://www.fourkitchens.com
[R105]: http://www.lg.com/us/support-product/lg-LGR105
[TQ2]: https://www.tsmithphotos.com/2017-05-15-TQ2O/?utm_source=tsmithcreative&utm_medium=website&utm_campaign=theta-s-review
[R105P]: https://www.amazon.com/LG-Friends-360-CAM-LG-R105/dp/B01DU7CNQ8
[SG360]: http://www.samsung.com/us/mobile/virtual-reality/gear-360/sm-c200nzwaxar-sm-c200nzwaxar/
[SG360P]: https://www.amazon.com/Samsung-Resolution-Camera-Version-Warranty/dp/B01D9LVL3G/ref=sr_1_4
[RTSP]: https://www.amazon.com/Ricoh-Theta-Digital-Camera-Black/dp/B014US3FQI/ref=sr_1_3
[T360M]: https://theta360.com/en/support/story/s/shooting/still/
[MEX]: manual-exposure.png
[STITCH]: stitching.jpg
[EXCLUDE]: exclusion.jpg
[POCKETABLE]: pocketable.jpg
[PS3d]: https://forums.adobe.com/message/9222081#9222081
[MIRROR]: thetaplus_20170604104805456.jpg
[PLANET]: thetaplus_20170704124158195.jpg
[STORAGE]: https://www.360images.fr/theta/

[GCPS]: PANO_20170523_113149542.jpg
[SFUK]: PANO_20160422_122547.jpg
[RANCH]: R0010060.JPG
[MUSEUM]: R0010039.JPG
[TRUCK]: R0010015.JPG
[PLT]: R0010054.JPG
[ZTP]: R0010070.JPG
