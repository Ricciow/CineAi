import { useState, useEffect, useRef } from 'react';

/**
 * Hook to smooth out streaming text with adaptive speed.
 * It buffers incoming text and releases it at a steady pace.
 * If the queue grows too large (fast stream), it speeds up to avoid lag.
 */
export function useSmoothStreaming(targetText: string, baseSpeed: number = 10) {
    const [displayedText, setDisplayedText] = useState(targetText);
    const queueRef = useRef<string[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastProcessedTargetRef = useRef(targetText);
    const isInitialRender = useRef(true);

    useEffect(() => {
        // On first render, display existing text immediately
        if (isInitialRender.current) {
            setDisplayedText(targetText);
            lastProcessedTargetRef.current = targetText;
            isInitialRender.current = false;
            return;
        }

        // Detect new content
        if (targetText.startsWith(lastProcessedTargetRef.current)) {
            const newText = targetText.slice(lastProcessedTargetRef.current.length);
            if (newText) {
                queueRef.current.push(...newText.split(''));
                lastProcessedTargetRef.current = targetText;
            }
        } else if (targetText !== lastProcessedTargetRef.current) {
            // Reset if targetText changed completely
            setDisplayedText(targetText);
            queueRef.current = [];
            lastProcessedTargetRef.current = targetText;
        }

        // Start/Manage interval
        if (queueRef.current.length > 0 && !intervalRef.current) {
            intervalRef.current = setInterval(() => {
                if (queueRef.current.length > 0) {
                    // ADAPTIVE SPEED LOGIC:
                    // If the queue is getting long, process more characters per tick.
                    // This prevents the UI from lagging behind a very fast server stream.
                    let charsToProcess = 1;
                    const queueLen = queueRef.current.length;
                    
                    if (queueLen > 200) charsToProcess = 15;      // Very fast catch up
                    else if (queueLen > 100) charsToProcess = 5;  // Fast catch up
                    else if (queueLen > 50) charsToProcess = 2;   // Slight speed up
                    
                    let nextChars = "";
                    for (let i = 0; i < charsToProcess; i++) {
                        const char = queueRef.current.shift();
                        if (char !== undefined) nextChars += char;
                    }
                    
                    setDisplayedText(prev => prev + nextChars);
                } else {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
            }, baseSpeed);
        }
    }, [targetText, baseSpeed]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return displayedText;
}
