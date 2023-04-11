# Code generator for CW training

by Stephan Paukner, OE3SPR

This simple JavaScript application generates random code
which can be used to train morse telegraphy keying.
You can toggle whether the code contains letters, figures or
this set of special characters: =/?,.

The code is strictly generated in groups of five characters.
You cannot limit letters or figures to your own subset, so,
this application doesn't assist in learning the morse alphabet.

The randomness of the code is bound to a 'codeid' in the URL.
This allows to share the same random text with others.
If no 'codeid' is provided, the current UTC timestamp is used.
You may choose your own arbitrary 'codeid' (any string)
to share the same random text.

Reference installation: http://stephan.paukner.cc/cwcode

