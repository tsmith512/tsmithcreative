# Git Tips from TSmith

## Good commits make a clean history: Commit building with interactive adding

My home is a cluttered place. (Though I insist: at least I will not permit a
mess which can grow its own messes.) My quest for tidiness takes other, more
obscure forms. Thou shalt have a pristine Git repository history. Sometimes when
building a large feature, it's easy to get in the weeds and write a ton of code.
This happens to me a lot when I'm making design tweaks all over the place, or
building new functionality in Drupal using Features. Committing it all at once
is quick, but leaves other developers unable to follow my train of thought.

**Git's Interactive mode for adding hunks to the staging area makes it easy to
break down a dirty working tree into small, neat, well-documented commits.**