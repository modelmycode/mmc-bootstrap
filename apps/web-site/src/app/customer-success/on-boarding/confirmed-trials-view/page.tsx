'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Input,
  useToast
} from '@mmc-bootstrap';
import { submitQueryRequest } from '../../../../lib/actions/submit-query-request';
import { submitCommandRequest } from '../../../../lib/actions/submit-command-request';

interface OnboardingData {
  'onBoardingId': string;
  email: string;
  'firstName': string;
  'lastName': string;
}

export default function OnboardingTable() {
  const [data, setData] = useState<OnboardingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real application, replace this with your actual submitQueryRequest action
      submitQueryRequest('OnBoarding', 'TrialConfirmedView', '')
        .then(response => {
          if (!response.success) {
            throw new Error(`Failed to fetch data ${response.message}`);
          }
          console.log(response.message);
          setData(response.message);
        }).catch((err) => {
        setError('An error occurred while fetching the data. Please try again.');
        toast({
          title: 'Error',
          description: 'Failed to load on-boarding data.',
          variant: 'destructive'
        });
      })
    }
    finally
      {
        setIsLoading(false);
      }
    }

    const filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return (
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold mb-4">On-boarding Requests</h2>
        <div className="mb-4 flex justify-between items-center">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={fetchData} disabled={isLoading}>
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Table>
          <TableCaption>A list of on-boarding requests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item['onBoardingId']}>
                  <TableCell width={'270px'} className="font-medium ">{item['onBoardingId']}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item['firstName']}</TableCell>
                  <TableCell>{item['lastName']}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
