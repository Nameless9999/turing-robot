const colorMap = {
    "Black": "\x1b[30m",
    "Red": "\x1b[31m",
    "Green": "\x1b[32m",
    "Yellow": "\x1b[33m",
    "Blue": "\x1b[34m",
    "Magenta": "\x1b[35m",
    "Cyan": "\x1b[36m",
    "White": "\x1b[37m"
};

const colors = Object.values(colorMap);

module.exports = {
    colorify: (...args) => {
        let index = parseInt(Math.random() * colors.length);
        return [colors[index], ...args].join('');
    },

    colorLog: (...args) => {
        let index = parseInt(Math.random() * colors.length);
        console.log(colors[index], ...args);
    }
}