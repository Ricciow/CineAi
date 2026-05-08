import { useState, useEffect, useRef } from 'react';

export function useSmoothStreaming(targetText: string, baseSpeed: number = 10) {
    const [displayedText, setDisplayedText] = useState(targetText);
    const queueRef = useRef<string[]>([]);
    const intervalRef = useRef<any>(null);
    const lastProcessedTargetRef = useRef(targetText);
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            setDisplayedText(targetText);
            lastProcessedTargetRef.current = targetText;
            isInitialRender.current = false;
            return;
        }

        if (targetText.startsWith(lastProcessedTargetRef.current)) {
            const newText = targetText.slice(lastProcessedTargetRef.current.length);
            if (newText) {
                queueRef.current.push(...newText.split(''));
                lastProcessedTargetRef.current = targetText;
            }
        } else if (targetText !== lastProcessedTargetRef.current) {
            setDisplayedText(targetText);
            queueRef.current = [];
            lastProcessedTargetRef.current = targetText;
        }

        if (queueRef.current.length > 0 && !intervalRef.current) {
            intervalRef.current = setInterval(() => {
                if (queueRef.current.length > 0) {
                    let charsToProcess = 1;
                    const queueLen = queueRef.current.length;
                    
                    if (queueLen > 200) charsToProcess = 15;
                    else if (queueLen > 100) charsToProcess = 5;
                    else if (queueLen > 50) charsToProcess = 2;
                    
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
