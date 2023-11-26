import { EmployeeRepository } from '../employee-repository';
import {EmployeeId} from "@panda-project/core";
import {EmployeesSchema, resetDb} from "@/external/lowdb";
import {getMockDb} from './helper/database';

let repository: EmployeeRepository;
let mockDb = getMockDb()
beforeEach(() => {
  repository = new EmployeeRepository(mockDb);
})

afterEach(async () => {
  await resetDb()
})

// テストデータ
const fabricate = (data: Partial<EmployeesSchema> = null) => {
  return {
    id: data?.id ?? 900,
    first_name: data?.first_name ?? '名前',
    family_name: data?.family_name ?? '苗字',
  }
}

describe('findByIdOrFail', () => {
  test('社員が存在する時は社員を返す', async () => {
    // arrange
    mockDb.data.employees.push(fabricate())
    const id = new EmployeeId(900)
    // act
    const result = await repository.findByIdOrFail(id);
    // assert
    expect(result.id.value).toBe(900);
    expect(result.employeeName.firstName).toBe('名前');
    expect(result.employeeName.familyName).toBe('苗字');
  })

  test('社員が存在しない時はエラーを返す', async () => {
    const id = new EmployeeId(999)
    await expect(repository.findByIdOrFail(id)).rejects.toThrowError(`社員ID 999 は存在しません`);
  })
});

describe('count', () => {
  it('社員が0人の時は0を返す', async () => {
    const result = await repository.count();
    expect(result).toBe(0);
  })
});
