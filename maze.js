// Read the maze object from a JSON file
fetch('maze.json')
	.then(response => response.json())
	.then(maze => {
		// Set up the canvas element
		const canvas = document.getElementById('maze');
		canvas.width = maze.width;
		canvas.height = maze.height;
		const ctx = canvas.getContext('2d');

		// Draw the maze on the canvas
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, maze.width, maze.height);
		ctx.fillStyle = 'black';
		maze.walls.forEach(wall => {
			ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
		});

		// Set up game controls
		const upBtn = document.getElementById('up');
		const downBtn = document.getElementById('down');
		const leftBtn = document.getElementById('left');
		const rightBtn = document.getElementById('right');

		// Set up the player object
		const player = {
			x: maze.start.x,
			y: maze.start.y,
			width: 10,
			height: 10
		};

		// Define game functions
		function drawPlayer() {
			ctx.fillStyle = 'red';
			ctx.fillRect(player.x, player.y, player.width, player.height);
		}

		function movePlayer(dx, dy) {
			const newX = player.x + dx;
			const newY = player.y + dy;
			if (newX >= 0 && newX <= maze.width - player.width &&
				newY >= 0 && newY <= maze.height - player.height) {
				// Check for collisions with walls
				let collision = false;
				maze.walls.forEach(wall => {
					if (newX + player.width > wall.x && newX < wall.x + wall.width &&
						newY + player.height > wall.y && newY < wall.y + wall.height) {
						collision = true;
					}
				});
				if (!collision) {
					player.x = newX;
					player.y = newY;
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					drawPlayer();
				}
			}
			// Check for win condition
			if (player.x === maze.end.x && player.y === maze.end.y) {
				alert('You win!');
			}
		}

		// Add event listeners to game controls
		upBtn.addEventListener('click', () => movePlayer(0, -10));
		downBtn.addEventListener('click', () => movePlayer(0, 10));
		leftBtn.addEventListener('click', () => movePlayer(-10, 0));
		rightBtn.addEventListener('click', () => movePlayer(10, 0));

		// Draw the player on the canvas
		drawPlayer();
	})
	.catch(error => console.log(error));
