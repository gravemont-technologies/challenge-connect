import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Minimize2, Maximize2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  typing?: boolean;
}

interface AIMentorChatProps {
  isOpen: boolean;
  onToggle: () => void;
  challengeContext?: string;
}

const quickPrompts = [
  "How do I start?",
  "Explain the KPI",
  "Best practices?",
  "Review my approach",
];

const aiResponses: Record<string, string> = {
  "how do i start": "Great question! Start by analyzing the dataset provided. Look for patterns in delivery times and costs. I recommend beginning with exploratory data analysis (EDA) to understand the current routes.",
  "explain the kpi": "The KPI for this challenge is a 20% cost reduction. This means your optimized routes should reduce total operational costs by at least 20% compared to the baseline. Focus on fuel efficiency and time optimization.",
  "best practices": "For route optimization: 1) Cluster nearby destinations, 2) Consider traffic patterns, 3) Balance load across vehicles, 4) Use dynamic routing for real-time adjustments. Document your methodology clearly!",
  "review my approach": "I'd be happy to review! Share your current methodology and I'll provide feedback. Generally, make sure you're considering both cost and time metrics, and validate your model against historical data.",
  default: "I'm here to help! For this logistics optimization challenge, focus on data-driven insights. What specific aspect would you like guidance on?",
};

const AIMentorChat = ({ isOpen, onToggle, challengeContext }: AIMentorChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "ai",
      content: `Hi! I'm your AI mentor for ${challengeContext || "this challenge"}. I can help with methodology, clarify requirements, or review your approach. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length,
      role: "user",
      content: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerText = messageText.toLowerCase();
      let response = aiResponses.default;
      
      for (const [key, value] of Object.entries(aiResponses)) {
        if (lowerText.includes(key)) {
          response = value;
          break;
        }
      }

      const aiMessage: Message = {
        id: messages.length + 1,
        role: "ai",
        content: response,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={onToggle}
          className="w-14 h-14 rounded-full bg-primary shadow-lg hover:bg-primary/90"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-4 right-4 z-50 w-80 sm:w-96"
    >
      <Card className="overflow-hidden shadow-xl border-0">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-sm">AI Mentor</p>
              <p className="text-xs text-primary-foreground/70">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={onToggle}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              {/* Messages */}
              <div className="h-64 overflow-y-auto p-3 space-y-3 bg-muted/30">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-2.5 rounded-lg text-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card shadow-sm"
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick prompts */}
              <div className="p-2 bg-muted/20 flex flex-wrap gap-1">
                {quickPrompts.map((prompt) => (
                  <Badge
                    key={prompt}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 text-xs"
                    onClick={() => handleSend(prompt)}
                  >
                    {prompt}
                  </Badge>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 bg-card flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask your mentor..."
                  className="text-sm"
                />
                <Button size="icon" onClick={() => handleSend()} disabled={!input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default AIMentorChat;
