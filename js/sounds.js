// function getSoundFile(pathName) {
//     const dirs = fs.readdirSync(pathName).map(file => {
//         return path.join(pathName, file);
//     });
//     dirs.sort();
//     const nb_files = dirs.length;
//     const randomIndex = Math.floor(Math.random() * nb_files);
//     return dirs[randomIndex];
// }

function createSoundBlock(i) {
    const soundBlock = document.createElement("div");
    soundBlock.id = `sound_${i}`

    const questionTitle = document.createElement("h2");
    const node = document.createTextNode(`Sound ${i}`);
    questionTitle.appendChild(node);
    soundBlock.appendChild(questionTitle);

    // Decide the health condition
    const randomHealthValue = Math.random();
    var healthCondition = "";
    if (randomHealthValue < 0.5) {
        healthCondition = "normal";
    }
    else {
        healthCondition = "abnormal";
    }
    soundBlock.setAttribute('health', healthCondition);

    // Create the sound
    const sound = document.createElement('audio');
    const randomI = Math.floor(Math.random() * 21);
    const soundId = randomI.toString().padStart(8, '0');
    sound.src = `sounds/${healthCondition}/${soundId}.wav`;
    sound.controls = 'controls';
    sound.type = "audio/wav";
    soundBlock.setAttribute('file_name', soundId);
    soundBlock.appendChild(sound);

    // Create abnormal label
    const abnLabel = document.createElement('label');
    abnLabel.for = `${i}_abnormal`;
    const abnInput = document.createElement('input');
    abnInput.type = 'radio';
    abnInput.name = `v${i}`;
    abnInput.health = "abnormal";
    if (healthCondition=="abnormal") {
        abnInput.value = 1; // 1 if the answer is correct, 0 otherwise
    }
    else {
        abnInput.value = 0;
    }
    abnInput.id = `${i}_abnormal`;
    abnLabel.appendChild(abnInput);
    abnLabel.appendChild(document.createTextNode('Abnormal'));
    soundBlock.appendChild(abnLabel);

    // Create normal label
    const norLabel = document.createElement('label');
    norLabel.for = `${i}_normal`;
    const norInput = document.createElement('input');
    norInput.type = 'radio';
    norInput.name = `v${i}`;
    norInput.health = "normal";
    console.log(norInput.health);
    if (healthCondition=="normal") {
        norInput.value = 1;
    }
    else {
        norInput.value = 0;
    }
    norInput.id = `${i}_normal`;
    norLabel.appendChild(norInput);
    norLabel.appendChild(document.createTextNode('Normal'));
    soundBlock.appendChild(norLabel);

    // Add the sound block to the form
    const form = document.getElementById("sounds");
    form.appendChild(soundBlock);
}

function computeScore() {
    var score = 0;
    for (i=1; i<=N; i++) {
        try {
            var tmpVal = parseInt(document.querySelector(`input[name="v${i}"]:checked`).value);
            score += tmpVal;
        }
        catch (err) {
            console.log(err);
            if (err instanceof TypeError) {
                alert("All fields must be filled before submitting.");
                return false;
            };
        }
    };
    document.getElementById("grade").innerHTML = score;
    return false;
}