# Jonic's Procedurally Generated Tattoo

*tl;dr: I've used JavaScript and the palette of a Sonic sprite to procedurally generate a tattoo pattern for my arm because I'm a huge nerd.*

## The Plan

I already have a + tattooed on my left arm ([which you can see here](https://www.instagram.com/p/BBu22aTxO62/)), made up of 5, 1cm square blocks. I had an idea to get lots of blocky pixels tattooed on my arm, and thought it would make sense to incorporate my existing + tattoo into the design.

Give the orientation of the + (rotated 45deg relative to the arm itself), Adding pixels to it would result in a design that will spiral down the length of my forearm to the wrist.

## How the Pattern is Generated

This React app uses the HTML canvas and some predefined settings to procedurally generate a pattern.

Using the color palette from a sprite of Sonic the Hedgehog from the first Mega Drive game, I can randomly select the color of the pixels from this predefined set. The more often a color appears in that sprite, the more likely it will be chosen for the pixel's color value (more blue, flashes of red, occasional skin tones and black/white).

Given the nature of the spiral, the pixels need to create a staircase effect. The algorithm handles this, and also randomises the chance of a pixel spawning, as well as reducing its size depending on its distance from the center of the main spiral column.

Each pixel is also clickable to allow me to manually turn pixel on and off once the pattern has been generated. I've also made it aware of the existing + tattoo, so that a space is left to accommodate it. The click handler will not work when the tattoo is on my arm due to hardware limitations, chiefly JavaScript support on the client.

## Pseudo-philosophical Nonsense

I need to test this on my arm, but I'm happy with where it's at so far. I need to measure my arm and constrain the design the algorithm generates, but I figure since it's my arm it's not going to change, so there'll be what appears to be magic numbers in here, when in fact the value of those variables is set in 3D space by my body. So in a way I am part of the input, and I will receive the output.
