---
title: Style Guide
summary: >
  Quick demo of all the pieces
date: 2022-11-04
citation: [TEST, "http://www.example.com/"]
type: blog
photoswipe: true
galleries:
  example:
  - src: olympic-national-park.jpg
    alt: Finish line in Washington
    caption: Hurricane Ridge, Olympic National Park, Port Angeles, WA
    from: 2017-04-23-building-travelogue
  - src: grand-canyon.jpg
    alt: Lined up on the North Rim of the Grand Canyon
    caption: Grand Canyon Parashant National Monument, AZ
    from: 2017-04-23-building-travelogue
  - src: seward.jpg
    alt: Finish line in Seward
    caption: Seward, AK
    from: 2019-08-29-travelogue-revisited
sitemap:
  disable: true
---

## Basic Elements

Styled HTML or Markdown without specific components.

Space... the _final frontier. These are the voyages of the Starship Enterprise.
Its continuing missing: to explore [strange new worlds](http://www.example.com);
to seek out new life and new civilizations; to boldly go where no one has gone
before.

- Malcolm Reynolds
- Benjamin Sisko
- James Holden
- Dylan Hunt


1. Earth
2. Mars
3. The Belt

> At 0800 hours, station time, the Romulan Empire formally declared
> war against the Dominion. They've already struck fifteen bases along
> the Cardassian border. So, this is a huge victory for the good guys!
> This may even be the turning point of the entire war! There's even a
> _"Welcome to the Fight"_ party tonight in the wardroom!
>
> So&hellip; I lied. I cheated. I bribed men to cover up the crimes of
> other men. I am an accessory to murder. But most damning of all&hellip;
> I think I can live with it. And if I had to do it all over again&hellip;
> I would. Garak was right about one thing: a guilty conscience is a
> small price to pay for the safety of the Alpha Quadrant. So I will
> learn to live with it. Because I can live with it...
>
> I can live with it.
>
> Computer &mdash; erase that entire personal log.
>
> <cite>Benjamin Sisko, Deep Space Nine: "In the Pale Moonlight"</cite>
>

---

## Special Content Components

_Available by shortcode or automatically from Hugo:_

### Media Containers

It was the dawn of the third age of mankind &mdash; ten years after
the Earth-Minbari War. The Babylon Project was a dream, given form. Its
goal: to prevent another war, by creating a place where humans and
aliens can work out their differences peacefully. It's a port of call
&mdash; home away from home &mdash; for diplomats, hustlers,
entrepreneurs, and wanderers.

{{< media type="placeholder" alt="Default" caption="Media Placeholder, default size" >}}

Humans and aliens, wrapped in two million, five hundred thousand tons
of spinning metal &mdash; all alone in the night. It can be a dangerous
place, but it's our last best hope for peace.

{{< media type="placeholder" size="small" alt="Small" caption="Media placeholder, small size" >}}


This is the story of the last of the Babylon stations. The year is
2258. _The name of the place is Babylon 5._

{{< media type="placeholder" size="mini" alt="Mini" >}}

### Galleries

{{< gallery example >}}

### Browser Frame

To wrap embedded sites or draw attention to UI screenshots.

{{< browserframe >}}
  <iframe src="https://example.com" height="500px"></iframe>
{{< /browserframe >}}

### Blog Post Teaser

{{< mention "2022-03-11-congressional-district-map" >}}

### Syntax Highlighting

``` ts

/**
 * GET an image download by ID. Returns the image file directly from R2.
 */
router.get('/api/image/:id', async (request, env: pfEnv, context: pfCtx) => {
  const image = context.carousel.find((i) => i.id.toString() === request.params?.id);
  const file = image ? await env.STORAGE.get(image.filename) : null;

  // Should be JPG or GIF only, although that is not currently enforced on upload.
  const ext = image?.filename.split('.').pop();

  if (file?.body) {
    return new Response(file.body, {
      headers: {
        'content-type': `image/${ext}`,
        ...globalheaders
      },
    });
  }
});

```
