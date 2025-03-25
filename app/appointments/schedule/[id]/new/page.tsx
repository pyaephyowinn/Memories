import { NewAppointmentPage } from "@/app/appointments/components/NewAppointmentPage";
import { getPropertyById } from "@/services/property";
import { getMe } from "@/services/user";

export default async function page({ params }: { params: { id: string } }) {
  const id = await params.id;
  const currentUser = await getMe();

  if (!currentUser) {
    return null;
  }

  return <NewAppointmentPage currentUser={currentUser} propertyId={+id} />;
}
