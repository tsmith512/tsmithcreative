---
title: Building a Personalized Portfolio Experience in Drupal 7
layout: post
---

Happy Holidays, folks!

I use my portfolio website as an archive of all projects so that high-resolution
images and descriptions are organized and readily available. Much of this
content is either not publicly listed or is specifically restricted from
anonymous traffic. This means a lot of content is ready to present to special
guests, but the experience would be more like digging through a card catalog
than reviewing a portfolio in person. An in-person review usually involves an
introduction and a short curated list of pieces to show with relevant talking
points about them.

I wanted to prototype as much of that experience as possible in this little
holiday side project.

### The "Portfolio Tour" as a content type

![Wireframe][Wireframe]

I identified a few fields:

* __Title:__ Guest or company name, etc...
* __Teaser Description:__ Every node on my site has a short descriptive sentence under the title; continue that trend for consistency. In this case, I'll use it like an objective line on a resume. Why am I showing you this / what I'm going to show you.
* __Masthead Image:__ Also a site staple, an image above the content area. Probably a relevant cityscape or building, or significant portfolio item.
* __Introduction:__ The node body, use as a _short_ cover letter.
* __Portfolio Selections:__ A repeatable [_field collection_](https://drupal.org/project/field_collection) containing:
  * __Portfolio Item:__ Entity reference to project or article node
  * __Description:__ To provide any relevant point about the project and its relevance to this tour
* __Conclusion:__ Another text field for a closing. Keep it short!

This format closely resembles my existing site components, so theming the
front-end is simple. _(Theming of Field Collections is a lot easier by using the
"Fields Only" formatter now included.)_

When considering access restriction, honestly content like this could simply be
left unlisted. But where's the fun in that? Also, since some of my content is
already not accessible publicly, I forged ahead and extended that node access
check to restrict this node type. See those permissions below.

![Sample][Sample]

### User assignments

I added an [Entity Reference](https://drupal.org/project/entityreference) field
to user accounts to store a relationship to an assigned tour. This assignment
lets me easily surface links and redirects to the specific tour. Also, multiple
guests could be assigned to the same tour but log in separately.

### Permissions

My project-specific module provides a few extra permissions using
[`hook_permission()`](https://api.drupal.org/api/drupal/modules!system!system.api.php/function/hook_permission/7),
each is fairly self-explanatory.

1. _View private projects_
2. _View **assigned** portfolio tour_
3. _View **any** portfolio tours_
4. _Administer portfolio tour assignments_

1 and 2 are assigned to a "portfolio visitors" role. 3 and 4 are reserved for
admin and/or future use, but are used to help keep `user_access()` checks easy
to read.

### Allowing users to access the tour easily

To remove any barriers to entry, I opted to allow guests to jump straight to
their assigned tour using a personalized "welcome" link. _Yes, that's right, a
URL-based authentication. That's a big security concern in most situations. Set
your permissions for "Portfolio Visitor" role appropriately **as well as those
for "Authenticated User"** since each user qualifies for those permissions as
well._ This is a user experience decision, and is totally unnecessary. Giving
users a username, password, and login URL isn't difficult; this is to provide
something special, if you're willing to consider the security concerns.

Start by defining the URL in
[`hook_menu()`](https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_menu/7)
for the callback to handle visitor authentication. I'm using a URL structure like this:
`http://tsmithcreative.com/welcome/taylor-smith/123`

``` php
<?php
/**
 * Implements hook_menu()
 */
function tsc_menu() {
  return array(
    'welcome/%/%' => array(
      'page callback' => '_tsc_user_welcome_login',
      'page arguments' => array(1, 2),
      'access callback' => TRUE, // Anonymous traffic needs access.
    ),
  );
}
```

Then in the page callback function, I perform several checks and ultimately log
the user in programmatically. At any point of failure, I use
[`drupal_goto()`](https://api.drupal.org/api/drupal/includes%21common.inc/function/drupal_goto/7)
to send the visitor to the home page. This also halts further execution, acting
as a `return` or `die()` statement, so they don't get logged in inadvertently.

``` php
<?php
function _tsc_user_welcome_login($username, $access_token) {
  // This menu hook shouldn't be called without these
  // components, but if we don't receive one, go home.
  if (empty($username) || empty($access_token)) {
    drupal_goto();
  }

  // Confirm account exists and load.
  $tentative_user = user_load_by_name(check_plain($username));

  // Does user exist?
  if (empty($tentative_user)) { drupal_goto(); }

  // Does user have tour assignment?
  $tour = field_get_items('user', $tentative_user, 'field_assigned_portfolio_tour');
  $tour = (!empty($tour)) ? reset($tour) : false;
  if ( !isset($tour['target_id']) ) { drupal_goto(); }

  // For the time being, the "access token" is just the NID
  // of the tour assignment. Check for that.
  // @TODO: Something better would be good.
  if ($access_token != $tour['target_id']) { drupal_goto(); }

  // Run full node_access check for the portfolio tour:
  if (!node_access('view', node_load($tour['target_id']), $tentative_user)) {
    drupal_goto();
  }

  // Now we "know" we have a valid $user, a valid $tour['target_id'], the
  // given user can view that tour, and we've checked our laughable
  // token. Officially log in the user and redirect to that tour.
  global $user;
  $user = $tentative_user;

  $edit = array(
    // This would be the $form_state of a submitted user_login form.
    // hook_user_login() recieves it, but a lot of it can't be faked.
    'name' => $user->name,
    'uid' => $user->uid,
  );
  user_login_finalize($edit);

  // Goto the assigned tour
  drupal_goto("node/{$tour['target_id']}");
}
```

Ultimately, there are a couple ways to log a user in programmatically.
[Using `user_login_finalize()`](http://stackoverflow.com/a/13828301/941259)
ensures that all `hook_user_login()` functions fire, and an auth message is
written to watchdog. Simply setting the global `$user` value and using
`drupal_session_regenerate()` also works, but skips those parts.

### Returning to the tour easily

Once the user begins his or her exploration, I wanted an item in the main menu
to return to the tour.

A very simple solution: move the _My Account_ link in the Core-provided
_User Menu_ (which I don't use) into the _Main Menu_. It is only shown to
authenticated users and can be relabeled. "Welcome" seemed appropriate, and
it is placed next to "Home."

![Menu][Menu]

This link goes to `user_view` at /user, so next, I need to direct users from
there to the appropriate tour. Panels makes this easy. Using a Panels display
variant, these portfolio visitors can be redirected using a simple set of
selection rules and contexts that lead to an "HTTP Status Code" variant:

![Selection Rules][SelectionRules]

* __User: compare__ User being used is the Logged in user.
  Make sure the user is trying to reach his or her own profile, which happens when using the _My Account_ link or if he or she ever visits `/user` manually.
* __User: permission__ User being viewed has "View assigned portfolio tour"
  Make sure this user can see a tour.
* __Node: accessible__ User being viewed can view _Assigned Portfolio Tour_
  This is a Relationship added in the _Contexts_ page of the variant setup. It simply provides a full node object lifted from the `field_assigned_portfolio_tour` field.

The redirect rule is a simple 301 Redirect to `node/%tour:nid`. (The `tour`
identifier defaults to `node` and is configured when the Relationship is
established. Your pick.)

### Showing Users the Link

Lastly, I'll add two custom Ctools content types (custom panes) on the tour
node: one for yours truly to see the links to give to my guests, and one for
guests so they know their way back (as well as inform them that they must log in
that way). Building custom panes is easy; my friend/co-worker at Four Kitchens,
Ian Carrico, explains all about it in
[_Creating Custom Panels Panes_ on the 4K blog](http://fourkitchens.com/blog/2012/12/13/creating-custom-panels-panes-and-use-substitution-too).

_My admin pane:_

![Admin][Admin]

_Guest pane:_

![Guest][Guest]

Both panes take in a node context (node being viewed); the guest pane also takes a user context (logged in user). These contexts are added by including the following in the `$plugin` array in the `.inc` file that [Ian described](http://fourkitchens.com/blog/2012/12/13/creating-custom-panels-panes-and-use-substitution-too):

``` php
<?php
'required context' => array(
  new ctools_context_required(t('Node'), 'node'),
  new ctools_context_required(t('User'), 'user'),
),
```

__The admin pane__ uses an [`EntityFieldQuery`](https://api.drupal.org/api/drupal/includes!entity.inc/class/EntityFieldQuery/7) to locate any users whose `field_assigned_portfolio_tour` match the node being viewed:

``` php
<?php
// Build an EntityFieldQuery to look for user(s) assigned to this node
$query = new EntityFieldQuery;
$result = $query
  ->entityCondition('entity_type', 'user')
  ->fieldCondition(
    'field_assigned_portfolio_tour',
    'target_id',
    $node_context->nid,
    '=')
  ->execute();

// Did we see any?
if ( empty($result['user']) ) {
  $block->content =
    "<p>No users are assigned to this tour.</p>";
  return $block;
}

// Load full user objects
$users = user_load_multiple(array_keys($result['user']));
```

The function then builds the unordered list of usernames linked to their
profiles and the customized login link each should use using the same code the
guest pane uses.

__The guest pane__ is more simple. It pulls the user's name and the node's id,
and makes the link:

``` php
<?php
$tour = field_get_items('user', $user_context, 'field_assigned_portfolio_tour');
$tour = (!empty($tour)) ? reset($tour) : false;

// Check if the user's tour target is this node before printing.
// If not, bail invisibly.
if ($tour['target_id'] != $node_context->nid) return;

global $base_root; // Get our hostname/installation location

$link = preg_replace('/(http:\/\/|www\.)/', '', "{$base_root}/welcome/{$user_context->name}/{$node_context->nid}");
```

### So that's it

I declare Drupal Victory with my little prototype feature. The minimum
requirement was met with the Portfolio Tour node type and the assignment field
on users. The permissions work, the "welcome" link in the Main Menu, the
easy-login URL, and the link display panes provide a more pleasant experience.
In the future, additional user-activity tracking could be added to see if/when
guests log in, what they look at, or other analytics that might be useful in
keeping the conversation going.

<!-- Images -->
[Wireframe]: /assets/portfolio-review-d7/portfolio_tour_node.png
[Sample]: /assets/portfolio-review-d7/portfolio_tour_shot.png
[SelectionRules]: /assets/portfolio-review-d7/portfolio_tour_redirect_from_user_view.png
[Menu]: /assets/portfolio-review-d7/main_menu.png
[Admin]: /assets/portfolio-review-d7/admin_pane.png
[Guest]: /assets/portfolio-review-d7/guest_pane.png
