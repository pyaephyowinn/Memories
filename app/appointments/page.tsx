import { getMyAppointments } from "@/services/appointment";
import { AppointmentPage } from "./components/AppointmentsPage";

export default async function Appointment({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { page = "1", status = "all" } = await searchParams;

  const { appointments, total } = await getMyAppointments({
    page: parseInt(page),
    status,
  });
  return <AppointmentPage appointments={appointments} total={total} />;
}
