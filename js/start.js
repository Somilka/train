const TrainSelector = document.querySelector('.train-selector');

const Train = document.querySelector('.train');
const TrainTitle = document.querySelector('.train__title');
const TrainExes = document.querySelector('.train__exes');
const CurrentExe = document.querySelector('.current-exe');

function start() {
    trains.forEach((item) => {
        SelectorElement = document.createElement('div');
        SelectorElement.classList.add('selector__element');
        SelectorElement.innerText = item.name;
        TrainSelector.append(SelectorElement);
    });
}