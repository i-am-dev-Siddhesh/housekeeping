'use client';
import CattleColumns from '@/datatables/CattleColumns';
import { ICattle } from '@/types/worker';
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

interface IProps {
  fetchData: (
    pageIndex: number,
    pageSize: number,
    filterBy?: ICattle['listing_status']
  ) => void;
  data: any[];
  isLoading: boolean;
  count: number;
  columns?: any;
}

const CustomTable = ({
  count,
  data,
  fetchData,
  isLoading,
  columns,
}: IProps) => {
  const [{ pageIndex, pageSize, filterBy }, setPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 5,
    filterBy: '',
  });

  useEffect(() => {
      fetchData(pageIndex, pageSize, filterBy);
  }, []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
      filterBy,
    }),
    [pageIndex, pageSize, filterBy]
  );

  const table = useReactTable({
    data,
    columns: columns || CattleColumns,
    pageCount: Math.ceil(count / pageSize),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  return (
    <Box p={2} bg="white" color="black">
      <Flex px="5" my="3" align="center" gap="10" justify="space-between">
        <Text>{table.getRowModel().rows.length} Rows</Text>
        <Flex>
          <Select
            w={200}
            // @ts-ignore
            value={table.getState().pagination.filterBy}
            onChange={(e) => {
              setPagination((old: any) => {
                return {
                  ...old,
                  filterBy: String(e.target.value),
                };
              });
            }}
          >
            {[null, 'rejected', 'reviewing', 'approved'].map(
              (status, index) => (
                <option key={index} value={status || ''}>
                  {status || 'Default'}
                </option>
              )
            )}
          </Select>
          <Select
            w={200}
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 15, 20, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <Tr key={index}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <Th key={index} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>

        <Tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {isLoading ? (
        <Flex align="center" justify="center" m="10">
          <Spinner size="lg" />{' '}
        </Flex>
      ) : (
        <></>
      )}
      <Flex alignItems="center" gap={2} mt={10} justify="center">
        <Button
          variant="outline"
          rounded="md"
          p={1}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </Button>
        <Button
          variant="outline"
          rounded="md"
          p={1}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </Button>
        <Button
          variant="outline"
          rounded="md"
          p={1}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </Button>
        <Button
          variant="outline"
          rounded="md"
          p={1}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </Button>
      </Flex>

      <Flex justify="center" my="3">
        <Flex display="flex" alignItems="center" gap={1}>
          <Text>Page</Text>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </Flex>
      </Flex>
      <Flex justify="center">
        <Text display="flex" alignItems="center" gap={1}>
          Go to page:
        </Text>
        <Input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          border="1px"
          p={1}
          rounded="md"
          w="16"
        />
      </Flex>
    </Box>
  );
};

export default CustomTable;
