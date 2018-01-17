const Stats = require('stats-js');

export function initStats() {
    const stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.querySelector('#Stats-output').appendChild(stats.domElement);
    return stats;
}
