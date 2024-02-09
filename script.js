function odometer(start, stop = 0) {
    increment(start);
    if (!!stop && (stop > start)) {
        setTimeout(() => {
            increment(stop)
        }, (Array.from(String(stop), Number).length) * 200);
    }
}
function increment(number) {
    const full_number = document.getElementById('full-number');
    let max_num = 10**16;
    if (full_number) {
        // Initialiser la valeur maximale de number qui est 10^16
        let message = (number >=  max_num) ? 'Erreur : le nombre saisi est trop grand' : number;
        full_number.textContent = message;
    }
    if(number >=  max_num) return;
    let suffixes = ['', 'k', 'M', 'Md', 'B'];
    let suffix = '';
    let displayCount = Math.floor(number);
    for (let i = 0; i < suffixes.length; i++) {
        if (displayCount < 10_000) {
            suffix = suffixes[i];
            break;
        }
        displayCount /= 1000;
    }
    const digits = Array.from(String(Math.floor(displayCount)), Number);
    while (digits.length < 4) {
        digits.unshift(0);
    }
    const units = ['mille', 'centaine', 'dizaine', 'unite'];
    for (let i = 0; i < units.length; i++) {
        setTimeout(() => {
            const unit = document.querySelector(`.${units[i]}`);
            unit.style.setProperty("--trsfm", `-${digits[i] * 10}%`);
            unit.style.setProperty("--unit", i + 1);
            (i < (units.length-1)) && ((digits[i] === 0 && displayCount < Math.pow(10, 3 - i)) ? unit.classList.add('hide')
                : unit.classList.remove('hide'));
            const suffixElement = document.querySelector('.suffix');
            suffixElement.textContent = suffix;
        }, 5 - i * 900);
    }
}
odometer(567_800);
let input_number = document.getElementById('input');
if (input_number) {
    odometer(+input_number.value);
}
input_number.addEventListener("input", ()=>{
    odometer(+input_number.value);
})