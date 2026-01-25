import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  type: "task" | "student" | "corporation";
  label: string;
  connected: boolean;
}

interface NetworkVisualizationProps {
  isAnimating: boolean;
  onComplete?: () => void;
}

const NetworkVisualization = ({ isAnimating, onComplete }: NetworkVisualizationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<{ from: string; to: string }[]>([]);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, []);

  useEffect(() => {
    if (!isAnimating) return;

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const radius = Math.min(dimensions.width, dimensions.height) * 0.35;

    // Create initial nodes
    const initialNodes: Node[] = [
      { id: "corp", x: centerX, y: centerY - radius * 0.5, type: "corporation", label: "Challenge", connected: true },
      { id: "task1", x: centerX - radius * 0.8, y: centerY + radius * 0.3, type: "task", label: "Route Opt.", connected: false },
      { id: "task2", x: centerX + radius * 0.8, y: centerY + radius * 0.3, type: "task", label: "Data Prep", connected: false },
    ];

    setNodes(initialNodes);

    // Animate student nodes appearing
    const studentPositions = [
      { x: centerX - radius, y: centerY - radius * 0.2 },
      { x: centerX + radius, y: centerY - radius * 0.2 },
      { x: centerX - radius * 0.5, y: centerY + radius * 0.8 },
      { x: centerX + radius * 0.5, y: centerY + radius * 0.8 },
      { x: centerX, y: centerY + radius },
    ];

    let studentCount = 0;
    const addStudentInterval = setInterval(() => {
      if (studentCount >= 5) {
        clearInterval(addStudentInterval);
        setTimeout(() => onComplete?.(), 500);
        return;
      }

      const pos = studentPositions[studentCount];
      const newStudent: Node = {
        id: `student${studentCount}`,
        x: pos.x,
        y: pos.y,
        type: "student",
        label: `S${studentCount + 1}`,
        connected: false,
      };

      setNodes((prev) => [...prev, newStudent]);
      
      // Add connection after a brief delay
      setTimeout(() => {
        setConnections((prev) => [...prev, { from: "corp", to: `student${studentCount}` }]);
        setNodes((prev) =>
          prev.map((n) => (n.id === `student${studentCount}` ? { ...n, connected: true } : n))
        );
      }, 200);

      studentCount++;
    }, 400);

    return () => clearInterval(addStudentInterval);
  }, [isAnimating, dimensions, onComplete]);

  const getNodeColor = (type: Node["type"], connected: boolean) => {
    if (!connected) return "hsl(var(--muted))";
    switch (type) {
      case "corporation":
        return "hsl(var(--primary))";
      case "student":
        return "hsl(var(--accent))";
      case "task":
        return "hsl(var(--secondary))";
      default:
        return "hsl(var(--muted))";
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-64 sm:h-80 bg-muted/20 rounded-lg overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((conn, i) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute flex flex-col items-center"
          style={{
            left: node.x,
            top: node.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            animate={node.connected ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: node.connected ? Infinity : 0, duration: 2 }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium shadow-md"
            style={{
              backgroundColor: getNodeColor(node.type, node.connected),
              color: node.connected ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
            }}
          >
            {node.type === "corporation" ? "🏢" : node.type === "student" ? "👤" : "📋"}
          </motion.div>
          <span className="text-xs text-muted-foreground mt-1 whitespace-nowrap">{node.label}</span>
        </motion.div>
      ))}

      {/* Floating particles */}
      {isAnimating && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
              initial={{
                x: Math.random() * dimensions.width,
                y: dimensions.height + 10,
                opacity: 0,
              }}
              animate={{
                y: -10,
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear",
              }}
              style={{ left: `${10 + i * 12}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NetworkVisualization;
