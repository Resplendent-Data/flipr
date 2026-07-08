# Flipr

Flipr is a playful "Tinder for narwhals" demo: one person browses narwhal
profiles and builds a collection of matches by swiping. This glossary fixes the
shared language so code, UI copy, and docs stay consistent.

## Language

**Narwhal**:
A candidate profile shown in the deck — the thing you swipe on.
_Avoid_: user, candidate, card, match (a narwhal only becomes a match after you Like it)

**Current user**:
The single person doing the swiping (the seeded demo user, "Nara"). There is exactly one.
_Avoid_: account, member, profile

**Deck**:
The ordered set of narwhals the current user has not yet swiped.
_Avoid_: feed, queue, stack, list

**Swipe**:
A decision the current user makes on a narwhal — either a Pass or a Like. Recorded once per narwhal.
_Avoid_: vote, rate, react

**Pass**:
A swipe that rejects a narwhal. Canonical term for both the button and the drag stamp.
_Avoid_: Nope, skip, dislike, reject

**Like**:
A swipe that accepts a narwhal. A Like immediately creates a Match.
_Avoid_: heart, yes, favorite

**Match**:
A narwhal the current user has Liked. By demo convention every Like becomes a Match — there is no reciprocation step.
_Avoid_: connection, pair

**Pod**:
The current user's collection of Matches, shown alongside the deck.
_Avoid_: crew, group, matches list

**Portrait**:
The large gradient artwork with a monogram at the top of a narwhal's card. Narwhals have no photos, so the portrait stands in for one.
_Avoid_: photo, image, hero, avatar

**Avatar**:
The small circular gradient initial used in the pod, header, and match overlay. Same visual family as a Portrait but a different role and size.
_Avoid_: icon, thumbnail, portrait
