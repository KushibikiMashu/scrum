import { EmployeeRepository } from '../employee-repository';

describe('count', () => {
  test('社員が0人の時は0を返す', async () => {
    const employeeRepository = new EmployeeRepository();
    const result = await employeeRepository.count();
    expect(result).toBe(0);
  })
});
