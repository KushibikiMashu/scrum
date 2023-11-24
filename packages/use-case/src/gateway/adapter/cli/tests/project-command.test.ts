import { CreateProjectCliCommand } from '../project-command';
import {ProjectName} from "@panda-project/core";

describe('CreateProjectCliCommand', () => {
  test('getProjectName', () => {
    const sut = new CreateProjectCliCommand('プロジェクト');
    expect(sut.getProjectName()).toEqual(new ProjectName('プロジェクト'));
  });
})
