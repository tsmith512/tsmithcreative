---
title: On nth-child, mathematics, and that moment in school when your teacher said you'd use Algebra in real life
summary: CSS's nth-child and nth-of-type are powerful, but recently I've seen them used improperly by mistakenly using the multiplier as the offset.
layout: post
tags: [frontend, development]
---

Recently, I've seen a recurring error with how `:nth-child()` and `:nth-of-type()` selectors are being used, so I wanted to host an anonymous algebra moment on these, my favorite CSS Level 3 selectors.

Frequently, I see `:nth-child()` selectors used for making columns:

![Six Columns](/assets/blog/nth-child/01-6-columns.gif)

From here, I see a lot of selectors like this:

- `:nth-child(1n)`
- `:nth-child(2n)`
- `:nth-child(3n)`

Here's why that is **incorrect**: the browser starts counting at 1 (the first item) and checks item each to see if that element matches the pattern (an+b) where "a" is the number you gave it, "n" is a set of all integers, and "b" is the offset that I've seen omitted (which defaults to zero). This is what happens:

![Six columns with all N values](/assets/blog/nth-child/02-all-n-values.gif)

As you can see:

- `:nth-child(1n)` matches every single column. And why wouldn't it? The set described as _(1n+0)_ where _n_ is a set of all integers results in [...0, 1, 2, 3, 4, 5, 6, 7, ...]. In other words, this selector doesn't actually do anything, you could stick with the element or class selector.
- Similarly, `:nth-child(2n)` matches every other column because the set described as _(2n+0)_ is [...0, 2, 4, 6, 8, ...]
- 4n and 5n look safe, but what if there's a second row?

**TL;DR:** The important take-away here is that the repetition is the _a_ in `an+b`. So **a is the total number of columns** in your layout, not the "column number" you're trying to address. The **column number is the "+b"**, The Offset!

What you want is this:

![With correct N values](/assets/blog/nth-child/03-correct-n-values.gif)

- `:nth-child(6n+1)` matches the first column (the first, seventh, thirteenth, nineteenth, ... elements)
- `:nth-child(6n+6)`, which can be written simply as `:nth-child(6n)`, matches the last column (the sixth, twelfth, eighteenth, ... elements)
  - Why can the "+6" column number (the offset) be omitted? The set of (6n+6) is [...-6, 0 6, 12, 18, 24, 30...] and the set of (6n) is [...-12, -6, -, 6, 12, 18, 24...]; they are the same.
  - If dropping the offset might be confusing when re-reading code, then leave it! It does no harm, and might even be a good idea to retain.

And this stacks vertically as expected:

![Three columns, multiple rows](/assets/blog/nth-child/04-3-columns-with-correct-n-values.gif)

__But the way I had it__ (usually) __worked! What's wrong with that?__ Two reasons: it doesn't always work, and _pride._ ;-)

Look at it this way:

![Three columns, bad N values](/assets/blog/nth-child/05-3-columns-with-bad-n-values.gif)

- By selecting `:nth-child(1n)`, the middle column is selected, too!
  - The reason this may go unnoticed is that the `:nth-child(2n)` is likely written after the _1n_ rule, with the same selector specificity, so it overrides the first.
- Two problems arise when selecting `:nth-child(2n)`:
  - The first column of the second row is also selected. Why? It's the fourth element, which is in the set defined as (2n).
  - That second column on the fourth row is not selected. Why? It's the eleventh element, which is not in the set defined as (2n).
  - Worse, with an odd number of columns, even/odd flips on each row! Count it out:
  - ![Three columns, counted out](/assets/blog/nth-child/06-3-columns-indexed-with-2n-shadowing.gif)
  - You'd run into the same changing "rhythm" with other numbers of columns or a different incorrect interval. (This might be your intention, if you were making a pattern, and it's cool that CSS lets us do that so easily, but ya gotta know the rule before you break it.)

## Why am I pestering you with this?

- Even if the site renders correctly now, imprecise code is difficult to maintain.
- If someone is inspecting your code, I want them to see excellent examples of your work.
- `:nth-child()` is one of my favorite selectors because of its power, which I encourage to be used for carefully constructed good.
- _Because if you don't, I'll make you use dastardly class names like `.three-column-layout--column-first`_ which seem to be all the rage right now.
  - Some folks out there think that this is the right way to go. The only convincing argument I see in favor of this approach is that it allows developers to avoid learning.
  - Using intelligent selectors is far more graceful.

## Does it matter if only one row is used in the layout?

Yes. That `:nth-child(1n)` selects every column and the `:nth-child(2n)` selects every even column, overriding the first rule. That's inefficient and makes debugging and careful overrides that much harder.

## And what about `:nth-child()` vs. `:nth-of-type()`?

- `element:nth-of-type()` uses the same math as `element:nth-child()`, but anything that isn't `element` will be skipped in the _counting_ in addition to not being selected. In other words, when counting the addresses of elements to select `div:nth-of-type()`, a `span` would not be counted as an element in the set.
- I frequently see `nth-of-type()` when `nth-child()` would have been sufficient. As such, `nth-child()` is probably the _safer_ option (unless you need type specificity in counting) because it will make erroneous or disorganized HTML output more obvious.
- Bottom line: specificity and consistency. Using the simplest selector possible for the task at hand is a CSS best practice. Straying from consistency is my biggest pet peeve.

## Additional Resources

- [:nth-child on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)
- [:nth Tester on CSS-Tricks](http://css-tricks.com/examples/nth-child-tester/) (This right here, for visual or kinetic learners is a lifesaver, and is how I learned this concept)
