# Code generator for CW training

by Stephan Paukner, OE3SPR

This simple JavaScript application generates random code
which can be used to train morse telegraphy keying.
You can toggle whether the code contains letters, figures or
this set of special characters: =/?,.

The code is strictly generated in groups of five characters.

The randomness of the code is bound to a 'codeid' (GET parameter) in the URL.
This allows to share the same random text with others.
If no 'codeid' is provided, the current UTC timestamp is used.
You may choose your own arbitrary 'codeid' (any string)
to share the same random text.

You can define your own character pool using the GET parameter 'extrachars'.
This allows adding further special characters or increase the occurence
of certain letters or figures.
You can also restrict to your own character pool, so,
this application also assists in learning the morse alphabet.

Reference installation: http://stephan.paukner.cc/cwcode

