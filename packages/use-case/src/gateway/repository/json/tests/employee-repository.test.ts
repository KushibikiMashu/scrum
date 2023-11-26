import { EmployeeRepository } from '../employee-repository';
import {EmployeeId} from "@panda-project/core";
import {EmployeesSchema, Low} from "@/external/lowdb";
import {getMockDb} from './helper/database';

let repository: EmployeeRepository;
let mockDb: Low
beforeEach(() => {
  mockDb = getMockDb()
  repository = new EmployeeRepository(mockDb);
})

// テストデータを作る
const fabricate = (data: Partial<EmployeesSchema> = null) => {
  return {
    id: data?.id ?? 900,
    first_name: data?.first_name ?? '名前',
    family_name: data?.family_name ?? '苗字',
  }
}

// テストデータをDBに保存する
const fixture = (data: Partial<EmployeesSchema> = null) => {
  const testData = fabricate(data)
  mockDb.data.employees.push(testData)
  return testData
}

describe('findByIdOrFail', () => {
  test('社員が存在する時は社員を返す', async () => {
    // arrange
    fixture()
    // act
    const result = await repository.findByIdOrFail(new EmployeeId(900));
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

describe('findAll', () => {
  test('社員が存在する時は社員を返す', async () => {
    mockDb.data.employees.push(fabricate({id: 900, first_name: '名前', family_name: '苗字'}))
    mockDb.data.employees.push(fabricate({id: 901, first_name: '名前2', family_name: '苗字2'}))
    const actual = await repository.findAll();
    expect(actual.length).toBe(2);
    expect(actual[0].id.value).toBe(900);
    expect(actual[0].employeeName.firstName).toBe('名前');
    expect(actual[0].employeeName.familyName).toBe('苗字');
    expect(actual[1].id.value).toBe(901);
    expect(actual[1].employeeName.firstName).toBe('名前2');
    expect(actual[1].employeeName.familyName).toBe('苗字2');
  })

  test('社員が存在しない時は空配列を返す', async () => {
    const actual = await repository.findAll();
    expect(actual.length).toBe(0);
  })
})

describe('count', () => {
  test('社員が0人の時は0を返す', async () => {
    const result = await repository.count();
    expect(result).toBe(0);
  })
});
