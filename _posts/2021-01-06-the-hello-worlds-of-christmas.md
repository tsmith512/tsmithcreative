---
title: "The Many \"Hello, Worlds\" of Christmas"
summary: >
  In which a few friends and colleagues take on Advent of Code 2020, and two of
  us decided to do each day in a different language because we're crazy.
tags: [development]
---

Early in December, someone at [Very](https://www.verypossible.com/) floated a
link to [Advent of Code](https://adventofcode.com/) and asked who was
interested. I enjoy writing code for side projects in the free time I definitely
_don't_ have, so I decided to give it a go.

![Advent of Code Home](/assets/blog/advent-of-code-2020/aoc.png)

Day 1 was easy, and while my colleagues were debating which of their
professional languages to do it in, I thought, "Well, this would be easy in
**Bash**." [So I did that](https://github.com/tsmith512/advent_code/blob/trunk/2020/01/expense_report.sh).
I dragged my [roadtrip group]({% post_url 2019-08-29-travelogue-revisited %})
in on this adventure, too.

![Bash, Day 1](/assets/blog/advent-of-code-2020/bash.png)

Then I hit an interesting question. Do I do Day 2 in Bash again? Or move on to
something else? Just for kicks, could I do it in **PowerShell**? How hard would
that be? [Not particularly](https://github.com/tsmith512/advent_code/blob/trunk/2020/02/password_validator.ps1),
and it gave me a chance to play with PS for the first time.

That turned into the _monumentally_ stupid idea to do every day in a different
language alongside my friend George — who, I'll note, is a computer scientist
and skilled engineer, which I am not. But that gave me some good practice with
research and pair programming.

By the end of the year, I'd made it through
[Part 1 of Day 19](https://github.com/tsmith512/advent_code/blob/bf7ba06dfe55a8dc4977f76a702192b94b197e76/2020/19/message_decoder.py),
skipping Day 17 because a four-dimensional [cellular automaton](https://en.wikipedia.org/wiki/Cellular_automaton)
problem seemed really hard to tackle on top of year-end close-out. Then it was
time to go [hide in a cabin in the woods for New Year's](https://tsmithphotos.com/quaranteam-new-year),
leaving VSCode at home. But this project was an absolute blast, and I do intend
to finish — at a slower pace.

![Chart of Lines by Filetype](/assets/blog/advent-of-code-2020/lines.png)

_Picked up enough **R** ([Day 11](https://github.com/tsmith512/advent_code/blob/trunk/2020/11/seatshuffling.r))
to put this chart together, which I'd like to take to other data visualization projects one day._

Check out **[my Advent of Code Repo on GitHub](https://github.com/tsmith512/advent_code/)**.

## Language Thoughts

To the extent I was able, given the cycle time, I tried to be as idiomatically
"proper" in the language-of-the-day. Clearly, some languages, their docs,
_and some of the puzzles_ made this easier or harder to pull off.

![Git one-line log looking at Hello World commits](/assets/blog/advent-of-code-2020/hello-log.png)

- The mainstays of my professional work have been **JavaScript**
  ([Day 16](https://github.com/tsmith512/advent_code/tree/trunk/2020/16)) and
  **PHP** ([Day 18](https://github.com/tsmith512/advent_code/blob/trunk/2020/18/homework.php)),
  both of which were fun and comfortable to use.
- I finally wrote something in **C**
  ([Day 3](https://github.com/tsmith512/advent_code/blob/trunk/2020/03/avoid_trees.c)),
  which I wouldn't necessarily say I enjoyed so much as say I feel like is a
  rite of passage?
- I also finally wrote something in **Java**
  ([Day 4](https://github.com/tsmith512/advent_code/blob/trunk/2020/04/PassportScanner.java))
  in a victorious long-delayed rematch! Java defeated me when I was thirteen and
  I couldn't even get a Hello World to work.

### Languages I Loved

- I enjoyed how clean and lightweight, yet powerful **Lua**
  ([Day 7](https://github.com/tsmith512/advent_code/tree/trunk/2020/07)) and
  **Go** ([Day 14](https://github.com/tsmith512/advent_code/tree/trunk/2020/14))
  both felt.
- **Clojure** ([Day 5](https://github.com/tsmith512/advent_code/blob/trunk/2020/05/pass_parser.clj)),
  though I find it difficult to read, finally made me sit down and learn
  reducers and recursion. Not sure I can make a habit of this one — it feels
  like a game of Scrabble with only parentheses tiles. But it was cool in its
  own way.
- Finally, **Kotlin** ([Day 6](https://github.com/tsmith512/advent_code/blob/trunk/2020/06/CustomsPrep.kt))
  wins First Prize as a language I would love to use again. I found it to be
  well-documented with clearly written error messages, making it easy for
  beginners to approach. Its foundation in Java is clear, but I found it much
  simpler to _use._

### Languages I Didn't

- **Groovy** ([Day 10](https://github.com/tsmith512/advent_code/blob/trunk/2020/10/ChargerConundrum.groovy))
  had every opportunity to be a cousin to Kotlin, but its error messages are so
  hard to parse and its documentation felt disorganized by comparison. I spent
  less time planning my solution than fighting with always having written
  something incorrectly in ways I had trouble deducing.
- Confession: my first experiments in the "cgi-bin" days were in **Perl**
  ([Day 08](https://github.com/tsmith512/advent_code/blob/trunk/2020/08/videogame.pl)).
  Truth be told, I enjoyed writing this but compared to the other languages we
  explored, I now understand much more clearly all the criticism against Perl.
  And why seasoned engineers are dismayed that Perl was my first language.
- I found **Haskell** and **F#** to be incredibly difficult to get started with,
  to the point that I bailed on both, though I would like to try Haskell again
  at some point. Part of the issue with F# is that it was hard to research
  because search results contained a sea of C# and .NET information mixed in.
  Haskell is just so far afield from anything else I'd written that I felt like
  the only way to start would be to read a textbook cover-to-cover.

# Thank You to my Team

Thanks to George and Evan for being sounding boards and pair programming buddies
late into many nights. Thank you also to Mitchel H, Allie S, Sara P, Brad B,
Diego M, Gaspar T, and Tony S at Very who cheered me on, provided rescues, made
this a lot of fun, and let me learn from their code, too.

--------------------------------------------------------------------------------

# An Appendix of Fun Moments

**The Best Hint:** I hit a wall in C. I knew my approach was right but the final
answer was wrong. I noticed that the program was not doing multiplication
correctly. Mitchel gave me a well-constructed no-words hint that taught me about
data types (specifically, different sizes).

My code output compared to my calculator:

![Program output showing incorrect multiplication](/assets/blog/advent-of-code-2020/bad-math.png)

What Mitchel sent me:

![Animation of a binary calculator showing a bit flip at 33](/assets/blog/advent-of-code-2020/hint.gif)

The answer was that I needed a `unit64_t` instead of an `int` or `long`.

**Accidental Reducer:** That time I finally learned what reducers are by
accidentally writing one.

![A diff showing the removal of a 10 line function replaced by a one-liner](/assets/blog/advent-of-code-2020/diff-reduce.png)

**Marine Navigation:** Finally breaking out graph paper for the TCL
([Day 12, Part 2](https://github.com/tsmith512/advent_code/blob/trunk/2020/12/navigate_two.tcl#L46-L70))
ship navigation puzzle, which was not hard but easier to draw than to code.

![Graph Paper showing the ship and waypoint rotation problem](/assets/blog/advent-of-code-2020/graph.jpg)

**Zoom Whiteboarding** with George: Planning out which question to answer, and
how to answer it, to solve the laptop charger chain problem
([Day 10, Part 2](https://github.com/tsmith512/advent_code/blob/trunk/2020/10/ChargerConundrum.groovy)).

![Annotations over a code editor on screenshare](/assets/blog/advent-of-code-2020/whiteboarding.png)

**Delightful One-Liner Methods** in Kotlin ([Day 6](https://github.com/tsmith512/advent_code/blob/trunk/2020/06/CustomsPrep.kt))

![Two one-liner methods in Kotlin](/assets/blog/advent-of-code-2020/kotlin-snippet.png)

**On Ruby:** When a Ruby ([Day 15](https://github.com/tsmith512/advent_code/tree/trunk/2020/15)) Engineer told me this:

![Slack convo of an engineer telling me he liked my approach](/assets/blog/advent-of-code-2020/ruby-slack.png)

**A 121% performance boost** from
[first-solution to final-answer](https://github.com/tsmith512/advent_code/commits/trunk/2020/09/encoding_error.chpl)
using circular buffers and queues more efficiently in **Chapel**
([Day 9](https://github.com/tsmith512/advent_code/blob/trunk/2020/09/encoding_error.chpl)).

**A Commit Log of Despair** (Python, [Day 19](https://github.com/tsmith512/advent_code/tree/trunk/2020/19)):

![A commit log showing messages in increasing amounts of freakout](/assets/blog/advent-of-code-2020/commit-log-of-doom.png)

Which ultimately resulted in this hilariously horrifying automatically generated
regular expression match pattern. But it did work!

`^(((b(a((a(ab|ba)|b(ba|aa))a|((ab|bb)b|(b|a)(b|a)a)b)|b(a((b|a)a|bb)a|(((b|a)a|ab)a|(b|a)(b|a)b)b))|a(a(aab|b((b|a)a|bb))b|b((((b|a)b|aa)b|((b|a)a|bb)a)b|(b(ab|bb)|abb)a)))a|(a((a((ab|ba)a|(ba|(b|a)b)b)|b((ba|(b|a)b)a|(ab|bb)b))b|(b(aba|baa)|a(aab|aaa))a)|b((ba((b|a)a|bb)|a(a((b|a)a|bb)|b(ba|aa)))a|((a(b|a)(b|a)|b((b|a)a|bb))b|b(ba|aa)a)b))b)b|(a((b((b|a)(b|a)bb|(b((b|a)b|aa)|aba)a)|a(a((ba|aa)a|((b|a)b|aa)b)|b(((b|a)a|bb)b|((b|a)b|aa)a)))a|(((bba|(b|a)(b|a)b)a|aabb)a|(a(b(b|a)(b|a)|aba)|b((ba|aa)a|bab))b)b)|b(a(b(((ba|aa)a|(ab|ba)b)a|(aaa|(ba|aa)b)b)|a((aba|b(ab|bb))a|(b((b|a)a|bb)|a(ab|ba))b))|b((b(ba|aa)b|(abb|b(ab|ba))a)b|(a(b((b|a)a|ab)|a(ab|ba))|b(((b|a)b|aa)a|(ba|(b|a)b)b))a)))a)(((b(a((a(ab|ba)|b(ba|aa))a|((ab|bb)b|(b|a)(b|a)a)b)|b(a((b|a)a|bb)a|(((b|a)a|ab)a|(b|a)(b|a)b)b))|a(a(aab|b((b|a)a|bb))b|b((((b|a)b|aa)b|((b|a)a|bb)a)b|(b(ab|bb)|abb)a)))a|(a((a((ab|ba)a|(ba|(b|a)b)b)|b((ba|(b|a)b)a|(ab|bb)b))b|(b(aba|baa)|a(aab|aaa))a)|b((ba((b|a)a|bb)|a(a((b|a)a|bb)|b(ba|aa)))a|((a(b|a)(b|a)|b((b|a)a|bb))b|b(ba|aa)a)b))b)b|(a((b((b|a)(b|a)bb|(b((b|a)b|aa)|aba)a)|a(a((ba|aa)a|((b|a)b|aa)b)|b(((b|a)a|bb)b|((b|a)b|aa)a)))a|(((bba|(b|a)(b|a)b)a|aabb)a|(a(b(b|a)(b|a)|aba)|b((ba|aa)a|bab))b)b)|b(a(b(((ba|aa)a|(ab|ba)b)a|(aaa|(ba|aa)b)b)|a((aba|b(ab|bb))a|(b((b|a)a|bb)|a(ab|ba))b))|b((b(ba|aa)b|(abb|b(ab|ba))a)b|(a(b((b|a)a|ab)|a(ab|ba))|b(((b|a)b|aa)a|(ba|(b|a)b)b))a)))a)(a((((a(a((b|a)a|bb)|bab)|b(aba|bab))b|(a(b|a)(b|a)(b|a)|b((b|a)(b|a)a|aab))a)a|((b(b(ba|(b|a)b)|a((b|a)b|aa))|a(ba|(b|a)b)(b|a))a|(b(aaa|(ba|aa)b)|a(a(ab|aa)|bba))b)b)b|((((ba|aa)(b|a)b|((ab|bb)b|baa)a)a|(a(aba|bab)|b(b|a)(ba|aa))b)a|((b((b|a)(b|a)b|aaa)|a((ba|aa)a|((b|a)a|bb)b))a|(((ba|aa)a|((b|a)a|bb)b)b|(aaa|b(ab|bb))a)b)b)a)|b(((a((aaa|(ba|(b|a)b)b)a|(aab|bab)b)|b(((ba|bb)a|((b|a)a|bb)b)a|bbab))a|(b(((ba|bb)a|((b|a)a|bb)b)a|(bba|a(ba|bb))b)|a((b(ab|bb)|aab)a|(b|a)(ba|aa)b))b)b|(b(a((((b|a)a|ab)a|(b|a)(b|a)b)b|(aaa|(ab|bb)b)a)|b(a(a(ab|ba)|bbb)|b(aaa|b(ab|bb))))|a((b(b(ba|bb)|a(ab|ba))|a(b(ba|aa)|a((b|a)b|aa)))a|(a((ab|ba)b|aaa)|b((ba|(b|a)b)a|(ab|bb)b))b))a))$`

*And with six more puzzles left to build, I am sure there will be more eventually.*
