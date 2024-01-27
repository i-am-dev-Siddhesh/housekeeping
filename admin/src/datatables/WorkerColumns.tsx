import { formatTimestamp } from '@/utils';
import { Button, Flex, Text } from '@chakra-ui/react';

import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';

const columnHelper: any = createColumnHelper();

const WorkerColumns = [
  columnHelper.accessor('id', { header: () => '#', width: 50 }),
  columnHelper.accessor('name', {
    header: () => 'name',
    cell: (rows: any) => {
      const worker = rows?.row?.original;
      return (
        <Text color="black" fontWeight="bold">
          {worker.name}
        </Text>
      );
    },
  }),
  columnHelper.accessor('phoneNumber', {
    header: () => 'phoneNumber',
    cell: (rows: any) => {
      const worker = rows?.row?.original;
      return (
        <Link href={`tel:${worker?.phoneNumber}`} style={{ fontWeight: "bold", color: "black" }}>
          {worker.phoneNumber}
        </Link>
      );
    },
  }),
  columnHelper.accessor('createdAt', {
    header: () => 'Listing Date',
    cell: (rows: any) => {
      const worker = rows?.row?.original;

      return (
        <Text color="black" fontWeight="bold">
          {worker.createdAt ? formatTimestamp(worker.createdAt) : 'NA'}
        </Text>
      );
    },
  }),

  columnHelper.accessor('action', {
    header: () => 'Action',
    cell: (rows: any) => {
      const worker = rows.cell.row.original;
      const { handleUpdateWorker } = rows.cell.row.customRowProps
      return (
        <Flex
          gap={5}
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Link href={`/worker/${worker.id}`}>View</Link>
          <Button onClick={() => handleUpdateWorker(worker)}>Update</Button>
        </Flex>
      );
    },
  }),
];

export default WorkerColumns;
