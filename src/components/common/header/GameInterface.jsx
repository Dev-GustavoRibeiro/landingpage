import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BsController,
  BsX,
  BsPlayFill,
  BsPauseFill,
  BsArrowUp,
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";

// Hook para bloquear rolagem
const useLockBodyScroll = (active) => {
  useEffect(() => {
    if (active) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [active]);
};

// Componente principal
export default function GameInterface({ activeGame, closeGame }) {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  
  // ==================== PONG ====================
  const pongRef = useRef({
    paddleLeft: { y: 50, score: 0 },
    paddleRight: { y: 50, score: 0 },
    ball: { 
      x: 50,
      y: 50,
      dx: 0.6,
      dy: 0.4
    },
    moveUp: false,
    moveDown: false,
    gameOver: false
  });
  
  // ==================== SNAKE ====================
  const snakeRef = useRef({
    body: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ],
    direction: "right",
    food: { x: 15, y: 10 },
    score: 0,
    speed: 150,
    lastUpdate: 0,
    gameOver: false,
    boardSize: 20
  });
  
  useLockBodyScroll(activeGame);
  
  // ==================== FUNÇÕES DO PONG ====================
  
  // Resetar a bola no Pong
  const resetPongBall = useCallback(() => {
    const pong = pongRef.current;
    pong.ball.x = 50;
    pong.ball.y = 50;
    pong.ball.dx = 0.6 * (Math.random() > 0.5 ? 1 : -1);
    pong.ball.dy = 0.4 * (Math.random() * 2 - 1);
  }, []);
  
  // Desenhar o jogo Pong
  const drawPong = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpar canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    
    const pong = pongRef.current;
    
    // Linha central
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Raquetes
    const paddleWidth = width * 0.02;
    const paddleHeight = height * 0.2;
    ctx.fillStyle = '#ffffff';
    
    // Raquete esquerda
    ctx.fillRect(
      width * 0.05, 
      (pong.paddleLeft.y / 100) * height - paddleHeight / 2, 
      paddleWidth, 
      paddleHeight
    );
    
    // Raquete direita
    ctx.fillRect(
      width * 0.95 - paddleWidth, 
      (pong.paddleRight.y / 100) * height - paddleHeight / 2, 
      paddleWidth, 
      paddleHeight
    );
    
    // Bola
    const ballSize = width * 0.02;
    ctx.beginPath();
    ctx.arc(
      (pong.ball.x / 100) * width, 
      (pong.ball.y / 100) * height, 
      ballSize / 2, 
      0, 
      Math.PI * 2
    );
    ctx.fill();
    
    // Pontuação
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${pong.paddleLeft.score}`, 
      width * 0.25, 
      height * 0.1
    );
    ctx.fillText(
      `${pong.paddleRight.score}`, 
      width * 0.75, 
      height * 0.1
    );
  }, []);
  
  // Atualizar o jogo Pong
  const updatePong = useCallback((deltaTime) => {
    const pong = pongRef.current;
    
    if (pong.gameOver) return;
    
    // Mover raquete do jogador
    if (pong.moveUp) {
      pong.paddleLeft.y = Math.max(10, pong.paddleLeft.y - 0.5);
    }
    
    if (pong.moveDown) {
      pong.paddleLeft.y = Math.min(90, pong.paddleLeft.y + 0.5);
    }
    
    // IA simples para a raquete direita
    const aiTarget = pong.ball.y;
    const aiSpeed = 0.4;
    
    if (pong.paddleRight.y < aiTarget) {
      pong.paddleRight.y = Math.min(90, pong.paddleRight.y + aiSpeed);
    } else if (pong.paddleRight.y > aiTarget) {
      pong.paddleRight.y = Math.max(10, pong.paddleRight.y - aiSpeed);
    }
    
    // Mover bola
    pong.ball.x += pong.ball.dx;
    pong.ball.y += pong.ball.dy;
    
    // Colisão com as bordas superior e inferior
    if (pong.ball.y <= 0 || pong.ball.y >= 100) {
      pong.ball.dy = -pong.ball.dy;
    }
    
    // Colisão com as raquetes
    const paddleWidth = 2;
    const paddleHeight = 20;
    
    // Raquete esquerda
    if (
      pong.ball.x <= 5 + paddleWidth &&
      pong.ball.x >= 5 &&
      pong.ball.y >= pong.paddleLeft.y - paddleHeight / 2 &&
      pong.ball.y <= pong.paddleLeft.y + paddleHeight / 2
    ) {
      pong.ball.dx = -pong.ball.dx;
      pong.ball.dx *= 1.05; // Aumentar velocidade
      pong.ball.dy = (pong.ball.y - pong.paddleLeft.y) / (paddleHeight / 2) * 0.5;
    }
    
    // Raquete direita
    if (
      pong.ball.x >= 95 - paddleWidth &&
      pong.ball.x <= 95 &&
      pong.ball.y >= pong.paddleRight.y - paddleHeight / 2 &&
      pong.ball.y <= pong.paddleRight.y + paddleHeight / 2
    ) {
      pong.ball.dx = -pong.ball.dx;
      pong.ball.dx *= 1.05; // Aumentar velocidade
      pong.ball.dy = (pong.ball.y - pong.paddleRight.y) / (paddleHeight / 2) * 0.5;
    }
    
    // Pontuação
    if (pong.ball.x < 0) {
      pong.paddleRight.score++;
      resetPongBall();
      
      if (pong.paddleRight.score >= 5) {
        pong.gameOver = true;
        setIsGameOver(true);
      }
    }
    
    if (pong.ball.x > 100) {
      pong.paddleLeft.score++;
      resetPongBall();
      
      if (pong.paddleLeft.score >= 5) {
        pong.gameOver = true;
        setIsGameOver(true);
      }
    }
    
    setScore(pong.paddleLeft.score);
  }, [resetPongBall]);
  
  const movePongPaddle = useCallback((direction) => {
    const pong = pongRef.current;
    if (direction === "up") {
      pong.moveUp = true;
      pong.moveDown = false;
    } else if (direction === "down") {
      pong.moveUp = false;
      pong.moveDown = true;
    }
  }, []);
  
  const stopPongPaddle = useCallback(() => {
    const pong = pongRef.current;
    pong.moveUp = false;
    pong.moveDown = false;
  }, []);
  
  // ==================== FUNÇÕES DO SNAKE ====================
  
  // Gerar comida em posição aleatória (não sobreposta à cobra)
  const generateSnakeFood = useCallback(() => {
    const snake = snakeRef.current;
    const boardSize = snake.boardSize;
    
    let position;
    let overlap;
    
    do {
      overlap = false;
      position = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
      };
      
      // Verificar se a comida não está sobreposta à cobra
      for (const segment of snake.body) {
        if (segment.x === position.x && segment.y === position.y) {
          overlap = true;
          break;
        }
      }
    } while (overlap);
    
    return position;
  }, []);
  
  // Mudar direção da cobra
  const changeSnakeDirection = useCallback((newDirection) => {
    const snake = snakeRef.current;
    
    const opposites = {
      up: "down",
      down: "up",
      left: "right",
      right: "left"
    };
    
    // Não permitir mudança para direção oposta
    if (opposites[newDirection] === snake.direction) {
      return;
    }
    
    snake.direction = newDirection;
  }, []);
  
  // Desenhar o jogo Snake
  const drawSnake = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    const snake = snakeRef.current;
    const boardSize = snake.boardSize;
    const cellSize = canvas.width / boardSize;
    
    // Limpar canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar comida
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(
      (snake.food.x + 0.5) * cellSize, 
      (snake.food.y + 0.5) * cellSize, 
      cellSize / 2 * 0.8, // 80% do tamanho para ficar dentro da célula
      0, 
      Math.PI * 2
    );
    ctx.fill();
    
    // Desenhar cobra
    snake.body.forEach((segment, index) => {
      // Cabeça: verde mais claro, corpo: verde mais escuro
      ctx.fillStyle = index === 0 ? '#4ade80' : '#16a34a';
      
      // Desenhar segmento com pequena margem
      ctx.fillRect(
        segment.x * cellSize + 1, 
        segment.y * cellSize + 1, 
        cellSize - 2, 
        cellSize - 2
      );
    });
  }, []);
  
  // Atualizar o jogo Snake
  const updateSnake = useCallback((deltaTime) => {
    const snake = snakeRef.current;
    
    if (snake.gameOver) return;
    
    snake.lastUpdate += deltaTime;
    
    if (snake.lastUpdate < snake.speed) return;
    snake.lastUpdate = 0;
    
    // Copiar cabeça e calcular nova posição
    const head = { ...snake.body[0] };
    
    // Mover cabeça com base na direção
    switch (snake.direction) {
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
      case "left":
        head.x--;
        break;
      case "right":
        head.x++;
        break;
    }
    
    // Verificar colisão com as bordas
    if (
      head.x < 0 || 
      head.x >= snake.boardSize || 
      head.y < 0 || 
      head.y >= snake.boardSize
    ) {
      snake.gameOver = true;
      setIsGameOver(true);
      return;
    }
    
    // Verificar colisão com o próprio corpo
    for (let i = 0; i < snake.body.length; i++) {
      if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
        snake.gameOver = true;
        setIsGameOver(true);
        return;
      }
    }
    
    // Adicionar nova cabeça
    snake.body.unshift(head);
    
    // Verificar se comeu a comida
    if (head.x === snake.food.x && head.y === snake.food.y) {
      // Aumentar pontuação e gerar nova comida
      snake.score++;
      snake.food = generateSnakeFood();
      
      // Aumentar velocidade a cada 5 pontos
      if (snake.score % 5 === 0) {
        snake.speed = Math.max(50, snake.speed * 0.9);
      }
      
      setScore(snake.score);
    } else {
      // Remover último segmento (só cresce se comer)
      snake.body.pop();
    }
  }, [generateSnakeFood]);
  
  // ==================== FUNÇÕES GERAIS DOS JOGOS ====================
  
  // Inicializar jogos
  useEffect(() => {
    if (!activeGame || !canvasRef.current) return;
    
    // Ajustar tamanho do canvas
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const container = canvas.parentElement;
      const size = Math.min(container.clientWidth, container.clientHeight);
      
      canvas.width = size;
      canvas.height = size;
      
      // Redesenhar após o redimensionamento
      if (activeGame === "pong") {
        drawPong();
      } else if (activeGame === "snake") {
        drawSnake();
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Inicializar jogo específico
    if (activeGame === "pong") {
      // Resetar estado do Pong
      pongRef.current = {
        paddleLeft: { y: 50, score: 0 },
        paddleRight: { y: 50, score: 0 },
        ball: { x: 50, y: 50, dx: 0.6, dy: 0.4 },
        moveUp: false,
        moveDown: false,
        gameOver: false
      };
      
      setScore(0);
      setIsGameOver(false);
    } else if (activeGame === "snake") {
      // Resetar estado do Snake
      snakeRef.current = {
        body: [
          { x: 10, y: 10 },
          { x: 9, y: 10 },
          { x: 8, y: 10 }
        ],
        direction: "right",
        food: { x: 15, y: 10 },
        score: 0,
        speed: 150,
        lastUpdate: 0,
        gameOver: false,
        boardSize: 20
      };
      
      setScore(0);
      setIsGameOver(false);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    activeGame, 
    drawPong, 
    drawSnake
  ]);
  
  // Loop de jogo (gameloop)
  useEffect(() => {
    if (!activeGame || !canvasRef.current || isPaused) return;
    
    let lastTime = performance.now();
    
    const gameLoop = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      if (activeGame === "pong") {
        updatePong(deltaTime);
        drawPong();
      } else if (activeGame === "snake") {
        updateSnake(deltaTime);
        drawSnake();
      }
      
      requestRef.current = requestAnimationFrame(gameLoop);
    };
    
    requestRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    activeGame, 
    isPaused, 
    updatePong, 
    drawPong,
    updateSnake,
    drawSnake
  ]);
  
  // Controles de teclado
  useEffect(() => {
    if (!activeGame) return;
    
    const handleKeyDown = (e) => {
      if (isPaused || isGameOver) return;
      
      if (activeGame === "pong") {
        switch (e.key) {
          case "ArrowUp":
            movePongPaddle("up");
            break;
          case "ArrowDown":
            movePongPaddle("down");
            break;
        }
      } else if (activeGame === "snake") {
        switch (e.key) {
          case "ArrowUp":
            changeSnakeDirection("up");
            break;
          case "ArrowDown":
            changeSnakeDirection("down");
            break;
          case "ArrowLeft":
            changeSnakeDirection("left");
            break;
          case "ArrowRight":
            changeSnakeDirection("right");
            break;
        }
      }
    };
    
    const handleKeyUp = (e) => {
      if (activeGame === "pong") {
        switch (e.key) {
          case "ArrowUp":
          case "ArrowDown":
            stopPongPaddle();
            break;
        }
      }
      
      // Pausar/continuar com a tecla P
      if (e.key === "p" || e.key === "P") {
        togglePause();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    activeGame, 
    isPaused, 
    isGameOver, 
    movePongPaddle,
    stopPongPaddle,
    changeSnakeDirection
  ]);
  
  // Funções de controle
  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  
  const restartGame = () => {
    if (activeGame === "pong") {
      pongRef.current = {
        ...pongRef.current,
        paddleLeft: { y: 50, score: 0 },
        paddleRight: { y: 50, score: 0 },
        gameOver: false
      };
      resetPongBall();
    } else if (activeGame === "snake") {
      snakeRef.current = {
        body: [
          { x: 10, y: 10 },
          { x: 9, y: 10 },
          { x: 8, y: 10 }
        ],
        direction: "right",
        food: { x: 15, y: 10 },
        score: 0,
        speed: 150,
        lastUpdate: 0,
        gameOver: false,
        boardSize: 20
      };
    }
    
    setScore(0);
    setLevel(1);
    setIsGameOver(false);
    setIsPaused(false);
  };
  
  // Controles na tela
  const handleTouchControl = (action) => {
    if (isPaused || isGameOver) return;
    
    if (activeGame === "snake") {
      changeSnakeDirection(action);
    }
  };
  
  return (
    <AnimatePresence mode="wait">
      {activeGame && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          style={{ touchAction: 'none' }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="bg-gradient-to-br from-indigo-900 to-black border border-indigo-700/50 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-3 border-b border-indigo-800/50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <BsController className="text-indigo-400 text-2xl" />
                {activeGame === "snake" && "Jogo da Cobra"}
                {activeGame === "pong" && "Pong"}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePause}
                  className="p-1.5 rounded-md bg-indigo-800/50 text-indigo-300 hover:text-white"
                  aria-label={isPaused ? "Continuar" : "Pausar"}
                >
                  {isPaused ? (
                    <BsPlayFill size={18} />
                  ) : (
                    <BsPauseFill size={18} />
                  )}
                </button>
                <button
                  onClick={closeGame}
                  className="p-1.5 rounded-md bg-indigo-800/50 text-indigo-300 hover:text-white"
                  aria-label="Fechar"
                >
                  <BsX size={18} />
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Pontuação */}
              <div className="flex justify-between items-center mb-3 text-indigo-200">
                <div>
                  Pontuação: <span className="text-white font-bold">{score}</span>
                </div>
              </div>

              {/* Área do jogo */}
              <div className="bg-black border-2 border-indigo-800 rounded-lg overflow-hidden aspect-square w-full mx-auto relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                  style={{ touchAction: 'none' }}
                />
                
                {/* Overlay de pausa */}
                {isPaused && !isGameOver && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                    <h3 className="text-indigo-300 text-2xl font-bold mb-4">Jogo Pausado</h3>
                    <button
                      onClick={togglePause}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2"
                    >
                      <BsPlayFill />
                      Continuar
                    </button>
                  </div>
                )}
                
                {/* Overlay de game over */}
                {isGameOver && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
                    <h3 className="text-red-500 text-2xl font-bold mb-2">Game Over</h3>
                    <p className="text-white mb-4">Pontuação: {score}</p>
                    <button
                      onClick={restartGame}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
                    >
                      Jogar Novamente
                    </button>
                  </div>
                )}
              </div>

              {/* Controles */}
              <div className="mt-4">
                <h4 className="text-indigo-300 text-sm mb-2">Controles:</h4>
                
                {activeGame === "snake" && (
                  <div>
                    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                      <div></div>
                      <button
                        className="p-3 bg-indigo-800/50 rounded-lg flex justify-center items-center"
                        onClick={() => handleTouchControl("up")}
                      >
                        <BsArrowUp className="text-white" />
                      </button>
                      <div></div>
                      <button
                        className="p-3 bg-indigo-800/50 rounded-lg flex justify-center items-center"
                        onClick={() => handleTouchControl("left")}
                      >
                        <BsArrowLeft className="text-white" />
                      </button>
                      <button
                        className="p-3 bg-indigo-800/50 rounded-lg flex justify-center items-center"
                        onClick={() => handleTouchControl("down")}
                      >
                        <BsArrowDown className="text-white" />
                      </button>
                      <button
                        className="p-3 bg-indigo-800/50 rounded-lg flex justify-center items-center"
                        onClick={() => handleTouchControl("right")}
                      >
                        <BsArrowRight className="text-white" />
                      </button>
                    </div>
                    <p className="text-xs text-indigo-400 text-center mt-2">
                      Use o teclado: ← → ↑ ↓ para controlar a cobra.
                      <br />
                      Pressione P para pausar/continuar.
                    </p>
                  </div>
                )}
                
                {activeGame === "pong" && (
                  <div>
                    <div className="grid grid-cols-1 gap-2 max-w-xs mx-auto">
                      <button
                        className="p-3 bg-indigo-800/50 rounded-lg flex justify-center items-center"
                        onTouchStart={() => movePongPaddle("up")}
                        onTouchEnd={stopPongPaddle}
                      >
                        <BsArrowUp className="text-white" />
                      </button>
                      <button
                        className="p-3 bg-indigo-800/50 rounded-lg flex justify-center items-center"
                        onTouchStart={() => movePongPaddle("down")}
                        onTouchEnd={stopPongPaddle}
                      >
                        <BsArrowDown className="text-white" />
                      </button>
                    </div>
                    <p className="text-xs text-indigo-400 text-center mt-2">
                      Toque nas setas, deslize na tela ou use ↑ ↓ no teclado.
                      <br />
                      Pressione espaço para pausar/continuar.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}