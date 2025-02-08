
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

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
          <Button>{component.properties?.text}</Button>
        </div>
      );
    case "text":
      return (
        <p {...commonProps}>{component.properties?.text}</p>
      );
    case "heading":
      return (
        <h2 {...commonProps} className={`${commonProps.className} text-2xl font-bold`}>
          {component.properties?.text}
        </h2>
      );
    case "paragraph":
      return (
        <p {...commonProps} className={`${commonProps.className} max-w-prose`}>
          {component.properties?.text}
        </p>
      );
    case "quote":
      return (
        <blockquote {...commonProps} className={`${commonProps.className} border-l-4 border-gray-300 pl-4 italic`}>
          {component.properties?.text}
        </blockquote>
      );
    case "checkbox":
      return (
        <div {...commonProps}>
          <Checkbox checked={component.properties?.checked} />
        </div>
      );
    case "radio":
      return (
        <div {...commonProps}>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
          </RadioGroup>
        </div>
      );
    case "slider":
      return (
        <div {...commonProps}>
          <Slider
            defaultValue={[component.properties?.value || 50]}
            max={100}
            step={1}
            className="w-32"
          />
        </div>
      );
    case "image":
      return (
        <div {...commonProps} className={`${commonProps.className} w-32 h-32 bg-gray-200 flex items-center justify-center`}>
          <span className="text-gray-500">Image</span>
        </div>
      );
    case "link":
      return (
        <a
          {...commonProps}
          href={component.properties?.href}
          className={`${commonProps.className} text-blue-500 hover:underline`}
        >
          {component.properties?.text}
        </a>
      );
    case "datepicker":
      return (
        <div {...commonProps}>
          <Calendar mode="single" className="rounded-md border shadow" />
        </div>
      );
    default:
      return (
        <div {...commonProps}>
          Unsupported component type: {component.type}
        </div>
      );
  }
};
