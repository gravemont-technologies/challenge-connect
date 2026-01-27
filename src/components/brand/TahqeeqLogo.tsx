import tahqeeqLogo from "@/assets/tahqeeq-logo.svg";

interface TahqeeqLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const TahqeeqLogo = ({ className = "", size = "md" }: TahqeeqLogoProps) => {
  const sizeClasses = {
    sm: "h-5",
    md: "h-7",
    lg: "h-10",
    xl: "h-14",
  };

  return (
    <img 
      src={tahqeeqLogo} 
      alt="Tahqeeq" 
      className={`${sizeClasses[size]} w-auto object-contain ${className}`}
    />
  );
};

export default TahqeeqLogo;
