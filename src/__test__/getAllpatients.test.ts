import { getAllPatients } from '@/entities/patient/api';
import { Instance } from '@/shared';

jest.mock('@/shared', () => ({
  Instance: {
    get: jest.fn(),
  },
}));

describe('getAllPatients', () => {
  const mockPatients = [
    {
      name: 'A',
      age: 30,
      gender: 'male',
      firstVisit: new Date('2025-05-15'),
      occupation: 'developer',
    },
    {
      name: 'b',
      age: 31,
      gender: 'male',
      firstVisit: new Date('2025-05-15'),
      occupation: 'developer',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return patients list', async () => {
    (Instance.get as jest.Mock).mockResolvedValue({
      data: {
        patients: mockPatients,
      },
    });
    const result = await getAllPatients();
    expect(result).toEqual(mockPatients);
    expect(Instance.get).toHaveBeenCalledWith('/patients');
  });

  test('should throw error when result.data.patients is missing', async () => {
    (Instance.get as jest.Mock).mockResolvedValue({
      data: {},
    });

    await expect(getAllPatients()).rejects.toThrow('No patients');
  });

  test('should throw error when API call failed', async () => {
    (Instance.get as jest.Mock).mockRejectedValue(new Error('API error'));

    await expect(getAllPatients()).rejects.toThrow('No patients');
  });
});
