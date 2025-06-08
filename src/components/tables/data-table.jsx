import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, ChevronLeft, ChevronRight, Search, Filter, Users, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 10;

export default function DataTable({ data = dummyData, title = "Users" }) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];

      if (sortColumn === 'lastLogin') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [filteredData, sortColumn, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleEdit = (user) => {
    toast({
      title: "Edit User",
      description: `Editing ${user.name} - Form would open here`,
    });
  };

  const handleDelete = (user) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      toast({
        title: "User Deleted",
        description: `${user.name} has been removed from the system`,
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    const csvHeaders = "Name,Email,Role,Status,Last Login\n";
    const csvData = sortedData.map(user =>
      `"${user.name}","${user.email}","${user.role}","${user.status}","${user.lastLogin}"`
    ).join('\n');

    const blob = new Blob([csvHeaders + csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_filtered_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${sortedData.length} users to CSV`,
    });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'destructive';
      case 'pending': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card className="shadow-lg rounded-xl bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border border-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-gray-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Users size={22} className="text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-2xl font-semibold text-indigo-900 dark:text-indigo-300">{title}</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 dark:text-indigo-300" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 rounded-lg border-indigo-300 focus:border-indigo-500 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 dark:text-white"
              />
            </div>

            <div className="relative w-full sm:w-40">
              <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 dark:text-indigo-300" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="pl-12 rounded-lg border-indigo-300 focus:border-indigo-500 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 dark:text-white">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleExport}
              variant="outline"
              className="flex items-center space-x-2 px-5 py-2 border-indigo-400 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-700 dark:border-indigo-600 dark:text-indigo-400 dark:hover:bg-indigo-700 dark:hover:text-indigo-200"
            >
              <Download size={18} />
              <span className="font-medium">Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full min-w-[700px] border-separate border-spacing-y-3">
          <thead>
            <tr className="bg-indigo-100 text-indigo-700 uppercase text-xs tracking-wider rounded-lg dark:bg-indigo-900 dark:text-indigo-300">
              {['name', 'email', 'role', 'status', 'lastLogin'].map((column) => {
                const isActive = sortColumn === column;
                const iconClass = isActive ? (sortDirection === 'asc' ? 'rotate-180' : '') : 'opacity-40';
                return (
                  <th
                    key={column}
                    className="px-6 py-3 text-left cursor-pointer select-none hover:text-indigo-900 dark:hover:text-indigo-400 transition-colors"
                    onClick={() => handleSort(column)}
                    aria-sort={isActive ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                      <ArrowUpDown size={14} className={`transition-transform ${iconClass}`} />
                    </div>
                  </th>
                );
              })}
              <th className="px-6 py-3 text-left text-indigo-700 uppercase tracking-wider text-xs select-none dark:text-indigo-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-indigo-400 italic dark:text-indigo-500">No results found.</td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white hover:shadow-md hover:scale-[1.02] transform transition-transform rounded-lg border border-indigo-200 dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-indigo-900 font-semibold dark:text-indigo-300">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-indigo-600 dark:text-indigo-400">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-indigo-600 dark:text-indigo-400">{item.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(item.status)} />
                    <Badge variant={getStatusVariant(item.status)}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-indigo-500 text-sm font-mono dark:text-indigo-400">
                    {new Date(item.lastLogin).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2 flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>

      <div className="px-6 py-4 border-t border-indigo-200 flex items-center justify-between bg-indigo-50 rounded-b-xl dark:border-gray-700 dark:bg-gray-900">
        <div className="text-indigo-600 text-sm font-medium dark:text-indigo-400">
          Showing {paginatedData.length === 0 ? 0 : ((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, sortedData.length)} of {sortedData.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border-indigo-300 text-indigo-600 disabled:text-indigo-300 disabled:border-indigo-100 dark:border-gray-600 dark:text-indigo-400 dark:disabled:text-gray-500 dark:disabled:border-gray-700"
          >
            <ChevronLeft size={16} className="mr-1" />
            Previous
          </Button>
          <span className="text-indigo-700 font-semibold text-sm dark:text-indigo-300">Page {currentPage} of {totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="border-indigo-300 text-indigo-600 disabled:text-indigo-300 disabled:border-indigo-100 dark:border-gray-600 dark:text-indigo-400 dark:disabled:text-gray-500 dark:disabled:border-gray-700"
          >
            Next
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
