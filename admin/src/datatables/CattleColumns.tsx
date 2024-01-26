import { ICattle } from '@/types/worker';
import { formatTimestamp } from '@/utils';
import { Badge, Flex, Text } from '@chakra-ui/react';

import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';

const columnHelper: any = createColumnHelper();

const CattleColumns = [
  columnHelper.accessor('id', { header: () => '#', width: 50 }),
  columnHelper.accessor('title', { header: () => 'Title' }),
  columnHelper.accessor('birth_date', {
    header: () => 'Birth Date',
    cell: (rows: any) => {
      const worker: ICattle = rows?.row?.original;

      return (
        <Text color="black" fontWeight="bold">
          {worker.birth_date ? formatTimestamp(worker.birth_date) : 'NA'}
        </Text>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: () => 'Status',
    cell: (rows: any) => {
      const status: ICattle['listing_status'] =
        rows?.row?.original.listing_status;
      return (
        <Badge
          colorScheme={status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'yellow'}
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          px="5"
        >
          {status === 'approved'
            ? 'Approved'
            : status === 'rejected'
              ? 'Rejected'
              : 'Review'}
        </Badge>
      );
    },
  }),

  columnHelper.accessor('action', {
    header: () => 'Action',
    cell: (rows: any) => {
      const worker: ICattle = rows.cell.row.original;

      return (
        <Flex
          gap={5}
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Link href={`/worker/${worker.id}`}>View</Link>
        </Flex>
      );
    },
  }),
];

export default CattleColumns;
