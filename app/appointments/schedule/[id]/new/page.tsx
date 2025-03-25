import { NewAppointmentPage } from "@/app/appointments/components/NewAppointmentPage";
import { getPropertyById } from "@/services/property";
import { getMe } from "@/services/user";

export default async function page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [currentUser, property] = await Promise.all([
    getMe(),
    getPropertyById(+id),
  ]);

  if (!currentUser || !property) {
    return null;
  }

  return <NewAppointmentPage currentUser={currentUser} property={property} />;
}
