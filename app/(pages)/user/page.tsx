import { UserProfile } from '@/entities';
import { LayoutForm } from '@/widgets';

export default function UserPage() {
  return (
    <LayoutForm>
      <UserProfile />
    </LayoutForm>
  );
}
