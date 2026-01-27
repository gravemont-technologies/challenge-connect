import { cn } from "@/lib/utils";
interface BrandedTextProps {
  children?: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

/**
 * BrandedText component renders "Tahqeeq" in the brand font (Playfair Display)
 * Use this component wherever the brand name appears in text
 */
const BrandedText = ({
  children = "Tahqeeq",
  className = "",
  as: Component = "span"
}: BrandedTextProps) => {
  return <Component className={cn("font-brand tracking-tight text-primary font-medium text-center", className)}>
      {children}
    </Component>;
};
export default BrandedText;