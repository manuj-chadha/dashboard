import DataTable from '../components/tables/data-table';
import { userData } from '../lib/dummy-data';

export default function Tables() {
  return (
    <div>
      <DataTable data={userData} title="User Management" />
    </div>
  );
}
