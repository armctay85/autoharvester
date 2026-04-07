"use client";

import React, { useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, X, Check, Copy, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGamification } from "@/contexts/GamificationContext";

interface DealBragGeneratorProps {
  car: {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    originalPrice: number;
    image: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const SOCIAL_CAPTIONS = [
  "Just found this incredible deal on AutoHarvester! 🔥",
  "Car shopping just got way easier. Saved big with @AutoHarvester 🚗💰",
  "This is why I use AutoHarvester - unbeatable prices! 💪",
  "Deal alert! Found my dream car at a steal 🎯",
  "Who needs a car dealer when you have AutoHarvester? 👀",
];

export function DealBragGenerator({ car, isOpen, onClose }: DealBragGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [selectedCaption, setSelectedCaption] = useState(0);
  const { addPoints, state } = useGamification();

  const priceDrop = car.originalPrice - car.price;
  const priceDropPercent = Math.round((priceDrop / car.originalPrice) * 100);

  const generateImage = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size (Instagram Story aspect ratio)
    canvas.width = 1080;
    canvas.height = 1920;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#0a0a0a");
    gradient.addColorStop(0.5, "#1a1a1a");
    gradient.addColorStop(1, "#0a0a0a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add grain texture
    ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2;
      ctx.fillRect(x, y, size, size);
    }

    // Load and draw car image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = car.image;
    
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });

    // Car image container (rounded rectangle)
    const carY = 200;
    const carHeight = 600;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(60, carY, canvas.width - 120, carHeight, 30);
    ctx.clip();
    
    // Draw car image with cover behavior
    const imgAspect = img.width / img.height;
    const containerAspect = (canvas.width - 120) / carHeight;
    let drawWidth, drawHeight, drawX, drawY;
    
    if (imgAspect > containerAspect) {
      drawHeight = carHeight;
      drawWidth = carHeight * imgAspect;
      drawX = 60 + (canvas.width - 120 - drawWidth) / 2;
      drawY = carY;
    } else {
      drawWidth = canvas.width - 120;
      drawHeight = drawWidth / imgAspect;
      drawX = 60;
      drawY = carY + (carHeight - drawHeight) / 2;
    }
    
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();

    // Gold accent line
    ctx.strokeStyle = "#b8956e";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(60, carY + carHeight + 40);
    ctx.lineTo(canvas.width - 60, carY + carHeight + 40);
    ctx.stroke();

    // Title text
    ctx.fillStyle = "#f5f5f0";
    ctx.font = "bold 72px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${car.year} ${car.make}`, canvas.width / 2, carY + carHeight + 150);
    
    ctx.font = "500 56px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#b8956e";
    ctx.fillText(car.model, canvas.width / 2, carY + carHeight + 230);

    // Price drop badge
    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.roundRect(canvas.width / 2 - 200, carY + carHeight + 280, 400, 100, 50);
    ctx.fill();
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px system-ui, -apple-system, sans-serif";
    ctx.fillText(`SAVED $${priceDrop.toLocaleString()}`, canvas.width / 2, carY + carHeight + 345);

    // Percentage badge
    ctx.strokeStyle = "#b8956e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(canvas.width / 2 - 120, carY + carHeight + 410, 240, 70, 35);
    ctx.stroke();
    
    ctx.fillStyle = "#b8956e";
    ctx.font = "500 36px system-ui, -apple-system, sans-serif";
    ctx.fillText(`${priceDropPercent}% OFF`, canvas.width / 2, carY + carHeight + 455);

