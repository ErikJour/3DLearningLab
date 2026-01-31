import * as THREE from 'three'
import {mathMaterials} from "../buildingBlocks/materials";

export const sineParams = {
    mSampleRate: 48000,
    phase: 0.0,
    phaseIncrement: 0.0,
    PI: 3.14159265359,
    mFrequency: 0.5,
    mLength: 10
}

export function initializeSimpleOscillation(scene) {

    function setFrequency(frequency, sampleRate) {
        sineParams.phaseIncrement = 2.0 * PI * (frequency / sampleRate);
    }

    function processSample() {
        let output = Math.sin(phase);
        sineParams.phase += sineParams.phaseIncrement;
        if (sineParams.phase > 2.0 * PI)
            sineParams.phase -= 2.0 * PI;
        return output;
    }
}

function sinusoidalMotion(time) {
    return Math.sin(time * (2.0 * sineParams.PI * sineParams.mFrequency));
}

export function animateSine(object, time) {
    let slowDown = 1000;
    let tuningFork = sinusoidalMotion(time);
    let heightAdjustment = 5;
    object.position.y = tuningFork + heightAdjustment;

    if (object.position.x <= 5) {
        object.position.x += 0.033;
    }

    else if (object.position.x >= 5) {
        object.position.x = -5;
    }
}





