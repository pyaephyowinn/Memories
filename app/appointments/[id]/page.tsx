import { getAppointment } from "@/services/appointment";
import { AppointmentDetailPage } from "../components/AppointmentDetailPage";

export default async function AppointmentDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const appointment = await getAppointment(+id);

  if (!appointment) {
    return <div>Appointment not found</div>;
  }

  return <AppointmentDetailPage appointment={appointment} />;
}
