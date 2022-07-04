function setupSound(sound) {
    const randomI = Math.floor(Math.random() * 21);
    const soundId = randomI.toString().padStart(8, '0');
    const randomHealthValue = Math.random();
    var healthCondition = "";
    if (randomHealthValue < 0.5) {
        healthCondition = 'normal';
    }
    else {
        healthCondition = 'abnormal';
    }
    var src = `sounds/${healthCondition}/${soundId}.wav`;
    sound.setAttribute("src", src);
    sound.setAttribute("health", healthCondition);
    return [healthCondition, src];
}

function loadSoundBlock () {
    const sound = document.createElement("audio");
    sound.controls = 'controls';
    sound.type = 'audio/wav';
    sound.id = "sound";
    const randomI = Math.floor(Math.random() * 21);
    const soundId = randomI.toString().padStart(8, '0');
    const randomHealthValue = Math.random();
    var healthCondition = "";
    if (randomHealthValue < 0.5) {
        healthCondition = 'normal';
    }
    else {
        healthCondition = 'abnormal';
    }
    sound.src = `sounds/${healthCondition}/${soundId}.wav`;
    const soundBlock = document.getElementById('soundBlock');
    sound.setAttribute('health', healthCondition);
    soundBlock.appendChild(sound);
}

function computeResult (predHealthCondition) {
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
    
    // Changing the sound source and thus health
    var sound = document.getElementById("sound");
    setupSound(sound);
    var setup = setupSound(sound);
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