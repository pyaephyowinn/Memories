import { getCustomerDashboardProperties } from "@/services/property";
import { CustomerDashboard } from "./CustomerDashboard";

export default async function CustomerDashboardPage() {
  const appointments = await getCustomerDashboardProperties();

  return <CustomerDashboard appointments={appointments || []} />;
}
