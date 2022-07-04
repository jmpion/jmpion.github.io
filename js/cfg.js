var N = 5;
var totalScore = 0;
var numberOfTrials = 0;
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
