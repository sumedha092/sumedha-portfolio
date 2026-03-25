import { useState, useEffect, useRef, useCallback } from "react";

interface TerminalWindowProps {
  title: string;
  className?: string;
  variant: "typing" | "logs";
}

const TYPING_BLOCKS = [
  [
    { text: "sumedha@portfolio:~$ python analyze.py --live", isCommand: true },
    { text: "> Extracting facial landmarks... ████████ 30fps ✓", isCommand: false },
    { text: "> EAR score: 0.19 | Fatigue: LOW", isCommand: false },
    { text: "> Generating recommendation...", isCommand: false },
    { text: '> "Take a 60s breathing break at 14:30" ✓', isCommand: false },
  ],
  [
    { text: "sumedha@portfolio:~$ curl /api/analyze", isCommand: true },
    { text: '> Finding officials for Tempe, AZ...', isCommand: false },
    { text: '> Claude web_search: "Tempe City Council 2026" ✓', isCommand: false },
    { text: "> Citing ordinance: TMC 23-14(b)", isCommand: false },
    { text: "> Letter generated — 847 words ✓", isCommand: false },
    { text: "> Sending to: mayor@tempe.gov via Resend ✓", isCommand: false },
  ],
  [
    { text: "sumedha@portfolio:~$ SELECT COUNT(*) FROM grammys", isCommand: true },
    { text: "  WHERE year BETWEEN 2010 AND 2023;", isCommand: false },
    { text: "> 100,847 rows | Query: 0.043s", isCommand: false },
    { text: "> Exporting analysis... intel_perf_report.csv ✓", isCommand: false },
  ],
];

const LOG_LINES = [
  { text: "INFO:     Started server on 0.0.0.0:8000", level: "info" },
  { text: "INFO:     WebSocket connected: user_4821", level: "info" },
  { text: "INFO:     match_request received", level: "info" },
  { text: "INFO:     Matching on 3 courses, 2 slots...", level: "info" },
  { text: "INFO:     Partners found: [user_2341, user_9087]", level: "info" },
  { text: 'INFO:     emit("matches_found") → 2 clients ✓', level: "info" },
  { text: "WARNING:  user_1203 disconnected", level: "warning" },
  { text: "INFO:     WebSocket connected: user_5534", level: "info" },
  { text: "INFO:     match_request received", level: "info" },
  { text: "INFO:     Matching on 5 courses, 1 slot...", level: "info" },
  { text: "INFO:     Partners found: [user_7712]", level: "info" },
  { text: "ERROR:    Timeout on user_3301 heartbeat", level: "error" },
  { text: "INFO:     Reconnecting user_3301...", level: "info" },
  { text: "INFO:     WebSocket connected: user_3301", level: "info" },
  { text: "WARNING:  High latency detected: 230ms", level: "warning" },
  { text: "INFO:     match_request received", level: "info" },
];

const LogTerminal = () => {
  const [lines, setLines] = useState<typeof LOG_LINES>([]);
  const indexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start with first few lines
    setLines(LOG_LINES.slice(0, 3));
    indexRef.current = 3;

    const interval = setInterval(() => {
      setLines(prev => {
        const newLine = LOG_LINES[indexRef.current % LOG_LINES.length];
        indexRef.current++;
        const updated = [...prev, newLine];
        if (updated.length > 10) return updated.slice(-10);
        return updated;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const getColor = (level: string) => {
    if (level === "warning") return "text-amber";
    if (level === "error") return "text-accent";
    return "text-green";
  };

  return (
    <div ref={containerRef} className="overflow-hidden h-full">
      {lines.map((line, i) => (
        <div key={`${i}-${line.text}`} className={`${getColor(line.level)} text-[11px] leading-relaxed font-code opacity-90`}>
          {line.text}
        </div>
      ))}
    </div>
  );
};

const TypingTerminal = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const block = TYPING_BLOCKS[currentBlock];
  const line = block[currentLine];
  const fullText = line?.text || "";

  useEffect(() => {
    if (!isTyping || !line) return;

    if (currentChar < fullText.length) {
      const speed = line.isCommand ? 45 : 20;
      const timer = setTimeout(() => setCurrentChar(c => c + 1), speed);
      return () => clearTimeout(timer);
    } else {
      // Line done
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, fullText]);
        setCurrentChar(0);
        if (currentLine + 1 < block.length) {
          setCurrentLine(l => l + 1);
        } else {
          // Block done — pause then clear
          setIsTyping(false);
          setTimeout(() => {
            setDisplayedLines([]);
            setCurrentLine(0);
            setCurrentChar(0);
            setCurrentBlock(b => (b + 1) % TYPING_BLOCKS.length);
            setIsTyping(true);
          }, 2000);
        }
      }, line.isCommand ? 200 : 100);
      return () => clearTimeout(timer);
    }
  }, [currentChar, currentLine, currentBlock, isTyping, fullText, line, block]);

  return (
    <div className="h-full">
      {displayedLines.map((l, i) => (
        <div key={i} className={`text-[11px] leading-relaxed font-code ${l.startsWith("sumedha") ? "text-green" : "text-primary"}`}>
          {l}
        </div>
      ))}
      {isTyping && line && (
        <div className={`text-[11px] leading-relaxed font-code ${line.isCommand ? "text-green" : "text-primary"}`}>
          {fullText.slice(0, currentChar)}
          <span className="terminal-cursor text-green">|</span>
        </div>
      )}
    </div>
  );
};

const TerminalWindow = ({ title, className = "", variant }: TerminalWindowProps) => {
  return (
    <div className={`rounded-lg overflow-hidden shadow-2xl border border-foreground/10 ${className}`}
         style={{ background: "hsl(var(--terminal))" }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-foreground/5"
           style={{ background: "hsl(240, 24%, 12%)" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] font-code text-[#7D8590] ml-2">{title}</span>
      </div>
      {/* Content */}
      <div className="p-4 min-h-[200px] max-h-[260px] overflow-hidden">
        {variant === "typing" ? <TypingTerminal /> : <LogTerminal />}
      </div>
    </div>
  );
};

export default TerminalWindow;
