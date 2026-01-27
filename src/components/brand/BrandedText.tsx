import { cn } from "@/lib/utils";
interface BrandedTextProps {
  children?: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

/**
 * BrandedText component renders "TAHQEEQ" in the brand font (Bebas Neue)
 * Use this component wherever the brand name appears in text
 */
const BrandedText = ({
  children = "TAHQEEQ",
  className = "",
  as: Component = "span"
}: BrandedTextProps) => {
  return <Component className={cn("font-brand tracking-widest text-primary font-medium mx-0 my-0", className)}>
      {children}
    </Component>;
};
export default BrandedText;