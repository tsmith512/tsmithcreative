---
title: "React Native: from \"Hello World\" to Torture Device in 2 weeks"
summary: >
  With a new job comes a needed familiarity with new technologies and tools.
  For my first experiment with React Native, I made a simple interval timer for
  climbing hangboard sets to keep me busy during the plague.
tags: [development, fitness, mobile]
---

I just hit [my first 90 days at Very]({% post_url 2020-02-07-finding-next %}).
Having moved from primarily a web development shop to a new team that is much
more focused on apps, devices, and infrastructure, I want to learn the basics
for the stacks we use so I can continue to make strategic product
recommendations. I don't need to reach "production engineer" level, nor do I
intend to commit code on my client builds, but I want to begin building my
familiarity with these new-to-me ecosystems.

So I set a goal: zero-to-stores with something simple. But what?

Well, it's not a revolutionary idea or something that doesn't already exist, but
I decided to make an interval timer for sets on my climbing hangboard.
Regardless of what other apps exist, the fitness app I am already using does
_not_ do these well. So I thought I'd make something to cover the gap because
the need is simple and it would be something I'd use daily.

{% picture /blog/hello-hangboard/hang.jpg --alt "Me, struggling." %}

_**Humble beginnings:** prototype-level design, packing-tape-as-phone-mount, and
just training up a dead hang before moving onto more challenging holds. And I
think it goes without saying that we're not telling my landlord about this._

# Actual Product Requirements:

