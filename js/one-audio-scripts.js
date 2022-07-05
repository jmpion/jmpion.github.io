function setupSound(sound, healthCondition) {
    healthCondition = healthCondition || '';
    const randomI = Math.floor(Math.random() * NB_FILES_IN_EACH_DIR);
    const soundId = randomI.toString().padStart(8, '0');
    if (healthCondition == '') {
        const randomHealthValue = Math.random();
        if (randomHealthValue < 0.5) {
            healthCondition = 'normal';
        }
        else {
            healthCondition = 'abnormal';
        }
    }
    var src = `sounds/${level_global}/${healthCondition}/${soundId}.wav`;
    console.log(src);
    sound.setAttribute("src", src);
    sound.setAttribute("health", healthCondition);
    document.getElementById("machineType").innerHTML = sessionStorage.getItem("currentMachine");
    return [healthCondition, src];
}

function loadSoundBlock (healthCondition) {
    healthCondition = healthCondition || '';
    const sound = document.createElement("audio");
    sound.controls = 'controls';
    sound.type = 'audio/wav';
    sound.id = "sound";
    const randomI = Math.floor(Math.random() * NB_FILES_IN_EACH_DIR);
    const soundId = randomI.toString().padStart(8, '0');
    const randomHealthValue = Math.random();
    if (healthCondition == '') {
        if (randomHealthValue < 0.5) {
            healthCondition = 'normal';
        }
        else {
            healthCondition = 'abnormal';
        }
    }
    sound.src = `sounds/${level_global}/${healthCondition}/${soundId}.wav`;
    const soundBlock = document.getElementById('soundBlock');
    sound.setAttribute('health', healthCondition);
    soundBlock.appendChild(sound);
    document.getElementById("machineType").innerHTML = sessionStorage.getItem("currentMachine");
}

function computeResult (predHealthCondition, healthCondition) {
    healthCondition = healthCondition || '';
    const trueHealthCondition = document.getElementById("sound").getAttribute('health');
    var soundId = document.getElementById("sound").src
    soundId = soundId.substring(soundId.lastIndexOf('/') + 1);
    storeResult(trueHealthCondition, predHealthCondition, soundId);
    console.log(trueHealthCondition);
    console.log(predHealthCondition);
    if (trueHealthCondition == predHealthCondition) {
        document.getElementById("resultText").innerHTML = "Correct!";
        totalScore += 1;
    }
    else {
        document.getElementById("resultText").innerHTML = "Incorrect.";
    }
    numberOfTrials += 1;
    document.getElementById("score").innerHTML = totalScore;
    document.getElementById("nbTrials").innerHTML = numberOfTrials;
    
    const url = window.location.href;
    if (url.substring(url.length - 9, url.length) != 'game.html' & numberOfTrials == NB_TRAINING_SAMPLES) {
        document.getElementById("training_on").style.display = "none";
        document.getElementById("ready").style.display = "block";
        document.getElementById("welcome").innerHTML = "Now that you're trained, it's time to test your skills!";
    }
    // Changing the sound source and thus health
    var sound = document.getElementById("sound");
    var setup = setupSound(sound, healthCondition);
    var health = setup[0];
    var src = setup[1];
    document.getElementById("sound").setAttribute("health", health);
    document.getElementById("sound").setAttribute("src", src);
    document.getElementById("progressBar").setAttribute("max", numberOfTrials);
    document.getElementById("progressBar").setAttribute("value", totalScore);

}

function storeResult(trueHealthCondition, predHealthCondition, soundId) {
    listTrueHealthConditions.push(trueHealthCondition);
    listPredHealthConditions.push(predHealthCondition);
    listSoundIds.push(soundId);
}

function oneAudioSaveCSV() {
    var csvFileData = [];
    var tmpCSVFileData;
    for (i=1; i<=numberOfTrials; i++) {
        tmpCSVFileData = [];
        tmpCSVFileData.push(listSoundIds[i-1]);
        tmpCSVFileData.push(listTrueHealthConditions[i-1]);
        tmpCSVFileData.push(listPredHealthConditions[i-1]);
        csvFileData.push(tmpCSVFileData);
    }
    var csv = 'File name,True health,Human-assessed health\n';
    csvFileData.forEach(function(row) {
        csv += row.join(',');
        csv += '\n';
    })

    // document.write(csv);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';

    hiddenElement.download = 'scores.csv';
    hiddenElement.click();
}

function goToPage (page) {
    document.location.href = page;
}

function startGame(level) {
    level_global = level;
    sessionStorage.setItem("level", level);
    var machine;
    // if (level == 'Level_1') {
    //     machine = 'valve';
    // }
    // else {
    //     if (level == 'Level_2') {
    //         machine = 'gearbox';
    //     }
    //     else {
    //         machine = 'ToyTrain';
    //     }
    // }
    machine = level;
    console.log(machine);
    sessionStorage.setItem("currentMachine", machine);
    console.log(sessionStorage.getItem("currentMachine"));
    goToPage('training_phase.html');
}