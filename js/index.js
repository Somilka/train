const classes = [
    'selector__element',
    'exe__rep-value',
    'current__finish'
];

let target;
let targetClass;
let targetFamily;
let targetCounter;

let trainCounter;
let currentTrain;

let currentExe;
let exeCounter;
let currentRep;
let repCounter;

let circles;

document.addEventListener('click', main);

function main(e) {
    if (findTarget(e)) {
        findTargetFamily();
        findTargetCounter();

        switch (targetClass) {
            case 'selector__element':
                circles = document.querySelector('.circles').value;
                Train.classList.remove('hidden');
                // trainCounter = targetCounter;
                currentTrain = trains[targetCounter];
                loadExes();
                break;

            case 'exe__rep-value':
                if (target.classList.contains('stock')) {
                    currentExe = target.closest('.exe');
                    currentRep = target;
                    getExeCounters();
                    CurrentExe.classList.remove('hidden');
                    CurrentWeight = CurrentExe.querySelector('.current-weight');
                    if (isNaN(currentTrain.exes[exeCounter].defWeight / 1)) {
                        CurrentWeight.disabled = true;
                    }
                    CurrentWeight.value = currentTrain.exes[exeCounter].defWeight;

                    CurrentRep = CurrentExe.querySelector('.current-rep');
                    CurrentRep.value = currentTrain.exes[exeCounter].defReps[repCounter];

                    CurrentTitle = CurrentExe.querySelector('.current-exe__title');
                    CurrentTitle.innerText = currentTrain.exes[exeCounter].name + ' ' + ((repCounter * 1) + 1);
                }
                break;

            case 'current__finish':
                CurrentExe.classList.add('hidden');
                currentRep.classList.remove('stock');
                currentRep.innerText = CurrentRep.value;
                break;
        }
    }
}

function findTarget(e) {
    target = null;
    classes.forEach((item) => {
        if (e.target.closest('.' + item)) {
            target = e.target.closest('.' + item);
            targetClass = item;
        }
    });

    if (target != null) {
        return true;
    } else {
        return false;
    }
}

function findTargetFamily() {
    targetFamily = target.parentNode.querySelectorAll('.' + targetClass);
}

function findTargetCounter() {
    targetFamily.forEach((item, i) => {
        if (item == target) {
            targetCounter = i;
        }
    });
}

function loadExes() {
    TrainTitle.innerText = currentTrain.name;
    currentTrain.exes.forEach((item) => {
        exe = document.createElement('div');
        exe.classList.add('exe');

        exeTitleDiv = document.createElement('div');
        exeTitleDiv.classList.add('exe__title-div');
        exe.append(exeTitleDiv);

        exeTitle = document.createElement('div');
        exeTitle.classList.add('exe__title');
        exeTitle.innerText = item.name;
        exeTitleDiv.append(exeTitle);

        exeGroup = document.createElement('div');
        exeGroup.classList.add('exe__group');
        exeGroup.innerText = item.group;
        exeTitleDiv.append(exeGroup);

        if (item.tip.length > 0) {
            exeTip = document.createElement('div');
            exeTip.classList.add('exe__tip');
            exeTip.innerText = item.tip;
            exeTitleDiv.append(exeTip);
        }

        exeReps = document.createElement('div');
        exeReps.classList.add('exe__reps');

        for (let i = 0; i < circles; i++) {
            exeRep = document.createElement('div');
            exeRep.classList.add('exe__rep');
            exeRep.classList.add('stock');

            exeRepWeight = document.createElement('div');
            exeRepWeight.classList.add('exe__rep-weight');
            exeRepWeight.innerText = item.defWeight;
            console.log(isNaN(item.defWeight / 1));

            exeRepValue = document.createElement('div');
            exeRepValue.classList.add('exe__rep-value', 'stock');
            exeRepValue.innerText = 'Начать';

            exeRep.append(exeRepWeight);
            exeRep.append(exeRepValue);
            exeReps.append(exeRep);
        }

        exe.append(exeReps);

        TrainExes.append(exe);
    })
}

function getExeCounters() {
    exes = document.querySelectorAll('.exe');

    exes.forEach((item, i) => {
        if (item == currentExe) {
            exeCounter = i;
            reps = item.querySelectorAll('.exe__rep-value');

            reps.forEach((_item, _i) => {
                if (_item == currentRep) {
                    repCounter = _i;
                }
            })
        }
    });


}