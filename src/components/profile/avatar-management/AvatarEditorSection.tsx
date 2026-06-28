import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import type { useAvatarEditor } from "react-avatar-editor";
import AvatarEditor from "react-avatar-editor";
import { Slider } from "../../ui/slider";
import DeleteAvatar from "./DeleteAvatar";
import { useRef } from "react";

interface AvatarEditorSectionProps {
  userAvatar: string;
  editor: ReturnType<typeof useAvatarEditor>;
  setScale: (value: number) => void;
  scale: number;
  setRotate: (value: number) => void;
  rotate: number;
  setImage: (value: string) => void;
}

export default function AvatarEditorSection({
  userAvatar,
  editor,
  setScale,
  scale,
  setRotate,
  rotate,
  setImage,
}: AvatarEditorSectionProps) {
  function handleScaleChange(value: number[]) {
    setScale(value[0]);
  }

  function handleRotateChange(value: number[]) {
    setRotate(value[0]);
  }

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handlePositionChange() {
    if (!timeout.current) return;
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      const canvas = editor.ref.current?.getImage();
      const dataUrl = canvas?.toDataURL("image/png");

      if (dataUrl) {
        setImage(dataUrl);
      }
    }, 200);
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <AvatarEditor
        ref={editor.ref}
        image={userAvatar}
        width={300}
        height={300}
        border={0}
        color={[255, 255, 255, 0.6]}
        scale={scale}
        rotate={rotate}
        borderRadius={300}
        style={{ borderRadius: "50%" }}
        crossOrigin="anonymous"
        onMouseUp={handlePositionChange}
      />
      <div className="avatar-scale flex w-full flex-1 items-center gap-3">
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

      <div className="avatar-scale flex w-full flex-1 items-center gap-3">
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
      <DeleteAvatar />
    </div>
  );
}
