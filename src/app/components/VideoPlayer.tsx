import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { AlertCircle, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
    courseId: number | string;
    lessonId: number | string;
    onEnded?: () => void;
}

export default function VideoPlayer({ courseId, lessonId, onEnded }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Relative URL — Vite dev proxy forwards this to http://localhost:8080
    const playlistUrl = `/courses/${courseId}/lessons/${lessonId}/video/playlist`;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Reset states when URL changes
        setIsLoading(true);
        setError(null);

        // 1. hls.js — preferred for Chrome, Firefox, Edge (always use when available)
        if (Hls.isSupported()) {
            const hls = new Hls({
                // Enable adaptive bitrate starting at a reasonable level (-1 is auto)
                startLevel: -1,
                // Optional: you can pass headers here if your route was protected by JWT
                // xhrSetup: (xhr) => {
                //   xhr.setRequestHeader('Authorization', `Bearer ${yourToken}`);
                // }
            });
            hlsRef.current = hls;

            hls.loadSource(playlistUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setIsLoading(false);
                // Note: Browsers usually block autoplay unless muted, so we let the user hit play manually
            });

            // Robust error handling
            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error("Network error, trying to recover...", data);
                            setError('Network error encountered while loading the video.');
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error("Media error, trying to recover...", data);
                            setError('Media format error encountered.');
                            hls.recoverMediaError();
                            break;
                        default:
                            console.error("Fatal error, destroying player.", data);
                            hls.destroy();
                            setError('A fatal error occurred while playing the video.');
                            break;
                    }
                    setIsLoading(false);
                }
            });
        // 2. Native HLS — Safari / iOS (hls.js not supported here)
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = playlistUrl;
            video.addEventListener('loadedmetadata', () => setIsLoading(false));
            video.addEventListener('error', () => {
                setError('Failed to load video stream natively.');
                setIsLoading(false);
            });
        // 3. Unsupported browser
        } else {
            setError('Your browser does not support HLS video playback.');
            setIsLoading(false);
        }

        // Cleanup function when component unmounts or lesson ID changes
        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [playlistUrl]);

    return (
        <div className="relative w-full overflow-hidden rounded-xl bg-zinc-950 aspect-video flex items-center justify-center border border-zinc-800 shadow-lg">

            {/* Loading State */}
            {isLoading && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 z-10 text-white backdrop-blur-sm">
                    <Loader2 className="w-10 h-10 animate-spin mb-3 text-emerald-500" />
                    <p className="text-sm font-medium tracking-wide">Buffering stream...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 z-10 text-red-500 p-6 text-center">
                    <AlertCircle className="w-12 h-12 mb-3" />
                    <p className="font-semibold text-lg mb-1">Playback Interrupted</p>
                    <p className="text-sm text-zinc-400 max-w-md">{error}</p>
                </div>
            )}

            {/* HTML5 Video Element */}
            <video
                ref={videoRef}
                className={`w-full h-full outline-none transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                controls
                playsInline
                crossOrigin="anonymous" // CRITICAL for CORS when loading .ts segments
                onEnded={onEnded}
            />
        </div>
    );
}
