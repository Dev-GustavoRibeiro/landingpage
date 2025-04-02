import { useState, useEffect, useCallback } from 'react';

export default function useGame() {
  // State shared between games
  const [activeGame, setActiveGame] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [score, setScore] = useState(0);

  // Snake state
  const [snakeDirection, setSnakeDirection] = useState("right");
  const [snakeBody, setSnakeBody] = useState([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [gameSpeed, setGameSpeed] = useState(150);

  // Pong state
  const [paddleLeft, setPaddleLeft] = useState({ y: 40, score: 0 });
  const [paddleRight, setPaddleRight] = useState({ y: 40, score: 0 });
  const [ball, setBall] = useState({
    x: 50,
    y: 50,
    dx: 0.3,
    dy: 0.2
  });
  const [pongGameOver, setPongGameOver] = useState(false);
  const [pongSpeed, setPongSpeed] = useState(16);

  // Snake Game Loop
  useEffect(() => {
    if (activeGame !== "snake" || gamePaused || gameOver) return;
    
    const gameLoop = setInterval(() => {
      moveSnake();
    }, gameSpeed);
    
    return () => clearInterval(gameLoop);
  }, [activeGame, snakeDirection, snakeBody, food, gamePaused, gameOver, gameSpeed]);

  // Pong Game Loop
  useEffect(() => {
    if (activeGame !== "pong" || gamePaused || pongGameOver) return;
    
    const gameLoop = setInterval(() => {
      updatePongState();
    }, pongSpeed);
    
    return () => clearInterval(gameLoop);
  }, [activeGame, gamePaused, pongSpeed, ball, paddleLeft, paddleRight, pongGameOver]);

  // Keyboard controls listener
  useEffect(() => {
    if (!activeGame) return;
    
    window.addEventListener("keydown", handleGameControls);
    return () => window.removeEventListener("keydown", handleGameControls);
  }, [
    activeGame, 
    gameOver, 
    gamePaused, 
    snakeDirection, 
    pongGameOver
  ]);

  // Snake Functions
  const moveSnake = useCallback(() => {
    const head = { ...snakeBody[0] };
    
    switch (snakeDirection) {
      case "up": head.y -= 1; break;
      case "down": head.y += 1; break;
      case "left": head.x -= 1; break;
      case "right": head.x += 1; break;
      default: break;
    }
    
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      setGameOver(true);
      return;
    }
    
    if (snakeBody.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
      return;
    }
    
    const newBody = [head, ...snakeBody];
    
    if (head.x === food.x && head.y === food.y) {
      setScore(prev => prev + 10);
      if (score > 0 && score % 50 === 0) {
        setGameSpeed(prev => Math.max(prev - 10, 50));
      }
      setFood({
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
      });
    } else {
      newBody.pop();
    }
    
    setSnakeBody(newBody);
  }, [snakeBody, snakeDirection, food, score]);

  // Pong Functions
  const updatePongState = useCallback(() => {
    // Atualizar posição da bola
    const newBall = {
      x: ball.x + ball.dx,
      y: ball.y + ball.dy,
      dx: ball.dx,
      dy: ball.dy
    };

    // Colisão com as paredes superior e inferior
    if (newBall.y <= 0 || newBall.y >= 95) {
      newBall.dy *= -1;
    }

    // Colisão com as raquetes
    const paddleHeight = 20;
    if (newBall.x <= 5 && newBall.y >= paddleLeft.y && newBall.y <= paddleLeft.y + paddleHeight) {
      newBall.dx *= -1.1; // Aumentar velocidade
      newBall.x = 5;
    }
    if (newBall.x >= 95 && newBall.y >= paddleRight.y && newBall.y <= paddleRight.y + paddleHeight) {
      newBall.dx *= -1.1; // Aumentar velocidade
      newBall.x = 95;
    }

    // Pontuação
    if (newBall.x <= 0) {
      setPaddleRight(prev => ({ ...prev, score: prev.score + 1 }));
      resetBall("left");
      return;
    }
    if (newBall.x >= 100) {
      setPaddleLeft(prev => ({ ...prev, score: prev.score + 1 }));
      resetBall("right");
      return;
    }

    setBall(newBall);

    // AI para o paddle direito
    const paddleCenter = paddleRight.y + paddleHeight / 2;
    const ballCenter = newBall.y;
    if (paddleCenter < ballCenter - 2) {
      setPaddleRight(prev => ({ ...prev, y: Math.min(prev.y + 2, 80) }));
    } else if (paddleCenter > ballCenter + 2) {
      setPaddleRight(prev => ({ ...prev, y: Math.max(prev.y - 2, 0) }));
    }
  }, [ball, paddleLeft, paddleRight]);

  const resetBall = useCallback((direction) => {
    setBall({
      x: 50,
      y: 50,
      dx: direction === "left" ? -0.3 : 0.3,
      dy: (Math.random() - 0.5) * 0.6
    });
  }, []);

  const movePongPaddle = useCallback((direction) => {
    if (gamePaused || pongGameOver) return;
    
    setPaddleLeft(prev => ({
      ...prev,
      y: Math.max(0, Math.min(80, prev.y + (direction === "up" ? -3 : 3)))
    }));
  }, [gamePaused, pongGameOver]);

  // Funções compartilhadas
  const startGame = useCallback((gameId) => {
    setActiveGame(gameId);
    setGameOver(false);
    setGamePaused(false);
    
    if (gameId === "snake") {
      setSnakeBody([
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
      ]);
      setSnakeDirection("right");
      setFood({ x: 15, y: 15 });
      setScore(0);
      setGameSpeed(150);
    } 
    else if (gameId === "pong") {
      setPaddleLeft({ y: 40, score: 0 });
      setPaddleRight({ y: 40, score: 0 });
      resetBall("left");
      setPongGameOver(false);
      setScore(0);
    }
  }, [resetBall]);

  const restartGame = useCallback(() => {
    startGame(activeGame);
  }, [activeGame, startGame]);

  const closeGame = useCallback(() => {
    setActiveGame(null);
    setGameOver(false);
    setGamePaused(false);
    setPongGameOver(false);
  }, []);

  const togglePause = useCallback(() => {
    setGamePaused(prev => !prev);
  }, []);

  const handleGameControls = useCallback((e) => {
    if (activeGame === "snake" && !gamePaused && !gameOver) {
      switch (e.key) {
        case "ArrowUp":
          if (snakeDirection !== "down") setSnakeDirection("up");
          break;
        case "ArrowDown":
          if (snakeDirection !== "up") setSnakeDirection("down");
          break;
        case "ArrowLeft":
          if (snakeDirection !== "right") setSnakeDirection("left");
          break;
        case "ArrowRight":
          if (snakeDirection !== "left") setSnakeDirection("right");
          break;
        default:
          break;
      }
    }
    else if (activeGame === "pong" && !gamePaused && !pongGameOver) {
      switch (e.key) {
        case "ArrowUp":
          movePongPaddle("up");
          break;
        case "ArrowDown":
          movePongPaddle("down");
          break;
        default:
          break;
      }
    }

    if (e.key === " ") {
      setGamePaused(prev => !prev);
    }
  }, [activeGame, gamePaused, gameOver, pongGameOver, snakeDirection, movePongPaddle]);

  return {
    // Snake
    snakeDirection,
    snakeBody,
    food,
    score,
    gameSpeed,
    setSnakeDirection,

    // Pong
    paddleLeft,
    paddleRight,
    ball,
    pongGameOver,
    movePongPaddle,

    // Compartilhado
    activeGame,
    gameOver,
    gamePaused,
    startGame,
    restartGame,
    closeGame,
    togglePause,
    handleGameControls
  };
}