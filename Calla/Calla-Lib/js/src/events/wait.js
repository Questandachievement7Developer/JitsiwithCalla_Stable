﻿/**
 * Wait a number of milliseconds
 * @param {number} ms - the number of milliseconds to wait
 * @return {Promise} - resolves when the time is up
 */
export function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}