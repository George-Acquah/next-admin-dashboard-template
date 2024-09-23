import { cn } from "@/utils/classes.utils";
import { Card } from "../ui/card"

const InformationCards = ({ className }: { className?: string}) => {
  return (
    <Card
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >

    </Card>
  );
}

export default InformationCards;