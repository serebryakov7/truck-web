import { DashboardLayout } from "@/components/dashboard-layout";
import { TruckDetails } from "@/components/truck-details";

interface TruckDetailsPageProps {
  params: {
    id: string;
  };
}

export default function TruckDetailsPage({ params }: TruckDetailsPageProps) {
  return (
    <DashboardLayout>
      <TruckDetails truckId={params.id} />
    </DashboardLayout>
  );
}
