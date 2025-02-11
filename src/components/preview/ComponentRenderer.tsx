
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

type Component = {
  id: string;
  type: string;
  position: { x: number; y: number };
  properties?: {
    text?: string;
    checked?: boolean;
    value?: number;
    width?: string;
    height?: string;
    fontSize?: number;
    backgroundColor?: string;
    textColor?: string;
    enabled?: boolean;
    visible?: boolean;
    href?: string;
  };
};

interface ComponentRendererProps {
  component: Component;
  isSelected: boolean;
  onComponentClick: (id: string, e: React.MouseEvent) => void;
}

export const ComponentRenderer = ({
  component,
  isSelected,
  onComponentClick,
}: ComponentRendererProps) => {
  const commonStyles: React.CSSProperties = {
    position: "absolute",
    left: component.position.x,
    top: component.position.y,
    width: component.properties?.width || "auto",
    height: component.properties?.height || "auto",
    fontSize: `${component.properties?.fontSize}px`,
    backgroundColor: component.properties?.backgroundColor,
    color: component.properties?.textColor,
    opacity: component.properties?.visible ? 1 : 0.5,
    pointerEvents: component.properties?.enabled ? "auto" as const : "none" as const,
  };

  const commonProps = {
    style: commonStyles,
    className: `${
      isSelected
        ? "ring-2 ring-blue-500"
        : "hover:ring-2 hover:ring-blue-200"
    } rounded transition-all duration-200`,
    onClick: (e: React.MouseEvent) => onComponentClick(component.id, e),
  };

  switch (component.type) {
    case "button":
      return (
        <div {...commonProps}>
          <Button variant="outline" className="min-w-20">
            {component.properties?.text || ""}
          </Button>
        </div>
      );
    case "text":
      return (
        <p {...commonProps}>{component.properties?.text || ""}</p>
      );
    case "heading":
      return (
        <h2 {...commonProps} className={`${commonProps.className} text-2xl font-bold`}>
          {component.properties?.text || ""}
        </h2>
      );
    case "paragraph":
      return (
        <p {...commonProps} className={`${commonProps.className} max-w-prose`}>
          {component.properties?.text || ""}
        </p>
      );
    case "quote":
      return (
        <blockquote {...commonProps} className={`${commonProps.className} border-l-4 border-gray-300 pl-4 italic`}>
          {component.properties?.text || ""}
        </blockquote>
      );
    case "checkbox":
      return (
        <div {...commonProps} className={`${commonProps.className} flex items-center gap-2`}>
          <Checkbox checked={component.properties?.checked} />
          <Label>{component.properties?.text || ""}</Label>
        </div>
      );
    case "radio":
      return (
        <div {...commonProps}>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">{component.properties?.text || ""}</Label>
            </div>
          </RadioGroup>
        </div>
      );
    case "slider":
      return (
        <div {...commonProps} className={`${commonProps.className} min-w-[200px]`}>
          <Slider
            defaultValue={[component.properties?.value || 50]}
            max={100}
            step={1}
          />
        </div>
      );
    case "image":
      return (
        <div {...commonProps} className={`${commonProps.className} w-32 h-32 bg-gray-100 flex items-center justify-center border rounded-md`}>
          <span className="text-gray-400 text-xs">•</span>
        </div>
      );
    case "link":
      return (
        <a
          {...commonProps}
          href={component.properties?.href || "#"}
          className={`${commonProps.className} text-blue-500 hover:underline`}
        >
          {component.properties?.text || ""}
        </a>
      );
    case "datepicker":
      return (
        <div {...commonProps}>
          <Calendar mode="single" className="rounded-md border shadow bg-white" />
        </div>
      );
    case "listview":
      return (
        <div {...commonProps} className={`${commonProps.className} min-w-[200px] border rounded-md p-2 bg-white`}>
          <div className="space-y-2">
            <div className="p-2 bg-gray-50 rounded"></div>
            <div className="p-2 bg-gray-50 rounded"></div>
            <div className="p-2 bg-gray-50 rounded"></div>
          </div>
        </div>
      );
    case "label":
      return (
        <Label {...commonProps}>
          {component.properties?.text || ""}
        </Label>
      );
    case "password":
      return (
        <div {...commonProps}>
          <Input type="password" placeholder="" className="w-48" />
        </div>
      );
    case "webview":
      return (
        <div {...commonProps} className={`${commonProps.className} w-64 h-40 border rounded-md bg-gray-50 flex items-center justify-center`}>
          <span className="text-gray-400 text-xs">•</span>
        </div>
      );
    default:
      return (
        <div {...commonProps} className={`${commonProps.className} p-2 border rounded bg-gray-50`}>
          <span className="text-gray-400 text-xs">•</span>
        </div>
      );
  }
};
