    var pos = 0;
    const pacArray = [
        ['assets/PacMan1.png', 'assets/PacMan2.png'],
        ['assets/PacMan3.png', 'assets/PacMan4.png']
    ];
    const pabImagesArray = [
		'banner.jpg', 'forum_banner.jpg', 'info.gif', 'info.jpg',
		'info_old.jpg', 'logo.jpg', 'news.gif', 'news.jpg',
		'sc_logo.gif', 'spacer.jpg', 'spacer_hori.jpg', 'spacer_hori_old.jpg',
		'spacer_hori_video.jpg', 'spacer_hori_video_old.jpg',
		'spacer_linx.jpg', 'spacer_old.jpg', 'spacer_old1.jpg', 'welcome.jpg', 
    ];
    var direction = 0;
    const pacMen = []; // This array holds all the pacmen

    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }

    // Factory to make a PacMan at a random position with random velocity
    function makePac(image) {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(10); // {x:?, y:?}
        let position = setToRandom(200);
        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.style.position = 'absolute';
        newimg.src = image;
        newimg.width = 100;
        // scale large pics
        newimg.onload = function() {
            var height = newimg.height;
            var width = newimg.width;
            console.log('The image size is '+width+'*'+height);
            if (newimg.height >= 250) {
                console.log('Large image, resizing...');
                console.log(newimg.height);
                newimg.height = 100;
            }
        }
        // set position
        newimg.style.left = position.x;
        newimg.style.top = position.y;

        // add new Child image to game
        game.appendChild(newimg);
        // return details in an object
        return {
            position,
            velocity,
            newimg
        }
    }

    function update() {
        console.log("Start button has been pressed");
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
                // Update existing item object (global/var)
                checkCollisions(item)
                item.position.x += item.velocity.x;
                item.position.y += item.velocity.y;
                // Update the actual mage in the DOM aka what we see
                item.newimg.style.left = item.position.x;
                item.newimg.style.top = item.position.y;
            }
        )
        setTimeout(update, 20);
    }

    function checkCollisions(item) {
        // detect collision with all walls and make pacman bounce
        let currentPosX_ = item.position.x + item.velocity.x + item.newimg.width;
        let currentPosX = item.position.x + item.velocity.x;
        let currentPosY_ = item.position.y + item.velocity.y + item.newimg.height;
        let currentPosY = item.position.y + item.velocity.y;
        if (currentPosX_ > window.innerWidth || currentPosX < 0) {
            item.velocity.x = -item.velocity.x
        }
        if (currentPosY_ > window.innerHeight || currentPosY < 0) {
            item.velocity.y = -item.velocity.y
        }
    }

	function getRandomPic() {
		randomIdx = Math.floor(Math.random() * pabImagesArray.length);
		console.log('Random index is:', randomIdx);
		return pabImagesArray[randomIdx];
	}

    function makeOne() {
        pacMen.push(makePac('assets/PacMan1.png')); // add a new PacMan
    }

    function makeOther() {
		// Get a random pic
		imageFilename = getRandomPic();
		image = 'assets/pabimages/' + imageFilename;
        pacMen.push(makePac(image)); // add the pic
    }
