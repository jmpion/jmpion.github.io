var N = 5;
var NB_TRAINING_SAMPLES = 6
var totalScore = 0;
var numberOfTrials = 0;
var machines = ['bearing', 'fan', 'gearbox', 'slider', 'ToyCar', 'ToyTrain', 'valve'];
var level_global = '';
try {
    level_global = sessionStorage.getItem("level")
}
catch (err) {
    console.log("Level not already defined.");
}

var NB_FILES_IN_EACH_DIR = 10;

var listTrueHealthConditions = [];
var listPredHealthConditions = [];
var listSoundIds = []