    // Divider
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 1400);
    ctx.lineTo(canvas.width - 100, 1400);
    ctx.stroke();

    // AutoHarvester branding
    ctx.fillStyle = "#666666";
    ctx.font = "32px system-ui, -apple-system, sans-serif";
    ctx.fillText("Found on", canvas.width / 2, 1500);
    
    ctx.fillStyle = "#b8956e";
    ctx.font = "bold 64px system-ui, -apple-system, sans-serif";
    ctx.fillText("AutoHarvester", canvas.width / 2, 1580);
    
    ctx.fillStyle = "#888888";
    ctx.font = "28px system-ui, -apple-system, sans-serif";
    ctx.fillText("autoharvester.com.au", canvas.width / 2, 1640);

    // Tagline
    ctx.fillStyle = "#666666";
    ctx.font = "italic 32px system-ui, -apple-system, sans-serif";
    ctx.fillText("\"Smart car buying starts here\"", canvas.width / 2, 1720);

    // Generate data URL
    const dataUrl = canvas.toDataURL("image/png");
    setGeneratedImage(dataUrl);

    // Award points for sharing (only if not already shared this car)
    if (!state.sharedDeals.includes(car.id)) {
      addPoints(200, {
        id: `share_${car.id}_${Date.now()}`,
        type: "share_deal",
        description: `Shared ${car.make} ${car.model} deal`,
        points: 200,
        timestamp: new Date().toISOString(),
        metadata: { carId: car.id },
      });
    }
  }, [car, priceDrop, priceDropPercent, addPoints, state.sharedDeals]);

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.download = `autoharvester-deal-${car.make}-${car.model}.png`;
    link.href = generatedImage;
    link.click();
  };

  const shareToSocial = (platform: string) => {
    const caption = SOCIAL_CAPTIONS[selectedCaption];
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${caption}\n\nI saved $${priceDrop.toLocaleString()} on this ${car.year} ${car.make} ${car.model}!`);

    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "instagram":
        // Instagram doesn't have a web share URL, so we copy to clipboard
        navigator.clipboard.writeText(`${caption}\n\n${window.location.href}`);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const copyCaption = () => {
    navigator.clipboard.writeText(SOCIAL_CAPTIONS[selectedCaption]);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#141414] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <div>
                <h2 className="text-xl font-bold text-[#f5f5f0]">Share Your Deal</h2>
                <p className="text-[#666666] text-sm">Brag about your find and earn 200 points!</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-[#666666]">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Hidden canvas for generation */}
              <canvas ref={canvasRef} className="hidden" />

              {!generatedImage ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#b8956e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Share2 className="w-10 h-10 text-[#b8956e]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-[#666666] mb-6">
                    Generate a shareable image showing your ${priceDrop.toLocaleString()} savings
                  </p>
                  <Button
                    onClick={generateImage}
                    className="bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold"
                  >
                    Generate Share Image
                  </Button>
                </div>
              ) : (
                <>
                  {/* Preview */}
                  <div className="bg-[#0a0a0a] rounded-xl p-4">
                    <img
                      src={generatedImage}
                      alt="Deal share preview"
                      className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
                    />
                  </div>

                  {/* Caption selector */}
                  <div className="space-y-3">
                    <label className="text-sm text-[#a0a0a0]">Choose a caption</label>
                    <div className="space-y-2">
                      {SOCIAL_CAPTIONS.map((caption, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedCaption(index)}
                          className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                            selectedCaption === index
                              ? "bg-[#b8956e]/20 border border-[#b8956e]/50 text-[#f5f5f0]"
                              : "bg-[#0a0a0a] border border-white/[0.06] text-[#a0a0a0] hover:border-white/[0.1]"
                          }`}
                        >
                          {caption}
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyCaption}
                      className="w-full border-white/[0.1] text-[#a0a0a0]"
                    >
                      {copiedCaption ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Caption
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Share buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => shareToSocial("twitter")}
                      variant="outline"
                      className="border-white/[0.1] text-[#f5f5f0]"
                    >
                      𝕏 Share on X
                    </Button>
                    <Button
                      onClick={() => shareToSocial("facebook")}
                      variant="outline"
                      className="border-white/[0.1] text-[#f5f5f0]"
                    >
                      📘 Facebook
                    </Button>
                    <Button
                      onClick={downloadImage}
                      className="col-span-2 bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Image
                    </Button>
                  </div>

                  <p className="text-center text-xs text-[#666666]">
                    Instagram users: Download the image and post to your story
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
