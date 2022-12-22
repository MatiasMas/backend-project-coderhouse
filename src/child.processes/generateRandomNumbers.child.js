process.send("ready");

process.on("message", (parentMessage) => {
    const strings = parentMessage.split(",");

    if (strings[0] === "start") {
        let numbers = new Map();

        for (let i = 1; i <= 1000; i++) {
            numbers.set(i, 0);
        }

        for (let i = 0; i < parseInt(strings[1]); i++) {
            let randomNumber = numberInRange(1, 1001);

            for (let j = 1; j <= numbers.size; j++) {
                if (j === randomNumber) {
                    numbers.set(j, numbers.get(j) + 1);
                }
            }
        }

        process.send(Object.fromEntries(numbers));
        process.exit();
    }
});

const numberInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
};

