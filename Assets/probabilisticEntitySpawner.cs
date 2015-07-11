using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class probabilisticEntitySpawner : MonoBehaviour {
    private string[] ents = new string[] {"Red", "Green", "Black", "Orange"};

    private Dictionary<string, List<float>> areas = new Dictionary<string, List<float>>();

    public int ChooseIdx(List<float> probs) {
        float total = 0;

        foreach(float x in probs) {
            total += x;
        }

        float randomPoint = Random.value * total;
        for(var i = 0; i < probs.Count; i++) {
            if(randomPoint < probs[i])
                return i;
            else
                randomPoint -= probs[i];
        }
        return probs.Count - 1;
    }

    void Start() {
        areas.Add("desert", new List<float>(new float[] {0.1f, 0.5f, 0.425f, 0.425f}));
        areas.Add("grassland", new List<float>(new float[] {0.3f, 0.35f, 0.1f, 0.25f}));

        for(var i = 0; i < 10; i++) {
            string item = ents[ChooseIdx(areas["grassland"])];
            Debug.Log(item);
        }
    }
}