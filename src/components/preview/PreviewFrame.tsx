
interface PreviewFrameProps {
  showGrid: boolean;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
  children: React.ReactNode;
}

export const PreviewFrame = ({
  showGrid,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  children,
}: PreviewFrameProps) => {
  return (
    <div 
      className={`w-[360px] h-[640px] bg-white relative overflow-hidden border-8 border-gray-800 rounded-3xl ${
        showGrid ? "bg-grid-pattern" : ""
      } ${isDragging ? "ring-2 ring-blue-500 animate-component-drag" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 right-0 h-6 bg-black rounded-t-xl">
        <div className="w-16 h-4 bg-gray-800 mx-auto rounded-b-lg" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black rounded-b-xl" />
      <div className="pt-8 px-4 pb-16 h-[calc(100%-3rem)] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