- Conveniently run on _a_ mobile device I own (thanks to software testing and
  roadtrip planning devices, that's actually a broad range of stuff)
- Audio and visual cues to progress through a circuit
- Able to handle the weird nested patterns of sets I'm seeing, like:

{% picture mini /blog/hello-hangboard/routine.jpg --alt "Handwritten workout with weird pattern" %}

_Most workout/interval timers I've seen are "on" vs "rest" timers that repeat in somewhat irregular or nested patterns which were hard to set timers for or count off correctly in my head._

## Professional Development <del>Requirements</del> Goals

- Mobile _app,_ built on a common stack and something Very is currently using
- Cross-platform (iOS and Android)
- Built with technology I have enough familiarity with that I can learn
  something new while also making some measurable progress quickly.

I opted for **[React Native](https://reactnative.dev/).** I haven't used
React on the web (yet) but it's a hugely popular framework so building
familiarity with it would be useful. Also, we've increasingly seen clients opt
for React Native over platform-specific codebases. For many applications,
maintaining one central JS codebase that leverages open source native components
is both easier to hire for and less expensive to maintain than entirely
disparate codebases for different mobile platforms.

# Getting Started and Expo

The first page of React Native's
["Setting up the development environment"](https://reactnative.dev/docs/environment-setup)
tutorial directs new developers to [Expo](http://expo.io/) for a quick start.

Expo offers a ready-to-use bundling of tools and services with a baseline set of
packages/components to get started quickly. It also means you don't need to
fiddle with Android Studio and Xcode to get started. Expo's local scripts or its
SaaS platform handle all the bundling and building. This was the perfect setup
for the "Hello World phase" of the project.

``` js
{% raw %}// DO NOT COPY THIS! This is learning scratchwork, not best practices patterns.

import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloHangboard extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{textAlign: "center", fontSize: 32}}>Hello, Hangboard.</Text>
        <Text style={{textAlign: "center"}}>
          I'm stuck in my apartment because of coronavirus.
        </Text>
      </View>
    );
  }
}{% endraw %}
```

**Observations on component building:** As an industry, we spent the early
aughts highlighting the wisdom of separating concerns into separate files: HTML
for content, CSS for appearance, and JS for interactive function. Bringing CSS
into JS (and the _multitude_ of _competing_ practices for doing so) and using
JSX templating for HTML/Content-in-JS both are super outside my comfort zone,
but I will learn. And I admit: this isn't webpage building! This is interactive
application scaffolding, so I can see the argument for the consolidation of "UI,
appearance, function" and separation of _feature_ being more sustainable. An
immediate plus, though: UI layout with Flexbox is a pretty awesome idea.

``` js
{% raw %}// DO NOT COPY THIS! This is learning scratchwork, not best practices patterns.

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Title from './Title';
import Link from './Link';

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  _exit = () => {
    this.props.navigation.navigate('Welcome');
  }

  render = () => {
    return (
      <View style={aboutStyles.container}>
        <View style={aboutStyles.main}>
          <AntDesign style={aboutStyles.closeButton} name='closecircleo'
            size={32} color='black' onPress={this._exit} />
          <Title small />
          <Text style={aboutStyles.paragraph}>Sources:</Text>
          <Link icon='link' title="REI's post “Hangboard Training 101”"
            href='https://www.rei.com/blog/climb/hangboard-training-101'></Link>
          <Link icon='link' title="Metolious Training Guide"
            href='https://www.metoliusclimbing.com/training-guide-overview.html'></Link>
          <Text style={aboutStyles.paragraph}>With special thanks to Joe and Jay.</Text>
          <View style={aboutStyles.warningContainer}>
            <Text style={[aboutStyles.warningText, aboutStyles.paragraph]}>
              Improper use of a hangboard can cause serious finger and tendon
              injury; don't strain to complete a set and do not train to the
              failure point. Improper installation can cause a serious fall.
              Refer to manufacturer setup and usage instructions as well as an
              experienced trainer before use.
            </Text>
          </View>
          <Link icon='hearto' title='Created by TSmith'
            href='https://tsmith.com' color='#CC0066'></Link>
        </View>
      </View>
    );
  }
}

const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 16,
  },

  main: {
    alignItems: 'stretch',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 4,
  },

  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },

  paragraph: {
    marginTop: 8,
    marginBottom: 8,
  },
  [...]
};{% endraw %}
```

**Observations on Expo:** Expo offers _so much_ "for free." And it's upfront
about the
[limitations](https://docs.expo.io/versions/latest/introduction/why-not-expo/)
of the toolchain. This was a fantastic way to start. It also limited the number
of new things I had to learn _simultaneously._ (Limit the
<abbr title="Work In Progress">WIP</abbr>, yo.) But when I got around to
notification sounds, I had trouble with the audio support in
[Expo AV](https://docs.expo.io/versions/latest/sdk/av/). Also, my compiled
release binaries (which come from Expo's SaaS platform) were _huge._

# Leaving Expo

I "ejected" my app from Expo for a few reasons:

- iOS didn't seem to want to rapidly re-use Expo AV `Audio` objects, though it
  worked fine on Android.
- Expo bundles a bunch of packages, components, SDKs, and permissions that I
  wasn't using. I wanted to see what a slimmer project would look like.
- I wanted to manage iOS and Android builds myself to learn those toolsets.
- I wanted to be able to produce iOS and Android builds using our CI/CD provider.
- I could still use Expo packages (Icons and Keep Awake) as part of a "bare
  workflow" (React Native without Expo) project.

[Running `expo eject`](https://docs.expo.io/versions/latest/bare/customizing/)
to get to the "bare workflow" is actually quite simple. Expo's scripts generate
the `android` and `ios` folders with build scripts and configuration for the two
projects.

**Observations:**

- Expo Eject left in React Native Unimodules, which accounts for a lot of the
  bloat. Removing it requires editing platform native code, so I'm marching
  toward a 1.0 with Unimodules still included.
- Eject did not produce a good `.gitignore` for the platform-specific builds, so
  I ended up with a few things in version control that I have since learned
  should be downloaded or generated by package managers and build scrips.

# Development Environments

All my web development in the past has been done on Linux. I wanted to give
Windows development a shot, especially since it is easier to connect my phone to
my PC than a Linux VM/container.

{% picture /blog/hello-hangboard/win-dev-env.png --alt "Windows / Android Studio Environment" %}

React Native's [documentation](https://reactnative.dev/docs/environment-setup)
is pretty good. I got Android development working on my Windows box and iOS
_and_ Android development working on my Very Macbook quickly.

{% picture /blog/hello-hangboard/mac-double-dev-env.png --alt "macOS / Xcode/iOS and Android Studio Environment" %}


**Observations:**

_Mac Stuff:_

- As with Linux, I'm using [`nvm`](https://github.com/nvm-sh/nvm) to install and
  manage Node versions on my Mac, rather than using Homebrew.

_Windows Stuff:_

- Microsoft's tutorial
  ["Set up your Node.js development environment directly on Windows"](https://docs.microsoft.com/en-us/windows/nodejs/setup-on-windows)
  made this really easy.
- [Git](https://git-scm.com/) for Windows _(as in the canonical git package, not
  a wrapper app like GitHub Desktop or SourceTree)_ is in a **much** better
  place than last I checked.
  - However, it provides &mdash; what I think &mdash; is poor help text and
    default around config `core.autocrlf`. The recommended default value is
    `true` which would set CRLF line endings on all text files _on checkout_ and
    always commit LF endings into the repo. I have always written source files
    with LF endings only, even on Windows, and want to keep it that way. Setting
    the value to `input` will leave files as-is in the working tree. Files
    checked-in to the repo will commit with LF endings, and new files checked
    out will come out as they're committed.
- [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows)
  works very well, but it does not appear to read `.nvmrc` files correctly.
- On Windows, all of this works better in PowerShell than in Command prompt or
  [Cygwin Bash](https://www.cygwin.com/). I am not currently using
  [WSL](https://docs.microsoft.com/en-us/windows/wsl/wsl2-about).

_Both:_

- I had to edit the environment variable config for Android Studio.
  Specifically, the `PATH` additions for Windows weren't quite right in React
  Native's environment tutorials. Watch where Android Studio installs itself,
  its SDKs, and the Platform Tools  and double-check the `PATH` additions.

{% picture mini /blog/hello-hangboard/win-env-var.png --alt "Windows environment variables" %}

_On Windows, Android Studio installed itself **and the Android SDKs/tools** in `%LOCALAPPADATA%` instead of the drive root._

``` bash
[tsmith@macbook][~/Documents/repos/HelloHangboard] →  cat ~/.bash_profile | tail -n 5
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

_On Mac, Android Studio is in my local user's Library &mdash; which is consistent with RN's docs._

# Building Release Packages

My next priority was getting both release and debug packages working with
Android Studio on Windows (personal devices), followed by release and debug
packages working on Xcode and macOS (work devices). That wasn't too bad.

Initially, I wasn't sure the names for "app version that wants to connect to the
JS bundler service" (`debug`) versus "app version that is packaged and ready to
use on your phone now" (`release`).

The ["Running on Device"](https://reactnative.dev/docs/running-on-device)
tutorial explains how to build both, but there are enough foundational steps
explained that it feels more clear now in retrospect having done it a few times.


_**iOS:**_

``` bash
# Debug
[tsmith@macbook][~/Documents/repos/HelloHangboard] → npx react-native run-android
```

{% picture mini /blog/hello-hangboard/mac-xc-build-conf.png --alt "Xcode Project Scheme Build Configuration" %}

_For Release: In the Project menu in Xcode, select "Edit Schemes" to change the build config, then Build the project._


_**Android:**_

``` powershell
# Debug
PS C:\Users\tsmith\HelloHangboard> npx react-native run-android

# Release
PS C:\Users\tsmith\HelloHangboard\android> .\gradlew assembleRelease
```

I ran into a conflict between React Native 0.61.4 and Android's SDK 29. The
connection from the debug release back to the Metro JS bundler is insecure,
which the upgraded Android SDK disallows by default.
[Tom from Stack Overflow](https://stackoverflow.com/a/56808180) to the rescue
with a Manifest to disable this restriction for debug builds, which fixed it.

``` xml
<!-- HelloHangboard/android/app/src/debug/AndroidManifest.xml -->
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
    <application android:usesCleartextTraffic="true"
      tools:targetApi="28" tools:ignore="GoogleAppIndexingWarning" />
</manifest>
```

{% picture mini /blog/hello-hangboard/pair.jpg --alt "iPhone X and Pixel 2 side-by-side" %}

_There it is._

# Building with Bitrise

Once that was set, I wanted to get Bitrise, one of our preferred CI/CD platforms
for apps, building cross-platform builds on commits to master.

That was fairly straightforward except for two pieces:

- Code Signing for Android is a moderate annoyance, but producing and using a
  key locally is well documented, and all you have to do is just keep using it.
- Code Signing for iOS is (currently, to me) profoundly difficult to untangle
  _in you run into a problem._ Xcode seems to imply that it can all be done
  within the application, but no cert I provisioned within Xcode's Preferences
  would work with Very's Team (nor my "Personal Team" either). And once I got it
  on Bitrise, I started having Provisioning Profile problems on top of that.

![This made me angry.](/assets/blog/hello-hangboard/mad-at-my-computer.gif)

When I threw it all out and started over outside Xcode, it worked fine, first try:

1. Access our corporate Apple Developer Account online.
2. Create a Bundle ID for HelloHangboard (`com.verypossible.hellohangboard`)
   specifically.
3. _From the Apple Developer website_ (not locally in Xcode), create a
   Distribution certificate to use for my name within Very's org.
4. Again, _from the Apple Developer website,_ create a Provisioning Profile
   matching: that cert, intended for Apple Distribution, on that Bundle.
5. Downloading and importing those things into Xcode, then uploading to Bitrise.

- Using Bitrise's [codesigndoc](https://github.com/bitrise-io/codesigndoc) tool
  to pull these from Xcode automatically would have been simple had the certs
  worked. But they didn't.

Clearly, iOS Code Signing is the part of this I had the most trouble with, and
need to study more about. I _felt_ like it should be simple and that I knew what
was going on &mdash; it just kept not working. And the answer was always "your
cert and your development team don't match" or "your development team isn't
allowed to build under this provisioning profile," even though all the IDs
matched every time.

{% picture /blog/hello-hangboard/bitrise-workflows.png --alt "Side by side workflows in Bitrise" %}

Once that was cleared up, the Bitrise workflow config was not difficult. In
separate workflows for iOS and Android, I have these basic steps:

1. Load SSH key for the repo and clone it
2. `npm install`
3. (iOS) Auto Provision (pulls in and confirms the cert and provisioning profile)
4. Install either Android components/modules and iOS CocoaPods
5. Override/increment the project version and build code based on the Bitrise build number
6. Build
7. Sign
8. Save binaries to Bitrise and my S3 backup bucket
9. Upload directly to App Store Connect and Google Play Console

{% picture mini /blog/hello-hangboard/bitrise-log.png --alt "Bitrise build log" %}

Thanks to the GitHub webhook and Bitrise workflow triggers, any commit on
`master` will run a third "Workflow" I made called `combo`. That runs the
`ios` and `android` workflows sequentially to produce both builds.

# App Store Connect and Google Play Console

If Android's Code Signing was an easy hoop to jump through, it was Apple's
chance to sign when getting into App Store Connect.

{% picture mini /blog/hello-hangboard/app-store-testflight.png --alt "Version 1.0.32 on TestFlight" %}

I had a Beta Reviewed app on TestFlight and working on my iPhone (and Dad's!)
within 48 hours.

Google Play Console, on the other hand, has a rather opaque approach to letting
me know how long I will be "pending."

{% picture mini /blog/hello-hangboard/a-bit-more-time.png --alt "Google Play Console 'A bit more time'" %}

I do like how Play Console offers more robust release tracks for Internal,
(Closed) Alpha, (Open) Beta, and Production releases, but makes it _very_
difficult to understand what part you're waiting on. At present, I have the
1.0.32 release "fully rolled out" (their words) in the Internal and closed
Alpha.

{% picture mini /blog/hello-hangboard/play-release-tracks.png --alt "Version 1.0.32 not available on Google Play" %}

But I can't get a link or an email invite to share, nor can I even get it
installed on my own device registered with this account. Thankfully side-loading
apps in Android is easy, so I've just done that and moved on with life.

_Certainly,_ I understand delays and slower processing from any business in this
time, but I put my first release into Google Play's internal and alpha tracks
over a week ago and _I'm happy to wait._ However, what is not obvious is from
this console or any help documentation if _they are waiting on me,_ or
_I am waiting_ on something from them. And
[this](https://stackoverflow.com/questions/48256603/where-is-the-opt-in-url)
[isn't](https://forum.unity.com/threads/i-cant-seem-to-access-my-google-play-alpha-release.507570/)
[an uncommon](https://www.reddit.com/r/androiddev/comments/9ufgek/why_is_googles_alphabeta_apk_distribution_so_bad/)
[question](https://www.reddit.com/r/androiddev/comments/cgb6zy/how_to_set_up_an_app_for_internal_testing/)
outside "coronatime" either.

{% picture mini /blog/hello-hangboard/play-problem.png --alt "This feels like conflicting language" %}

_This screenshot, from StackOverflow, is what I see too. It feels like conflicting language: Released, full roll-out. No link or email invites until you publish. Which you thought you already did._

Community responses vary between "it's just a matter of time, you have to wait"
to "click X magic button in Y console page," but none of Google's official
documentation clarify how one should resolve what feels like a stall.

# Recap and Roadmap

**What I've built meets my MVP objectives for:**

- Usable interval timer for the hangboard for me and friends with iPhones
  _(Android friends coming soon, I guess)._
- First React Native exposure, introduction to how it works, how it builds, and
  the nature of its cross-platform abilities.
- First Play Console and App Store Connect process exposure so I can help guide
  clients through this part of the process.

**Things that are needed, in a rough priority order:**

{% picture mini /blog/hello-hangboard/vanilla-sky.jpg --alt "Me" %}

- _Being able to climb outside again&hellip;_
- This desperately needs a code review. There are competing examples for how to
  write ES6 generally and React-specific patterns.
- After "is it structured to best practices," then "is it written properly?"
  Lint this code! It compiles but I know but it ain't pretty.
- Learn more about classes vs functional exports, and why object-oriented
  class structures seem to have fallen out of style within the JS community.
- A more sustainable way to handle CSS-in-JS than per-component `StyleSheet`
  objects with no shared attributes.
- More circuits &mdash; I can't imagine releasing this app publicly in its
  limited form.
- The visual design needs _help._

React Native did get me from "I wonder what it would be like to build a mobile
app" to having a compiled app running on both major platforms on physical
devices in my hands in record time. One day, I'd like to dig more into
platform-specific native languages and practices, but I can definitely see why
this approach has gained traction so quickly when it's well-suited. The
intimidating part was the huge number of moving pieces through many levels of
abstraction, but the community is active and documentation is evolving quickly
to help with that.

In the meantime, I've got my torture device hanging over the stairs and two
phones to holler at me to use it every day. That might be as far as I get for a
while. Stay healthy, friends. We'll be back outside together one day, and I'm
looking forward to it.
