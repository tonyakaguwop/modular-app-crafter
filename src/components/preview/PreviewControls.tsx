
import { Checkbox } from "@/components/ui/checkbox";

interface PreviewControlsProps {
  showGrid: boolean;
  onShowGridChange: (checked: boolean) => void;
}

export const PreviewControls = ({
  showGrid,
  onShowGridChange,
}: PreviewControlsProps) => {
  return (
    <div className="flex gap-4 mb-4">
      <label className="flex items-center gap-2">
        <Checkbox
          checked={showGrid}
          onCheckedChange={(checked) => onShowGridChange(checked as boolean)}
        />
        <span>Show Grid</span>
      </label>
    </div>
  );
};
