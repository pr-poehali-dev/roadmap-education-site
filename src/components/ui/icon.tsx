
import React from "react";
import { LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
}

const Icon = ({ name, fallback = "CircleAlert", ...props }: IconProps) => {
  const LucideIcon = (LucideIcons as any)[name] || (LucideIcons as any)[fallback];
  
  if (!LucideIcon) {
    return <LucideIcons.CircleAlert {...props} />;
  }
  
  return <LucideIcon {...props} />;
};

export default Icon;
