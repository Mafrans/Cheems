(() => {
    const messages = [
        "thamks",
        "feels nice",
        "thamk you",
        "hed pats r nice",
    ]

    let pats = 0;
    const counter = document.querySelector('.pat-counter > .pats');

    window.addEventListener('load', () => {
        const cheems = document.querySelector('.cheems');
        const wrapper = cheems.querySelector('.cheems-wrapper');
        const head = wrapper.querySelector('.head');

        let lastMouseDown = false;

        wrapper.addEventListener('mousedown', event => {
            var rect = wrapper.getBoundingClientRect();

            const x = event.screenX - (rect.left + rect.width / 2);
            const y = event.screenY - (rect.top + rect.height / 2);

            if(Math.abs(x) > 150) return;
            console.log(x, y)

            wrapper.style['transform'] = `scaleY(0.9)`;
            lastMouseDown = true;

            if(Math.random() < 0.15) {
                showBubble(messages[Math.floor(Math.random() * messages.length)]);
            }
        });

        window.addEventListener('mouseup', event => {
            if(lastMouseDown) {
                wrapper.style['transform'] = `scaleY(1)`;
                lastMouseDown = false;
                pat(1);
            }
        });

        window.addEventListener('mousemove', event => {
            var rect = head.getBoundingClientRect();

            const x = event.screenX - (rect.left + rect.width / 2);
            const y = event.screenY - (rect.top + rect.height / 2);

            const angle = Math.atan2(y, x);
            const degrees = angle * (180/Math.PI);

            head.style['transform'] = `rotate(${Math.sign(-x) * (degrees) + 30}deg) scale(${Math.sign(x)}, ${Math.sign(x)})`;
            
            if(Math.abs(x) < 50) return;
            cheems.style['transform'] = `scaleX(${Math.sign(-x)})`;
        })   
    })
    
    pat = (amount) => {
        pats += amount;
        counter.innerHTML = pats;
    }

    showBubble = (string) => {
        const x = window.innerWidth / 2 + (Math.random() * 2 - 1) * 300;
        const y = window.innerHeight / 2 + (Math.random() * 2 - 1) * 300;

        const text = document.createElement('span');
        text.innerHTML = string;
        text.style['left'] = x + 'px';
        text.style['top'] = y + 'px';
        text.style['font-size'] = 20 + (Math.random() * 10) + 'px';
        text.style['color'] = `hsl(${Math.random() * 360}, 100%, 50%)`;
        text.classList.add('bubble');

        document.body.appendChild(text);
        setTimeout(() => {
            text.classList.add('loaded');
        }, 1000);
        
        setTimeout(() => {
            text.remove();
        }, 2000);
    }
})();