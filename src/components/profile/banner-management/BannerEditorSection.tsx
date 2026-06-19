import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import type { useAvatarEditor } from "react-avatar-editor";
import BannerEditor from "react-avatar-editor";
import { Slider } from "../../ui/slider";
import { useEffect, useState } from "react";
import { Skeleton } from "#/components/ui/skeleton";

interface BannerEditorSectionProps {
  userBanner: string;
  editor: ReturnType<typeof useAvatarEditor>;
  setScale: (value: number) => void;
  scale: number;
  setRotate: (value: number) => void;
  rotate: number;
  setImage: (value: string) => void;
}

export default function BannerEditorSection({
  userBanner,
  editor,
  setScale,
  scale,
  setRotate,
  rotate,
  setImage,
}: BannerEditorSectionProps) {
  const [isBannerLoading, setBannerLoading] = useState(true);

  function handleScaleChange(value: number[]) {
    setScale(value[0]);
  }

  function handleRotateChange(value: number[]) {
    setRotate(value[0]);
  }

  function handlePositonChange() {
    const canvas = editor.ref.current?.getImage();
    const dataUrl = canvas?.toDataURL("image/png");
    if (!dataUrl) return;
    setImage(dataUrl);
  }

  useEffect(() => {
    setBannerLoading(true);
  }, [userBanner]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full">
        {isBannerLoading && (
          <Skeleton className="absolute inset-0 z-10 h-[350px] w-full" />
        )}

        <BannerEditor
          ref={editor.ref}
          image={userBanner}
          width={1350}
          height={350}
          border={0}
          scale={scale}
          rotate={rotate}
          crossOrigin="anonymous"
          onMouseUp={handlePositonChange}
          style={{
            width: "100%",
            borderRadius: "12px",
            opacity: isBannerLoading ? 0 : 1,
          }}
          onLoadSuccess={() => setBannerLoading(false)}
        />
      </div>
      <div className="banner-scale flex w-full flex-1 items-center gap-3">
        <ZoomOut />
        <Slider
          onValueChange={handleScaleChange}
          defaultValue={[scale]}
          min={1}
          max={3.5}
          step={0.1}
          className="w-full"
        />
        <ZoomIn />
      </div>
      <div className="banner-scale flex w-full flex-1 items-center gap-3">
        <RotateCcw />
        <Slider
          onValueChange={handleRotateChange}
          defaultValue={[rotate]}
          min={0}
          max={360}
          step={5}
          className="w-full"
        />
        <RotateCw />
      </div>
      {/* <DeleteBanner /> */}
    </div>
  );
}
