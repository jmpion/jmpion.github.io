function scoreToCSV() {
    var csvLines = [];
    var score = document.getElementById('score');
    csvLines.push(score);
    return csvLines;
}

function saveCSV() {
    var csvFileData = [];
    var tmpSoundBlock;
    var tmpCSVFileData;
    var tmpHealthPicked;
    for (i=1; i<=N; i++) {
        tmpCSVFileData = [];
        tmpSoundBlock = document.getElementById(`sound_${i}`);
        tmpCSVFileData.push(tmpSoundBlock.getAttribute('file_name'));
        tmpCSVFileData.push(tmpSoundBlock.getAttribute('health'));
        try {
            tmpHealthPicked = document.querySelector(`input[name="v${i}"]:checked`).health;
            tmpCSVFileData.push(tmpHealthPicked);
        }
        catch (err) {
            console.log(err);
            if (err instanceof TypeError) {
                alert("All fields must be filled before downloading the results.");
                return false;
            }
        }
        csvFileData.push(tmpCSVFileData);
    }
    var csv = 'File name,True health,Human-assessed health\n';
    csvFileData.forEach(function(row) {
        csv += row.join(',');
        csv += '\n';
    })

    document.write(csv);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';

    hiddenElement.download = 'scores.csv';
    hiddenElement.click();
};

