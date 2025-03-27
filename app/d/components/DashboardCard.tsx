import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardCardProps = {
  title: string;
  value: string;
  description: string;
  trend: string;
  icon: React.ElementType;
  trendUp: boolean;
};

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendUp,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div
          className={`mt-2 flex items-center text-xs ${
            trendUp ? "text-green-500" : "text-red-500"
          }`}
        >
          {trendUp ? "↑" : "↓"} {trend}
        </div>
      </CardContent>
    </Card>
  );
}
