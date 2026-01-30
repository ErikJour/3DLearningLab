import * as THREE from 'three'

export const sineParams = {
    mSampleRate: 48000,
    phase: 0.0,
    phaseIncrement: 0.0,
    PI: 3.14159265359,
    mFrequency: 2
}

export function initializeSimpleOscillation(scene) {

    function setFrequency(frequency, sampleRate) {
        sineParams.phaseIncrement = 2.0 * PI * (frequency / sampleRate);
    }

    function procesSample() {
        let output = Math.sin(phase);
        sineParams.phase += sineParams.phaseIncrement;
        if (sineParams.phase > 2.0 * PI)
            sineParams.phase -= 2.0 * PI;
        return output;
    }
}




