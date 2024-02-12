Singer:
Inteligent system for giving hints human how to sing more align with given spotify song.

user_raw = remove_noise(isolate_vocal(input_from_recorder))
target_raw = isolate_vocal(downland("spotify/name_of_song"))

Input: user_raw[t]
Expected: target_raw[t+1]
Cost: how align are sounds between

At the end of recording, the song is showed in with 3 or 4 places where sound does not match the orginal.

    the sound dynamic goes like this:
        dun du du da
              ^
|-------------X--------------------XXX-----X-----X---------|


At the start I would like to use heuristic based detection (after fourier transform)
Along the way I will use AI for comparing raw format files, to learn what to tell human that will improve his next performance

    AI told you this hint
              ^
|-------------X--------------------XXX-----X-----X---------|

and in next try I improved in this place

|-------------x--------------------XXX-----X-----X---------|

this could mean that such hint helped me to get better in such and such case.


STEPS:

heuristic angle: transform both outputs with fourier algorythm
    + the error will be easy computable
    + the differences in each category (sound pitch, ) will be visible

subjective angle: analyze sounds by myself insert some notes
    + this will give ai some insight about what kind of feedback I need and where are

automate_stuff
    + load song automatically from spotify (DownOnSpot)
    + record
    + create gui for difference visualization

Start using app as quick as possible


external ai angle: find corelation between those two ^

