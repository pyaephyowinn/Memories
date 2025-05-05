import { NewAppointmentPage } from "@/app/appointments/components/NewAppointmentPage";
import { getMe } from "@/services/user";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentUser = await getMe();

  if (!currentUser) {
    return redirect("/login");
  }

  return <NewAppointmentPage currentUser={currentUser} propertyId={+id} />;
}
