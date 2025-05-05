import { getDashboardProperties } from "@/services/property";
import { DashboardPage } from "./components/DashboardPage";

export default async function Dashboard() {
  const { properties, appointments } = await getDashboardProperties();

  return <DashboardPage properties={properties} appointments={appointments} />;
}
