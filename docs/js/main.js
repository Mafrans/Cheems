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

            if (Math.abs(x) > 150) return;
            console.log(x, y)

            wrapper.style['transform'] = `scaleY(0.9)`;
            lastMouseDown = true;

            if (Math.random() < 0.15) {
                showBubble(messages[Math.floor(Math.random() * messages.length)]);
            }
        });

        window.addEventListener('mouseup', event => {
            if (lastMouseDown) {
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
            const degrees = angle * (180 / Math.PI);

            head.style['transform'] = `rotate(${Math.sign(-x) * (degrees) + 30}deg) scale(${Math.sign(x)}, ${Math.sign(x)})`;

            if (Math.abs(x) < 50) return;
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

    const burgerImages = [
        'cheeseburger0',
        'cheeseburger1',
        'cheeseburger2',
    ]

    document.addEventListener('mousemove', (event) => {
        if (this.grabbed == null) return

        let x = parseInt(this.grabbed.getAttribute('data-x'));
        let y = parseInt(this.grabbed.getAttribute('data-y'));

        x += event.movementX;
        y += event.movementY;
        
        this.grabbed.setAttribute('data-x', x);
        this.grabbed.setAttribute('data-y', y);

        this.grabbed.style['left'] = x + 'px';
        this.grabbed.style['top'] = y + 'px';
    })

    distance = (x1, y1, x2, y2) => {
        return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2); 
    }

    document.addEventListener('mouseup', () => {
        if(this.grabbed == null) return;

        const headBox = document.querySelector('.cheems-wrapper .head').getBoundingClientRect();
        const grabBox = this.grabbed.getBoundingClientRect();

        if(distance(headBox.left + headBox.width/2, 
            headBox.top + headBox.height/2, 
            grabBox.left + grabBox.width/2, 
            grabBox.top + grabBox.height/2) < 100) {

            const interval = setInterval(() => {
                pat(1);
            }, 300);

            setTimeout(() => {
                clearInterval(interval);
            }, 10000);

            this.grabbed.remove();
        }
    
        this.grabbed = null;
    }); 

    this.grabbed = null;
    addBurger = () => {
        const burger = document.createElement('img');
        burger.draggable = false;
        burger.src = 'img/' + burgerImages[Math.floor(Math.random() * burgerImages.length)] + '.png';
        document.body.appendChild(burger);

        let {x, y} = 0;
        do {
            x = Math.round(window.innerWidth / 2 + (Math.random() * 2 - 1) * window.innerWidth * 0.4);
            y = Math.round(window.innerHeight / 2 + (Math.random() * 2 - 1) * window.innerHeight * 0.4);
        }
        while ((x - window.innerWidth / 2 < 150 && x - window.innerWidth / 2 > -150)
            || (y - window.innerHeight / 2 < 200 && y - window.innerHeight / 2 > -200));

        burger.setAttribute('data-x', x);
        burger.setAttribute('data-y', y);

        burger.style['left'] = x + 'px';
        burger.style['top'] = y + 'px';

        burger.addEventListener('mousedown', () => {
            this.grabbed = burger;
        })

        burger.classList.add('burger');

        setTimeout(() => {
            burger.classList.add('loaded');
        }, 10000);

        setTimeout(() => {
            burger.remove();
        }, 11000);
    }

    setInterval(() => {
        if (Math.random() < 0.15) {
            addBurger();
        }
    }, 3000);
})();