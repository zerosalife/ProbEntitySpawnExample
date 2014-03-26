#pragma strict

import System.Collections.Generic;

var probs : float[] = [0.5, 0.2, 0.1, 0.2];
var ents : String[] = ["Red", "Green", "Black", "Orange"];

var terrains = new Dictionary.<String, List.<float> >();
terrains["desert"] = new List.<float>([0.1, 0.05, 0.425, 0.425]);
terrains["grassland"] = new List.<float>([0.3, 0.35, 0.1, 0.25]);

function Choose(probs : float[]) : int {
    // Returns the index of a probabilistically determined random
    // entity, given by the probability distributions in probs.
    // e.g.:
    // probs : float[] = [0.5, 0.2, 0.1, 0.2];
    // entity = entities[Choose(probs)];
    //
    // See http://docs.unity3d.com/Documentation/Manual/RandomNumbers.html

    // Watch out!  If you fail to specify total's type as float, it
    // will add the probs using integer addition.  This will floor
    // each of the probs to 0.
    var total : float = 0;

    for (x in probs) {
        total += x;
    }

    var randomPoint = Random.value * total;

    for(var i = 0; i < probs.Length; i++) {
        if (randomPoint < probs[i])
            return i;
        else
            // Shift the strip down, adjusting the random point's
            // value to see whether it falls within the next prob.
            randomPoint -= probs[i];
    }
    // Take care of possibility that randomPoint is 1 or 100%.  Avoids
    // allowing Choose to return a 0 probability event (which would be
    // possible using the <= test).
    return probs.Length - 1;

}

function Start () {
    for(var i = 0; i < 10; i++) {
        var item = ents[Choose(probs)];
        Debug.Log(item);
    }
}
