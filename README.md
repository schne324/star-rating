# Star Rating

This keyboard/screen reader friendly star rating system allows you to rate various things.  

## Roles / Attributes used
 - Each set of stars are marked up with the radiogroup role (`<ul role="radiogroup" />`)
 - The UL is aria-labelledby the groups heading (`<ul aria-labelledby="the-id-of-the-heading" />`)
 - Each 'star' list item within the UL receives the radio role (`<li role="radio" />`)
 - Each 'star' list item within the UL is aria-labelledby the element that updates as you rate stuff (`<li aria-labelledby="the-id-of-the-tip-element"  />`)
 - When selected, the list item receives the `aria-checked="true"` attribute, while the others receive `aria-checked="false"`
 - When selected, the list item receives `tabindex="0"` property, while the others recieve `tabindex="-1"`
     - This is to mimic the default behavoir of native radios
 - Each icon receives `role="presentation"` because there is no real purpose for those other than decoration.

## Keyboard functionality
 - To navigate to a group, simply use TAB
 - To rate the given thing, use the arrow keys that work with native radio buttons (LEFT, UP, RIGHT, and DOWN arrow keys)

## COMING SOON!
 - Half star rating
 - jQuery plugin to convert existing radio groups to star ratings
