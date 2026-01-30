import {sineParams} from "./tuningForkViz";

function sinusoidalMotion(time) {
    return Math.sin(time * (2.0 * sineParams.PI * sineParams.mFrequency));
}

export function animateSine(object, time) {
        let slowDown = 1000;
        let tuningFork = sinusoidalMotion(time);
        let heightAdjustment = 4;
        object.position.y = tuningFork + heightAdjustment;

        if (object.position.x <= 5) {
            object.position.x += 0.033;
        }

        else if (object.position.x >= 5) {
            object.position.x = -5;
        }

}