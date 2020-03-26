(() => {
    window.addEventListener('load', () => {
        const cheems = document.querySelector('.cheems');
        const head = cheems.querySelector('.head');

        window.addEventListener('mousemove', event => {
            var rect = head.getBoundingClientRect();

            const x = event.screenX - (rect.left + rect.width / 2);
            const y = event.screenY - (rect.top + rect.height / 2);

            console.log(head.clientLeft);
            const angle = Math.atan2(y, x);
            const degrees = angle * (180/Math.PI);

            head.style['transform'] = `rotate(${Math.sign(-x) * (degrees) + 30}deg) scale(${Math.sign(x)}, ${Math.sign(x)})`;
            
            if(Math.abs(x) < 50) return;
            cheems.style['transform'] = `scaleX(${Math.sign(-x)})`;
        })    
    })
})();